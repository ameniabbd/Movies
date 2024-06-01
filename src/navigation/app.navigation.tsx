/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/signin.screen';
import SignUpScreen from '../screens/signup.screen';
import WelcomeScreen from '../screens/welcome.screen';
import {useAppContext} from '../contexts/app.context';
import ScreenContainer from '../components/utils/screenContainer';
import BottomNavigation from './bottom.navigation';
import Header from '../components/utils/header';
import appColors from '../colors';
import {Platform} from 'react-native';
import HomeScreen from '../screens/home.screen';

import SearchScreen from '../screens/search.screen';
import MoreScreen from '../screens/moreMovie.screen';
import { MovieDetailScreen } from '../screens/detailsMovie.screen';

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const {appInfos} = useAppContext();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: props => <Header {...props} />,
          statusBarColor: appColors.screenBackground,
          statusBarStyle: Platform.OS == 'android' ? 'dark' : undefined,
          animation: 'slide_from_right',
        }}>
    
          <>
            <Stack.Screen name="home" component={ScreenContainer(HomeScreen)}  options={{headerShown: false}}/>
            <Stack.Screen name="Details" component={ScreenContainer(MovieDetailScreen)}  options={{headerShown: false}}/>
            <Stack.Screen name="Search" component={ScreenContainer(SearchScreen)}  />
            <Stack.Screen name="moreMovie" component={ScreenContainer(MoreScreen)}  />

            

            
            
            
          </>
      
      
      </Stack.Navigator>
    </>
  );
}
