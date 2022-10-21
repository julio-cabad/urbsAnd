import React, {useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Modal} from 'react-native';
import tw from 'twrnc';
import {closeIcon} from '../utils/Icons';
import {Calendar, LocaleConfig} from 'react-native-calendars/src/index';
import {format} from 'date-fns';

const windowWidth = Dimensions.get('window').width;

LocaleConfig.locales['es'] = {
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

let minDate = format(new Date(), 'yyyy-MM-dd');
let today = format(new Date(), 'yyyy-MM-dd');

function CalendarModal(props) {

    const {
        onDate, setVisibleCalendar, visibleCalendar, switchCalendarIcon, setSwitchCalendarIcon,
    } = props;


    const [markedDay] = useState(today);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibleCalendar}
            onRequestClose={() => {
                setVisibleCalendar(false);
                setSwitchCalendarIcon(!switchCalendarIcon);
            }}
        >
            <View style={[tw`flex-1 items-center justify-center`, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                <View style={[tw`bg-white rounded p-3`, {width: windowWidth - 20, top: 20}]}>
                    <View style={tw`w-full items-center justify-between flex-row mb-2`}>

                        <Text style={tw`text-slate-900  font-bold`}>Fecha de invitación</Text>
                        <TouchableOpacity onPress={() => {
                            setVisibleCalendar(false);
                            setSwitchCalendarIcon(!switchCalendarIcon);
                        }}>
                            {closeIcon}
                        </TouchableOpacity>
                    </View>

                    <Calendar
                        markingType={'custom'}
                        markedDates={{
                            [markedDay]: {
                                customStyles: {
                                    container: {
                                        backgroundColor: 'black',
                                    },
                                    text: {
                                        color: '#fff',
                                        fontWeight: 'bold',
                                    },
                                },
                            },
                        }}
                        current={today}
                        minDate={minDate}
                        onDayPress={day => onDate(day)}
                    />

                </View>
            </View>
        </Modal>
    );
}

export default CalendarModal;
