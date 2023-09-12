import { Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Orders = () => {
    const navigation = useNavigation();
    
    return (
        <ImageBackground source={require('./../../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Opciones:</Text>
            <TouchableOpacity
                style={styles.optionsButton}
                onPress={() => { navigation.navigate('newOrder') }}
            >
                <Text style={styles.optionText}>Agregar Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.optionsButton}
                onPress={() => { navigation.navigate('ordersList')}}
            >
                <Text style={styles.optionText}>Lista de pedidos</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
    },
    optionsButton: {
        height: 80,
        marginTop: 50,
        marginHorizontal: 18,
        backgroundColor: '#34495e',
        borderRadius: 15,
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        textDecorationLine: 'underline'
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: 'white'
    },
});

export default Orders