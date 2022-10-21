import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {
    arrowRIcon,
    footballImg,
    gymImg,
    myBookingImg,
    poolImg,
    soccer_2Img,
    soccerImg,
    sportsImg,
} from '../../../utils/Icons';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import Loading from '../../../palette/Loading';
import NoData from '../../../palette/NoData';

function Bookings() {

    const {dataStore} = useContext(StoreContext);
    const {bookings, headers, userData} = dataStore;
    const {persona} = userData;

    const [data, setData] = useState([]);
    const [idArr, setIdArr] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        if (bookings) {
            const arr = [];
            bookings.forEach(item => {
                arr.push(item.id);
            });
            setIdArr(arr);
        }

        const updateBooking = bookings ? [...bookings] : [];
        bookings && updateBooking.push({nombre: 'MIS RESERVAS', id: 999});
        bookings && setData(updateBooking);

    }, [bookings]);

    const onPressBooking = async (item) => {
        if (item.nombre.toUpperCase() === 'MIS RESERVAS') {
             navigation.navigate('MyBookings');
             await dataStore.MyBookings(idArr, headers, persona?.id, bookings);
        } else {
            dataStore.BookingDetail(item);
            navigation.navigate('BookingDetail');
        }
    };

    const renderItem = ({item}) => {

        let img = '';
        if (item.nombre.toUpperCase().trim() === 'CANCHAS SINTETICAS') {
            img = soccer_2Img;
        }

        if (item.nombre.toUpperCase().trim() === 'CANCHA MULTIPLE') {
            img = soccerImg;
        }

        if (item.nombre.toUpperCase().trim() === 'CANCHA CESPED') {
            img = footballImg;
        }

        if (item.nombre.toUpperCase().trim() === 'GIMNASIO') {
            img = gymImg;
        }

        if (item.nombre.toUpperCase().trim() === 'PISCINA') {
            img = poolImg;
        }

        if (item.nombre.toUpperCase().trim() === 'MIS RESERVAS') {
            img = myBookingImg;
        }

        if (item.nombre.toUpperCase().trim() !== 'PISCINA' && item.nombre.toUpperCase().trim() !== 'GIMNASIO'
            && item.nombre.toUpperCase().trim() !== 'CANCHA CESPED' && item.nombre.toUpperCase().trim() !== 'CANCHA MULTIPLE'
            && item.nombre.toUpperCase().trim() !== 'CANCHAS SINTETICAS' && item.nombre.toUpperCase().trim() !== 'MIS RESERVAS') {
            img = sportsImg;
        }

        const style = item.nombre.toUpperCase() === 'MIS RESERVAS' ?
            'w-full p-2 flex-row items-center justify-between bg-green-100 rounded mt-3' :
            'w-full p-2 flex-row items-center justify-between bg-slate-100 rounded mt-3';

        return (
            <TouchableOpacity style={tw`${style}`}
                              onPress={() => onPressBooking(item)}
            >
                <View style={tw`flex-row items-center`}>
                    {img}
                    <View style={tw`ml-2`}>
                        <Text style={tw`text-slate-500 text-base font-semibold`}>{`${item.nombre.toUpperCase()}`}</Text>
                    </View>
                </View>
                <View>
                    {arrowRIcon}
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'RESERVAS'}/>
            {data &&
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`text-blue-500 text-xl font-bold`}>{`Espacio a reservar`}</Text>
                <FlashList
                    data={data}
                    renderItem={renderItem}
                    estimatedItemSize={200}
                />
            </View>}
            {!data && <Loading/>}
            {data.length === 0 && <NoData/>}
        </View>
    );
}

export default observer(Bookings);
