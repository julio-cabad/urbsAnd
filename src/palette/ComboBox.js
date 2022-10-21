import React from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import tw from 'twrnc';
import {arrowDownIcon, arrowUpIcon} from '../utils/Icons';

function ComboBox(props) {

    const {label, switchIcon, setSwitchIcon, placeholder, values, setVisibleModal, field, handleChange, errors} = props;

    return (
        <View style={tw`flex-col w-full`}>
            <Text style={tw`text-xs text-blue-600 ml-2 font-semibold`}>{label}</Text>
            <View style={styles.sectionStyle}>
                <TextInput
                    style={{flex: 1, paddingHorizontal: 3, height: 45, fontSize: 18}}
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                    color={'#333'}
                    placeholderTextColor={'gray'}
                    textAlignVertical="top"
                    value={values[field]}
                    editable={false}
                    onChangeText={handleChange(field)}
                    autoCapitalize={'sentences'}
                />
                <View style={styles.iconContainer}>
                    {switchIcon ?
                        <TouchableOpacity onPress={() => {
                            setSwitchIcon(!switchIcon);
                            setVisibleModal(true);
                        }}>
                            {arrowDownIcon}
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => {
                            setSwitchIcon(!switchIcon);
                            setVisibleModal(false);
                        }}>
                            {arrowUpIcon}
                        </TouchableOpacity>}
                </View>
            </View>
            {!!errors[field] !== undefined &&
                <Text style={tw`ml-2 text-red-500 text-xs`}>{errors[field]}</Text>}
        </View>
    );
}

export default ComboBox;

const styles = StyleSheet.create({
    iconContainer: {
        width: '10%',
        height: '100%',
        marginTop: 20,
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'column',
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dbe3e6',
        paddingHorizontal: 5,
        borderRadius: 7,
        width: '100%',
    },
});
