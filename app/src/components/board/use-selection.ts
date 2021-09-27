import { useEffect, useState } from "react";
import { createArrowKeyHandler } from "./key-handlers";

const useInitialSelection = () => useState<[number, number]>([0, 0]);

export function useSelection(): ReturnType<typeof useInitialSelection> {
    const [selection, setSelection] = useInitialSelection();

    useEffect(() => {
        const handler = createArrowKeyHandler(setSelection);
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [setSelection]);

    return [selection, setSelection];
}
