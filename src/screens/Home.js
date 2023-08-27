import { Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../hooks/useAuth";

const Home = () => {
    const navigation = useNavigation();
    const { setAuth, logout } = useAuth();


    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-around', flexDirection: "row", flexWrap: "wrap" }}>
            <TouchableOpacity
                style={{ backgroundColor: 'blue', width: 150, height: 150, marginTop: 30 }}
                onPress={() => navigation.navigate('Scan')}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 25,
                        margin: 10
                    }}
                >Scan a QR code</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: 'blue', width: 150, height: 150, marginTop: 30 }}
                onPress={() => setAuth("hola fonola")}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 25,
                        margin: 10
                    }}
                >Customers Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: 'blue', width: 150, height: 150, marginTop: 30 }}
                onPress={() => logout()}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 40,
                        margin: 10
                    }}
                >UNSET AUTH</Text>
            </TouchableOpacity>
        </View>

    )
}

export default Home