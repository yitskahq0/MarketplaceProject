import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen({ navigation, route }) {
    const { items, total } = route.params || { items: [], total: 0 };

    const formatPrice = (price) => {
        if (price >= 1000000000) {
            return (price / 1000000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        return price.toLocaleString('id-ID');
    };

    const handlePayment = () => {
        // Mock successful payment
        navigation.reset({
            index: 0,
            routes: [{ name: 'Success' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pembelian</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.sectionTitle}>Detail transaksi</Text>

                {items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                            <Text style={styles.itemPrice}>Rp.{formatPrice(item.price * item.quantity)}</Text>
                        </View>
                    </View>
                ))}

                <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Metode pembayaran</Text>
                <View style={styles.paymentMethod}>
                    <View style={styles.paymentIcon}>
                        <Ionicons name="cash-outline" size={24} color="black" />
                    </View>
                    <Text style={styles.paymentText}>Cash On Delivery</Text>
                </View>

            </ScrollView>

            {/* Bottom Bar */}
            <View style={[styles.bottomBar, { paddingBottom: Platform.OS === 'ios' ? 0 : 20 }]}>
                <View>
                    <Text style={styles.totalLabel}>Total harga</Text>
                    <Text style={styles.totalValue}>Rp.{formatPrice(total)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.payButton}
                    onPress={handlePayment}
                >
                    <Text style={styles.payText}>Selesaikan pembayaran</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
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
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        color: '#666',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
    },
    paymentIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#fff', // White background for icon
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    paymentText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    bottomBar: {
        padding: 16, // Reduced from 24
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
        fontSize: 20, // Reduced from 24
        fontWeight: 'bold',
        color: 'black',
    },
    payButton: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16, // Reduced from 24
        borderRadius: 30,
    },
    payText: {
        color: 'white',
        fontSize: 14, // Reduced from 16
        fontWeight: 'bold',
    },
});
