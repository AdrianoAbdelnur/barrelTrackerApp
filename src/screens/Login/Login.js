import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const { login } = useAuth();

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../../assets/images/pirate.jpg')} resizeMode="cover" style={styles.image}>
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
        backgroundColor: 'blue',
        width: '100vw',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        backgroundColor: '#4950A1',
        width: 300,
        height: 75,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        margin: 10,
        paddingHorizontal: 5,
        height: 60,
        borderRadius: 15,
        paddingHorizontal: 20,
        backgroundColor: 'grey',
        color: 'white',
        fontSize: 25
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default Login