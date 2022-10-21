import React, {useContext, useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import tw from 'twrnc';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import {housingDataSchema} from '../../../utils/YupSchemas';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProjectModal from './ProjectModal';
import ComboBox from '../../../palette/ComboBox';
import EditText from '../../../palette/EditText';
import Button from '../../../palette/Button';
import {savedIcon} from '../../../utils/Icons';
import {Filters} from '../../../utils/HelpFunctions';
import axios from 'axios';
import {MAIN_URL, UPDATE_PERSONAL_INFORMATION_URL} from '../../../utils/Const';
import {alerts, generalError} from '../../../palette/Alerts';

function HousingData(props) {

    const {dataStore} = useContext(StoreContext);
    const {ubicacion, project, urbanization, persona, headers} = props;
    const {id, manzana, villa, departamento, idEtapa} = ubicacion;

    const filterProject = Filters(project, 'id', 3);
    console.log(id)
    const filterUrbanization = Filters(urbanization, 'id_empresa', 3);

    const initHousingDataValues = {
        project: filterProject[0]?.nombre, urbanization: filterUrbanization[0]?.nombre, apple: manzana, town: villa,
        department: departamento,
    };

    const [loading, setLoading] = useState(false);
    const [switchProjectIcon, setSwitchProjectIcon] = useState(true);
    const [visibleProject, setVisibleProject] = useState(false);
    const [initValues, setInitValues] = useState(initHousingDataValues);
    const [resetValues, setResetValues] = useState(false);
    const [copyValues, setCopyValues] = useState(initHousingDataValues);

    const validate = (values) => {
        setCopyValues(values);
    };

    const onSubmit = async (values) => {
        const {apple, town, department} = values;
        const location = {departamento: department, manzana: apple, villa: town};
        const data = {...persona, ubicacion: location};

        Keyboard.dismiss();
        setLoading(true);
        try {
            const res = await axios.put(UPDATE_PERSONAL_INFORMATION_URL, data, headers);
            const {codigo} = res.data;
            if (codigo === '0') {
                const url = MAIN_URL + `/persona/${persona?.id}`;
                const res = await axios.get(url, headers);
                const {data} = res.data;
                console.log(data)
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
        < View style={tw`flex-1 px-4`}>
            <Text style={tw`font-bold text-xl text-blue-500`}>Datos de vivienda</Text>
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
                    validationSchema={housingDataSchema}
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
                                    {/*<ComboBox errors={errors} handleBlur={handleBlur}
                                              values={values} field={'project'}
                                              handleChange={handleChange} label={'Proyecto'}
                                              setSwitchIcon={setSwitchProjectIcon} switchIcon={switchProjectIcon}
                                              placeholder={'Seleccionar proyecto'}
                                              setVisibleModal={setVisibleProject}/>*/}

                                    <EditText errors={errors} handleBlur={handleBlur}
                                              values={values} field={'project'} editable={false}
                                              handleChange={handleChange} label={'Proyecto'}
                                              placeholder={'Proyecto'}/>

                                </View>

                                {/*<ComboBox errors={errors} handleBlur={handleBlur}
                                          values={values} field={'urbanization'}
                                          handleChange={handleChange} label={'Urbanización'}
                                          setSwitchIcon={setSwitchProjectIcon} switchIcon={switchProjectIcon}
                                          placeholder={'Seleccionar la urbanización'}
                                          setVisibleModal={setVisibleProject}/>*/}

                                <EditText errors={errors} handleBlur={handleBlur}
                                          values={values} field={'urbanization'} editable={false}
                                          handleChange={handleChange} label={'Urbanización'}
                                          placeholder={'Urbanización'}/>

                                <EditText errors={errors} handleBlur={handleBlur}
                                          values={values} field={'apple'}
                                          handleChange={handleChange} label={'Manzana'}
                                          placeholder={'Manzana'}/>

                                <EditText errors={errors} handleBlur={handleBlur}
                                          values={values} field={'town'}
                                          handleChange={handleChange} label={'Villa'}
                                          placeholder={'Villa'}/>

                                <EditText errors={errors} handleBlur={handleBlur}
                                          values={values} field={'department'}
                                          handleChange={handleChange} label={'Departamento'}
                                          placeholder={'Departamento'}/>

                                <View style={tw`mt-3 mb-3 w-full`}>
                                    <Button color={'#333'} textColor={'#fff'} text={'GUARDAR DATOS DE VIVIENDA'}
                                            onPress={handleSubmit}
                                            icon={savedIcon} tmRight={10} loading={loading} width={'auto'}
                                    />
                                </View>
                            </>
                        );
                    }}
                </Formik>
            </KeyboardAwareScrollView>
            <ProjectModal setVisible={setVisibleProject} visible={visibleProject} setResetValues={setResetValues}
                          setSwitchIcon={setSwitchProjectIcon} switchIcon={switchProjectIcon} copyValues={copyValues}
                          setInitValues={setInitValues} project={project}/>
        </View>
    );
}

export default observer(HousingData);
