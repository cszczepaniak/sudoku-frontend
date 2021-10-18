import { useEffect, useState } from "react";

export function useBoardSize() {
    const calcSize = () =>
        Math.min(0.9 * window.innerHeight, 0.9 * window.innerWidth);
    const [boardSize, setBoardSize] = useState(calcSize());
    useEffect(() => {
        const handleResize = () => {
            setBoardSize(calcSize());
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return boardSize;
}
