import React, { useEffect } from 'react';
import { useState } from 'react';

const NewCardShape = ({ transformRef, active, follow = true, onClick }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const width = 12.4 * 16;
    const height = 10.7 * 16;

    useEffect(() => {
        const body = document.body;
        if (active) {
            body.style.cursor = "crosshair";
            body.addEventListener('mousemove', handleMouseMove);
        } else {
            body.style.cursor = "default";
        }

        return () => {
            body.removeEventListener('mousemove', handleMouseMove);
        };
    }, [active, follow]);

    const handleMouseMove = (event) => {
        const transformStyle = transformRef.current?.instance.contentComponent.style.transform;
        const transformValues = transformStyle.match(/-?\d+\.?\d*/g);
        const transformX = parseFloat(transformValues[0]);
        const transformY = parseFloat(transformValues[1]);
        const scale = parseFloat(transformValues[2]);

        const positionX = (event.clientX - transformX) / scale;
        const positionY = (event.clientY - transformY) / scale;

        const position = { x: positionX, y: positionY };
        if (active && follow) {
            setPosition({ x: position.x - width/2, y: position.y - height/5 });
        }
    };

    const handleClick = () => {
        onClick(position);
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                height, width,
                borderRadius: '1rem',
                backgroundColor: 'transparent',
                border: '3px dashed rgba(255, 0, 0, 0.5)',
                opacity: active ? 1 : 0.5,
                pointerEvents: active ? 'auto' : 'none',
                display: active ? 'block' : 'none',
            }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        />
    );
};

export default NewCardShape;
