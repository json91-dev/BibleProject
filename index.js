/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// app.json의 name벨류를 appName으로 가져옵니다.
import {name as appName} from './app.json';

// appName으로 App을 등록해준다는 의미입니다.
AppRegistry.registerComponent(appName, () => App);
