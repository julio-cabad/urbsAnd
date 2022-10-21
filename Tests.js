import React, {useState} from 'react';
import {View, Text, Button, Platform, StyleSheet} from 'react-native';
import tw from 'twrnc';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';

function Tests() {


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);


    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn('A date has been picked: ', date);
        hideDatePicker();
    };

    return (
        <View style={tw`flex-1 bg-white items-center justify-center`}>
            <View style={styles.pickedDateContainer}>
                <Text style={styles.pickedDate}>{date.toUTCString()}</Text>
            </View>
            {!isPickerShow && (
                <View style={styles.btnContainer}>
                    <Button title="Show Picker" color="purple" onPress={showPicker}/>
                </View>
            )}

            {isPickerShow && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                />
            )}

            <Button title="Open" onPress={() => setOpen(true)}/>
            <DatePicker
                modal
                mode={'time'}
                open={open}
                date={date}
                onConfirm={(date) => {
                    console.log(format(date, 'HH:mm'));
                    setOpen(false);
                    setDate(date);
                }}

                onCancel={() => {
                    setOpen(false);
                }}
                cancelText={'Cancelar'}
                confirmText={'Confirmar'}
                title={'Seleccionar hora'}
            />

        </View>
    );
}

export default Tests;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 50,
    },
    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    pickedDate: {
        fontSize: 18,
        color: 'black',
    },
    btnContainer: {
        padding: 30,
    },
    // This only works on iOS
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

