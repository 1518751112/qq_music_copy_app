import React, {useEffect, useRef} from "react";
import {AppState, Dimensions} from "react-native";
import LoginScreen from 'views/login';
import TabBar from 'componests/tabBar';
import SongSheet from 'views/songSheet';
import {createNavigationContainerRef, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavName, NDemo} from "common/constant";
import Models from './models';
import {initDva, initRequest, setNetInfo, useStore} from "utils/dva16";
import {Provider, Toast} from "@ant-design/react-native";
import NetInfo from '@react-native-community/netinfo';
import {config} from "configs";
import {setScreenSize} from "utils/util";
import TrackPlayer, {AppKilledPlaybackBehavior, Capability} from 'react-native-track-player';

export const navigationRef = createNavigationContainerRef()
const Stack = createNativeStackNavigator()
/*------------------------ 初始化dva16 ------------------------*/
initDva(Models, { printLog: false, useImmer: false })
initRequest(config.serverHome, (status: any, data: any) => {
  console.log('[API Error]', status, data)
  const { errorCode } = data||{}
  if (status === 401) {

  } else if (status === 400) {
    Toast.fail(data.message, 1)
  } else if (status instanceof Error) {
    Toast.fail(status.message, 1)
  }
})

async function requestLocationPermission() {
  try {

  } catch (error) {
    console.error(error);
  }
}
//开启网络调试
/*const _XHR = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest

XMLHttpRequest = _XHR*/
const App = () => {
  const { name } = useStore(NDemo)
  const appState = useRef(AppState.currentState)
  const netStateInfo = useRef(AppState.currentState)

  useEffect(() => {
    const stateListener = AppState.addEventListener('change', handleAppStateChange)
    const net = NetInfo.addEventListener(
        handleConnectivityChange
    );
    init()
    return () => {
      stateListener.remove()
      net()
    }
  },[]);

  const init = async () => {
    await requestLocationPermission()

    updateDimensions();
    Dimensions.addEventListener('change', updateDimensions);
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        // This is the default behavior
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  }

  const updateDimensions = () => {
    setScreenSize(Dimensions.get('window').width,Dimensions.get('window').height)
  };

  const handleAppStateChange = (nextAppState: any) => {
    //监听app是在后台还是前台
    appState.current = nextAppState
  }
  const handleConnectivityChange = (state:any) => {
    //监听网络状态
    netStateInfo.current = state
    setNetInfo(state)
  };

  return (
    <Provider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={"测试"} screenOptions={{
          headerStyle: {
            backgroundColor: "#162b5d",
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            color:'#000',
            fontSize:18,
          },
          headerTitleAlign: 'center', // 将标题居中
          animation: 'slide_from_right', // 通过animation属性设置动画效果
        }}>
          <Stack.Screen name={NavName.Tab} component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name={NavName.Login} component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name={NavName.SongSheet} component={SongSheet} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
