import React from 'react';
import {generalError} from '../palette/Alerts';


function FetchService(url, method, headers, setLoading) {
    /*try {
        const response = await fetch(GUEST_DETAIL_URL, configFetch);
        let res = await response.json();
        const {codigo} = res;
        console.log(codigo);
        if (codigo === '0') {
            console.log(headers);
            console.log(idEtapa, id);
            await dataStore.GetGuests(idEtapa, id, headers);
            alerts('success', 'DATOS ACTUALIZADOS', `Datos actualizados exitosamente!!`, 2500);
            setLoading(false);
        }
        codigo !== '0' && generalError();
    } catch (e) {
        generalError();
        setLoading(false);
    }*/

}

export {FetchService};
