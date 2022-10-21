import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import tw from 'twrnc';
import wp_1 from '../../../../assets/img/workProgres_1.jpeg';
import wp_2 from '../../../../assets/img/workProgress_2.jpeg';

function Urbanization() {

    return (
        <View style={tw`flex-1 bg-white`}>
            <ScrollView style={tw`flex-1 p-3`}>
                <Text style={tw`font-bold text-base text-blue-500`}>Urbanización</Text>

                <View style={[tw`mt-3`, {width: '100%', height: 300}]}>
                    <Image source={wp_1} style={{width: '100%', height: 300}} resizeMode={'stretch'} borderRadius={10}/>
                </View>

                <View style={[tw`mt-3`, {width: '100%', height: 300}]}>
                    <Image source={wp_2} style={{width: '100%', height: 300}} resizeMode={'stretch'} borderRadius={10}/>
                </View>
            </ScrollView>
        </View>
    );
}

export default Urbanization;
