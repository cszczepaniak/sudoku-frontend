import * as KeyCode from "keycode-js";
import { useEffect } from "react";
import { ClearSquareFunc } from "./use-board";

export function useKeyHandler(handler: (ev: KeyboardEvent) => void) {
    useEffect(() => {
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [handler]);
}

interface ArrowKeyHandlers {
    left: () => void;
    right: () => void;
    up: () => void;
    down: () => void;
}

export function createArrowKeyHandler({
    left,
    right,
    up,
    down,
}: ArrowKeyHandlers) {
    return (ev: KeyboardEvent) => {
        switch (ev.code) {
            case KeyCode.CODE_LEFT:
                left();
                break;
            case KeyCode.CODE_RIGHT:
                right();
                break;
            case KeyCode.CODE_UP:
                up();
                break;
            case KeyCode.CODE_DOWN:
                down();
                break;
        }
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
