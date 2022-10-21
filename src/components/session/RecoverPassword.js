import React, {useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Header from '../../palette/Header';
import {Formik} from 'formik';
import {loginSchema} from '../../utils/YupSchemas';
import EditText from '../../palette/EditText';
import {emailIcon, sendMailIcon} from '../../utils/Icons';
import Button from '../../palette/Button';
import {headers,  MAIN_URL} from '../../utils/Const';
import {alerts, generalError} from '../../palette/Alerts';
import axios from 'axios';

function RecoverPassword() {

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.navigate('Login');
    };

    const onSubmit = async (values) => {
        const url = MAIN_URL + `usuario/restaurar-clave?name=${values.email}`;
        setLoading(true);
        try {
            const res = await axios.post(url, {}, headers);
            const {codigo} = res.data;
            if (codigo === 0) {
                alerts('success', 'CORREO ENVIADO', `Su nueva contraseña a sida enviada a ${values.email}`, 2500);
                navigation.navigate('Login');
                setLoading(false);
            }
            codigo !== '0' && generalError();
            codigo !== '0' && setLoading(false);
        } catch (e) {
            setLoading(false);
            generalError();
        }
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'RECUPERAR CONTRASEÑA'} back onPressBack={onPressBack}/>
            <View style={tw`flex-1 p-3`}>
                <Formik
                    validateOnMount={false}
                    validationSchema={loginSchema}
                    initialValues={{email: 'jpenafiel@ciudadceleste.com'}}
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
                                              values={values} field={'email'}
                                              handleChange={handleChange} label={'Correo electrónico'}
                                              placeholder={'Correo electrónico'} icon={emailIcon}/>
                                </View>

                                <View style={tw`mt-2 mb-2 w-full`}>
                                    <Button color={'#333'} textColor={'#fff'} text={'RECUPERAR CONTRASEÑA'}
                                            onPress={handleSubmit}
                                            icon={sendMailIcon} tmRight={10} loading={loading} width={'auto'}
                                    />
                                </View>
                            </>
                        );
                    }}</Formik>
            </View>
        </View>
    );
}

export default RecoverPassword;
