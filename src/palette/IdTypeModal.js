import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {checkcircleoIcon, closeIcon} from '../utils/Icons';


function IdTypeModal(props) {

    const {
        setVisible, visible, setInitValues, setSwitchIcon, switchIcon, setResetValues, copyValues,
    } = props;


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(false);
                setSwitchIcon(!switchIcon);
            }}
        >
            <View style={[tw`flex-1 items-center justify-center`, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                <View style={[tw`bg-white rounded p-3`, {width: 300, top: 20}]}>
                    <View style={tw`w-full items-center justify-between flex-row mb-2`}>

                        <Text style={tw`text-slate-900  font-bold`}>Tipo de Identificación</Text>
                        <TouchableOpacity onPress={() => {
                            setVisible(false);
                            setSwitchIcon(!switchIcon);
                        }}>
                            {closeIcon}
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity
                        style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`}
                        onPress={() => {
                            setInitValues({...copyValues, idType: 'Cédula', idUser: ''});
                            setSwitchIcon(!switchIcon);
                            setVisible(false);
                            setResetValues(true);
                        }}
                    >
                        {checkcircleoIcon}
                        <Text style={tw`ml-2 text-slate-600`}>{'Cédula'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`}
                        onPress={() => {
                            setInitValues({...copyValues, idType: 'Pasaporte', idUser: ''});
                            setSwitchIcon(!switchIcon);
                            setVisible(false);
                            setResetValues(true);
                        }}
                    >
                        {checkcircleoIcon}
                        <Text style={tw`ml-2 text-slate-600`}>{'Pasaporte'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`}
                        onPress={() => {
                            setInitValues({...copyValues, idType: 'Carnet de extranjeria', idUser: ''});
                            setSwitchIcon(!switchIcon);
                            setVisible(false);
                            setResetValues(true);
                        }}
                    >
                        {checkcircleoIcon}
                        <Text style={tw`ml-2 text-slate-600`}>{'Carnet de extranjeria'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`}
                        onPress={() => {
                            setInitValues({...copyValues, idType: 'RUC', idUser: ''});
                            setSwitchIcon(!switchIcon);
                            setVisible(false);
                            setResetValues(true);
                        }}
                    >
                        {checkcircleoIcon}
                        <Text style={tw`ml-2 text-slate-600`}>{'RUC'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`}
                        onPress={() => {
                            setInitValues({...copyValues, idType: 'Otros', idUser: ''});
                            setSwitchIcon(!switchIcon);
                            setVisible(false);
                            setResetValues(true);
                        }}
                    >
                        {checkcircleoIcon}
                        <Text style={tw`ml-2 text-slate-600`}>{'Otros'}</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </Modal>
    );
}

export default IdTypeModal;
