import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {format} from 'date-fns';
import Loading from '../../../palette/Loading';
import {Collapse, CollapseBody, CollapseHeader} from 'accordion-collapse-react-native';
import {arrowDownIcon, arrowUpIcon} from '../../../utils/Icons';
import Rules from './Rules';
import Calendar from '../../../palette/Calendar';
import {CREATE_BOOKING_URL, MAIN_URL, mainColor} from '../../../utils/Const';
import {es} from 'date-fns/esm/locale';
import {FilterDelete, Filters} from '../../../utils/HelpFunctions';
import axios from 'axios';
import {alerts, generalError} from '../../../palette/Alerts';
import BookingModal from './BookingModal';

let today = format(new Date(), 'yyyy-MM-dd');

function BookingDetail() {

    const {dataStore} = useContext(StoreContext);
    const {bookingsDetail, userData, headers} = dataStore;
    const {persona} = userData;
    const {ubicacion} = persona;

    const {detalle, nombre, horario, reservasPermitidas} = bookingsDetail;

    const [switchIcon, setSwitchIcon] = useState(false);
    const [markedDay, setMarkedDay] = useState(today);
    const [schedulesDay, setSchedulesDay] = useState(null);
    const [schedules, setSchedules] = useState(null);
    const [showData, setShowData] = useState(false);
    const [userId, setUserId] = useState(null);
    const [booking, setBooking] = useState(null);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [loadingConfirmation, setLoadingConfirmation] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => setShowData(true), 1);
    }, []);

    useEffect(() => {
        const GetData = async () => {
            try {
                const url = MAIN_URL + `/persona/${persona?.id}`;
                const res = await axios.get(url, headers);
                const {data} = res.data;
                const {usuario} = data;
                setUserId(usuario.id);
            } catch (e) {
                generalError();
            }
        };

        GetData().catch(() => null);

    }, [persona]);

    const onPressBack = () => {
        navigation.navigate(`Bookings`);
    };

    const onDate = async (values) => {

        const {id} = bookingsDetail;
        const {dateString, day, month, year} = values;
        const queryDate = new Date(`${dateString}T23:59:59.000+0000`).getTime();
        const url = MAIN_URL + `/reserva/espacio/${id}/fecha/${queryDate}`;

        let dataArray = [];
        try {
            const res = await axios.get(url, headers);
            const {data} = res.data;
            dataArray = data;
        } catch (e) {
            generalError();
            return;
        }

        const hoursArr = [];

        dataArray.forEach(item => {
            const {fechaInicio, fechaFin, estado} = item;
            const start_ = parseInt(format(new Date(fechaInicio), 'HH'));
            const end_ = parseInt(format(new Date(fechaFin), 'HH'));
            const date = format(new Date(fechaFin), 'yyyy-MM-dd');
            const obj = {start_, end_, status: estado, date};
            hoursArr.push(obj);
        });


        setMarkedDay(dateString);
        const d = format(new Date(year, month - 1, day), 'eee', {locale: es});
        const h = JSON.parse(horario);
        const filterDay = Filters(h, 'id', d);
        const {horarios} = filterDay[0];
        const {fin, ini, numeroFamilias, periodo} = horarios[0];
        const start_ = ini.split(':');
        const start = parseInt(start_[0]);
        const end_ = fin.split(':');
        const end = parseInt(end_[0]);
        const p = periodo / 60;

        let schedules = [];
        let uid = 1;
        let s = start;
        let e = end;
        for (let i = start; i <= end; i += p) {
            e = e + p;
            let obj = {start: s, end: i + p, id: uid, numeroFamilias};
            s = s + p;
            schedules.push(obj);
            uid = uid + 1;
        }

        let copySchedule = [...schedules];
        schedules.forEach(item => {
            const {start, end} = item;
            hoursArr.forEach(items => {
                const {start_, end_, date} = items;
                if (start === start_ && end_ === end && date === dateString) {
                    const {id} = item;
                    const filterSchedule = FilterDelete(copySchedule, 'id', id);
                    copySchedule = [...filterSchedule];
                }
            });
        });

        const actualHour = parseInt(format(new Date(), 'HH'));
        const actualDate = format(new Date(), 'yyyy-MM-dd');
        const filterHour = dateString === actualDate ? copySchedule.filter(items => items.start > actualHour) : copySchedule;
        setSchedulesDay(filterHour);
    };

    const onHandleSchedule = async (items, start, end) => {
        let status = reservasPermitidas ? 'A' : 'P';

        let starDate = new Date(`${markedDay}T${start}:00`);
        let endDate = new Date(`${markedDay}T${end}:00`);

        let booking = {
            fechaInicio: starDate.getTime(), fechaFin: endDate.getTime(), detalle: null,
            espacio: bookingsDetail.id, persona: persona.id, ubicacion: ubicacion.id, usuario_ingreso: userId,
            estado: status,
        };

        setSchedules({startDate: `${markedDay} ${start}:00`, endDate: `${markedDay} ${end}:00`});
        setBooking(booking);
        setConfirmationModalVisible(true);
    };

    const handleSubmit = async () => {
        if (booking.detalle === '' || !booking.detalle) {
            setBooking({...booking, detalle: ''});
            return;
        }
        Keyboard.dismiss();
        setLoadingConfirmation(true);

        try {
            const res = await axios.post(CREATE_BOOKING_URL, booking, headers);
            const {codigo,} = res.data;
            if (codigo === '0') {
                alerts('success', 'ÁREA RESERVADA', `Area reservada exitosamente!!`, 2500);
                setLoadingConfirmation(false);
                setConfirmationModalVisible(false);
            }
            codigo !== '0' && generalError();
            codigo !== '0' && setLoadingConfirmation(false);
        } catch (e) {
            generalError();
            setLoadingConfirmation(false);
        }
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={`RESERVA`} back onPressBack={onPressBack}/>
            {showData ?
                <ScrollView style={tw`flex-1 m-3`}>
                    <Text style={tw`font-bold text-blue-600 text-base mb-3`}>{nombre}</Text>
                    <Collapse onToggle={(isExpanded) => setSwitchIcon(isExpanded)}>
                        <CollapseHeader>
                            <View style={tw`w-full bg-slate-200 p-3 rounded flex-row items-center justify-between`}>
                                <Text style={tw`font-bold text-blue-600 text-base`}>Mostrar reglas.</Text>
                                {switchIcon ? arrowUpIcon : arrowDownIcon}
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <Rules rules={detalle} name={nombre}/>
                        </CollapseBody>
                    </Collapse>

                    <View style={tw`mt-3`}>
                        <Calendar bgColor={mainColor} onDate={onDate} markedDay={markedDay}/>
                    </View>

                    {schedulesDay?.map(items => {
                        const {id, start, end, numeroFamilias} = items;
                        return (
                            <TouchableOpacity
                                style={tw`p-2 w-full rounded border border-blue-400 mt-3 justify-center items-center`}
                                key={id} onPress={() => onHandleSchedule(items, start, end, numeroFamilias)}>
                                <Text
                                    style={tw` text-slate-500 `}>{`${start}:00 - ${end}:00  Cupos: ${numeroFamilias}`}</Text>
                            </TouchableOpacity>
                        );
                    })}

                </ScrollView> : <Loading/>}

            <BookingModal confirmationModalVisible={confirmationModalVisible} header={'Información de la reserva'}
                          setConfirmationModalVisible={setConfirmationModalVisible} onPress={handleSubmit}
                          loadingConfirmation={loadingConfirmation} area={nombre} schedules={schedules}
                          booking={booking} setBooking={setBooking}/>

        </View>
    );
}

export default observer(BookingDetail);
