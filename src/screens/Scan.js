import { Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

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

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setTexto(data)
        goBarrelScreen()
    }


    

    const goBarrelScreen = () => navigation.navigate('NewBarrel', { code: texto })

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

    return (
        <View style={styles.container}>
            <View style={styles.barCodeBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 500, width: 500 }} />
            </View>
            <Text style={styles.mainText}>{texto}</Text>
            {scanned && <Button title={'scan again'} onPress={() => setScanned(false)} color='tomato' />}


            {/* <TouchableOpacity
                style={{ backgroundColor: '#ABC' }}
                onPress={() => navigation.navigate('NewBarrel')}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: 40,
                        margin: 10
                    }}
                >Go AddBarrel</Text>
            </TouchableOpacity> */}
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
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    },
    mainText: {
        fontSize: 40,
        marginTop: "20%",
        marginLeft: "10%"
    }
});

export default Scan;