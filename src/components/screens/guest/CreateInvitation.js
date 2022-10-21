import React, {useContext, useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EditText from '../../../palette/EditText';
import ComboBox from '../../../palette/ComboBox';
import InvitationTypeModal from './InvitationTypeModal';
import * as Yup from 'yup';
import CalendarModal from '../../../palette/CalendarModal';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import Button from '../../../palette/Button';
import {savedIcon} from '../../../utils/Icons';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {alerts, errorAlert, generalError} from '../../../palette/Alerts';
import {GUEST_DETAIL_URL} from '../../../utils/Const';
import axios from 'axios';

const initSchemaValues = Yup.object().shape({
    invitationName: Yup.string()
        .required('El nombre de la invitación es requerido'),
    invitationType: Yup.string()
        .required('Seleccionar el tipo de  invitación.'),
});

export const initInvitationValues = {
    invitationName: '',
    invitationType: '',
};

function CreateInvitation() {

    const {dataStore} = useContext(StoreContext);
    const {headers, userData} = dataStore;
    const {persona} = userData;
    const {id, idEtapa, ubicacion} = persona;

    const [loading, setLoading] = useState(false);
    const [invitationType, setInvitationType] = useState(null);
    const [visibleModal, setVisibleModal] = useState(null);
    const [switchIcon, setSwitchIcon] = useState(true);
    const [switchCalendarIcon, setSwitchCalendarIcon] = useState(true);
    const [switchStartTimeIcon, setSwitchStartTimeIcon] = useState(true);
    const [switchStartDateIcon, setSwitchStartDateIcon] = useState(true);
    const [switchEndTimeIcon, setSwitchEndTimeIcon] = useState(true);
    const [switchEndDateIcon, setSwitchEndDateIcon] = useState(true);
    const [schemaValues, setSchemaValues] = useState(initSchemaValues);
    const [initValues, setInitValues] = useState(initInvitationValues);
    const [invitationName, setInvitationName] = useState('');
    const [resetValues, setResetValues] = useState(false);
    const [visibleCalendar, setVisibleCalendar] = useState(false);
    const [visibleStartTimeModal, setVisibleStartTimeModal] = useState(false);
    const [visibleEndTimeModal, setVisibleEndTimeModal] = useState(false);

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('Guest');
    };

    const onEventDate = async (values) => {
        const {dateString} = values;
        setInitValues({...initValues, eventDate: dateString});
        setSwitchCalendarIcon(!switchCalendarIcon);
        setVisibleCalendar(false);
    };

    const onStartTime = (date) => {
        setSwitchStartTimeIcon(true);
        const startTime = format(date, 'HH:mm');
        setVisibleStartTimeModal(false);
        setInitValues({...initValues, startTime});
    };

    const onEndTime = (date) => {
        setSwitchEndTimeIcon(true);
        const endTime = format(date, 'HH:mm');
        setVisibleEndTimeModal(false);
        setInitValues({...initValues, endTime});
    };

    /*TEMPORAL*/
    const onStartDate = (values) => {
        const {dateString} = values;
        setInitValues({...initValues, startDate: dateString});
        setSwitchStartDateIcon(true);
        setSwitchStartDateIcon(true);
        setVisibleCalendar(false);
    };

    const onEndDate = (values) => {
        const {dateString} = values;
        setInitValues({...initValues, endDate: dateString});
        setSwitchEndDateIcon(!switchEndDateIcon);
        setSwitchEndDateIcon(true);
        setVisibleCalendar(false);
    };

    const validate = (values) => {
        const {invitationName} = values;
        invitationName !== '' && setInvitationName(invitationName);
    };

    const onSubmit = async (values) => {
        Keyboard.dismiss();
        //setLoading(true);

        const {invitationName, eventDate, startTime, endTime, startDate, endDate} = values;

        const st = `${eventDate}T${startTime}:00`;
        const et = `${eventDate}T${endTime}:00`;
        const st_ = new Date(st).toISOString().slice(11, st.length - 3);
        const et_ = new Date(et).toISOString().slice(11, et.length - 3);
        const startTime_ = invitationType === 'HOR' ? `${eventDate}T${st_}:00` : `${startDate}T23:59:59`;
        const endTime_ = invitationType === 'HOR' ? `${eventDate}T${et_}:00` : `${endDate}T23:59:59`;

        if (startTime > endTime && invitationType === 'HOR') {
            errorAlert('La hora de inicio no puede ser mayor que la hora final');
            return;
        }

        if (startTime_ > endTime_ && invitationType === 'TEM') {
            errorAlert('La fecha de inicio no puede ser mayor que la fecha final');
            return;
        }

        const {manzana, villa, departamento} = ubicacion;
        const dirStr = `{\"mz\":\"${manzana}\",\"vl\":\"${villa}\",\"dp\":\"${departamento}\"}`;

        const invitation = {
            detalle: '', direccion: dirStr, nombre: invitationName, fecha_inicio: startTime_, tipo: invitationType,
            fecha_fin: endTime_, idEtapa, qr: '', estado: 'A', fecha_ingreso: '', fecha_modificacion: '',
            usuario_ingreso: id, usuario_modificacion: null, invitados: [], id: 212121,
        };

        if (startTime > endTime && invitationType === 'HOR') {
            errorAlert('La hora de inicio no puede ser mayor que la hora final');
            return;
        }

        if (startTime_ > endTime_ && invitationType === 'TEM') {
            errorAlert('La fecha de inicio no puede ser mayor que la fecha final');
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        try {
            const res = await axios.post(GUEST_DETAIL_URL, invitation, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                await dataStore.GetGuests(idEtapa, id, headers);
                navigation.navigate('Guest');
                alerts('success', 'INVITACION CREADA', `Invitacion creada exitosamente!!`, 2500);
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
            <Header text={'Crar invitacion'} back onPressBack={onPressBack}/>
            <View style={tw`flex-1 p-3`}>
                <Text style={tw`font-bold text-xl text-blue-500`}>{`Crear invitación`}</Text>

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
                        validationSchema={schemaValues}
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
                                        <EditText errors={errors} handleBlur={handleBlur}
                                                  values={values} field={'invitationName'}
                                                  handleChange={handleChange} label={'Nombres de la invitación'}
                                                  placeholder={'Nombres de la invitación'}/>
                                    </View>

                                    <View>
                                        <ComboBox errors={errors} handleBlur={handleBlur}
                                                  values={values} field={'invitationType'}
                                                  handleChange={handleChange} label={'Tipo invitación'}
                                                  setSwitchIcon={setSwitchIcon} switchIcon={switchIcon}
                                                  placeholder={'Tipo invitación'} setVisibleModal={setVisibleModal}/>
                                    </View>

                                    {invitationType === 'HOR' &&
                                        <View>
                                            <View style={tw`mt-1`}>
                                                <ComboBox errors={errors} handleBlur={handleBlur}
                                                          values={values} field={'eventDate'}
                                                          handleChange={handleChange} label={'Fecha del evento'}
                                                          setSwitchIcon={setSwitchCalendarIcon}
                                                          switchIcon={switchCalendarIcon}
                                                          placeholder={'Fecha del evento'}
                                                          setVisibleModal={setVisibleCalendar}/>
                                            </View>

                                            <View style={tw`mt-1`}>
                                                <ComboBox errors={errors} handleBlur={handleBlur}
                                                          values={values} field={'startTime'}
                                                          handleChange={handleChange} label={'Hora de inicio'}
                                                          setSwitchIcon={setSwitchStartTimeIcon}
                                                          switchIcon={switchStartTimeIcon}
                                                          placeholder={'Hora de inicio'}
                                                          setVisibleModal={setVisibleStartTimeModal}/>
                                            </View>

                                            <View style={tw`mt-1`}>
                                                <ComboBox errors={errors} handleBlur={handleBlur}
                                                          values={values} field={'endTime'}
                                                          handleChange={handleChange} label={'Hora final'}
                                                          setSwitchIcon={setSwitchEndTimeIcon}
                                                          switchIcon={switchEndTimeIcon}
                                                          placeholder={'Hora final'}
                                                          setVisibleModal={setVisibleEndTimeModal}/>
                                            </View>

                                        </View>
                                    }

                                    {invitationType === 'TEM' &&
                                        <View>

                                            <View style={tw`mt-1`}>
                                                <ComboBox errors={errors} handleBlur={handleBlur}
                                                          values={values} field={'startDate'}
                                                          handleChange={handleChange} label={'Fecha de inicio'}
                                                          setSwitchIcon={setSwitchStartDateIcon}
                                                          switchIcon={switchStartDateIcon}
                                                          placeholder={'Fecha de inicio'}
                                                          setVisibleModal={setVisibleCalendar}/>
                                            </View>

                                            <View style={tw`mt-1`}>
                                                <ComboBox errors={errors} handleBlur={handleBlur}
                                                          values={values} field={'endDate'}
                                                          handleChange={handleChange} label={'Fecha de final'}
                                                          setSwitchIcon={setSwitchEndDateIcon}
                                                          switchIcon={switchEndDateIcon}
                                                          placeholder={'Fecha final'}
                                                          setVisibleModal={setVisibleCalendar}/>
                                            </View>

                                        </View>
                                    }

                                    <View style={tw`mt-5 mb-3 w-full`}>
                                        <Button color={'#333'} textColor={'#fff'} text={'GUARDAR INVITACION'}
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
            <InvitationTypeModal setVisibleModal={setVisibleModal} visibleModal={visibleModal}
                                 setSwitchIcon={setSwitchIcon} switchIcon={switchIcon} setResetValues={setResetValues}
                                 setInvitationType={setInvitationType} setSchemaValues={setSchemaValues}
                                 setInitValues={setInitValues} initValues={initValues} invitationName={invitationName}/>

            {!switchCalendarIcon &&
                <CalendarModal setVisibleCalendar={setVisibleCalendar} visibleCalendar={visibleCalendar}
                               setSwitchCalendarIcon={setSwitchCalendarIcon} switchCalendarIcon={switchCalendarIcon}
                               onDate={onEventDate} initValues={initValues} setInitValues={setInitValues}
                />}

            {!switchStartDateIcon &&
                <CalendarModal setVisibleCalendar={setVisibleCalendar} visibleCalendar={visibleCalendar}
                               setSwitchCalendarIcon={setSwitchStartDateIcon} switchCalendarIcon={switchStartDateIcon}
                               onDate={onStartDate} initValues={initValues} setInitValues={setInitValues}
                />}

            {!switchEndDateIcon &&
                <CalendarModal setVisibleCalendar={setVisibleCalendar} visibleCalendar={visibleCalendar}
                               setSwitchCalendarIcon={setSwitchEndDateIcon} switchCalendarIcon={switchEndDateIcon}
                               onDate={onEndDate} initValues={initValues} setInitValues={setInitValues}
                />}

            <DatePicker
                modal
                mode={'time'}
                open={visibleStartTimeModal}
                date={new Date()}
                onConfirm={(date) => {
                    setVisibleStartTimeModal(false);
                    onStartTime(date);
                }}

                onCancel={() => {
                    setVisibleStartTimeModal(false);
                }}
                cancelText={'Cancelar'}
                confirmText={'Confirmar'}
                title={'Seleccionar hora'}
            />

            <DatePicker
                modal
                mode={'time'}
                open={visibleEndTimeModal}
                date={new Date()}
                onConfirm={(date) => {
                    setVisibleEndTimeModal(false);
                    onEndTime(date);
                }}

                onCancel={() => {
                    setVisibleEndTimeModal(false);
                }}
                cancelText={'Cancelar'}
                confirmText={'Confirmar'}
                title={'Seleccionar hora'}
            />
        </View>
    );

}

export default observer(CreateInvitation);

