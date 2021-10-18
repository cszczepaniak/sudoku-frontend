import React from "react";
import { Box } from "./Box";
import { Square, useBoard } from "./board-context";

interface BoxProps {
    minRow: number;
    minCol: number;
}

export const BoxContainer: React.FunctionComponent<BoxProps> = ({
    minRow,
    minCol,
}) => {
    const { board } = useBoard();

    const thisBox: Square[] = [];
    for (let i = minRow; i < minRow + 3; i++) {
        for (let j = minCol; j < minCol + 3; j++) {
            thisBox.push(board[i][j]);
        }
    }

    return <Box squares={thisBox} />;
};
