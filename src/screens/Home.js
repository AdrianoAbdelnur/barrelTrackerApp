import { Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../hooks/useAuth";



const Home = () => {
    const navigation = useNavigation();
    const { auth, setAuth } = useAuth();

    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-around', flexDirection: "row", flexWrap: "wrap" }}>
            <TouchableOpacity
                style={{ backgroundColor: 'blue', width: 150, height: 150, marginTop: 30 }}
                onPress={() => navigation.navigate('Scan')}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 40,
                        margin: 10
                    }}
                >Add a client</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: 'blue', width: 150, height: 150, marginTop: 30 }}
                onPress={() => setAuth("hola fonola")}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 40,
                        margin: 10
                    }}
                >SET AUTH</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: 'blue', width: 150, height: 150, marginTop: 30 }}
                onPress={() => setAuth("chau pescau")}>
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