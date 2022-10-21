import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {generalError} from './Alerts';

const useAxiosPost = (url, payload, headers) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(url, payload);
                setData(response.data);
            } catch (error) {
                generalError();
                setError(error)
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return {data, error, loaded};
};
