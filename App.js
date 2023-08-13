import {StyleSheet} from 'react-native';
import Home from './src/screens/Home';
import Scan from './src/screens/Scan'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'}} />
          <Stack.Screen name="Scan" component={Scan} options={{title: 'Scan'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
