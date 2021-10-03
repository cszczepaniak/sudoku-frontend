import React, { Dispatch } from "react";
import { Box } from "./Box";
import { Square } from "./use-board";

interface BoxProps {
    board: Square[][];
    currentSelection: [number, number];
    minRow: number;
    minCol: number;
    setCurrentSelection: Dispatch<React.SetStateAction<[number, number]>>;
    setSquare: (i: number, j: number, n: number) => void;
    clearSquare: (i: number, j: number) => void;
}

export const BoxContainer: React.FunctionComponent<BoxProps> = ({
    setSquare,
    clearSquare,
    ...rest
}) => {
    const createInputChangeHandler =
        (i: number, j: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
                clearSquare(i, j);
                return;
            }
            const lastVal = e.target.value.substring(e.target.value.length - 1);
            const parsed = parseInt(lastVal);
            if (parsed === 0) {
                clearSquare(i, j);
                return;
            }
            if (parsed > 0 && parsed < 10) {
                setSquare(i, j, parsed);
            }
        };

    return (
        <Box createInputChangeHandler={createInputChangeHandler} {...rest} />
    );
};
