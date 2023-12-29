import React, { useEffect, useState } from 'react';
import Card from './Card';
import { addCardIdToLocalStorage, getCardIdsFromLocalStorage, removeCardIdFromLocalStorage } from '../utils/storage';
import { createCard, deleteCard, updateCard, useFetchCards } from '../services';
import { ThreeDots, Triangle } from 'react-loader-spinner';

const COLORS = [
    { bg: "#711DB0", text: "white" },
    { bg: "#C21292", text: "white" },
    { bg: "#EF4040", text: "white" },
    { bg: "#FFA732", text: "black" },
];

const randomId = () => Math.random().toString(36).substring(2, 11);

const CardsContainer = ({ isEditMode, newCardPosition, onCreatingStop }) => {
    // Example card {
    //     id: "0",
    //     position: { x: 200, y: 200 },
    //     colors: { bg: "#711DB0", text: "white" },
    //     content: "# Hello World",
    //     author: "Patrick",
    //     rotation: 0
    // }

    const [cards, setCards] = useFetchCards();
    const [formCard, setFormCard] = useState(null);

    useEffect(() => {
        if (newCardPosition) {
            setFormCard({
                id: `temp-${randomId()}`,
                position: newCardPosition,
                colors: COLORS[Math.floor(Math.random() * COLORS.length)],
                content: null,
                author: null,
                rotation: 0
            });
        }
    }, [newCardPosition]);

    const handleCardSubmit = (card) => {
        if (card.id.startsWith('temp')) {
            console.log("Create card", card);
            card.id = randomId();
            addCardIdToLocalStorage(card.id);
            createCard(card);
        } else {
            console.log("Update card", card);
            updateCard(card.id, card);
        }
        setFormCard(null);
        onCreatingStop();
    }

    const handleCardCancel = (id) => {
        setFormCard(null);
        onCreatingStop();
    }

    const handleCardDelete = (id) => {
        console.log("Delete card", id);
        removeCardIdFromLocalStorage(id);
        deleteCard(id);

    }

    const displayedCards = isEditMode
        ? getCardIdsFromLocalStorage().map((id) => cards.find((card) => card.id === id)).filter((card) => card)
        : cards;

    return (
        <div style={{
            height: "100Vh",
            width: "100vw",
            top: 0,
            left: 0,
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: '100%',
                width: '100%'
            }}>
                <ThreeDots
                    visible={cards.length === 0}
                    height="120"
                    width="120"
                    color="#0002"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
            {
                displayedCards.map((card) => (
                    <Card
                        key={card.id}
                        onSubmit={handleCardSubmit}
                        onCancel={handleCardCancel}
                        onDelete={handleCardDelete}
                        isUpdateMode={isEditMode}
                        {...card}
                    />
                ))
            }
            {
                formCard &&
                <Card
                    key={formCard.id}
                    onSubmit={handleCardSubmit}
                    onCancel={handleCardCancel}
                    {...formCard}
                />
            }
        </div>
    );
};

export default CardsContainer;
