import Markdown from 'markdown-to-jsx';
import React, { useEffect, useRef, useState } from 'react';

const Card = ({ id, position, colors, content, author, rotation, onSubmit, onCancel, onDelete, isUpdateMode }) => {
    const style = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "1rem",
        },
        card: {
            top: position.y,
            left: position.x,
            backgroundColor: colors.bg,
            color: colors.text
        },
        button: {
            color: colors.bg,
            backgroundColor: colors.text,
            marginLeft: "auto",
        },
        alignEnd: {
            marginLeft: "auto",
        }
    }

    const isNew = id.startsWith('temp');
    const [editing, setEditing] = useState(isNew ? true : false);

    const [text, setText] = useState(content || "");
    const [name, setName] = useState(author || "Anonymous");
    const [rotate, setRotate] = useState(rotation || 0);

    useEffect(() => {
        if (isNew) return;
        setEditing(isUpdateMode);
    }, [isUpdateMode]);

    const handleTextChange = function (ev) {
        setText(ev.target.value);
    };

    const handleChangeName = function (ev) {
        setName(ev.target.value);
    }

    const textAreaAdjust = function ({ currentTarget: el }) {
        el.style.height = "1px";
        el.style.height = (8 + el.scrollHeight) + "px";
    }

    const handleSubmit = function () {
        const rotate = (Math.random() * 10) * (Math.random() > .5 ? 1 : -1);
        setEditing(false);
        setRotate(rotate);
        const payload = {
            id,
            position,
            colors,
            content: text,
            author: name,
            rotation: rotate
        };
        onSubmit(payload);
    }

    const handleCancel = function () {
        onCancel(id);
    }

    const handleDelete = function () {
        onDelete(id);
    };

    const treatTextForMarkdown = function (text) {
        return text.replace(/\n/g, "  \n");
    }

    return (
        <div className="card" style={{ ...style.card, transform: `rotate(${isUpdateMode ? 0 : rotate}deg)` }}>
            <div style={{ ...style.container, display: editing ? "flex" : "none", marginBottom: editing ? '1rem' : '' }}>
                <input className='panningDisabled' type="text" value={name} placeholder='Your name' onChange={handleChangeName} />
                <textarea
                    value={text}
                    className='panningDisabled'
                    onChange={handleTextChange}
                    onKeyUp={textAreaAdjust}
                    placeholder='Enter your text... (markdown supported)'
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem' }}>
                    {
                        isNew
                            ? <button onClick={handleCancel}>Cancel</button>
                            : <button onClick={handleDelete}>Delete</button>
                    }
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div style={style.container}>
                <Markdown options={{ forceBlock: true }}>{treatTextForMarkdown(text)}</Markdown>
                <small style={{ ...style.alignEnd, opacity: .5, fontStyle: 'italic' }}>{name}</small>
            </div>

        </div>
    );
};

export default Card;
