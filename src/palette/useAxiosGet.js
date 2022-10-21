import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import {generalError} from './Alerts';

const useAxiosGet = (url, headers) => {


    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(url, headers);
                const {data} = res.data
                setData(data);
            } catch (error) {
                generalError();
                setError(error);
            } finally {
                setLoaded(false);
            }
        })();
    }, []);

    return {data, error, loaded};
};

export default useAxiosGet;

