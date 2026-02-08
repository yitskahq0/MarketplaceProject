import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from storage on mount
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const storedCart = await AsyncStorage.getItem('cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to load cart", error);
        }
    };

    const saveCart = async (items) => {
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(items));
        } catch (error) {
            console.error("Failed to save cart", error);
        }
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            let newItems;
            if (existingItem) {
                newItems = prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...prevItems, { ...product, quantity: 1, id: product._id }]; // Ensure consistency with ID usage
            }
            saveCart(newItems);
            return newItems;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            const newItems = prevItems.filter(item => item.id !== productId && item._id !== productId);
            saveCart(newItems);
            return newItems;
        });
    };

    const updateQuantity = (productId, delta) => {
        setCartItems(prevItems => {
            const newItems = prevItems.map(item => {
                if (item.id === productId || item._id === productId) {
                    return { ...item, quantity: Math.max(1, item.quantity + delta) };
                }
                return item;
            });
            saveCart(newItems);
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        saveCart([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
