import { nanoid } from "nanoid";
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from "react";
import { createKeyboardShortcutHandler, useKeyHandler } from "./key-handlers";

export type SetSquareFunc = (i: number, j: number, n: number) => void;
export type ClearSquareFunc = (i: number, j: number) => void;

export interface Square {
    id: string;
    value: number;
}

export function useBoard(selection: [number, number]) {
    const [boardState, setBoardState] = useState(initializeBoard());

    const setSquare = useCallback((i: number, j: number, n: number) => {
        if (n < 1 || n > 9) {
            return;
        }
        setSquareInternal(i, j, n, setBoardState);
    }, []);

    const clearSquare = useCallback((i: number, j: number) => {
        setSquareInternal(i, j, 0, setBoardState);
    }, []);

    const setBoard = useCallback((data: number[][]) => {
        setBoardState(prev => {
            if (data.length !== 9) {
                return prev;
            }
            const prevCopy = prev.map(r => [...r]);
            for (let i = 0; i < data.length; i++) {
                if (data[i].length !== 9) {
                    return prev;
                }
                for (let j = 0; j < data[i].length; j++) {
                    prevCopy[i][j].value = data[i][j];
                }
            }
            return prevCopy;
        });
    }, []);

    const clearBoard = useCallback(() => {
        setBoard(Array(9).fill(Array(9).fill(0)));
    }, [setBoard]);

    const keyboardShortcutHandler = useMemo(
        () =>
            createKeyboardShortcutHandler(selection, clearSquare, () =>
                setBoardState(initializeBoard()),
            ),
        [clearSquare, selection],
    );
    useKeyHandler(keyboardShortcutHandler);

    return {
        board: boardState,
        setBoard,
        setSquare,
        clearBoard,
        clearSquare,
    };
}

function setSquareInternal(
    i: number,
    j: number,
    n: number,
    setBoardState: Dispatch<SetStateAction<Square[][]>>,
) {
    if (i < 0 || i > 8 || j < 0 || j > 8) {
        return;
    }
    setBoardState(prev => {
        const prevCopy = prev.map(r => [...r]);
        prevCopy[i][j].value = n;
        return prevCopy;
    });
}

function initializeBoard() {
    const emptyBoard: Square[][] = [];
    for (let i = 0; i < 9; i++) {
        emptyBoard.push([]);
        for (let j = 0; j < 9; j++) {
            emptyBoard[i].push({ id: nanoid(), value: 0 });
        }
    }
    return emptyBoard;
}
