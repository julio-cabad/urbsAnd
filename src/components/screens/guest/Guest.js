import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {arrowRIcon, invitationImg, inviteImg} from '../../../utils/Icons';
import {FloatingAction} from 'react-native-floating-action';
import NoGuest from './NoGuest';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {FlashList} from '@shopify/flash-list';
import {format, parseISO} from 'date-fns';
import Loading from '../../../palette/Loading';


const actions = [
    {
        text: 'Crear invitación',
        icon: inviteImg,
        name: 'bt_createGuest',
        position: 1,
        color: 'white',
    },
];

function Guest() {

    const {dataStore} = useContext(StoreContext);
    const {getGuests} = dataStore;

    const navigation = useNavigation();

    const onCreateGuest = () => {
        navigation.navigate('CreateInvitation');
    };

    const InvitationDetail = (item) => {
        dataStore.GuestDetail(item);
        navigation.navigate('GuestDetail');
    };


    const renderItem = ({item}) => {

        const {fecha_inicio} = item;
        const invitationName = item.nombre;
        const invitationType = item.tipo;
        const e_d = fecha_inicio.slice(0, fecha_inicio.length - 9)
        const f_i = Date.parse(item.fecha_inicio);
        const f_f = Date.parse(item.fecha_fin);
        const ed = new Date(e_d);
        const di = new Date(f_i);
        const de = new Date(f_f);
        const eventDate = format(ed, 'yyyy-MM-dd');
        const startDate = format(di, 'yyyy-MM-dd');
        const startTime = format(di, 'HH:mm');
        const endDate = format(de, 'yyyy-MM-dd');
        const endTime = format(de, 'HH:mm');

        return (
            <TouchableOpacity style={tw`w-full p-2 flex-row items-center justify-between bg-slate-100 rounded mt-3`}
                              onPress={() => InvitationDetail(item)}>
                <View style={tw`flex-row items-center`}>
                    {invitationImg}
                    {invitationType === 'HOR' &&
                        <View style={tw`ml-2`}>
                            <Text style={tw`text-slate-900 text-base font-semibold`}>{`${invitationName}`}</Text>
                            <Text style={tw`text-slate-900 text-xs `}>{`Fecha :  ${eventDate}`}</Text>
                            <Text
                                style={tw`text-slate-900 text-xs `}>{`H. de inicio :  ${startTime}  H. final : ${endTime}`}</Text>
                        </View>
                    }

                    {invitationType === 'TEM' &&
                        <View style={tw`ml-2`}>
                            <Text style={tw`text-slate-900 text-base font-semibold`}>{`${invitationName}`}</Text>
                            <Text
                                style={tw`text-slate-900 text-xs `}>{`F. de inicio :  ${startDate}  F.final : ${endDate}`}</Text>
                        </View>
                    }
                </View>

                <View>
                    {arrowRIcon}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'INVITADOS'}/>
            {!getGuests && <Loading/>}
            {getGuests?.length === 0 &&
                <View style={tw`flex-1 p-3`}>
                    <NoGuest/>
                </View>}
            {getGuests?.length > 0 &&
                <View style={tw`p-3 flex-1`}>
                    <Text style={tw`text-blue-500 text-xl font-bold`}>{`Lista de invitaciones`}</Text>
                    <FlashList
                        data={getGuests}
                        renderItem={renderItem}
                        estimatedItemSize={200}
                    />
                </View>}
            <FloatingAction
                actions={actions}
                color={'#2CA2DF'}
                onPressItem={() => onCreateGuest()}
            />
        </View>
    );
}


export default observer(Guest);
