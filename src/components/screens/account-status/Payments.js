import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from 'twrnc';;
import DataTable from './Table';
import rp from '../../../../assets/img/robert.webp';

function Payments() {


    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`flex-1 p-3`}>
                <View style={tw`p-2 items-center flex-row`}>
                    <View style={[tw`border border-slate-900`, {width: 70, height: 70, borderRadius: 35}]}>
                        <Image source={rp} style={{width: 70, height: 70, borderRadius: 35}}/>
                    </View>
                    <View style={tw`ml-3`}>
                        <Text style={tw`font-semibold  text-blue-500`}>FINANCIAMIENTO</Text>
                        <Text style={tw`font-bold  text-gray-400`}>Robert Plant</Text>
                    </View>
                </View>
                <DataTable/>
            </View>
        </View>
    );
}

export default Payments;
