import Start from './components/Start'
import Chat from './components/Chat'
import ColorWheel from './components/ColorWheel'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
const Stack = createStackNavigator()

export default function App() {
  const {Navigator, Screen} = Stack
  return (
    <ActionSheetProvider>
    <NavigationContainer>
      <Navigator initialRouteName='Start'>
        <Screen name='Start' component={Start}/>
        <Screen name='Chat' component={Chat}/>
        <Screen name='ColorWheel' component={ColorWheel}/>
      </Navigator>
    </NavigationContainer>
    </ActionSheetProvider>
  );
}
