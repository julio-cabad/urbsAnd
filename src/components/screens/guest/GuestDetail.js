import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Platform, Keyboard, ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {invitationSchema_1, invitationSchema_2} from '../../../utils/YupSchemas';
import EditText from '../../../palette/EditText';
import ComboBox from '../../../palette/ComboBox';
import CalendarModal from '../../../palette/CalendarModal';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {addPersonImg, downloadIcon, downloadImg, guestListImg, savedIcon} from '../../../utils/Icons';
import Button from '../../../palette/Button';
import {FloatingAction} from 'react-native-floating-action';
import {GUEST_DETAIL_URL, MAIN_URL, mainColor} from '../../../utils/Const';
import {PERMISSIONS, request} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import {alerts, errorAlert, generalError} from '../../../palette/Alerts';
import axios from 'axios';

const actions = [
    {
        text: 'Agregar invitado', icon: addPersonImg, name: 'bt_addGuest', position: 1, color: 'white',
    },
    {
        text: 'Lista de invitados', icon: guestListImg, name: 'bt_guestList', position: 2, color: 'white',
    },
    {
        text: 'Descargar QR', icon: downloadImg, name: 'bt_downloadQR', position: 3, color: 'white',
    },
];


const getExtension = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

function GuestDetail() {

    const {dataStore} = useContext(StoreContext);
    const {headers, userData, guestDetail} = dataStore;
    const {persona} = userData;
    const {id, idEtapa} = persona;
    const {nombre, fecha_inicio, fecha_fin, tipo, qr} = guestDetail;

    const e_d = Date.parse(fecha_inicio);
    const f_i = Date.parse(fecha_inicio);
    const f_f = Date.parse(fecha_fin);
    const ed = new Date(e_d);
    const di = new Date(f_i);
    const de = new Date(f_f);
    const eventDate = format(ed, 'yyyy-MM-dd');
    const startDate = format(di, 'yyyy-MM-dd');
    const startTime = format(di, 'HH:mm');
    const endDate = format(de, 'yyyy-MM-dd');
    const endTime = format(de, 'HH:mm');

    const detail = {invitationName: nombre, eventDate, startDate, startTime, endDate, endTime, invitationType: tipo};
    const qrImage = MAIN_URL + `/${qr}`;

    console.log(qrImage)

    const [loading, setLoading] = useState(false);
    const [loadingQR, setLoadingQR] = useState(false);
    const [switchCalendarIcon, setSwitchCalendarIcon] = useState(true);
    const [switchStartTimeIcon, setSwitchStartTimeIcon] = useState(true);
    const [switchStartDateIcon, setSwitchStartDateIcon] = useState(true);
    const [switchEndTimeIcon, setSwitchEndTimeIcon] = useState(true);
    const [switchEndDateIcon, setSwitchEndDateIcon] = useState(true);
    const [initValues, setInitValues] = useState(detail);
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
        setVisibleCalendar(false);
    };

    const onEndDate = (values) => {
        const {dateString} = values;
        setInitValues({...initValues, endDate: dateString});
        setSwitchEndDateIcon(!switchEndDateIcon);
        setSwitchEndDateIcon(true);
        setVisibleCalendar(false);
    };

    const onFloatAction = (name) => {
        name === 'bt_addGuest' && navigation.navigate('CreateGuest');
        name === 'bt_guestList' && navigation.navigate('GuestList');
        name === 'bt_downloadQR' && downloadQR();
    };

    const downloadQR = () => {
        let date = new Date();
        let image_URL = MAIN_URL + `/${qr}`;
        let ext = getExtension(image_URL);
        ext = '.' + ext[0];
        const {config, fs} = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    ext,
                description: 'Image',
            },
        };

        setLoadingQR(true);

        config(options)
            .fetch('GET', image_URL)
            .then(() => {
                alerts('success', ' CÓDIGO QR DESCARGADO', 'El código QR a sido descargado exitosamente!');
                setLoadingQR(false);
            }).catch(() => {
            generalError();
            setLoadingQR(false);
        });

    };

    const onHandleDownloadQR = () => {

        if (Platform.OS === 'ios') {
            downloadQR();
        } else {
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
                if (result === 'granted') {
                    downloadQR();
                } else {
                    alerts('error', 'AVISO', 'No se han otrogado los permisos para descarga');
                }
            }).catch(() => generalError());
        }
    };

    const onSubmit = async (values) => {

        const {invitationName, eventDate, startTime, endTime, invitationType, startDate, endDate} = values;

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

        const guestDetail_ = {
            ...guestDetail, nombre: invitationName, fecha_inicio: startTime_, fecha_fin: endTime_,
        };


        Keyboard.dismiss();
        setLoading(true);

        try {
            const res = await axios.post(GUEST_DETAIL_URL, guestDetail_, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                await dataStore.GetGuests(idEtapa, id, headers);
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
        <View style={tw`flex-1 bg-white`}>
            <Header text={'INVITADOS'} back onPressBack={onPressBack}/>
            {initValues && <View style={tw`flex-1 p-3`}>
                <Text style={tw`font-bold text-xl text-blue-500`}>{`Detalle de la invitación`}</Text>

                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    automaticallyAdjustContentInsets={false}
                    keyboardShouldPersistTaps="always"
                    scrollEventThrottle={10}
                    enableOnAndroid={true}
                    resetScrollToCoords={{x: 0, y: 0}}>

                    <Formik
                        enableReinitialize={true}
                        validateOnMount={false}
                        validationSchema={initValues?.invitationType === 'HOR' ? invitationSchema_1 : invitationSchema_2}
                        initialValues={initValues}
                        onSubmit={onSubmit}
                    >
                        {({
                              handleChange, handleBlur, handleSubmit, values, errors,

                          }) => {

                            return (<>
                                <View style={tw`mt-3`}>
                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'invitationName'}
                                              handleChange={handleChange} label={'Nombre de la invitación'}
                                              placeholder={'Nombre de la invitación'}/>
                                </View>

                                {initValues?.invitationType === 'HOR' && <View>
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

                                </View>}

                                {initValues?.invitationType === 'TEM' && <View>

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
                                                  handleChange={handleChange} label={'Fecha final'}
                                                  setSwitchIcon={setSwitchEndDateIcon}
                                                  switchIcon={switchEndDateIcon}
                                                  placeholder={'Fecha final'}
                                                  setVisibleModal={setVisibleCalendar}/>
                                    </View>
                                </View>}
                                <View
                                    style={[tw`mt-1 p-2 items-center rounded-lg border border-blue-500 flex-row bg-white`, {elevation: 2}]}>
                                    <View style={tw`w-1/2 p-1`}>
                                        <Text style={tw`font-semibold text-xs text-blue-500`}>Código de
                                            invitación</Text>

                                        <Text style={tw`font-semibold text-xs text-slate-500 mt-2`}>Se guardo la
                                            invitación. A continuación puede descargar el código QR o agregar
                                            invitados para enviar por correo</Text>

                                        <TouchableOpacity onPress={onHandleDownloadQR} disabled={loadingQR}
                                                          style={tw`p-2 flex-row items-center justify-center border border-blue-400 mt-2 rounded-lg flex-row`}>
                                            {loadingQR ?
                                                <ActivityIndicator size="small" color={mainColor}/> : downloadIcon}
                                            <Text
                                                style={tw`font-semibold text-xs text-blue-500 ml-3`}>DESCARGAR</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={tw`w-1/2 border-l border-slate-400 p-1`}>
                                        <Image source={{uri: qrImage}}
                                               style={{
                                                   width: '100%',
                                                   height: 170,
                                                   resizeMode: 'stretch',
                                                   borderRadius: 9,
                                               }}/>
                                    </View>

                                </View>

                                <View style={tw`mt-5 mb-3 w-full`}>
                                    <Button color={'#333'} textColor={'#fff'} text={'GUARDAR CAMBIOS'}
                                            onPress={handleSubmit}
                                            icon={savedIcon} tmRight={10} loading={loading} width={'auto'}
                                    />
                                </View>

                            </>);

                        }}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>}

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

            <FloatingAction
                actions={actions}
                color={'#2CA2DF'}
                onPressItem={(name) => onFloatAction(name)}
            />
        </View>);
}

export default observer(GuestDetail);
