import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email dan password wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });

            // Get token and user data from response
            const { token, user } = response.data;

            // Save to AsyncStorage
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            // Reset navigation stack so user cannot go back to Login or Register
            navigation.reset({
                index: 0,
                routes: [{ name: 'ProductList' }],
            });
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'Login gagal. Periksa email dan password Anda.';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Back Button (Circle Black) */}
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Hai!</Text>
                        <Text style={styles.subtitle}>Masuk untuk berbelanja.</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Email Input */}
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan email anda"
                                placeholderTextColor="#ccc"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                editable={!loading}
                            />
                        </View>

                        {/* Password Input */}
                        <Text style={styles.label}>Kata sandi</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="********"
                                placeholderTextColor="#ccc"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                editable={!loading}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#ccc" />
                            </TouchableOpacity>
                        </View>

                        {/* Button */}
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Masuk'}</Text>
                        </TouchableOpacity>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Belum punya akun? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.linkText}>Daftar sekarang</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 10,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 24,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    footerText: {
        color: '#6B7280',
        fontSize: 14,
    },
    linkText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
});