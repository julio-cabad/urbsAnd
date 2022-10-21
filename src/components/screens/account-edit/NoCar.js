import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

function NoCar() {
    return (
        <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`text-gray-600`}>{`No dispone de vehículos.`}</Text>
            <View style={[tw`w-full items-center justify-center`, {height: 500}]}>
                <LottieView source={require('../../../../assets/car.json')} autoPlay loop/>
            </View>
        </View>
    );
}

export default NoCar;
