import { nanoid } from "nanoid";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { createKeyboardShortcutHandler, useKeyHandler } from "./key-handlers";
import { useSelection } from "./use-selection";

export interface Square {
    id: string;
    row: number;
    col: number;
    value: number;
    isValid: boolean;
}

interface BoardContextValue {
    selection: [number, number];
    setSelection: React.Dispatch<React.SetStateAction<[number, number]>>;

    board: Square[][];
    clearBoard: () => void;
    setBoard: (data: number[][]) => void;
    clearSquare: (i: number, j: number) => void;
    setSquare: (i: number, j: number, n: number) => void;
    markSquaresInvalid: (positions: [number, number][]) => void;
    clearInvalidSquares: () => void;
}

const BoardContext: React.Context<BoardContextValue> = createContext(
    undefined as unknown as BoardContextValue, // uhhhhhh well this should never be used sooooo :bigshrug:
);

export function useBoard() {
    return useContext(BoardContext);
}

export const BoardProvider: React.FunctionComponent = ({ children }) => {
    const [selection, setSelection] = useSelection();
    const useBoardInternalResult = useBoardInternal(selection);

    const contextVal: BoardContextValue = {
        selection,
        setSelection,
        ...useBoardInternalResult,
    };
    return (
        <BoardContext.Provider value={contextVal}>
            {children}
        </BoardContext.Provider>
    );
};

function useBoardInternal(selection: [number, number]) {
    const [boardState, setBoardState] = useState(initializeBoard());
    const [invalidSquares, setInvalidSquares] = useState<[number, number][]>(
        [],
    );

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
        setBoardState(prev => updateBoard(prev, data));
    }, []);

    const clearBoard = useCallback(() => {
        setBoard(Array(9).fill(Array(9).fill(0)));
    }, [setBoard]);

    const markSquaresInvalid = (positions: [number, number][]) => {
        changeSquareValidity(positions, false, setBoardState);
        setInvalidSquares(positions);
    };

    const clearInvalidSquares = () => {
        changeSquareValidity(invalidSquares, true, setBoardState);
        setInvalidSquares([]);
    };

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
        markSquaresInvalid,
        clearInvalidSquares,
    };
}

function updateBoard(prev: Square[][], data: number[][]) {
    if (data.length !== 9) {
        return prev;
    }
    const prevCopy = prev.map(r => [...r]);
    for (let i = 0; i < data.length; i++) {
        if (data[i].length !== 9) {
            return prev;
        }
        prevCopy[i] = prevCopy[i].map((sq, j) => ({
            ...sq,
            value: data[i][j],
        }));
    }
    return prevCopy;
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

function changeSquareValidity(
    positions: [number, number][],
    val: boolean,
    setBoardState: Dispatch<SetStateAction<Square[][]>>,
) {
    setBoardState(prev => {
        const prevCopy = prev.map(r => [...r]);
        for (const [r, c] of positions) {
            prevCopy[r][c].isValid = val;
        }
        return prevCopy;
    });
}

function initializeBoard() {
    const emptyBoard: Square[][] = [];
    for (let row = 0; row < 9; row++) {
        emptyBoard.push([]);
        for (let col = 0; col < 9; col++) {
            emptyBoard[row].push({
                id: nanoid(),
                row,
                col,
                value: 0,
                isValid: true,
            });
        }
    }
    return emptyBoard;
}
