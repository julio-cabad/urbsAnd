import React, {useContext, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import companyLogo from '../../../../assets/img/companyLogo.jpeg';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';

function CompanyLogo() {

    const {dataStore} = useContext(StoreContext);
    const {userData} = dataStore;
    const {persona} = userData;
    const {tipo} = persona;

    const navigation = useNavigation();

    useEffect(() => {
      tipo !== 'GAR' &&  setTimeout(() => navigation.navigate('Home'), 2000);
      tipo === 'GAR' &&  setTimeout(() => navigation.navigate('SentryBox'), 2000);
    }, []);

    return (
        <View style={[tw`flex-1 items-center justify-center p-1`, {backgroundColor: '#EBE5CE'}]}>
            <Image source={companyLogo}
                   style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
        </View>
    );
}

export default observer(CompanyLogo);
