import Scan from '../screens/Scan';
import Home from '../screens/Home';
import Login from '../screens/Login/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import useAuth from '../hooks/useAuth';
import NewBarrel from '../screens/barrels/NewBarrel';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
const {auth, isLoading} = useAuth();




if(isLoading) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/images/pirate.jpg')} resizeMode="cover" style={styles.image}>
                <ActivityIndicator size={'large'}/>
            </ImageBackground>
        </View>
        )
}    


if (auth?.role === 'delivery' || auth?.role === 'admin') {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Scan" component={Scan} options={{title: 'Scan'}} />
            <Stack.Screen name="NewBarrel" component={NewBarrel} options={{title: 'New Barrel'}} />
            <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        </Stack.Navigator>
    ) 
   
}

    if (!auth?.isLogged) {
        return <Login/>
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
        width: '100vw',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }
  });
  

export default AuthStack