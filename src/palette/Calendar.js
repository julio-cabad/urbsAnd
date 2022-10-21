import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {format} from 'date-fns';

LocaleConfig.locales['es'] = {
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

let minDate = format(new Date(), 'yyyy-MM-dd');

function Calendar_(props) {

    const {onDate, bgColor, markedDay} = props;

    const initialDate = format(new Date(), 'yyyy-MM-dd');

    return (
        <View style={tw`h-auto`}>
            <Calendar
                initialDate={initialDate}
                markingType={'custom'}
                markedDates={{
                    [markedDay]: {
                        customStyles: {
                            container: {
                                backgroundColor: bgColor,
                            },
                            text: {
                                color: '#fff',
                                fontWeight: 'bold',
                            },
                        },
                    },
                }}

                current={markedDay}
                minDate={minDate}
                onDayPress={day => onDate(day)}
            />
        </View>
    );
}

export default Calendar_;
