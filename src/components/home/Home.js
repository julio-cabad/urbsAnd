import React from 'react';
import {View, StatusBar} from 'react-native';
import tw from 'twrnc';
import SideBar from './SideBar';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainScreen from '../screens/board/MainScreen';
import Guest from '../screens/guest/Guest';
import Bookings from '../screens/bookings/Bookings';
import AccountEdit from '../screens/account-edit/AccountEdit';
import AccountStatus from '../screens/account-status/AccountStatus';
import Stores from '../screens/stores/Stores';
import WorkProgress from '../screens/work-progress/WorkProgress';

const Drawer = createDrawerNavigator();

function Home() {

    return (
        <View style={tw`flex-1`}>
            <Drawer.Navigator initialRouteName="MainScreen" drawerStyle={{width: '70%', borderRightWidth: 0}}
                              hideStatusBar={true} screenOptions={{swipeEnabled: false, drawerType: 'front'}}
                              drawerContent={props => <SideBar {...props}/>}>

                <Drawer.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}}/>
                <Drawer.Screen name="Guest" component={Guest} options={{headerShown: false}}/>
                <Drawer.Screen name="Bookings" component={Bookings} options={{headerShown: false}}/>
                <Drawer.Screen name="WorkProgress" component={WorkProgress} options={{headerShown: false}}/>
                <Drawer.Screen name="AccountEdit" component={AccountEdit} options={{headerShown: false}}/>
                <Drawer.Screen name="AccountStatus" component={AccountStatus} options={{headerShown: false}}/>
                <Drawer.Screen name="Stores" component={Stores} options={{headerShown: false}}/>

            </Drawer.Navigator>
        </View>
    );
}

export default Home;
