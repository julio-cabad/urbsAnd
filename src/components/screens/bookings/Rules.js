import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

function Rules(props) {

    const {rules, name} = props;

    return (
        <View>
            <Text style={tw`font-bold text-xs text-blue-500 mt-3`}>{name}</Text>
            <View style={tw`flex-row items-center mt-1`}>
                <Text
                    style={tw`font-semibold text-xs  text-stone-500 shrink ml-2`}>{rules}</Text>
            </View>
        </View>
    );
}

export default Rules;
