import { useEffect, useState, Dispatch } from "react";
import * as KeyCode from "keycode-js";
import { ClearSquareFunc, SetSquareFunc } from "./use-board";

const useInitialSelection = () => useState<[number, number]>([0, 0]);

export function useSelection(
    setSquare: SetSquareFunc,
    clearSquare: ClearSquareFunc
): ReturnType<typeof useInitialSelection> {
    const [selection, setSelection] = useInitialSelection();

    // arrow keys handler
    useEffect(() => {
        const handler = createArrowKeyHandler(setSelection);
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [setSelection]);

    // number keys handler
    useEffect(() => {
        const handler = createNumberKeyHandler(
            selection,
            setSquare,
            clearSquare
        );
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [clearSquare, selection, setSquare]);

    return [selection, setSelection];
}

function createArrowKeyHandler(
    setSelection: Dispatch<React.SetStateAction<[number, number]>>
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

function createNumberKeyHandler(
    selection: [number, number],
    setSquare: SetSquareFunc,
    clearSquare: ClearSquareFunc
) {
    return (ev: KeyboardEvent) => {
        if (ev.code in codeToDigit) {
            const n = codeToDigit[ev.code];
            if (n > 0) {
                setSquare(selection[0], selection[1], codeToDigit[ev.code]);
                return;
            }
            clearSquare(selection[0], selection[1]);
        }
        switch (ev.code) {
            case KeyCode.CODE_X:
                clearSquare(selection[0], selection[1]);
                break;
        }
    };
}

const codeToDigit: { [key: string]: number } = {
    [KeyCode.CODE_0]: 0,
    [KeyCode.CODE_1]: 1,
    [KeyCode.CODE_2]: 2,
    [KeyCode.CODE_3]: 3,
    [KeyCode.CODE_4]: 4,
    [KeyCode.CODE_5]: 5,
    [KeyCode.CODE_6]: 6,
    [KeyCode.CODE_7]: 7,
    [KeyCode.CODE_8]: 8,
    [KeyCode.CODE_9]: 9,
    [KeyCode.CODE_NUMPAD0]: 0,
    [KeyCode.CODE_NUMPAD1]: 1,
    [KeyCode.CODE_NUMPAD2]: 2,
    [KeyCode.CODE_NUMPAD3]: 3,
    [KeyCode.CODE_NUMPAD4]: 4,
    [KeyCode.CODE_NUMPAD5]: 5,
    [KeyCode.CODE_NUMPAD6]: 6,
    [KeyCode.CODE_NUMPAD7]: 7,
    [KeyCode.CODE_NUMPAD8]: 8,
    [KeyCode.CODE_NUMPAD9]: 9,
};
