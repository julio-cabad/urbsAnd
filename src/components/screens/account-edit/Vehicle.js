import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import NoCar from './NoCar';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {FlashList} from '@shopify/flash-list';
import {addCarImg, carImg, deleteIcon} from '../../../utils/Icons';
import {FloatingAction} from 'react-native-floating-action';
import {useNavigation} from '@react-navigation/native';
import {MAIN_URL} from '../../../utils/Const';
import IconButton from '../../../palette/IconButton';
import ConfirmationModal from '../../../palette/ConfirmationModal';
import axios from 'axios';
import {alerts, generalError} from '../../../palette/Alerts';

const actions = [
    {
        text: 'Agregar vehículo',
        icon: addCarImg,
        name: 'bt_createVehicle',
        position: 1,
        color: 'white',
    },
];

function Vehicle() {

    const {dataStore} = useContext(StoreContext);
    const {vehicles, headers, userData} = dataStore;
    const {persona} = userData;

    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [loadingConfirmation, setLoadingConfirmation] = useState(false);
    const [data, setData] = useState(null);

    const navigation = useNavigation();

    const onCreateVehicle = () => {
        navigation.navigate('CreateVehicle');
    };

    const deleteVehicle = (item) => {
        setConfirmationModalVisible(true);
        setData(item);
    };

    const handleDelete = async () => {
        const {id} = data;
        const url = MAIN_URL + `vehiculo/${id}`;
        const url_ = MAIN_URL + `persona/${persona?.id}`;
        setLoadingConfirmation(true);
        try {
            const res = await axios.delete(url, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                const res = await axios.get(url_, headers);
                const {data} = res.data;
                const {persona} = data;
                const {vehiculos} = persona;
                dataStore.Vehicles(vehiculos);
                setConfirmationModalVisible(false);
                alerts('success', 'VEHÍCULO ELIMINADO', `Vehículo eliminado exitosamente!!`, 2500);
                setLoadingConfirmation(false);
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

        const {color, anio, marca, modelo, matricula, unidad} = item;

        return (
            <View style={tw`w-full p-2 flex-row items-center justify-between bg-slate-100 rounded mt-3`}>
                <View style={tw`flex-row items-center`}>
                    {carImg}
                    <View style={tw`ml-3`}>
                        <Text style={tw`text-slate-900 text-base font-semibold`}>{`${marca} ${anio}`}</Text>
                        <Text style={tw`text-slate-900 text-xs `}>{`${modelo}  -  ${matricula.toUpperCase()}`}</Text>
                        <Text
                            style={tw`text-slate-900 text-xs shrink`}>{`${color} ${unidad}`}</Text>
                    </View>
                </View>

                <View style={tw`flex-row items-center`}>
                    <IconButton icon={deleteIcon} onPress={() => deleteVehicle(item)}/>
                </View>
            </View>
        );
    };

    return (
        < View style={tw`flex-1 px-4`}>
            {vehicles?.length === 0 ? <View style={tw`flex-1 p-3`}>
                    <NoCar/>
                </View> :
                <View style={tw`p-3 flex-1`}>
                    <Text style={tw`text-blue-500 text-xl font-bold`}>{`Lista de vehículos`}</Text>
                    <FlashList
                        data={vehicles}
                        renderItem={renderItem}
                        estimatedItemSize={200}
                    />
                </View>}
            <FloatingAction
                actions={actions}
                color={'#2CA2DF'}
                onPressItem={() => onCreateVehicle()}
            />

            <ConfirmationModal confirmationModalVisible={confirmationModalVisible} header={'Eliminar vehículo'}
                               setConfirmationModalVisible={setConfirmationModalVisible} onPress={handleDelete}
                               body={'Esta seguro de eliminar este vehículo?'}
                               loadingConfirmation={loadingConfirmation}/>

        </View>
    );
}

export default observer(Vehicle);
