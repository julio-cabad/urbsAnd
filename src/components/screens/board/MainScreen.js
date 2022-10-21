import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {FlashList} from '@shopify/flash-list';
import LottieView from 'lottie-react-native';
import Loading from '../../../palette/Loading';

function Board() {

    const {dataStore} = useContext(StoreContext);
    const {board} = dataStore;

    const navigation = useNavigation();

    const BoardDetail = (item) => {
        navigation.navigate('BoardDetail');
        dataStore.BoardDetail(item);
    };

    const renderItem = ({item}) => {
        const {titulo, detalle, fotos} = item;

        return (
            <View style={tw`w-full flex-row justify-end relative items-center mt-3`}>
                <View style={[tw`bg-white absolute rounded border border-blue-500`, styles.cardLeft]}>
                    <View style={[tw`w-full items-center justify-center`, {height: 210}]}>
                        <LottieView source={require('../../../../assets/info.json')} autoPlay loop/>
                    </View>
                </View>
                <View
                    style={[tw`rounded justify-center relative items-end bg-white border border-blue-500`, styles.cardRight]}>
                    <View style={[tw`rounded p-3 `, {height: 250, width: '75%'}]}>
                        <View style={[tw`bg-red-50 p-1 items-center justify-center`, {height: 40}]}>
                            <Text style={[tw`text-blue-700 font-semibold`, {fontSize: 10}]}>{titulo}</Text>
                        </View>
                        <View style={[tw`ml-1 p-1 bg-blue-50 mt-2 rounded`, {height: 165}]}>
                            <Text style={tw`text-slate-700 text-xs font-semibold`}>{detalle}</Text>
                        </View>
                        <View style={[tw`w-full items-end mt-1`, {height: 25}]}>
                            <TouchableOpacity onPress={() => BoardDetail(item)}>
                                <Text style={[tw`text-xs font-bold`, {color: '#364A79'}]}>Conocer mas -></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={tw`flex-1 bg-white `}>
            <Header text={'PIZARRA'}/>
            <View style={tw`flex-1 p-3 relative`}>
                {board ?
                    <FlashList
                        data={board}
                        estimatedItemSize={200}
                        renderItem={renderItem}/> : <Loading/>}
            </View>
        </View>
    );
}

export default observer(Board);

const styles = StyleSheet.create({
    cardRight: {
        width: '70%',
        position: 'relative',
        height: 250,
        elevation: 5,
        zIndex: 999,
        borderRadius: 9,
    },

    cardLeft: {
        width: '50%',
        height: 210,
        elevation: 5,
        left: 0,
        zIndex: 1000,
        borderRadius: 9,
    },

});

