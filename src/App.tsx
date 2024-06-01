import React, {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './navigation/app.navigation';
import AppContextProvider from './contexts/app.context';
import {WithSplashScreen} from './screens/splash.screen';
import {Text, ScrollView, FlatList} from 'react-native';
import Toast from './components/utils/toast';
import {ActionSheet} from './components/utils/actionsheet';
import {Modal} from './components/utils/modal';
import ErrorBoundries from './components/utils/errorBoundary';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [ready, setready] = useState(false);
  function onReady() {
    setready(true);
  }
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <WithSplashScreen isAppReady={ready}>
          <ErrorBoundries>
            <AppContextProvider>
              <Modal />
              <Toast />
              <ActionSheet />
              <NavigationContainer onReady={onReady}>
                <AppNavigation />
              </NavigationContainer>
            </AppContextProvider>
          </ErrorBoundries>
        </WithSplashScreen>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

(Text as any).defaultProps = (Text as any).defaultProps || {};
(ScrollView as any).defaultProps = (ScrollView as any).defaultProps || {};
(KeyboardAwareScrollView as any).defaultProps = (KeyboardAwareScrollView as any).defaultProps || {};
(FlatList as any).defaultProps = (FlatList as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;
(FlatList as any).defaultProps.showsHorizontalScrollIndicator = false;
(FlatList as any).defaultProps.showsVerticalScrollIndicator = false;
(ScrollView as any).defaultProps.showsHorizontalScrollIndicator = false;
(ScrollView as any).defaultProps.showsVerticalScrollIndicator = false;
(KeyboardAwareScrollView as any).defaultProps.showsHorizontalScrollIndicator = false;
(KeyboardAwareScrollView as any).defaultProps.showsVerticalScrollIndicator = false;
