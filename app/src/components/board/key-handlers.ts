import * as KeyCode from "keycode-js";
import { Dispatch, useEffect } from "react";
import { ClearSquareFunc } from "./use-board";

export function useKeyHandler(handler: (ev: KeyboardEvent) => void) {
    useEffect(() => {
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [handler]);
}

export function createArrowKeyHandler(
    setSelection: Dispatch<React.SetStateAction<[number, number]>>,
) {
    return (ev: KeyboardEvent) => {
        setSelection(prev => {
            let prevCopy: [number, number] = [...prev];
            switch (ev.code) {
                case KeyCode.CODE_LEFT:
                    prevCopy[1] = prevCopy[1] > 0 ? prevCopy[1] - 1 : 0;
                    break;
                case KeyCode.CODE_RIGHT:
                    prevCopy[1] = prevCopy[1] < 8 ? prevCopy[1] + 1 : 8;
                    break;
                case KeyCode.CODE_UP:
                    prevCopy[0] = prevCopy[0] > 0 ? prevCopy[0] - 1 : 0;
                    break;
                case KeyCode.CODE_DOWN:
                    prevCopy[0] = prevCopy[0] < 8 ? prevCopy[0] + 1 : 8;
                    break;
            }
            return prevCopy;
        });
    };
}

export function createKeyboardShortcutHandler(
    selection: [number, number],
    clearSquare: ClearSquareFunc,
    clearBoard: () => void,
) {
    return (ev: KeyboardEvent) => {
        switch (ev.code) {
            case KeyCode.CODE_X:
                clearSquare(selection[0], selection[1]);
                break;
            case KeyCode.CODE_ESCAPE:
                clearBoard();
                break;
        }
    };
}
