import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../../stores/Context';
import {FlashList} from '@shopify/flash-list';
import Loading from '../../../palette/Loading';
import NoData from '../../../palette/NoData';
import {carImg, deleteIcon, myBookingImg} from '../../../utils/Icons';
import IconButton from '../../../palette/IconButton';
import ConfirmationModal from '../../../palette/ConfirmationModal';
import axios from 'axios';
import {CREATE_BOOKING_URL} from '../../../utils/Const';
import {alerts, generalError} from '../../../palette/Alerts';

function MyBookings() {

    const {dataStore} = useContext(StoreContext);
    const {myBookings, userData, headers, bookings} = dataStore;
    const {persona} = userData;

    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [loadingConfirmation, setLoadingConfirmation] = useState(false);
    const [data, setData] = useState(null);

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate(`Bookings`);
    };

    const deleteBooking = (item) => {
        setConfirmationModalVisible(true);
        setData(item);
    };

    const handleDelete = async () => {

        const newData = {...data, estado: 'P', usuario_modificacion: persona?.id};

        const idArr = [];
        bookings.forEach(item => {
            idArr.push(item.id);
        });

        setLoadingConfirmation(true);

        try {
            const res = await axios.post(CREATE_BOOKING_URL, newData, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                await dataStore.MyBookings(idArr, headers, persona?.id, bookings);
                alerts('success', 'RESERVADA ELIMINADA', `Area eliminada exitosamente!!`, 2500);
                setLoadingConfirmation(false);
                setConfirmationModalVisible(false);
            }
            codigo !== '0' && generalError();
            codigo !== '0' && setLoadingConfirmation(false);
        } catch (e) {
            console.log(e)
            generalError();
            setLoadingConfirmation(false);
        }
    };

    const renderItem = ({item}) => {
        const {start, end, name, estado} = item;

        return (
            <View style={tw`w-full p-2 flex-row items-center justify-between bg-slate-100 rounded mt-3`}>
                <View style={tw`flex-row items-center`}>
                    {myBookingImg}
                    <View style={tw`ml-3`}>
                        <Text style={tw`text-slate-900 text-base font-semibold`}>{`${name}`}</Text>
                        <Text style={tw`text-slate-900 text-xs `}>{`Desde ${start}`}</Text>
                        <Text style={tw`text-slate-900 text-xs `}>{`Hasta ${end}`}</Text>
                        {estado === 'A' && <Text style={tw`text-green-600 text-xs `}>{`Aprobado`}</Text>}
                        {estado === 'P' && <Text style={tw`text-yellow-500 text-xs `}>{`Pendiente`}</Text>}
                        {estado === 'I' && <Text style={tw`text-red-500 text-xs `}>{`No aprobado`}</Text>}
                    </View>
                </View>
                <View style={tw`flex-row items-center`}>
                    <IconButton icon={deleteIcon} onPress={() => deleteBooking(item)}/>
                </View>
            </View>
        );

    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={`MIS RESERVA`} back onPressBack={onPressBack}/>

            {myBookings?.length > 0 &&
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`text-blue-500 text-xl font-bold`}>{`Espacio a reservar`}</Text>
                <FlashList
                    data={myBookings}
                    renderItem={renderItem}
                    estimatedItemSize={200}
                />
            </View>}
            {!myBookings && <Loading/>}
            {myBookings?.length === 0 && <NoData/>}

            <ConfirmationModal confirmationModalVisible={confirmationModalVisible} header={'Eliminar reserva'}
                               setConfirmationModalVisible={setConfirmationModalVisible} onPress={handleDelete}
                               body={'Esta seguro de eliminar esta reserva?'}
                               loadingConfirmation={loadingConfirmation}/>

        </View>
    );
}

export default observer(MyBookings);
