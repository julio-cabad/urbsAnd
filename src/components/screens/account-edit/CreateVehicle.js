import React, {useContext, useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {initVehicleValues, vehicleSchema} from '../../../utils/YupSchemas';
import EditText from '../../../palette/EditText';
import Button from '../../../palette/Button';
import {savedIcon} from '../../../utils/Icons';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';

;
import axios from 'axios';
import {ADD_VEHICLE_URL, MAIN_URL} from '../../../utils/Const';
import {alerts, generalError} from '../../../palette/Alerts';

function CreateVehicle() {

    const {dataStore} = useContext(StoreContext);
    const {userData, headers} = dataStore;
    const {persona} = userData;
    const {vehiculos} = persona;

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('AccountEdit');
    };

    const onSubmit = async (values) => {
        const {brand, color, garage, model, parkingLot, plateNumber, unit, year} = values;

        const vehicles = [...vehiculos];
        //const updatePerson = {...persona};


        const newVehicle = {
            unidad: unit, color, anio: year, marca: brand, modelo: model, matricula: plateNumber, garaje: garage,
            garajeNo: parkingLot, id_persona: persona?.id, id: 0,
        };

        vehicles.push(newVehicle);

        setLoading(true);
        Keyboard.dismiss();

        try {
            const res = await axios.post(ADD_VEHICLE_URL, newVehicle, headers);
            const {codigo} = res.data;
            const url = MAIN_URL + `persona/${persona?.id}`;
            if (codigo === '0') {
                const res = await axios.get(url, headers);
                const {data} = res.data;
                const {persona} = data;
                const {vehiculos} = persona;
                dataStore.Vehicles(vehiculos);
                alerts('success', 'VEHÍCULO AGREGADO', `Vehículo agregado exitosamente!!`, 2500);
                setLoading(false);
                navigation.navigate('AccountEdit');
            }
            codigo !== '0' && generalError();
            codigo !== '0' && setLoading(false);
        } catch (e) {
            console.log(e);
            generalError();
            setLoading(false);
        }
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'Vehículos'} back onPressBack={onPressBack}/>
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`font-bold text-xl text-blue-500`}>Agregar vehículo</Text>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    automaticallyAdjustContentInsets={false}
                    keyboardShouldPersistTaps="always"
                    scrollEventThrottle={10}
                    enableOnAndroid={true}
                    resetScrollToCoords={{x: 0, y: 0}}>

                    <Formik
                        validateOnMount={false}
                        validationSchema={vehicleSchema}
                        initialValues={initVehicleValues}
                        onSubmit={onSubmit}

                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,

                          }) => {
                            return (
                                <>
                                    <View style={tw`mt-3`}>
                                        <EditText errors={errors} handleBlur={handleBlur}
                                                  values={values} field={'unit'} top={5}
                                                  handleChange={handleChange} label={'Unidad'}
                                                  placeholder={'Unidad'}/>
                                    </View>


                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'color'} top={5}
                                              handleChange={handleChange} label={'Color'}
                                              placeholder={'Color'}/>

                                    <EditText errors={errors} handleBlur={handleBlur} keyPad={'number-pad'}
                                              values={values} field={'year'} top={5}
                                              handleChange={handleChange} label={'Año'}
                                              placeholder={'Año'}/>

                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'brand'} top={5}
                                              handleChange={handleChange} label={'Marca'}
                                              placeholder={'Marca'}/>

                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'model'} top={5}
                                              handleChange={handleChange} label={'Modelo'}
                                              placeholder={'Modelo'}/>

                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'plateNumber'} top={5}
                                              handleChange={handleChange} label={'Placa'}
                                              placeholder={'Placa'}/>

                                    <EditText errors={errors} handleBlur={handleBlur} keyPad={'number-pad'}
                                              values={values} field={'parkingLot'} top={5}
                                              handleChange={handleChange} label={'Estacionamiento'}
                                              placeholder={'Estacionamiento'}/>

                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'garage'} top={5}
                                              handleChange={handleChange} label={'Garage'}
                                              placeholder={'Garage'}/>

                                    <View style={tw`mt-3 w-full`}>
                                        <Button color={'#333'} textColor={'#fff'} text={'GUARDAR DATOS DE VEHÍCULO'}
                                                onPress={handleSubmit}
                                                icon={savedIcon} tmRight={10} loading={loading} width={'auto'}
                                        />
                                    </View>

                                </>
                            );
                        }}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}

export default observer(CreateVehicle);
