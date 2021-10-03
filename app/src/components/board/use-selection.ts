import React, { useCallback, useEffect, useState } from "react";
import { createArrowKeyHandler } from "./key-handlers";

type UseStateReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export function useSelection(): UseStateReturn<[number, number]> {
    const [selection, setSelection] = useState<[number, number]>([0, 0]);

    const left = useCallback(
        () => setSelection(prev => [prev[0], addCapped(prev[1], -1)]),
        [setSelection],
    );
    const right = useCallback(
        () => setSelection(prev => [prev[0], addCapped(prev[1], 1)]),
        [setSelection],
    );
    const up = useCallback(
        () => setSelection(prev => [addCapped(prev[0], -1), prev[1]]),
        [setSelection],
    );
    const down = useCallback(
        () => setSelection(prev => [addCapped(prev[0], 1), prev[1]]),
        [setSelection],
    );

    useEffect(() => {
        const handler = createArrowKeyHandler({ left, right, up, down });
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [down, left, right, up]);

    return [selection, setSelection];
}

const maxSelection = 8;
function addCapped(n: number, i: number) {
    const res = n + i;
    if (res < 0 || res > maxSelection) {
        return n;
    }
    return res;
}
