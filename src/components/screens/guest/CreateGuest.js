import React, {useContext, useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createGuestSchema, initGuestValues} from '../../../utils/YupSchemas';
import ComboBox from '../../../palette/ComboBox';
import IdTypeModal from '../../../palette/IdTypeModal';
import EditText from '../../../palette/EditText';
import {savedIcon} from '../../../utils/Icons';
import Button from '../../../palette/Button';
import axios from 'axios';
import {UPDATE_GUEST_DETAIL_URL} from '../../../utils/Const';
import {alerts, errorAlert, generalError} from '../../../palette/Alerts';
import {Filters} from '../../../utils/HelpFunctions';

function CreateGuest() {

    const {dataStore} = useContext(StoreContext);
    const {headers, userData, guestDetail} = dataStore;
    const guestDetail_ = {...guestDetail};
    const {persona} = userData;
    const {idEtapa} = persona;
    const {invitados} = guestDetail_;

    const [loading, setLoading] = useState(false);
    const [switchIdTypeIcon, setSwitchIdTypeIcon] = useState(true);
    const [visibleIdType, setVisibleIdType] = useState(false);
    const [initValues, setInitValues] = useState(initGuestValues);
    const [resetValues, setResetValues] = useState(false);
    const [copyValues, setCopyValues] = useState(initGuestValues);

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('GuestDetail');
    };

    const validate = (values) => {
        setCopyValues(values);
    };

    const onSubmit = async (values) => {

        Keyboard.dismiss();

        const guests = [...invitados];

        const {idType, idUser, name, lastName} = values;

        const controlUser = Filters(guests, 'correo', values.email.trim());

        if (controlUser.length > 0) {
            errorAlert('Este invitado ya ha sido registrado');
            return;
        }

        let tipoIdentificacion = '';

        if (idType === 'Cédula') {
            tipoIdentificacion = 'CED';
        }

        if (idType === 'RUC') {
            tipoIdentificacion = 'RUC';
        }

        let id = parseInt(new Date().getTime().toString().slice(7, 13));

        const guestData = {
            id, tipoIdentificacion, identificacion: idUser, nombres: name, apellidos: lastName,
            correo: values.email.trim(),
        };

        guests.push(guestData);
        guestDetail_.invitados = guests;

        setLoading(true);

        try {
            const res = await axios.put(UPDATE_GUEST_DETAIL_URL, guestDetail_, headers);
            const {codigo, data} = res.data;
            const {invitacion} = data;
            setLoading(false);
            if (codigo === '0') {
                alerts('success', 'INVITADO AGREGADO', `Invitado agregado exitosamente!!`, 2500);
                await dataStore.GetGuests(idEtapa, persona?.id, headers);
                dataStore.GuestDetail(invitacion);
                navigation.navigate('GuestList');
                setLoading(false);
            }
            codigo !== '0' && generalError();
            codigo !== '0' && setLoading(false);
        } catch (e) {
            generalError();
            setLoading(false);
        }
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'INVITADOS'} back onPressBack={onPressBack}/>
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`font-bold text-xl text-blue-500`}>Agregar invitado</Text>

                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    automaticallyAdjustContentInsets={false}
                    keyboardShouldPersistTaps="always"
                    scrollEventThrottle={10}
                    enableOnAndroid={true}
                    resetScrollToCoords={{x: 0, y: 0}}>

                    <Formik
                        enableReinitialize={resetValues}
                        validateOnMount={false}
                        validationSchema={createGuestSchema}
                        initialValues={initValues}
                        onSubmit={onSubmit}
                        validate={validate}
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
                                        <ComboBox errors={errors} handleBlur={handleBlur}
                                                  values={values} field={'idType'}
                                                  handleChange={handleChange} label={'Tipo de identificación'}
                                                  setSwitchIcon={setSwitchIdTypeIcon} switchIcon={switchIdTypeIcon}
                                                  placeholder={'Tipo de identificación'}
                                                  setVisibleModal={setVisibleIdType}/>
                                    </View>


                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'idUser'} keyPad={'number-pad'}
                                              handleChange={handleChange} label={'Identificación'}
                                              placeholder={'Identificación'}/>


                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'name'}
                                              handleChange={handleChange} label={'Nombres'}
                                              placeholder={'Nombres'}/>

                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'lastName'}
                                              handleChange={handleChange} label={'Apellidos'}
                                              placeholder={'Apellidos'}/>

                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'email'}
                                              handleChange={handleChange} label={'Correo electrónico'}
                                              placeholder={'Correo electrónico'}/>


                                    <View style={tw`mt-5 mb-3 w-full`}>
                                        <Button color={'#333'} textColor={'#fff'} text={'GUARDAR INVITADO'}
                                                onPress={handleSubmit}
                                                icon={savedIcon} tmRight={10} loading={loading} width={'auto'}
                                        />
                                    </View>

                                </>
                            );
                        }}</Formik>
                    <IdTypeModal setVisible={setVisibleIdType} visible={visibleIdType} setResetValues={setResetValues}
                                 setSwitchIcon={setSwitchIdTypeIcon} switchIcon={switchIdTypeIcon}
                                 copyValues={copyValues}
                                 setInitValues={setInitValues} initValues={initValues}/>
                </KeyboardAwareScrollView>
            </View>

        </View>
    );
}

export default observer(CreateGuest);
