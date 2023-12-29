import React, { useState } from 'react';

const FloatingButton = ({ disabled, inCancelMode, onCancel, onClickAdd, onClickEdit, onClickCenter }) => {
    const [active, setActive] = useState(false);

    const handleButtonClick = () => {
        if (disabled) return;
        setActive(!active);
    };

    const handleClickSubButton = (ev) => {
        const action = ev.currentTarget.className;
        if (action === 'add') {
            onClickAdd();
        } else if (action === 'edit') {
            onClickEdit();
        } else if (action === 'center') {
            onClickCenter();
        }
        setActive(false);
    }

    return (
        <div 
            className={`floating-button 
                ${active ? 'floating-button--active' : ''} 
                ${inCancelMode ? 'floating-button--cancel' : ''} 
                ${disabled ? 'floating-button--disabled' : ''}`}
            >
            {
                inCancelMode
                    ? <button type='button' className="trigger" onClick={onCancel}>
                        <span className="material-symbols-outlined">
                            cancel
                        </span>
                    </button>

                    : <>
                        <button type='button' className="add" onClick={handleClickSubButton}>
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        </button>
                        <button type='button' className="edit" onClick={handleClickSubButton}>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                        <button type='button' className="center" onClick={handleClickSubButton}>
                            <span className="material-symbols-outlined">
                                filter_center_focus
                            </span>
                        </button>
                        <button type='button' className="trigger" onClick={handleButtonClick}>
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        </button>
                    </>
            }
        </div>
    );
};

export default FloatingButton;
