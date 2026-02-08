import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [selectedItems, setSelectedItems] = useState({});

    // Auto-select new items (optional, but good UX)
    useEffect(() => {
        const newSelected = { ...selectedItems };
        cartItems.forEach(item => {
            if (selectedItems[item._id] === undefined && selectedItems[item.id] === undefined) {
                // Default select logic could go here if dealing with new items
            }
        });
    }, [cartItems]);

    const toggleSelection = (id) => {
        setSelectedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Check both ID types just in case
            if (selectedItems[item._id] || selectedItems[item.id]) {
                return total + (item.price * item.quantity);
            }
            return total;
        }, 0);
    };

    const formatPrice = (price) => {
        if (price >= 1000000000) {
            return (price / 1000000000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (price >= 1000000) {
            return (price / 1000000).toFixed(1).replace(/\.0$/, '') + 'jt';
        }
        return price.toLocaleString('id-ID');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Keranjang saya</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {cartItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Keranjang anda kosong</Text>
                    </View>
                ) : (
                    cartItems.map((item) => (
                        <View key={item.id || item._id} style={styles.cartItem}>
                            {/* Checkbox */}
                            <TouchableOpacity
                                onPress={() => toggleSelection(item.id || item._id)}
                                style={[styles.checkbox, (selectedItems[item.id] || selectedItems[item._id]) && styles.checkboxSelected]}
                            >
                                {(selectedItems[item.id] || selectedItems[item._id]) && <Ionicons name="checkmark" size={16} color="white" />}
                            </TouchableOpacity>

                            {/* Image */}
                            <Image source={{ uri: item.image }} style={styles.itemImage} />

                            {/* Details */}
                            <View style={styles.itemDetails}>
                                <View style={styles.rowBetween}>
                                    <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
                                    <TouchableOpacity onPress={() => removeFromCart(item._id || item.id)}>
                                        <Ionicons name="trash-outline" size={20} color="#ccc" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.rowBetween}>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity onPress={() => updateQuantity(item._id || item.id, -1)} style={styles.qtyBtn}>
                                            <Ionicons name="remove" size={16} color="white" />
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => updateQuantity(item._id || item.id, 1)} style={styles.qtyBtn}>
                                            <Ionicons name="add" size={16} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.itemPrice}>Rp.{formatPrice(item.price * item.quantity)}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Bottom Bar */}
            < View style={[styles.bottomBar, { paddingBottom: Platform.OS === 'ios' ? 0 : 20 }]} >
                <View>
                    <Text style={styles.totalLabel}>Total harga</Text>
                    <Text style={styles.totalValue}>Rp.{formatPrice(calculateTotal())}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => {
                        const itemsToCheckout = cartItems.filter(item => selectedItems[item.id] || selectedItems[item._id]);
                        if (itemsToCheckout.length > 0) {
                            navigation.navigate('Checkout', { items: itemsToCheckout, total: calculateTotal() });
                        } else {
                            // Alert select item
                        }
                    }}
                    disabled={calculateTotal() === 0}
                >
                    <Text style={styles.checkoutText}>Beli sekarang</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    scrollContainer: {
        padding: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: 'black',
        borderColor: 'black',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    actionRow: {
        flexDirection: 'row',
        marginBottom: 24,
        paddingLeft: 36, // Align with content, adjust based on checkbox + image
    },
    actionBtn: {
        marginRight: 16,
    },
    bottomBar: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    checkoutButton: {
        backgroundColor: 'black', // Changed to black per request
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    checkoutText: {
        color: 'white', // Changed to white for contrast
        fontSize: 16,
        fontWeight: 'bold', // Made bold for better visibility
    },
});
