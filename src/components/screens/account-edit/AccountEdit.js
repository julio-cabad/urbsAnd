import React, {useContext} from 'react';
import {View, Text, StyleSheet, useWindowDimensions, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Header from '../../../palette/Header';
import {TabView, SceneMap} from 'react-native-tab-view';
import {carIcon, homeIcon, personalDataIcon} from '../../../utils/Icons';
import PersonalInformation from './PersonalInformation';
import Vehicle from './Vehicle';
import HousingData from './HousingData';
import {StoreContext} from '../../../stores/Context';
import {observer} from 'mobx-react-lite';
import Loading from '../../../palette/Loading';

function AccountEdit() {

    const {dataStore} = useContext(StoreContext);
    const {userData, project, urbanization, headers} = dataStore;
    const {persona} = userData;
    const {ubicacion} = persona;

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'D. Personales'},
        {key: 'second', title: 'D. Vivienda'},
        {key: 'third', title: 'Vehiculos'},
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
                            style={styles.tabItem}
                            onPress={() => setIndex(i)}>
                            {key === 'first' && personalDataIcon}
                            {key === 'second' && homeIcon}
                            {key === 'third' && carIcon}
                            <Text style={tw`ml-2 text-xs text-stone-700`}>{route.title}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderScene = SceneMap({
        first: () => <PersonalInformation/>,
        second: () => <HousingData ubicacion={ubicacion} project={project} urbanization={urbanization}
                                   persona={persona} headers={headers}/>,
        third: () => <Vehicle/>,
    });

    return (
        <View style={tw`flex-1`}>
            <Header text={'EDITAR CUENTA'}/>
            {urbanization && project ?
                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={renderTabBar}
                    initialLayout={{width: layout.width}}
                /> : <Loading/>}
        </View>
    );
}

export default observer(AccountEdit);

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
    },
});

