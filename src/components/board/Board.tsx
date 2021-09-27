import React, { Dispatch, SetStateAction } from "react";
import { contiguousTo2D } from "../utils";
import { Box } from "./Box";
import { Square } from "./use-board";

interface BoardProps {
    board: Square[][];
    currentSelection: [number, number];
    setCurrentSelection: Dispatch<SetStateAction<[number, number]>>;
}

export const Board: React.FunctionComponent<BoardProps> = ({
    board,
    currentSelection,
    setCurrentSelection,
}) => {
    return (
        <div className="bg-gray-50 flex flex-row flex-wrap square">
            {Array(9)
                .fill(0)
                .map((_, i) => {
                    const [r, c] = contiguousTo2D(i);
                    const minRow = r * 3;
                    const minCol = c * 3;
                    return (
                        <Box
                            key={board[minRow][minCol].id}
                            board={board}
                            minRow={minRow}
                            minCol={minCol}
                            currentSelection={currentSelection}
                            setCurrentSelection={setCurrentSelection}
                        />
                    );
                })}
        </div>
    );
};
