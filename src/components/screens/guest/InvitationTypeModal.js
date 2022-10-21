import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import tw from 'twrnc';
import {checkcircleoIcon, closeIcon} from '../../../utils/Icons';
import {invitationSchema_1, invitationSchema_2} from '../../../utils/YupSchemas';

function InvitationTypeModal(props) {

    const {
        setSchemaValues, setVisibleModal, visibleModal, switchIcon, setSwitchIcon, setInvitationType,
        setInitValues, setResetValues, invitationName,
    } = props;


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibleModal}
            onRequestClose={() => {
                setVisibleModal(false);
                setSwitchIcon(!switchIcon);
            }}
        >
            <View style={[tw`flex-1 items-center justify-center`, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                <View style={[tw`bg-white rounded p-3`, {width: 300, top: 20}]}>
                    <View style={tw`w-full items-center justify-between flex-row mb-2`}>

                        <Text style={tw`text-slate-900  font-bold`}>Tipo de invitación</Text>
                        <TouchableOpacity onPress={() => {
                            setVisibleModal(false);
                            setSwitchIcon(!switchIcon);
                        }}>
                            {closeIcon}
                        </TouchableOpacity>
                    </View>
                    <View style={tw`w-full`}>
                        <TouchableOpacity
                            style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`}
                            onPress={() => {
                                setResetValues(true);
                                setSchemaValues(invitationSchema_1);
                                setInitValues({
                                    invitationName, invitationType: 'Horas', eventDate: '', startTime: '',
                                    endTime: '',
                                });
                                setSwitchIcon(!switchIcon);
                                setInvitationType('HOR');
                                setVisibleModal(false);
                            }}
                        >
                            {checkcircleoIcon}
                            <Text style={tw`ml-2 text-slate-600`}>{'Horas'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`w-full mt-3`}>
                        <TouchableOpacity
                            style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`}
                            onPress={() => {
                                setResetValues(true);
                                setSchemaValues(invitationSchema_2);
                                setInitValues({ invitationName, invitationType: 'Temporal', startDate: '', endDate: ''});
                                setSwitchIcon(!switchIcon);
                                setInvitationType('TEM');
                                setVisibleModal(false);
                            }}
                        >
                            {checkcircleoIcon}
                            <Text style={tw`ml-2 text-slate-600`}>{'Temporal'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </Modal>
    );
}


export default InvitationTypeModal;
