import React, {useContext} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import fast from '../../../../assets/img/fast.jpeg';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';

function BoardDetail() {

    const {dataStore} = useContext(StoreContext);
    const {boardDetail} = dataStore;
    const {titulo, detalle} = boardDetail;

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('MainScreen');
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'PIZARRA'} onPressBack={onPressBack} back/>
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`text-slate-700 text-xl font-semibold`}>{titulo}</Text>
                <ScrollView style={tw`flex-1`}>
                    <View style={[tw`w-full bg-red-100 mt-2`, {height: 210, elevation: 5, borderRadius: 9}]}>
                        <Image source={fast}
                               style={{width: '100%', height: 210, resizeMode: 'stretch', borderRadius: 9}}/>
                    </View>

                    <Text style={tw`text-slate-400 mt-5 font-semibold`}>{titulo}</Text>

                    <Text style={tw`text-slate-800 mt-3 text-xs`}>
                        {detalle}
                    </Text>

                </ScrollView>
            </View>
        </View>
    );
}

export default observer(BoardDetail);
