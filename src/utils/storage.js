function addCardIdToLocalStorage(cardId) {
    const existingCardIds = getCardIdsFromLocalStorage();
    existingCardIds.push(cardId);
    localStorage.setItem('cardIds', JSON.stringify(existingCardIds));
}

function removeCardIdFromLocalStorage(cardId) {
    const existingCardIds = getCardIdsFromLocalStorage();
    const updatedCardIds = existingCardIds.filter(id => id !== cardId);
    localStorage.setItem('cardIds', JSON.stringify(updatedCardIds));
}

function getCardIdsFromLocalStorage() {
    const cardIds = localStorage.getItem('cardIds');
    if (cardIds) {
        return JSON.parse(cardIds);
    } else {
        return [];
    }
}
function isLocalStorageEmpty() {
    const cardIds = localStorage.getItem('cardIds');
    if (cardIds) {
        return false;
    } else {
        return true;
    }
}


export { isLocalStorageEmpty, addCardIdToLocalStorage, removeCardIdFromLocalStorage, getCardIdsFromLocalStorage };
