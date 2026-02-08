import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

export default function ProductListScreen({ navigation }) {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [user, setUser] = useState({ name: 'Pengguna' });

    useEffect(() => {
        fetchProducts(); // Enable API fetch
        getUserData();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Optional: Show error message to user
        } finally {
            setLoading(false);
        }
    };

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

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
                    <Ionicons name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

    // Handle empty state
    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Belum ada produk</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyComponent}
                numColumns={2}
                columnWrapperStyle={products.length > 0 ? styles.row : null}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 15,
        fontSize: 16,
        color: '#888',
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
        width: '48%',
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 15,
        padding: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    cardContent: {
        paddingHorizontal: 5,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
});