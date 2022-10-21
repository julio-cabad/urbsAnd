import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import rp from '../../../../assets/img/robert.webp';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import Loading from '../../../palette/Loading';
import {months} from '../../../utils/Const';
import {arrowRIcon_1, bankImg, paymentOKImg} from '../../../utils/Icons';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import NoData from '../../../palette/NoData';


function Aliquots() {

    const {dataStore} = useContext(StoreContext);
    const {userData, aliquots, headers} = dataStore;
    const {persona} = userData;
    const {nombres, apellidos, ubicacion} = persona;
    //const {anio, mes, valor, pagado} = aliquots[0];

    console.log(aliquots);

    const navigation = useNavigation();

    const PendingPayments = async () => {
        const yearStr = format(new Date(), 'yyyy');
        const year = parseInt(yearStr);
        navigation.navigate('PendingPayments');
        await dataStore.PendingPayments(ubicacion?.id, year, headers);
    };

    const PaymentsMade = async () => {
        const yearStr = format(new Date(), 'yyyy');
        const year = parseInt(yearStr);
        navigation.navigate('PaymentsMade');
        await dataStore.PaymentsMade(ubicacion?.id, year, headers);
    };


    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`flex-1 p-3`}>
                {aliquots.length > 0 &&
                <View>
                    <View
                        style={[tw`p-4 items-center flex-row w-full mt-3 border border-slate-300 rounded-xl bg-gray-100`]}>
                        <View style={[tw`border border-slate-900`, {width: 70, height: 70, borderRadius: 35}]}>
                            <Image source={rp} style={{width: 70, height: 70, borderRadius: 35}}/>
                        </View>

                        <View style={tw`ml-3`}>
                            <Text style={tw`font-semibold  text-blue-500`}>ALI CUOTAS</Text>
                            <Text style={tw`font-bold text-gray-500`}>{`${nombres} ${apellidos}`}</Text>
                            <Text
                                style={tw`text-gray-900 text-xs`}>{`Mes: ${months[aliquots[0]?.mes]} del ${aliquots[0]?.anio}`}</Text>
                            <Text style={tw`text-gray-900 text-xs`}>{`Valor: $${aliquots[0]?.valor}`}</Text>
                            <Text
                                style={tw`text-gray-800 text-xs ${aliquots[0]?.pagado ? 'text-green-600' : 'text-red-500'}`}>
                                {`Estado: ${aliquots[0]?.pagado ? 'PAGADO' : 'PENDIENTE'}`}
                            </Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={PendingPayments}
                                      style={[tw`pl-2 border border-red-400 mt-8 rounded flex-row items-center justify-center `, {
                                          width: 200, height: 40,
                                      }]}>
                        {bankImg}
                        <Text style={tw`text-gray-900 text-xs ml-2`}>{`PAGOS PENDIENTES`}</Text>
                        {arrowRIcon_1}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={PaymentsMade}
                                      style={[tw`pl-2 border border-green-600 mt-3 rounded flex-row items-center justify-center `, {
                                          width: 200, height: 40,
                                      }]}>
                        {paymentOKImg}
                        <Text style={tw`text-gray-900 text-xs ml-2`}>{`PAGOS REALIZADOS`}</Text>
                        {arrowRIcon_1}
                    </TouchableOpacity>

                </View>}
                {!aliquots && <Loading/>}
                {aliquots.length === 0 && <NoData/>}

            </View>
        </View>
    );
}

export default observer(Aliquots);
