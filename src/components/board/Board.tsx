import React from "react";
import { contiguousTo2D } from "../utils";
import { Box } from "./Box";
import { useBoard } from "./use-board";
import { useSelection } from "./use-selection";

export const Board: React.FunctionComponent = () => {
    const [currentSelection, setCurrentSelection] = useSelection();
    const { board } = useBoard(currentSelection);
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
