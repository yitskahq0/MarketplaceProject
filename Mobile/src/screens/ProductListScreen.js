import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

import { dummyProducts } from '../data/dummyProducts';

export default function ProductListScreen({ navigation }) {
    const [products, setProducts] = useState(dummyProducts); // Use dummy data initially
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ name: 'Pengguna' });

    useEffect(() => {
        // fetchProducts(); // Disabled for Standalone Mode
        getUserData();
    }, []);

    /* 
    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    */

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
        >
            {/* Image Container */}
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                ) : (
                    <View style={[styles.image, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                        <Ionicons name="image-outline" size={40} color="#ccc" />
                    </View>
                )}

            </View>

            {/* Content */}
            <View style={styles.cardContent}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productPrice}>
                    {item.price >= 1000000000
                        ? `Rp.${(item.price / 1000000000).toFixed(1).replace(/\.0$/, '')}M`
                        : item.price >= 1000000
                            ? `Rp.${(item.price / 1000000).toFixed(1).replace(/\.0$/, '')}jt`
                            : `Rp.${item.price.toLocaleString('id-ID')}`
                    }
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View>
                <Text style={styles.greetingText}>Selamat berbelanja</Text>
                <Text style={styles.userNameText}>{user ? user.name : 'Pengguna'}!</Text>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
                    {/* Cart icon */}
                    <Ionicons name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    greetingText: {
        fontSize: 14,
        color: '#888',
    },
    userNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%', // Slightly less than 50% to account for space
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 15,
        padding: 8, // Create "layer" frame effect
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        position: 'relative',
        borderRadius: 10, // Adjusted radius to fit inside card
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 150, // Fixed height for uniformity
        resizeMode: 'cover',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 15,
        padding: 5,
    },
    info: {
        paddingHorizontal: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: '600', // Semi-bold
        color: '#000',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#888', // Grayish price as per screenshot "Rp.1M" style
        fontWeight: '500',
    },
});
