import React, {useContext, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import NoGuestList from './NoGuestList';
import {FlashList} from '@shopify/flash-list';
import {
    addPersonImg,
    deleteIcon,
    downloadImg,
    emailIcon_2,
    emailSendIcon,
    guestListImg,
    guestListImg_,
} from '../../../utils/Icons';
import IconButton from '../../../palette/IconButton';
import ConfirmationModal from '../../../palette/ConfirmationModal';
import axios from 'axios';
import {MAIN_URL, mainColor, UPDATE_GUEST_DETAIL_URL} from '../../../utils/Const';
import {alerts, generalError} from '../../../palette/Alerts';
import {FilterDelete} from '../../../utils/HelpFunctions';
import {FloatingAction} from 'react-native-floating-action';

const actions = [
    {
        text: 'Agregar invitado', icon: addPersonImg, name: 'bt_addGuest', position: 1, color: 'white',
    },
];

function GuestList() {

    const {dataStore} = useContext(StoreContext);
    const {headers, userData, guestDetail} = dataStore;
    const {persona} = userData;
    const {idEtapa} = persona;
    const guestDetail_ = {...guestDetail};
    const {invitados} = guestDetail_;

    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [guest, setGuest] = useState(null);
    const [loadingConfirmation, setLoadingConfirmation] = useState(false);
    const [loadingMail, setLoadingMail] = useState(false);

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('GuestDetail');
    };

    const onFloatAction = (name) => {
        name === 'bt_addGuest' && navigation.navigate('CreateGuest');
    };

    const singleMail = async (item) => {
        const {id} = item;
        const url = MAIN_URL + `/invitacion/sendCorreo/${guestDetail_.id}/${id}`;
        setLoadingMail(true);
        try {
            const res = await axios.get(url, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                alerts('success', 'CORREO ELECTRÓNICO ENVIADO', `Correo electrónico enviado exitosamente!!`, 2500);
                setLoadingMail(false);
            }
            codigo !== '0' && generalError();
            codigo !== '0' && setLoadingMail(false);
        } catch (e) {
            generalError();
            setLoadingMail(false);
        }
    };

    const allMail = async () => {
        const {id} = guestDetail_;
        const url = MAIN_URL + `/invitacion/sendCorreo/${id}`;
        setLoadingMail(true);
        try {
            const res = await axios.get(url, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                alerts('success', 'INVITACIONES ENVIADAS', `Invitaciones enviadas exitosamente!!`, 2500);
                setLoadingMail(false);
            }
            codigo !== '0' && generalError();
            codigo !== '0' && setLoadingMail(false);
        } catch (e) {
            generalError();
            setLoadingMail(false);
        }
    };

    const deleteGuest = (item) => {
        setConfirmationModalVisible(true);
        setGuest(item);
    };

    const handleDelete = async () => {
        const {id} = guest;

        guestDetail_.invitados = FilterDelete(invitados, 'id', id);

        setLoadingConfirmation(true);

        try {
            const res = await axios.put(UPDATE_GUEST_DETAIL_URL, guestDetail_, headers);
            const {codigo, data} = res.data;
            const {invitacion} = data;
            if (codigo === '0') {
                await dataStore.GetGuests(idEtapa, persona?.id, headers);
                dataStore.GuestDetail(invitacion);
                alerts('success', 'INVITADO ELIMINADO', `Invitado eliminado exitosamente!!`, 2500);
                navigation.navigate('GuestList');
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

    const renderItem = ({item}) => {

        const {nombres, apellidos, correo} = item;

        return (
            <View style={tw`w-full p-2 flex-row items-center justify-between bg-slate-100 rounded mt-3`}>
                <View style={tw`flex-row items-center`}>
                    {guestListImg_}
                    <View style={tw`ml-2`}>
                        <Text style={tw`text-slate-900 text-base font-semibold`}>{`${nombres} ${apellidos}`}</Text>
                        <Text style={tw`text-slate-900 text-xs `}>{` ${correo}`}</Text>
                    </View>
                </View>
                <View style={tw`flex-row items-center`}>
                    {loadingMail ? <ActivityIndicator size="small" color={mainColor}/> :
                        <IconButton icon={emailSendIcon} onPress={() => singleMail(item)}/>}
                    <IconButton icon={deleteIcon} onPress={() => deleteGuest(item)}/>
                </View>
            </View>
        );
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'Lista de invitados'} back onPressBack={onPressBack}/>

            {invitados?.length === 0 && <NoGuestList/>}

            {invitados?.length > 0 &&
                <View style={tw`p-3 flex-1`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-blue-500 text-xl font-bold`}>{`Invitados`}</Text>
                        <TouchableOpacity onPress={allMail}
                                          disabled={loadingConfirmation}
                                          style={tw`p-1 bg-blue-400 rounded items-center flex-row px-4`}>
                            {loadingMail ? <ActivityIndicator size="small" color={'white'}/> : emailIcon_2}
                            <Text style={tw`text-white font-bold ml-3`}>ENVIAR INVITACIONES</Text>
                        </TouchableOpacity>
                    </View>
                    <FlashList
                        data={invitados}
                        renderItem={renderItem}
                        estimatedItemSize={200}
                    />
                </View>}
            <ConfirmationModal confirmationModalVisible={confirmationModalVisible} header={'Eliminar invitado'}
                               setConfirmationModalVisible={setConfirmationModalVisible} onPress={handleDelete}
                               body={'Esta seguro de eliminar este invitado?'}
                               loadingConfirmation={loadingConfirmation}/>

            <FloatingAction
                actions={actions}
                color={'#2CA2DF'}
                onPressItem={(name) => onFloatAction(name)}
            />

        </View>
    );
}

export default observer(GuestList);
