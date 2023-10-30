import Scan from '../screens/Scan';
import Home from '../screens/Home';
import Login from '../screens/Login/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import useAuth from '../hooks/useAuth';
import NewBarrel from '../screens/barrels/NewBarrel';
import BarrelStatus from '../screens/barrels/BarrelStatus';
import CustomersInfo from '../screens/customersInformation/CustomersInfo';
import NewOrder from '../screens/orders/NewOrder';
import Order from '../screens/orders/Order';
import Orders from '../screens/orders/Orders';
import OrdersList from '../screens/orders/OrdersList';
import ShowAddressMap from '../screens/customersInformation/ShowAddressMap';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const { auth, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
                    <ActivityIndicator size={'large'} />
                </ImageBackground>
            </View>
        )
    }

    if (auth?.role === 'delivery') {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}
                    options={{
                        title: 'Home',
                        headerStyle: {
                            backgroundColor: '#bababa',
                        },
                        headerTintColor: 'black',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name="Scan" component={Scan}
                    options={{
                        title: 'Scan',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name="NewBarrel" component={NewBarrel}
                    options={{
                        title: 'New Barrel',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="BarrelStatus" component={BarrelStatus}
                    options={{
                        title: 'Barrel Status',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="CustomersInfo" component={CustomersInfo}
                    options={{
                        title: 'Customers Information',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="ShowAddressMap" component={ShowAddressMap}
                    options={{
                        title: 'Dirección en mapa',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
            </Stack.Navigator>
        )
    }

    if (auth?.role === 'admin') {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}
                    options={{
                        title: 'Home',
                        headerStyle: {
                            backgroundColor: '#bababa',
                        },
                        headerTintColor: 'black',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name="Scan" component={Scan}
                    options={{
                        title: 'Scan',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name="NewBarrel" component={NewBarrel}
                    options={{
                        title: 'New Barrel',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="BarrelStatus" component={BarrelStatus}
                    options={{
                        title: 'Barrel Status',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="CustomersInfo" component={CustomersInfo}
                    options={{
                        title: 'Customers Information',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="orders" component={Orders}
                    options={{
                        title: 'Orders',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="ordersList" component={OrdersList}
                    options={{
                        title: 'Orders List',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="newOrder" component={NewOrder}
                    options={{
                        title: 'New Order',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="order" component={Order}
                    options={{
                        title: 'Order',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
                <Stack.Screen name="ShowAddressMap" component={ShowAddressMap}
                    options={{
                        title: 'Dirección en mapa',
                        headerStyle: {
                            backgroundColor: '#34495e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        }, headerBackVisible: false
                    }} />
            </Stack.Navigator>
        )
    }

    if (!auth?.isLogged) {
        return <Login />
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
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