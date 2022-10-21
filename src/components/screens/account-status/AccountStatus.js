import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {TabView, SceneMap} from 'react-native-tab-view';
import Payments from './Payments';
import {buildIcon,  moneyIcon,} from '../../../utils/Icons';
import Aliquots from './Aliquots';


function AccountStatus() {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Financiamiento'},
        {key: 'second', title: 'Ali cuotas'},
    ]);


    const renderTabBar = (props) => {

        const {routes} = props.navigationState;

        return (
            <View style={styles.tabBar}>
                {routes.map((route, i) => {
                    const {key} = route;
                    return (
                        <TouchableOpacity
                            key={i}
                            style={[tw`border-l border-gray-300`, styles.tabItem]}
                            onPress={() => setIndex(i)}>
                            {key === 'first' && buildIcon}
                            {key === 'second' && moneyIcon}
                            <Text style={tw`ml-2 text-xs text-stone-700`}>{route.title}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = SceneMap({
        first: () => <Payments/>,
        second: () => <Aliquots/>,
    });


    return (
        <View style={tw`flex-1`}>
            <Header text={'ESTADO DE CUENTA'}/>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{width: layout.width}}
                />
        </View>
    );
}

export default AccountStatus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 1,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 16,
        backgroundColor:'white'
    },
});
