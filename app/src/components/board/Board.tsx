import React, { Dispatch, SetStateAction } from "react";
import { contiguousTo2D } from "../utils";
import { BoxContainer } from "./BoxContainer";
import { Square } from "./use-board";

interface BoardProps {
    board: Square[][];
    currentSelection: [number, number];
    size: number;
    setCurrentSelection: Dispatch<SetStateAction<[number, number]>>;
    setSquare: (i: number, j: number, n: number) => void;
    clearSquare: (i: number, j: number) => void;
}

export const Board: React.FunctionComponent<BoardProps> = ({
    board,
    currentSelection,
    size,
    setCurrentSelection,
    setSquare,
    clearSquare,
}) => {
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
                            board={board}
                            minRow={minRow}
                            minCol={minCol}
                            currentSelection={currentSelection}
                            setCurrentSelection={setCurrentSelection}
                            setSquare={setSquare}
                            clearSquare={clearSquare}
                        />
                    );
                })}
        </div>
    );
};
