import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import IconButton from '../../../palette/IconButton';
import {arrowLIcon, arrowRIcon_2, bankImg} from '../../../utils/Icons';
import {StoreContext} from '../../../stores/Context';
import {format} from 'date-fns';
import {FlashList} from '@shopify/flash-list';
import NoData from '../../../palette/NoData';
import Loading from '../../../palette/Loading';
import {months} from '../../../utils/Const';

function PaymentsMade() {

    const {dataStore} = useContext(StoreContext);
    const {paymentsMade, userData, headers} = dataStore;
    const {persona} = userData;
    const {ubicacion} = persona;

    console.log(paymentsMade)

    const yearStr = format(new Date(), 'yyyy');
    const year = parseInt(yearStr);

    const [yearCounter, setYearCounter] = useState(year)

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('AccountStatus');
    };

    const nextYear = async () => {
        const year = yearCounter + 1;
        setYearCounter(year);
        await dataStore.PaymentsMade(ubicacion?.id, year, headers);
    };

    const previousYear = async () => {
        const year = yearCounter - 1;
        setYearCounter(year);
        await dataStore.PaymentsMade(ubicacion?.id, year, headers);
    };


    const renderItem = ({item}) => {

        const {mes, anio, valor, formaPago, fechaPago, banco, referencia, pagado} = item;

        return (
            <View style={tw`p-2 w-full mt-3 border border-slate-300 rounded-xl bg-gray-100`}>
                <View style={tw`flex w-full items-center justify-between flex-row`}>
                    <Text style={tw`font-bold text-base text-black`}>{`Alicuota ${months[mes - 1]} - ${anio}`}</Text>
                    {bankImg}
                </View>
                <Text
                    style={tw` text-xs text-gray-600`}>{`Fecha de pago : ${fechaPago ? formaPago : ''}`}</Text>
                <Text
                    style={tw`text-xs text-gray-600`}>{`Forma de pago : ${formaPago ? formaPago : ''}`}</Text>
                <Text
                    style={tw`text-xs text-gray-600`}>{`Banco ${banco ? banco : ''} - Referencia ${referencia ? referencia : ''}`}</Text>
                <Text style={tw`font-bold text-gray-900`}>{`Valor:  $${valor}`}</Text>
                <Text
                    style={tw`font-semibold ${pagado ? 'text-green-600' : 'text-red-500'}`}>{`Estado :  ${pagado ? 'PAGADO' : 'PENDIENTE'}`}</Text>
            </View>
        );
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'Alicuotas'} back onPressBack={onPressBack}/>
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`font-bold text-xl text-blue-500`}>PAGOS REALIZADOS</Text>
                <View style={tw`w-full items-center flex-row justify-between mt-3`}>
                    <IconButton icon={arrowLIcon} onPress={previousYear}/>
                    <Text style={tw`font-bold text-base text-slate-500`}>{yearCounter}</Text>
                    <IconButton icon={arrowRIcon_2} onPress={nextYear}/>
                </View>

                {paymentsMade?.length > 0 &&
                    <FlashList
                        data={paymentsMade}
                        renderItem={renderItem}
                        estimatedItemSize={200}
                    />}

                {paymentsMade?.length === 0 && <NoData/>}
                {!paymentsMade && <Loading/>}

            </View>
        </View>
    );
}

export default observer(PaymentsMade);
