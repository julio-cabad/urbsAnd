import {makeAutoObservable, runInAction} from 'mobx';
import {MAIN_URL} from '../utils/Const';
import axios from 'axios';
import {format} from 'date-fns';
import {FilterDelete, Filters} from '../utils/HelpFunctions';

class DataStore {
    userData = null;
    board = null;
    boardDetail = null;
    getGuests = null;
    invitations = [];
    guestDetail = null;
    bookings = null;
    bookingsDetail = null;
    myBookings = null;
    vehicles = [];
    vehiclesDetail = null;
    headers = null;
    aliquots = null;
    pendingPayments = null;
    paymentsMade = null;
    project = null;
    urbanization = null;
    stores = null;

    constructor() {
        makeAutoObservable(this);
    }

    /*USER DATA*/
    UserData = (userData) => {
        this.userData = userData;
    };

    /*BOARD*/
    Board = async (idEtapa, accessToken) => {
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        };

        const url = MAIN_URL + `/pizarra/etapa/${idEtapa}`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.board = data;
            this.headers = headers;
        });
    };

    /*BOARD DETAIL*/
    BoardDetail = (detail) => {
        this.boardDetail = detail;
    };

    /*GET GUESTS*/
    GetGuests = async (idEtapa, id, headers) => {
        const url = MAIN_URL + `/invitacion/etapa/${idEtapa}/${id}/A`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.getGuests = data;
        });
    };

    /*INVITATIONS*/
    Invitations = (invitations) => {
        this.invitations = invitations;
    };

    /*GUEST DETAILS*/
    GuestDetail = (detail) => {
        console.log(detail);
        this.guestDetail = detail;
    };

    /*BOOKING*/
    Bookings = async (idEtapa, headers) => {
        const url = MAIN_URL + `/espacio/etapa/${idEtapa}`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.bookings = data;
        });
    };

    /*BOOKING DETAIL*/
    BookingDetail = (detail) => {
        this.bookingsDetail = detail;
    };

    /*MY BOOKINGS*/
    MyBookings = async (idArr, headers, idPerson, bookingsArr) => {

        const actualDate = format(new Date(), 'yyyy-MM-dd');

        let bookings = [];
        for (const id of idArr) {
            const url = MAIN_URL + `/reserva/espacio/${id}`;
            const res = await axios.get(url, headers);
            const {data} = res.data;
            const filterUser = Filters(data, 'persona', idPerson);
            bookings = [...filterUser, ...bookings];
        }

        const data = [];
        bookings.forEach(items => {
            const {fechaInicio, fechaFin, espacio} = items;
            const filterSpace = Filters(bookingsArr, 'id', espacio);

            items.name = filterSpace[0].nombre;
            items.start = format(new Date(fechaInicio), 'yyyy-MM-dd HH:mm');
            items.end = format(new Date(fechaFin), 'yyyy-MM-dd HH:mm');
            items.controlDate = format(new Date(fechaInicio), 'yyyy-MM-dd');
            data.push(items);
        });

        const filterDate = data.filter(items => items.controlDate >= actualDate);
        const filterStatus = FilterDelete(filterDate, 'estado', 'I');
        console.log(filterStatus);

        runInAction(() => {
            this.myBookings = filterStatus;
        });
    };

    /*VEHICLES*/
    Vehicles = (vehicles) => {
        this.vehicles = vehicles;
    };

    VehiclesDetail = (vehicles) => {
        this.vehiclesDetail = vehicles;
    };

    /*PROJECT*/

    Project = async (headers) => {
        const url = MAIN_URL + `empresa`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.project = data;
        });
    };


    /*URBANIZATION*/
    Urbanization = async (headers) => {
        const url = MAIN_URL + `etapa`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.urbanization = data;
        });
    };


    /*ALIQUOTS*/

    Aliquots = async (idEtapa, locationId, headers) => {
        const d = new Date();
        let month = d.getMonth();
        const yearStr = format(d, 'yyyy');
        const year = parseInt(yearStr);

        const url = MAIN_URL + `cobro/etapa/${idEtapa}/ubicacion/${locationId}/anio/${year}/mes/${month}/tipo/ALI`;

        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.aliquots = data;
        });
    };

    /*PendingPayments*/

    PendingPayments = async (locationId, year, headers) => {
        const url = MAIN_URL + `cobro/anio/${year}/ubicacion/${locationId}/estado/false`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.pendingPayments = data;
        });

    };

    /*PendingPayments*/

    PaymentsMade = async (locationId, year, headers) => {
        const url = MAIN_URL + `cobro/anio/${year}/ubicacion/${locationId}/estado/true`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.paymentsMade = data;
        });

    };

    /*STORES*/

    Stores = async (headers) => {
        const url = MAIN_URL + `comercio`;
        const res = await axios.get(url, headers);
        const {data} = res.data;
        runInAction(() => {
            this.stores = data;
        });
    };

    /*RESET*/
    Reset = () => {
        this.invitationList = null;
    };
}

export {DataStore};
