//import firestore from '@react-native-firebase/firestore';
import {
    LOGIN_URL, MAIN_URL_, GUEST_DETAIL_URL_, UPDATE_GUEST_DETAIL_URL_, UPDATE_PERSONAL_INFORMATION_URL_,
    ADD_VEHICLE_URL_, CREATE_BOOKING_URL_
} from '@env';

//export const db = firestore();

/*Headers axios*/
export const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

// https://nohkaah.uc.r.appspot.com/

/*COLORS*/
export const mainColor = '#2196F3';

/*URLS*/

console.log(CREATE_BOOKING_URL_)
export const loginUrl = LOGIN_URL;
export const MAIN_URL = MAIN_URL_;
export const GUEST_DETAIL_URL = GUEST_DETAIL_URL_;
export const UPDATE_GUEST_DETAIL_URL = UPDATE_GUEST_DETAIL_URL_;
export const UPDATE_PERSONAL_INFORMATION_URL = UPDATE_PERSONAL_INFORMATION_URL_;
export const ADD_VEHICLE_URL = ADD_VEHICLE_URL_;
export const CREATE_BOOKING_URL = 'https://nohkaah.uc.r.appspot.com/reserva';


/*Months*/
export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
