import { nanoid } from "nanoid";
import { useState } from "react";

export type SetSquareFunc = (i: number, j: number, n: number) => void;
export type ClearSquareFunc = (i: number, j: number) => void;

export interface Square {
    id: string;
    value: number;
}

interface UseBoardResult {
    board: Square[][];
    setSquare: SetSquareFunc;
    clearSquare: ClearSquareFunc;
}

export function useBoard(): UseBoardResult {
    const emptyBoard: Square[][] = [];
    for (let i = 0; i < 9; i++) {
        emptyBoard.push([]);
        for (let j = 0; j < 9; j++) {
            emptyBoard[i].push({ id: nanoid(), value: 0 });
        }
    }
    const [boardState, setBoardState] = useState(emptyBoard);
    const setSquareInternal = (i: number, j: number, n: number) => {
        if (i < 0 || i > 8 || j < 0 || j > 8) {
            return;
        }
        setBoardState(prev => {
            const prevCopy = prev.map(r => [...r]);
            prevCopy[i][j].value = n;
            return prevCopy;
        });
    };
    const setSquare = (i: number, j: number, n: number) => {
        if (n < 1 || n > 9) {
            return;
        }
        setSquareInternal(i, j, n);
    };
    const clearSquare = (i: number, j: number) => {
        setSquareInternal(i, j, 0);
    };
    return {
        board: boardState,
        setSquare,
        clearSquare,
    };
}
