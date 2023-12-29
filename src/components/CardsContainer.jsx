import React, { useEffect, useState } from 'react';
import Card from './Card';
import { addCardId, getCardIds } from '../utils/storage';

const COLORS = [
    { bg: "#711DB0", text: "white" },
    { bg: "#C21292", text: "white" },
    { bg: "#EF4040", text: "white" },
    { bg: "#FFA732", text: "black" },
];

const randomId = () => Math.random().toString(36).substring(2, 11);

const CardsContainer = ({ isEditMode, newCardPosition, onCreatingStop }) => {
    const [cards, setCards] = useState([{
        id: "0",
        position: { x: 200, y: 200 },
        colors: { bg: "#711DB0", text: "white" },
        content: "# Hello World",
        author: "Patrick",
        rotation: 0
    }]);

    useEffect(() => {
        if (newCardPosition) {
            setCards([...cards, {
                id: `temp-${randomId()}`,
                position: newCardPosition,
                colors: COLORS[Math.floor(Math.random() * COLORS.length)],
                content: null,
                author: null,
                rotation: 0
            }]);
        }
    }, [newCardPosition]);

    const handleCardSubmit = (card) => {
        const index = cards.findIndex((c) => c.position.x === card.position.x && c.position.y === card.position.y);
        const newCards = [...cards];
        newCards[index] = card;
        setCards(newCards);
        addCardId(card.id);
        onCreatingStop();
    }

    const handleCardCancel = (id) => {
        const newCards = cards.filter((card) => card.id !== id);
        setCards(newCards);
        onCreatingStop();
    }
    const displayedCards = isEditMode 
        ? getCardIds().map((id) => cards.find((card) => card.id === id)).filter((card) => card) 
        : cards;

    return (
        <div style={{
            height: "100Vh",
            width: "100vw",
            top: 0,
            left: 0,
        }}>
            {
                displayedCards.map((card) => (
                    <Card
                        key={card.id}
                        onSubmit={handleCardSubmit}
                        onCancel={handleCardCancel}
                        isUpdateMode={isEditMode}
                        {...card}
                    />
                ))

            }
        </div>
    );
};

export default CardsContainer;
