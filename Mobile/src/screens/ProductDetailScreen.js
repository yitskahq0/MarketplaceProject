import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

const { width, height } = Dimensions.get('window');

import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }) {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        navigation.navigate('Cart');
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
                <Text style={styles.errorText}>Produk tidak ditemukan</Text>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Kembali</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    {product.image ? (
                        <Image source={{ uri: product.image }} style={styles.image} />
                    ) : (
                        <View style={[styles.image, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
                            <Ionicons name="image-outline" size={60} color="#ccc" />
                        </View>
                    )}

                    {/* Floating Header Icons */}
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content Container */}
                <View style={styles.detailsContainer}>
                    <View style={styles.handleBar} />

                    <View style={styles.headerRow}>
                        <Text style={styles.name}>{product.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.ratingText}>4.8</Text>
                        </View>
                    </View>

                    <Text style={styles.price}>
                        {product.price >= 1000000000
                            ? `Rp.${(product.price / 1000000000).toFixed(1).replace(/\.0$/, '')}M`
                            : product.price >= 1000000
                                ? `Rp.${(product.price / 1000000).toFixed(1).replace(/\.0$/, '')}jt`
                                : `Rp.${product.price.toLocaleString('id-ID')}`
                        }
                    </Text>

                    <Text style={styles.sectionTitle}>Deskripsi</Text>
                    <Text style={styles.description}>{product.description || "Tidak ada deskripsi untuk produk ini."}</Text>

                    {/* Spacer for bottom bar */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.qtyButton}>
                        <Ionicons name="remove" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>1</Text>
                    <TouchableOpacity style={styles.qtyButton}>
                        <Ionicons name="add" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Ionicons name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 40,
    },
    errorText: {
        marginTop: 15,
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    backButton: {
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 12,
        backgroundColor: '#000',
        borderRadius: 25,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        height: height * 0.5,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    headerIcons: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 40 : 40,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    handleBar: {
        width: 40,
        height: 5,
        backgroundColor: '#eee',
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
        marginRight: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
    },
    ratingText: {
        marginLeft: 4,
        fontWeight: 'bold',
        fontSize: 14,
    },
    price: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        marginTop: 5,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 30,
        paddingHorizontal: 5,
        paddingVertical: 5,
        height: 50,
    },
    qtyButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 20,
    },
    qtyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        color: 'black',
    },
    addToCartButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});