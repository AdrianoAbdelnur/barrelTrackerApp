import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'

const CustomersInfo = () => {
    const [customersData, setcustomersData] = useState("")
    
    if (!customersData) {
        return (
            <View style={styles.container}>
                    <ActivityIndicator size={'large'} />   
            </View>
        )
    }
    if(customersData) {

        return (
            <View>
                <Text>CustomersInfo</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
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

export default CustomersInfo