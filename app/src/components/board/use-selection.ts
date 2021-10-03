import { useEffect, useState } from "react";
import { createArrowKeyHandler } from "./key-handlers";

export function useSelection() {
    const state = useState<[number, number]>([0, 0]);

    useEffect(() => {
        const handler = createArrowKeyHandler(state[1]);
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [state]);

    return state;
}
