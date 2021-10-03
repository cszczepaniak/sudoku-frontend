import React, { Dispatch } from "react";
import { BoxSquare } from "./BoxContainer";
import { SquareInputContainer } from "./SquareInputContainer";

interface BoxProps {
    squares: BoxSquare[];
    currentSelection: [number, number];
    setCurrentSelection: Dispatch<React.SetStateAction<[number, number]>>;
    createInputChangeHandler: (
        i: number,
        j: number,
    ) => React.ChangeEventHandler;
}

export const Box: React.FunctionComponent<BoxProps> = ({
    createInputChangeHandler,
    setCurrentSelection,
    currentSelection,
    squares,
}) => {
    return (
        <div className="w-1/3 h-1/3 flex flex-row flex-wrap border-2 border-gray-800">
            {squares.map(bsq => (
                <SquareInputContainer
                    key={bsq.sq.id}
                    currentSelection={currentSelection}
                    sq={bsq.sq}
                    pos={bsq.absPos}
                    createInputChangeHandler={createInputChangeHandler}
                    setCurrentSelection={setCurrentSelection}
                />
            ))}
        </div>
    );
};
