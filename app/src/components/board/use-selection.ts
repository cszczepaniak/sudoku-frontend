import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
    createArrowKeyHandler,
    KeyModifier,
    useKeyHandler,
} from "./key-handlers";

type UseStateReturn<T> = [T, Dispatch<SetStateAction<T>>];

export function useSelection(): UseStateReturn<[number, number]> {
    const [selection, setSelection] = useState<[number, number]>([0, 0]);

    const left = useCallback(
        (m: KeyModifier) => {
            setSelection(prev => updateSelection(prev, "col", "dec", m.ctrl));
        },
        [setSelection],
    );
    const right = useCallback(
        (m: KeyModifier) => {
            setSelection(prev => updateSelection(prev, "col", "inc", m.ctrl));
        },
        [setSelection],
    );
    const up = useCallback(
        (m: KeyModifier) => {
            setSelection(prev => updateSelection(prev, "row", "dec", m.ctrl));
        },
        [setSelection],
    );
    const down = useCallback(
        (m: KeyModifier) => {
            setSelection(prev => updateSelection(prev, "row", "inc", m.ctrl));
        },
        [setSelection],
    );

    const arrowKeyHandler = createArrowKeyHandler({ left, right, up, down });
    useKeyHandler(arrowKeyHandler);

    return [selection, setSelection];
}

const maxSelection = 8;
function addCapped(n: number, i: number) {
    const res = n + i;
    if (res < 0) {
        return 0;
    }
    if (res > maxSelection) {
        return maxSelection;
    }
    return res;
}

const updateSelection = (
    prev: [number, number],
    dim: "row" | "col",
    dir: "inc" | "dec",
    skip: boolean,
) => {
    let newSelection: [number, number] = [...prev];
    let idx = 0;
    if (dim === "col") {
        idx = 1;
    }
    let toAdd = 1;
    if (skip) {
        toAdd = maxSelection;
    }
    if (dir === "dec") {
        toAdd *= -1;
    }
    newSelection[idx] = addCapped(newSelection[idx], toAdd);
    return newSelection;
};
