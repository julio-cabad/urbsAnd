import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Header from '../../palette/Header';

function CreateAccount() {

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'CREAR CUENTA'} back onPressBack={onPressBack}/>
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`font-bold text-xl text-blue-500`}>TEXT</Text>
            </View>
        </View>
    );
}

export default CreateAccount;
