import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

function NoGuestList() {
    return (
        <View style={tw`flex-1 items-center justify-center p-3`}>
            <Text style={tw`text-slate-600 text-xs`}>No dispone de una lista de invitados</Text>
            <View style={[tw`w-full items-center justify-center`, {height: 600}]}>
                <LottieView source={require('../../../../assets/noList.json')} autoPlay loop/>
            </View>
        </View>
    );
}

export default NoGuestList;
