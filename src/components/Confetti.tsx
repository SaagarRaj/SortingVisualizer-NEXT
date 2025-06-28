'use client';

import { useEffect, useState } from 'react';

interface ConfettiPiece {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    color: string;
    velocity: {
        x: number;
        y: number;
        rotation: number;
    };
}

const colors = [
    '#ff6b6b', // red
    '#4ecdc4', // teal
    '#45b7d1', // blue
    '#96ceb4', // green
    '#feca57', // yellow
    '#ff9ff3', // pink
    '#54a0ff', // light blue
    '#5f27cd', // purple
    '#00d2d3', // cyan
    '#ff9f43', // orange
];

export const Confetti = ({ isVisible }: { isVisible: boolean }) => {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (isVisible) {
            // Create confetti pieces
            const newPieces: ConfettiPiece[] = [];
            const numPieces = 150;

            for (let i = 0; i < numPieces; i++) {
                newPieces.push({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: -10 - Math.random() * 100, // Start above viewport
                    rotation: Math.random() * 360,
                    scale: 0.5 + Math.random() * 0.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    velocity: {
                        x: (Math.random() - 0.5) * 8,
                        y: Math.random() * 3 + 2,
                        rotation: (Math.random() - 0.5) * 10,
                    },
                });
            }

            setPieces(newPieces);

            // Animate confetti
            const animate = () => {
                setPieces((prevPieces) =>
                    prevPieces
                        .map((piece) => ({
                            ...piece,
                            x: piece.x + piece.velocity.x,
                            y: piece.y + piece.velocity.y,
                            rotation: piece.rotation + piece.velocity.rotation,
                            velocity: {
                                ...piece.velocity,
                                y: piece.velocity.y + 0.1, // gravity
                            },
                        }))
                        .filter((piece) => piece.y < window.innerHeight + 50) // Remove pieces that fall below viewport
                );
            };

            const interval = setInterval(animate, 16); // ~60fps

            // Clean up after 3 seconds
            const timeout = setTimeout(() => {
                clearInterval(interval);
                setPieces([]);
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [isVisible]);

    if (!isVisible || pieces.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {pieces.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute w-2 h-2 rounded-sm"
                    style={{
                        left: piece.x,
                        top: piece.y,
                        transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
                        backgroundColor: piece.color,
                        boxShadow: `0 0 4px ${piece.color}`,
                    }}
                />
            ))}
        </div>
    );
}; 