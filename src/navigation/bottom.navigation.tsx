/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home.screen';
import {Platform} from 'react-native';
import {Size} from '../utils/size';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ScreenContainer from '../components/utils/screenContainer';
import Header from '../components/utils/header';

const Tab = createBottomTabNavigator();
export default function BottomNavigation() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {},
        tabBarShowLabel: true,
        headerShown: false,
        //tabBarBadge: '1000',
        tabBarStyle: {
          height: Size(Platform.OS == 'android' || insets.bottom == 0 ? 60 : 52) + insets.bottom,
        },
        tabBarLabelPosition: 'below-icon',
        header: props => <Header {...props} />,
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="Home"
        component={ScreenContainer(HomeScreen)}
        options={{
          tabBarLabel: 'home',
          tabBarIcon(props) {
            return <TabIcon {...props} icon="home" />;
          },
        }}
      />
      <Tab.Screen
        name="home"
        component={ScreenContainer(HomeScreen)}
        options={{
          tabBarLabel: 'orders',
          tabBarIcon(props) {
            return <TabIcon {...props} icon="favorite-border" />;
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={ScreenContainer(HomeScreen)}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon(props) {
            return <TabIcon {...props} icon="person" />;
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={ScreenContainer(HomeScreen)}
        options={{
          tabBarLabel: 'settings',
          tabBarIcon(props) {
            return <TabIcon icon="settings" {...props} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
function TabIcon(props: any) {
  return (
    <MatIcon
      size={Size(26)}
      name={props.focused ? props.activeIcon || props.icon : props.inactiveIcon || props.icon}
      color={props.focused ? props.activeColor || props.color : props.inactiveColor || props.color}
    />
  );
}
BottomNavigation.route = 'bottom';
