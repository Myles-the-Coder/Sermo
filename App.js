import {StyleSheet } from 'react-native';
import Start from './components/Start'
import Chat from './components/Chat'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  const {Navigator, Screen} = Stack
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Start'>
        <Screen name='Start' component={Start}/>
        <Screen name='Chat' component={Chat}/>
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
