import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {
    accountEditIcon, accountStatusIcon, boardIcon, build_Icon, buildingImg, calendarIcon, guestsIcon, logoImg,
    logoutIcon, storeIcon,
} from '../../utils/Icons';
import {useNavigation} from '@react-navigation/native';
import Guest from '../screens/guest/Guest';
import Bookings from '../screens/bookings/Bookings';
import AccountEdit from '../screens/account-edit/AccountEdit';
import AccountStatus from '../screens/account-status/AccountStatus';
import Stores from '../screens/stores/Stores';
import {StoreContext} from '../../stores/Context';
import {observer} from 'mobx-react-lite';
import WorkProgress from '../screens/work-progress/WorkProgress';

function Sidebar() {

    const {dataStore} = useContext(StoreContext);
    const {userData, headers} = dataStore;
    const {persona} = userData;
    const {id, idEtapa, ubicacion} = persona;

    const navigation = useNavigation();

    const Board = () => {
        navigation.navigate('MainScreen');
    };
    const GetGuests = async () => {
        navigation.navigate('Guest');
        await dataStore.GetGuests(idEtapa, id, headers);
    };
    const Bookings = async () => {
        navigation.navigate('Bookings');
        await dataStore.Bookings(idEtapa, headers);
    };

    const WorkProgress = async () => {
        navigation.navigate('WorkProgress');
    };

    const AccountEdit = async () => {
        navigation.navigate('AccountEdit');
        await dataStore.Project(headers);
        await dataStore.Urbanization(headers);
    };
    const AccountStatus = async () => {
        navigation.navigate('AccountStatus');
        await dataStore.Aliquots(idEtapa, ubicacion?.id, headers);
    };
    const Stores = async () => {
        navigation.navigate('Stores');
        await dataStore.Stores(headers);
    };

    const Logout = () => {
        navigation.navigate('Login');
    };


    return (
        <View style={[tw`flex-1 bg-blue-500`]}>
            <View style={tw`flex-1 p-3 flex-col justify-between`}>
                <View>
                    <View style={tw`h-44 items-center justify-center`}>
                        {logoImg}
                    </View>

                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400`}
                                      onPress={Board}
                    >
                        {boardIcon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'PIZARRA'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400 mt-3`}
                                      onPress={GetGuests}
                    >
                        {guestsIcon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'INVITADOS'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400 mt-3`}
                                      onPress={Bookings}
                    >
                        {calendarIcon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'RESERVAS'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400 mt-3`}
                                      onPress={WorkProgress}
                    >
                        {build_Icon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'AVANCE DE OBRA'}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400 mt-3`}
                                      onPress={AccountEdit}
                    >
                        {accountEditIcon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'EDITAR CUENTA'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400 mt-3`}
                                      onPress={AccountStatus}
                    >
                        {accountStatusIcon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'ESTADO DE CUENTA'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400 mt-3`}
                                      onPress={Stores}
                    >
                        {storeIcon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'COMERCIOS'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`p-2 flex-row items-center border-b border-blue-400 mt-3`}
                                      onPress={Logout}
                    >
                        {logoutIcon}
                        <Text style={tw`text-base mt-1 font-semibold ml-3 text-white`}>{'SALIR'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`w-full items-center`}>
                    {buildingImg}
                </View>
            </View>
        </View>
    );
}

export default observer(Sidebar);
