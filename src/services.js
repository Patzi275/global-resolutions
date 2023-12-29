import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, deleteDoc, doc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

export const fetchCards = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'cards'));
        const cards = snapshot.docs.map((doc) => doc.data());
        return cards;
    } catch (error) {
        console.error('Error fetching cards:', error);
        return [];
    }
};

export const createCard = async (cardData) => {
    try {
        await setDoc(doc(db, 'cards', cardData.id), cardData);
        console.log('Card created successfully');
    } catch (error) {
        console.error('Error creating card:', error);
    }
};

export const updateCard = async (cardId, updatedData) => {
    try {
        await updateDoc(doc(db, 'cards', cardId), updatedData);
        console.log('Card updated successfully');
    } catch (error) {
        console.error('Error updating card:', error);
    }
};

export const deleteCard = async (cardId) => {
    try {
        await deleteDoc(doc(db, 'cards', cardId));
        console.log('Card deleted successfully');
    } catch (error) {
        console.error('Error deleting card:', error);
    }
};

export const useFetchCards = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'cards'), (snapshot) => {
            const fetchedCards = snapshot.docs.map((doc) => doc.data());
            setCards(fetchedCards);
        });

        return () => unsubscribe();
    }, []);

    return [cards, setCards];
};
