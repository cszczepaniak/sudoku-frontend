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

export interface KeyModifier {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
}

interface ArrowKeyHandlers {
    left: (m: KeyModifier) => void;
    right: (m: KeyModifier) => void;
    up: (m: KeyModifier) => void;
    down: (m: KeyModifier) => void;
}

export function createArrowKeyHandler({
    left,
    right,
    up,
    down,
}: ArrowKeyHandlers) {
    return (ev: KeyboardEvent) => {
        const cmdMap: { [key: string]: (m: KeyModifier) => void } = {
            [KeyCode.CODE_LEFT]: left,
            [KeyCode.CODE_RIGHT]: right,
            [KeyCode.CODE_UP]: up,
            [KeyCode.CODE_DOWN]: down,
        };
        if (cmdMap[ev.code]) {
            cmdMap[ev.code]({
                ctrl: ev.ctrlKey,
                shift: ev.shiftKey,
                alt: ev.altKey,
            });
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
            case KeyCode.CODE_DELETE:
                clearSquare(selection[0], selection[1]);
                break;
            case KeyCode.CODE_ESCAPE:
                clearBoard();
                break;
        }
    };
}
