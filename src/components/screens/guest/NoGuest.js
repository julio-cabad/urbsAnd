import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

function NoGuest() {
    return (
        <View style={tw`flex-1 items-center justify-center`}>
            <View style={[tw`w-full items-center justify-center`, {height: 500}]}>
                <LottieView source={require('../../../../assets/noInvited.json')} autoPlay loop/>
            </View>
        </View>
    );
}

export default NoGuest;
