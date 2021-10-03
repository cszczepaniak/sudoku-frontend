import clsx from "clsx";
import React, { Dispatch } from "react";
import { contiguousTo2D } from "../utils";
import { Square } from "./use-board";

interface BoxProps {
    minRow: number;
    minCol: number;
    currentSelection: [number, number];
    setCurrentSelection: Dispatch<React.SetStateAction<[number, number]>>;
    board: Square[][];
}

export const Box: React.FunctionComponent<BoxProps> = ({
    minRow,
    minCol,
    currentSelection,
    setCurrentSelection,
    board,
}) => {
    const thisBox: Square[] = [];
    for (let i = minRow; i < minRow + 3; i++) {
        for (let j = minCol; j < minCol + 3; j++) {
            thisBox.push(board[i][j]);
        }
    }
    return (
        <div className="w-1/3 h-1/3 flex flex-row flex-wrap border-2 border-gray-800">
            {thisBox.map((sq, i) => {
                const [relRow, relCol] = contiguousTo2D(i);
                const [thisRow, thisCol] = [minRow + relRow, minCol + relCol];
                const isSelected =
                    currentSelection[0] === thisRow &&
                    currentSelection[1] === thisCol;

                return (
                    <input
                        key={sq.id}
                        className={clsx(
                            "w-1/3 h-1/3 border border-gray-400 text-center flex flex-row items-center justify-around cursor-default caret-transparent focus:outline-none",
                            isSelected && "bg-blue-300",
                            !isSelected && "hover:bg-blue-100",
                        )}
                        onFocus={() => setCurrentSelection([thisRow, thisCol])} // onFocus makes tab OR click work
                        type="tel" // force numeric keybaord on mobile
                        value={sq.value === 0 ? "" : sq.value}
                    />
                );
            })}
        </div>
    );
};
