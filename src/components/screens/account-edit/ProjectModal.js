import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import tw from 'twrnc';
import {checkcircleoIcon, closeIcon} from '../../../utils/Icons';

function ProjectModal(props) {

    const {
        setVisible, visible, setInitValues, setSwitchIcon, switchIcon, setResetValues, copyValues, project,
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

                        <Text style={tw`text-slate-900  font-bold`}>Proyecto</Text>
                        <TouchableOpacity onPress={() => {
                            setVisible(false);
                            setSwitchIcon(!switchIcon);
                        }}>
                            {closeIcon}
                        </TouchableOpacity>
                    </View>

                    {project?.map(items => {
                        const {id, nombre} = items;
                        return (
                            <TouchableOpacity
                                style={tw`w-full p-2 border-b border-slate-100 flex-row items-center`} key={id}
                                onPress={() => {
                                    setInitValues({...copyValues, project: nombre});
                                    setSwitchIcon(!switchIcon);
                                    setVisible(false);
                                    setResetValues(true);
                                }}
                            >
                                {checkcircleoIcon}
                                <Text style={tw`ml-2 text-slate-600`}>{nombre}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </Modal>
    );
}

export default ProjectModal;
