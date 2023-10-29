import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { GOOGLE_MAP_KEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'
import beerTruck from './../../../assets/images/camioneta.png'
import bar from './../../../assets/images/bar.png'

const ShowAddressMap = ({ route }) => {
    const [barLocation, setBarLocation] = useState()
    const [currentLocation, setCurrentLocation] = useState(null)
    const mapRef = useRef()
    const markerRef = useRef()

    useEffect(() => {
        setBarLocation({ latitude: route.params.data.coordinates.lat, longitude: route.params.data.coordinates.lng })
    }, [])

    useEffect(() => {
        moveToBar()
    }, [barLocation])

    useEffect(() => {
        fitMapToCoordinates()
    }, [currentLocation])


    const edgePadding = {
        top: 50,
        right: 50,
        button: 50,
        left: 50,
    }

    const handleDirecctions = () => {
        getLocationPermission();
    }


    const fitMapToCoordinates = () => {
        mapRef.current?.fitToCoordinates([barLocation, currentLocation], {
            edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
            animated: true,
        });
    };

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('permiso denegado')
            return
        }
        let location = await Location.getCurrentPositionAsync();
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setCurrentLocation(current)
    }

    const moveToBar = async () => {
        const camera = await mapRef.current?.getCamera();
        if (camera) {
            camera.center = barLocation;
            camera.zoom = 16
            mapRef.current.animateCamera(camera, { duration: 1500 })
            markerRef.current?.showCallout()
        }
    }

    return (
        <View>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: -26.831684,
                    longitude: -65.219256,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09
                }
                }>
                <Marker
                    ref={markerRef}
                    coordinate={barLocation}
                    image={bar}
                    /* title={route.params.data.barName} */
                >
                    <Callout>
                        <View>
                            <Text>{route.params.data.barName}</Text>
                        </View>
                    </Callout>
                </Marker>
                {
                    currentLocation && <View>
                        <Marker
                            coordinate={currentLocation}
                            image={beerTruck}
                        />
                        <MapViewDirections
                            origin={currentLocation}
                            destination={barLocation}
                            apikey={GOOGLE_MAP_KEY}
                            strokeWidth={4}
                        />
                    </View>
                }
            </MapView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDirecctions}>
                    <Text style={styles.textButton}>Como llegar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        with: '100%',
        height: '100%'
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "90%",
        backgroundColor: "#bbb",
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    textButton: {
        fontSize: 20,
        fontWeight: "bold"
    }
});


export default ShowAddressMap