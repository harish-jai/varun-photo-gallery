// src/firebase/auth.js
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Sign in with email + password
export const login = async (email, password) => {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCred.user };
    } catch (error) {
        console.error('Login failed:', error.message);
        return { error: error.message };
    }
};

// Sign out
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
};

// Listen to auth state
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Get role of user from Firestore
export const getUserRole = async (uid) => {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().role;
        }
    } catch (err) {
        console.error('Failed to fetch user role:', err);
    }
    return null;
};
