import { Text, View, StyleSheet, Button, ImageBackground, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

const Scan = () => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false);
    const [texto, setTexto] = useState('')
    const navigation = useNavigation();

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        })()
    }

    useEffect(() => {
        askForCameraPermission();
    }, [])

    const handleBarCodeScanned = ({ data, type }) => {
        if (type === 256) {
            setScanned(true);
            setTexto(data)
            getBarrel(data)
        } else {
            setTexto("QR not recognized")
            setScanned(true)
        }
    }

    if (hasPermission === null)
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )

    if (hasPermission === false)
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={"Allow camera"} onPress={() => askForCameraPermission()} />
            </View>
        )

    const getBarrel = async (id) => {
        try {
            const { data } = await axios("https://barreltrackerback.onrender.com/api/barrel/getABarrel/" + id);
            if (data.barrelFound) {
                navigation.navigate('BarrelStatus', { data: data.barrelFound })
            } else navigation.navigate('NewBarrel', { code: id })
        } catch (error) {
            if (error.message === "Request failed with status code 400") {
                Alert.alert(
                    'Error',
                    'Qr desconocido',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Aceptar',
                            onPress: () => {
                                navigation.navigate('Home')    
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else navigation.navigate('Home')
        }
    }

    const scanAgain = () => {
        setScanned(false)
        setTexto("")
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Scan the QR code</Text>
                <View style={styles.barCodeBox}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ height: 550, width: 500 }} />
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.mainText}>{texto}</Text>
                </View>
                {scanned && <Button title={'scan again'} onPress={() => scanAgain()} color='#4950A1' />}
            </ImageBackground>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barCodeBox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 310,
        width: 310,
        overflow: 'hidden',
        borderRadius: 30,
    },
    mainText: {
        fontSize: 40,
        marginTop: "20%",
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 20
    },
    text_container: {
        justifyContent: 'center'
    }
});

export default Scan;