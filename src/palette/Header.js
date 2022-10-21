import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import IconButton from './IconButton';
import IconFAW5 from 'react-native-vector-icons/FontAwesome5';
import IconION from 'react-native-vector-icons/Ionicons';
import rp from '../../assets/img/robert.webp';

function Header(props) {

    const {text, back, onPressBack, type} = props;

    const navigation = useNavigation();

    const _handleMore = () => navigation.toggleDrawer();

    const menuIcon = <IconION name="menu" size={36} color={'white'}/>;
    const arrowBackIcon = <IconFAW5 name="arrow-left" size={28} color={'white'}/>;

    return (
        <View
            style={[tw`w-full h-24 items-center flex-row justify-between pt-7 px-1 bg-blue-500`]}>
            {type !== 'GAR' &&
            <View style={tw`flex-row items-center`}>
                {back ? <IconButton icon={arrowBackIcon} onPress={onPressBack}/> :
                    <IconButton icon={menuIcon} onPress={_handleMore}/>}
                <Text style={[tw`ml-3 text-xl text-white`]}>{text}</Text>
            </View> }

            {type === 'GAR'&&  <Text style={[tw`ml-3 text-xl text-white`]}>{text}</Text>}

            <View style={[tw`border border-blue-200`, {width: 50, height:50, borderRadius: 25}]}>
                <Image source={rp} style={{width: 50, height: 50, borderRadius: 25}}/>
            </View>
        </View>
    );
}

export default Header;
