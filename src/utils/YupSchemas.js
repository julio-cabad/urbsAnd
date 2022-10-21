import React from 'react';
import * as Yup from 'yup';

/*LOGIN*/
export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Ingrese el correo electrónico'),
       /* .email('Correo electrónico invalido'),*/
    password: Yup.string()
        .required('La contraseña es requerida'),
});

/*RECOVER PASSWORD*/

export const recoverPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required('Ingrese el correo electrónico')
        .email('Correo electrónico invalido'),
});


/*CREATE INVITATION*/

export const invitationSchema_1 = Yup.object().shape({
    invitationName: Yup.string()
        .required('El nombre de la invitación es requerido'),
    invitationType: Yup.string()
        .required('Seleccionar el tipo de  invitación.'),
    eventDate: Yup.string()
        .required('Ingrese la fecha de invitación.'),
    startTime: Yup.string()
        .required('Ingrese la hora de invitación.'),
    endTime: Yup.string()
        .required('Ingrese la hora de invitación.'),
});

export const invitationSchema_2 = Yup.object().shape({
    invitationName: Yup.string()
        .required('El nombre de la invitación es requerido'),
    invitationType: Yup.string()
        .required('Seleccionar el tipo de  invitación.'),
    startDate: Yup.string()
        .required('Ingrese la fecha de inicio.'),
    endDate: Yup.string()
        .required('Ingrese la fecha final.'),
});


export const initInvitationValues_1 = {
    invitationName: '',
    invitationType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
};

export const initInvitationValues_2 = {
    invitationName: '',
    invitationType: '',
    startDate: '',
    endDate: '',
};

/*CREATE GUEST*/

export const createGuestSchema = Yup.object().shape({
    idType: Yup.string()
        .required('Seleccionar el tipo de identificación.'),
    idUser: Yup.string()
        .required('Ingrese la identificaciónn.'),
    name: Yup.string()
        .required('Ingrese los nombres.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ_ ]*$/, 'El nombre  no puede contener números'),
    lastName: Yup.string()
        .required('Ingrese los apellidos.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ_ ]*$/, 'El apellido no puede contener números'),
    email: Yup.string().trim()
        .required('Ingrese el correo electrónico')
        .email('Correo electrónico invalido'),
});

export const initGuestValues = {
    idType: '',
    idUser: '',
    name: '',
    lastName: '',
    email: '',
};

/* PERSONAL INFORMATION*/
export const personalInformationSchema = Yup.object().shape({
    idType: Yup.string()
        .required('Seleccionar el tipo de identificación.'),
    identification: Yup.string()
        .required('Ingrese la identificación.'),
    name: Yup.string()
        .required('Ingrese los nombres.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ_ ]*$/, 'El nombre  no puede contener números'),
    lastName: Yup.string()
        .required('Ingrese los apellidos.')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ_ ]*$/, 'El apellido no puede contener números'),
    emergencyContact: Yup.string().nullable(true),
});

export const initPersonalInformationValues = {
    idType: '',
    identification: '',
    name: '',
    lastName: '',
    emergencyContact: '',
};


/*HOUSING DATA*/
export const housingDataSchema = Yup.object().shape({
    project: Yup.string()
        .required('Seleccionar el proyecto.'),
    urbanization: Yup.string()
        .required('Seleccionar la urbanización'),
    apple: Yup.string()
        .required('Ingrese la manzana.'),
    town: Yup.string()
        .required('Ingrese la villa.'),
    department: Yup.string()
});

export const initHousingDataValues = {
    project: '',
    urbanization: '',
    apple: '',
    town: '',
    department: '',
};

/*VEHICLE*/
export const vehicleSchema = Yup.object().shape({
    unit: Yup.string()
        .required('Indique un nombre'),
    color: Yup.string()
        .required('Ingrese el color'),
    year: Yup.string()
        .required('Ingrese el año'),
    brand: Yup.string()
        .required('Ingrese la marca'),
    model: Yup.string()
        .required('Ingrese el modelo'),
    plateNumber: Yup.string()
        .required('Ingrese el numero de placa'),
    parkingLot: Yup.string(),
    garage: Yup.string(),
});

export const initVehicleValues = {
    unit: '',
    color: '',
    year: '',
    brand: '',
    model: '',
    plateNumber: '',
    parkingLot: '',
    garage: '',
};

