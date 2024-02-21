/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('utils/musicTools').initEvent);
//开启网络调试
/*if (__DEV__) {
    global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
}*/
