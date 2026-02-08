import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Semua kolom wajib diisi');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Format email tidak valid');
            return;
        }

        // Password length validation
        if (password.length < 6) {
            Alert.alert('Error', 'Password minimal 6 karakter');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', { name, email, password });

            Alert.alert('Sukses', 'Registrasi berhasil! Silakan login', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error) {
            console.error('Register Error:', error);
            const errorMessage = error.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
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
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Mari bergabung!</Text>
                        <Text style={styles.subtitle}>Bergabunglah dengan ribuan pembeli yang puas.</Text>
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

                        {/* Name Input */}
                        <Text style={styles.label}>Nama</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#ccc" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan nama anda"
                                placeholderTextColor="#ccc"
                                value={name}
                                onChangeText={setName}
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
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Daftar'}</Text>
                        </TouchableOpacity>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Anda sudah memiliki akun? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.linkText}>Masuk</Text>
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
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#9CA3AF',
        lineHeight: 24,
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
        marginBottom: 20,
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
        color: '#888',
        fontSize: 14,
    },
    linkText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
});