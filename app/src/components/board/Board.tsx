import React from "react";
import { contiguousTo2D } from "../utils";
import { BoxContainer } from "./BoxContainer";
import { useBoard } from "./board-context";

interface BoardProps {
    size: number;
}

export const Board: React.FunctionComponent<BoardProps> = ({ size }) => {
    const { board } = useBoard();
    return (
        <div
            className="bg-gray-50 flex flex-row flex-wrap"
            style={{ height: size, width: size }}
        >
            {Array(9)
                .fill(0)
                .map((_, i) => {
                    const [r, c] = contiguousTo2D(i, 3);
                    const minRow = r * 3;
                    const minCol = c * 3;
                    return (
                        <BoxContainer
                            key={board[minRow][minCol].id}
                            minRow={minRow}
                            minCol={minCol}
                        />
                    );
                })}
        </div>
    );
};
