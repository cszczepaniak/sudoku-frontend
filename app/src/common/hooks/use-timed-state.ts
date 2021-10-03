import { useEffect, useState } from "react";

export function useTimedState<T>(defaultVal: T, timeout: number) {
    const state = useState(defaultVal);
    useEffect(() => {
        if (state[0] !== defaultVal) {
            const timer = setTimeout(() => state[1](defaultVal), timeout);
            return () => clearTimeout(timer);
        }
    }, [defaultVal, timeout, state]);
    return state;
}
