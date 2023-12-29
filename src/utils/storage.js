function addCardId(cardId) {
    const existingCardIds = getCardIds();
    existingCardIds.push(cardId);
    localStorage.setItem('cardIds', JSON.stringify(existingCardIds));
}

function removeCardId(cardId) {
    const existingCardIds = getCardIds();
    const updatedCardIds = existingCardIds.filter(id => id !== cardId);
    localStorage.setItem('cardIds', JSON.stringify(updatedCardIds));
}

function getCardIds() {
    const cardIds = localStorage.getItem('cardIds');
    if (cardIds) {
        return JSON.parse(cardIds);
    } else {
        return [];
    }
}

export { addCardId, removeCardId, getCardIds };
