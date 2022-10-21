import React from 'react';
import {View, Text, Modal, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import {cancelModalIcon, checkModalIcon, closeIcon, warnIcon} from '../utils/Icons';

const windowWidth = Dimensions.get('window').width;

function ConfirmationModal(props) {

    const {confirmationModalVisible, setConfirmationModalVisible, header, body, loadingConfirmation, onPress} = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={confirmationModalVisible}
            onRequestClose={() => setConfirmationModalVisible(false)}
        >
            <View style={[tw`flex-1 items-center justify-center`, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                <View style={[tw`bg-white rounded p-3`, {width: windowWidth - 70, top: 20}]}>
                    <View style={tw`w-full items-center justify-between flex-row mb-2`}>

                        <Text style={tw`text-slate-900  font-bold`}>{header.toUpperCase()}</Text>
                        <TouchableOpacity onPress={() => setConfirmationModalVisible(false)}
                        >
                            {closeIcon}
                        </TouchableOpacity>
                    </View>

                    <View style={tw`w-full mt-3 flex-row items-center`}>
                        {warnIcon}
                        <Text style={tw`text-slate-400  ml-2 shrink font-semibold`}>{body}</Text>
                    </View>

                    <View style={tw`w-full mt-4 flex-row items-center justify-center`}>
                        <TouchableOpacity onPress={() => setConfirmationModalVisible(false)}
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

export default ConfirmationModal;
