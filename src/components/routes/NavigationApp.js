import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Login from '../session/Login';
import Home from '../home/Home';
import {Easing} from 'react-native';
import BoardDetail from '../screens/board/BoardDetail';
import CreateInvitation from '../screens/guest/CreateInvitation';
import GuestDetail from '../screens/guest/GuestDetail';
import CreateGuest from '../screens/guest/CreateGuest';
import CreateVehicle from '../screens/account-edit/CreateVehicle';
import GuestList from '../screens/guest/GuestList';
import BookingDetail from '../screens/bookings/BookingDetail';
import PendingPayments from '../screens/account-status/PendingPayments';
import PaymentsMade from '../screens/account-status/PaymentsMade';
import RecoverPassword from '../session/RecoverPassword';
import CreateAccount from '../session/CreateAccount';
import CompanyLogo from '../screens/company-logo/CompanyLogo';
import MyBookings from '../screens/bookings/MyBookings';
import SentryBox from '../sentry-box/SentryBox';

const Stack = createStackNavigator();

const options = {headerShown: false, gestureEnabled: false};

const config = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.linear,
        mass: 9,
    },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 350,
        easing: Easing.linear,
        mass: 9,
    },
};

function NavigationApp() {


    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login"
                                 transitionerStyle={{backgroundColor: 'black'}}
                                 screenOptions={{
                                     gestureEnabled: true,
                                     gestureDirection: 'horizontal',
                                     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                     transitionSpec: {
                                         open: config,
                                         close: closeConfig,
                                     },
                                     headerMode: 'float',
                                 }}
                                 animation={'fade'}>
                    <Stack.Screen name="Login" component={Login} options={options}/>
                    <Stack.Screen name="CompanyLogo" component={CompanyLogo} options={options}/>
                    <Stack.Screen name="CreateAccount" component={CreateAccount} options={options}/>
                    <Stack.Screen name="RecoverPassword" component={RecoverPassword} options={options}/>
                    <Stack.Screen name="Home" component={Home} options={options}/>
                    <Stack.Screen name="SentryBox" component={SentryBox} options={options}/>
                    <Stack.Screen name="BoardDetail" component={BoardDetail} options={options}/>
                    <Stack.Screen name="CreateInvitation" component={CreateInvitation} options={options}/>
                    <Stack.Screen name="GuestDetail" component={GuestDetail} options={options}/>
                    <Stack.Screen name="GuestList" component={GuestList} options={options}/>
                    <Stack.Screen name="CreateGuest" component={CreateGuest} options={options}/>
                    <Stack.Screen name="BookingDetail" component={BookingDetail} options={options}/>
                    <Stack.Screen name="MyBookings" component={MyBookings} options={options}/>
                    <Stack.Screen name="CreateVehicle" component={CreateVehicle} options={options}/>
                    <Stack.Screen name='PendingPayments' component={PendingPayments} options={options}/>
                    <Stack.Screen name='PaymentsMade' component={PaymentsMade} options={options}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default NavigationApp;
