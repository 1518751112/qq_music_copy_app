import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from "views/home";
import Mine from "views/mine";
import {NavName} from "common/constant";
import {TabHeight} from "utils/theme";

const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = '';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>;
                },

                tabBarActiveTintColor: "#ff0000",
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    height: TabHeight,
                    paddingTop: 5,
                    paddingBottom: 10,
                    elevation:0,
                    overflow:'hidden',
                    borderBottomWidth:1,
                    borderBottomColor:'#ffffff',
                    borderTopWidth:1,
                    borderTopColor:'#ffffff',
                },
            })}
        >
            <Tab.Screen name={NavName.Home} options={{headerShown: false, title: '首页'}} component={Home}/>
            <Tab.Screen name={NavName.Mine} options={{headerShown: false, title: '我的'}} component={Mine}/>
        </Tab.Navigator>
    );
}

export default HomeStack
