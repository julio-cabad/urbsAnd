/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import NavigationApp from './src/components/routes/NavigationApp';
import {StatusBar} from 'react-native';
import Tests from './Tests';
import {StoresProvider} from './src/stores/Provider';
import Toast from 'react-native-toast-message';

const App: () => Node = () => {

    return (
        <StoresProvider>
            <SafeAreaProvider>
                <StatusBar
                    animated={true}
                    backgroundColor="transparent"
                    //barStyle={'dark-content'}
                    translucent={true}
                />
                <NavigationApp/>
                <Toast/>
            </SafeAreaProvider>
        </StoresProvider>
    );
};

export default App;
