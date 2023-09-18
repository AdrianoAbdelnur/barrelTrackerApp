import { View, Text, ImageBackground, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import checkIcon from './../../../assets/images/checkIcon.png'

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

    const alert = (id) => {
        Alert.alert(
            'Cuidado!',
            `¿Estas seguro que deseas cancelar esta orden?`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel',
                },
                {
                    text: 'ok',
                    onPress: () => {
                        cancelOrder(id)
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const cancelOrder = async (id) => {
        try {
            await axios.patch("https://barreltrackerback.onrender.com/api/order/cancelOrder/" + id)
            handleGetPendingOrders();
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
                                    <View style={styles.infoBlock} key={order.customer.barName}>
                                        <View style={styles.title_container}>
                                            <Text style={styles.title}>{order.customer.barName}</Text>
                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => alert(order._id)}
                                            >
                                                <Text style={styles.signal}>-</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            order.orderList.map(item => {
                                                return (
                                                    <View style={styles.items_container} key={item.styleId + item.volume}>
                                                        {item.delivered !== 0 && <Text style={styles.info}>{item.delivered}   /</Text>}
                                                        <Text style={styles.info}>{item.quantity}</Text>
                                                        <Text style={styles.info}>{item.styleName}</Text>
                                                        <Text style={styles.info}>{item.volume} litros</Text>
                                                        {item.delivered === item.quantity && <View style={styles.icon_container}>
                                                            <Image source={require('./../../../assets/images/checkIcon.png')} style={styles.iconImage}/>
                                                            </View>
                                                            }
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
    infoHead: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 25,
        textDecorationLine: 'underline',
    },
    info: {
        fontSize: 17,
        marginLeft: 10,
        marginBottom: 4,
        padding: 4
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
        flexDirection: 'row',
        marginLeft: 20,
    },
    title_container: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between'
    },
    deleteButton: {
        backgroundColor: '#9a0526',
        width: 35,
        height: 35,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signal: {
        color: 'white',
        margin: 0,
        padding: 0,
        fontSize: 25,
        fontWeight: 'bold'
    },
    iconImage: {
        width: 40,
        height: 40,
        margin: 0,
    },
    icon_container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 12
    }
});

export default OrdersList