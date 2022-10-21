import React from 'react';
import {View, Text, Image, ScrollView, useWindowDimensions, TouchableOpacity, StyleSheet} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {useNavigation} from '@react-navigation/native';
import wp_1 from '../../../../assets/img/workProgres_1.jpeg';
import wp_2 from '../../../../assets/img/workProgress_2.jpeg';
import {buildIcon, moneyIcon, townIcon} from '../../../utils/Icons';
import {SceneMap, TabView} from 'react-native-tab-view';
import Payments from '../account-status/Payments';
import Aliquots from '../account-status/Aliquots';
import Urbanization from './Urbanization';
import Town from './Town';

function WorkProgress() {


    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Urbanización'},
        {key: 'second', title: 'Villa'},
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
                            {key === 'second' && townIcon}
                            <Text style={tw`ml-2 text-xs text-stone-700`}>{route.title}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = SceneMap({
        first: () => <Urbanization/>,
        second: () => <Town/>,
    });

    return (
        <View style={tw`flex-1 bg-white`}>
            <Header text={'AVANCE DE OBRA'}/>
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

export default WorkProgress;

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
