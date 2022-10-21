import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Keyboard, Image} from 'react-native';
import tw from 'twrnc';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EditText from '../../palette/EditText';
import EditPwd from '../../palette/EditPwd';
import {loginSchema} from '../../utils/YupSchemas';
import {checkIcon, checkIcon_, emailIcon, loginIcon, passwordIcon} from '../../utils/Icons';
import Button from '../../palette/Button';
import {useNavigation} from '@react-navigation/native';
import {headers, loginUrl} from '../../utils/Const';
import {alerts, generalError} from '../../palette/Alerts';
import axios from 'axios';
import {StoreContext} from '../../stores/Context';
import loginImg from '../../../assets/img/login.png';

const width = Dimensions.get('window').width;

function Login() {

    const {dataStore} = useContext(StoreContext);

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onSubmit = async (values) => {
        Keyboard.dismiss();
        const credentials = {nombre: values.email.trim(), clave: values.password.trim()};
        setLoading(true);
        try {
            const res = await axios.post(loginUrl, credentials, headers);
            const {data} = res.data;
            if (data) {
                const {persona, token} = data;
                const {nombres, apellidos, idEtapa, vehiculos, tipo} = persona;
                const {accessToken} = token;
                alerts('success', 'BIENVENID@', `Bienvenid@ ${nombres} ${apellidos}`, 2500);
                dataStore.UserData(data);
                dataStore.Vehicles(vehiculos);
                navigation.navigate('CompanyLogo');
                setLoading(false);
                await dataStore.Board(idEtapa, accessToken);
            } else {
                alerts('error', 'AVISO', 'Usuario o contraseña equivocada');
                setLoading(false);
            }
            setLoading(false);
        } catch (e) {
            generalError();
            setLoading(false);
        }
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <KeyboardAwareScrollView
                automaticallyAdjustContentInsets={false}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={10}
                extraHeight={20}
                contentContainerStyle={{flexGrow: 1}}
                resetScrollToCoords={{x: 0, y: 0}}
            >
                <View style={[tw`h-1/2 items-center justify-center px-12`, styles.curvedViewStyle]}>
                    <Image source={loginImg} style={styles.imageStyle}/>
                </View>

                <View style={tw`h-1/2 p-3`}>
                    <Formik
                        validateOnMount={false}
                        validationSchema={loginSchema}
                        initialValues={{email: 'garita_letizia', password: 'G@ogle2022'}}
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
                                    <View style={tw`mt-15`}>
                                        <EditText errors={errors} handleBlur={handleBlur}
                                                  values={values} field={'email'}
                                                  handleChange={handleChange} label={'Correo electrónico'}
                                                  placeholder={'Correo electrónico'} icon={emailIcon}/>
                                    </View>


                                    <EditPwd errors={errors} handleBlur={handleBlur}
                                             values={values} field={'password'} handleChange={handleChange}
                                             placeholder={'Contraseña'} icon={passwordIcon}/>


                                    <View style={tw`mt-1 mb-3 w-full`}>
                                        <Button color={'#333'} textColor={'#fff'} text={'INICIAR SESION'}
                                                onPress={handleSubmit}
                                                rIcon={loginIcon} tmRight={10} loading={loading} width={'auto'}
                                        />
                                    </View>
                                </>
                            );
                        }}</Formik>

                    <View style={tw`w-full items-center justify-between flex-row px-2`}>

                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}
                                          style={tw`mt-1 items-center flex-row`}>
                            {checkIcon_}
                            <Text style={tw`text-blue-800 font-bold ml-1 text-base`}>Crear cuenta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
                            <Text style={tw`text-gray-600 font-semibold text-xs`}>Olvido su contraseña.?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    curvedViewStyle: {
        width: '100%',
        borderBottomRightRadius: width / 2,
        borderBottomLeftRadius: width / 2,
        transform: [{scaleX: 1.6}],
    },

    imageStyle: {
        resizeMode: 'stretch',
        width: '100%',
        borderBottomRightRadius: width / 2,
        borderBottomLeftRadius: width / 2,
        transform: [{scaleX: 1.1}],
        /* borderBottomRightRadius: width / 2,
         borderBottomStartRadius: width / 2,
         transform: [{scaleX: 1.9}],*/
    },

});

