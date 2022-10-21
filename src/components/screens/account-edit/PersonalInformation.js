import React, {useContext,  useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import tw from 'twrnc';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {personalInformationSchema} from '../../../utils/YupSchemas';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import ComboBox from '../../../palette/ComboBox';
import IdTypeModal from './IdTypeModal';
import EditText from '../../../palette/EditText';
import Button from '../../../palette/Button';
import {savedIcon} from '../../../utils/Icons';
import {MAIN_URL, UPDATE_PERSONAL_INFORMATION_URL} from '../../../utils/Const';
import axios from 'axios';
import {alerts, generalError} from '../../../palette/Alerts';

function PersonalInformation() {

    const {dataStore} = useContext(StoreContext);
    const {userData, headers} = dataStore;
    const {persona} = userData;
    const {identificacion, nombres, apellidos, contactoEmergencia, tipoIdentificacion} = persona;

    let idType = '';

    if (tipoIdentificacion === 'CED') {
        idType = 'Cédula';
    }

    if (tipoIdentificacion === 'RUC') {
        idType = 'RUC';
    }

    const personalData = {
        idType,
        identification: identificacion,
        name: nombres,
        lastName: apellidos,
        emergencyContact: contactoEmergencia,
    };

    const [loading, setLoading] = useState(false);
    const [switchIdTypeIcon, setSwitchIdTypeIcon] = useState(true);
    const [visibleIdType, setVisibleIdType] = useState(false);
    const [initValues, setInitValues] = useState(personalData);
    const [resetValues, setResetValues] = useState(false);
    const [copyValues, setCopyValues] = useState(personalData);

    const validate = (values) => {
        setCopyValues(values);
    };

    const onSubmit = async (values) => {
        Keyboard.dismiss();
        const {emergencyContact, idType, identification, lastName, name} = values;

        let tipoIdentificacion = '';

        if (idType === 'Cédula') {
            tipoIdentificacion = 'CED';
        }

        if (idType  === 'RUC') {
            tipoIdentificacion = 'RUC';
        }


        const data = {
            ...persona, tipoIdentificacion, identificacion: identification, nombres: name,
            apellidos: lastName, contactoEmergencia: emergencyContact,
        };

        setLoading(true);
        try {
            const res = await axios.put(UPDATE_PERSONAL_INFORMATION_URL, data, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                const url = MAIN_URL + `/persona/${persona?.id}`;
                const res = await axios.get(url, headers);
                const {data} = res.data;
                dataStore.UserData(data);
                alerts('success', 'DATOS ACTUALIZADOS', `Datos actualizados exitosamente!!`, 2500);
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
        <View style={tw`flex-1 px-4`}>
            <Text style={tw`font-bold text-xl text-blue-500`}>Datos personales</Text>

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
                    validationSchema={personalInformationSchema}
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


                                <EditText errors={errors} handleBlur={handleBlur} keyPad={'number-pad'}
                                          values={values} field={'identification'}
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
                                          values={values} field={'emergencyContact'}
                                          handleChange={handleChange} label={'Contacto de emergencia'}
                                          placeholder={'Ingrese un contacto. Nombre y un telefono'}/>

                                <View style={tw`mt-5 mb-3 w-full`}>
                                    <Button color={'#333'} textColor={'#fff'} text={'GUARDAR DATOS PERSONALES'}
                                            onPress={handleSubmit}
                                            icon={savedIcon} tmRight={10} loading={loading} width={'auto'}
                                    />
                                </View>

                            </>
                        );


                    }}</Formik>
                <IdTypeModal setVisible={setVisibleIdType} visible={visibleIdType} setResetValues={setResetValues}
                             setSwitchIcon={setSwitchIdTypeIcon} switchIcon={switchIdTypeIcon} copyValues={copyValues}
                             setInitValues={setInitValues} initValues={initValues}/>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default observer(PersonalInformation);
