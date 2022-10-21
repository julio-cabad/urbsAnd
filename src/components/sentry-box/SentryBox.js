import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import {inviteImg, logoutImg} from '../../utils/Icons';
import {FloatingAction} from 'react-native-floating-action';
import {useNavigation} from '@react-navigation/native';
import Header from '../../palette/Header';
import {StoreContext} from '../../stores/Context';
import {observer} from 'mobx-react-lite';
import {MAIN_URL} from '../../utils/Const';
import useAxiosGet from '../../palette/useAxiosGet';
import Loading from '../../palette/Loading';
import NoData from '../../palette/NoData';
import {FlashList} from '@shopify/flash-list';

const actions = [
    {
        text: 'Salir',
        icon: logoutImg,
        name: 'bt_createGuest',
        position: 1,
        color: 'white',
    },
];

function SentryBox() {

    const {dataStore} = useContext(StoreContext);
    const {userData, headers} = dataStore;
    const {persona} = userData;
    const {tipo} = persona;

    const url = MAIN_URL + `control/id/${persona.id}`;

    const {data, loaded} = useAxiosGet(url, headers);

    const navigation = useNavigation();

    const Logout = () => {
        navigation.navigate('Login');
    };

    console.log(data)

    const renderItem = ({item}) => {
        console.log(item);
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'Control de ingreso'} type={tipo}/>

            {data?.length > 0 &&
            <View style={tw`p-3 flex-1`}>
                <FlashList
                    data={data}
                    renderItem={renderItem}
                    estimatedItemSize={200}
                />
            </View>
            }

            {data?.length === 0 && <NoData/>}
            {loaded && <Loading/>}

            <FloatingAction
                actions={actions}
                color={'#2CA2DF'}
                onPressItem={() => Logout()}
            />

        </View>
    );
}

export default observer(SentryBox);
