import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const { login } = useAuth();

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../../assets/images/descarga.jpg')} resizeMode="cover" style={styles.image}>
                <Image source={require('./../../../assets/icon.png')} style={styles.iconImage}/>
                <TextInput
                    style={styles.input}
                    placeholder='User email'
                    placeholderTextColor='white'
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='password'
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => login(email, password)}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 40,
                            margin: 10
                        }}
                    >Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#34495e',
        width: '100vw',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        backgroundColor: '#34495e',
        width: 300,
        height: 75,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        margin: 10,
        paddingHorizontal: 5,
        height: 60,
        borderRadius: 15,
        paddingHorizontal: 20,
        backgroundColor: '#3c3c3c',
        color: 'white',
        fontSize: 25
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconImage: {
        width: 150,
        height: 150,
        marginBottom: 40
    }
});

export default Login