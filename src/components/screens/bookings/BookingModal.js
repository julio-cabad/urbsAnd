import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {cancelModalIcon, checkModalIcon, closeIcon} from '../../../utils/Icons';
import {mainColor} from '../../../utils/Const';

const windowWidth = Dimensions.get('window').width;

function BookingModal(props) {

    const {
        confirmationModalVisible, setConfirmationModalVisible, header, loadingConfirmation, onPress, area
        , schedules, booking, setBooking,
    } = props;

    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        booking?.detalle === '' ? setError(true) : setError(false);
    }, [detail, booking]);


    const onChangeText = (value) => {
        setDetail(value);
        setBooking({...booking, detalle: detail});
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={confirmationModalVisible}
            onRequestClose={() => {
                setDetail(null);
                setConfirmationModalVisible(false);
            }}
        >
            <View style={[tw`flex-1 items-center `, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                <View style={[tw`bg-white rounded p-3`, {width: windowWidth - 70, top: 70}]}>
                    <View style={tw`w-full items-center justify-between flex-row mb-2`}>

                        <Text style={tw`text-slate-900  font-bold`}>{header.toUpperCase()}</Text>
                        <TouchableOpacity onPress={() => setConfirmationModalVisible(false)}
                        >
                            {closeIcon}
                        </TouchableOpacity>
                    </View>

                    <View style={tw`w-full items-center justify-between flex-row mt-3`}>
                        <Text style={tw`text-slate-900 font-bold`}>{'Área a reservar'}</Text>
                        <Text style={tw`text-slate-400 font-bold`}>{area}</Text>
                    </View>
                    <Text style={tw`text-slate-900 font-bold mt-3`}>{'Horarios solicitados'}</Text>

                    <View style={tw`w-full items-center justify-between flex-row mt-1`}>
                        <Text style={tw`text-slate-900 font-bold`}>{'Desde'}</Text>
                        <Text style={tw`text-slate-400`}>{schedules?.startDate}</Text>
                    </View>

                    <View style={tw`w-full items-center justify-between flex-row border-slate-500 border-b`}>
                        <Text style={tw`text-slate-900 font-bold`}>{'Hasta'}</Text>
                        <Text style={tw`text-slate-400 `}>{schedules?.endDate}</Text>
                    </View>

                    <TextInput
                        placeholder="Detalle"
                        placeholderTextColor={'gray'}
                        textAlignVertical="top"
                        multiline={true}
                        style={[tw`rounded border-blue-400 mt-3 p-2 border text-slate-800`, {height: 100}]}
                        maxLength={150}
                        onChangeText={text => onChangeText(text)}
                        value={detail}
                    />
                    {error && <Text style={tw`text-red-400 text-xs`}>{'Ingrese el detalle'}</Text>}

                    <View style={tw`w-full mt-4 flex-row items-center justify-center`}>
                        <TouchableOpacity onPress={() => {
                            setDetail(null);
                            setConfirmationModalVisible(false);
                        }}
                                          disabled={loadingConfirmation}
                                          style={tw`p-1 bg-slate-100 rounded items-center flex-row mr-3 px-5`}>
                            {cancelModalIcon}
                            <Text style={tw`text-slate-500 font-bold ml-3`}>CANCELAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onPress} disabled={loadingConfirmation}
                                          style={tw`p-1 bg-blue-400 rounded items-center flex-row px-5`}>
                            {loadingConfirmation ? <ActivityIndicator size="small" color="#fff"/> : checkModalIcon}
                            <Text style={tw`text-white font-bold ml-3`}>ACEPTAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

export default BookingModal;
