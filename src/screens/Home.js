import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../hooks/useAuth";

const Home = () => {
    const navigation = useNavigation();
    const { auth } = useAuth()

    return (
        <View style={styles.container}>
            <View style={styles.buttons_container}>
                <TouchableOpacity
                    style={styles.OptionsButton}
                    onPress={() => navigation.navigate('Scan')}>
                    <ImageBackground source={require('./../../assets/images/inox1.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 15 }}>
                        <Text
                            style={styles.buttonText}
                        >Scan a QR code</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.OptionsButton}
                    onPress={() => navigation.navigate('CustomersInfo')}>
                    <ImageBackground source={require('./../../assets/images/inox1.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 15 }}>
                        <Text
                            style={styles.buttonText}
                        >Customers Information</Text>
                    </ImageBackground>
                </TouchableOpacity>
                {
                    auth?.role === "admin" &&
                    <TouchableOpacity
                        style={styles.OptionsButton}
                        onPress={() => navigation.navigate('orders')}>
                        <ImageBackground source={require('./../../assets/images/inox1.jpg')} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 15 }}>
                            <Text
                                style={styles.buttonText}
                            >Orders</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#34495e',
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    buttons_container: {
        height: "60%",
        flexDirection: "column",
        justifyContent: 'space-around'
    },
    OptionsButton: {
        width: 350,
        height: 75,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: 'black',
        fontSize: 25,
        margin: 10
    },
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    }
});


export default Home