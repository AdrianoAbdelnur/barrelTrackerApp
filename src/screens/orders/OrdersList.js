import { View, Text, ImageBackground, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrdersList = () => {
    const [orders, setOrders] = useState()

    useEffect(() => {
        handleGetPendingOrders();
    }, [])
    

    const handleGetPendingOrders = async () => {
        try {
            const { data } = await axios("https://barreltrackerback.onrender.com/api/order/getOrders")
            setOrders(data.ordersList)
        } catch (error) {
            console.log(error)
        }
    }
    if (!orders) {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./../../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
                    <ActivityIndicator size={'large'} />
                </ImageBackground>
            </View>
        )
    }
    
    if (orders) {
        return (
            <View>
                <ImageBackground source={require('./../../../assets/images/inox.jpg')} resizeMode="cover" style={styles.image}>
                    <ScrollView>
                        {
                            orders.map(order => {
                                return (
                                    <View  style={styles.infoBlock} key={order._id}>
                                        <Text style={styles.title}>{order.customer.barName}</Text>
                                        {
                                            order.orderList.map(item=> {
                                                return(
                                                    <View style={styles.items_container} key={item.styleId}>
                                                        <Text style={styles.info}>{item.quantity}</Text>
                                                        <Text style={styles.info}>{item.styleName}</Text>
                                                        <Text style={styles.info}>{item.volume} litros</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })

                        }
                    </ScrollView>
                </ImageBackground>
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    info: {
        fontSize: 16,
        marginLeft: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    infoBlock: {
        marginTop: 22,
        marginHorizontal: 18,
        backgroundColor: 'rgba(128, 128, 128, 0.35)',
        borderRadius: 15
    },  
    items_container: {
        flexDirection: 'row'
    }
});

export default OrdersList