import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../../stores/Context';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../../palette/Loading';
import NoData from '../../../palette/NoData';
import {FlashList} from '@shopify/flash-list';
import {arrowRIcon, storeImg} from '../../../utils/Icons';


function Stores() {

    const {dataStore} = useContext(StoreContext);
    const {stores} = dataStore;

    const navigation = useNavigation();

    const StoreDetail = () => {
    };

    const renderItem = ({item}) => {
        const {nombre, horario, direccion} = item;

        return (
            <TouchableOpacity style={tw`w-full p-2 flex-row items-center justify-between bg-slate-100 rounded mt-3`}
                              onPress={() => StoreDetail(item)}>
                <View style={tw`flex-row items-center`}>
                    {storeImg}
                    <View style={tw`ml-3`}>
                        <Text style={tw`text-slate-900 text-base font-semibold`}>{`${nombre}`}</Text>
                        <Text style={tw`text-slate-900 text-xs `}>{`Horarios :  ${horario}`}</Text>
                        <Text
                            style={tw`text-slate-900 text-xs shrink`}>{`Direccion :  ${direccion}`}</Text>
                    </View>
                </View>
                <View>
                    {arrowRIcon}
                </View>
            </TouchableOpacity>
        );


    };

    return (
        <View style={tw`flex-1`}>
            <Header text={'COMERCIOS'}/>
            {!stores && <Loading/>}
            {stores?.length === 0 && <NoData/>}

            {stores?.length > 0 &&
            <View style={tw`flex-1 p-3`}>
                <FlashList
                    data={stores}
                    renderItem={renderItem}
                    estimatedItemSize={200}
                />

            </View>}
        </View>
    );
}

export default observer(Stores);

