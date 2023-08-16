import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthProvider';

import AuthStack from './src/authStack/AuthStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>  
          <AuthStack/>
      </NavigationContainer>
    </AuthProvider>
  
  );
}

