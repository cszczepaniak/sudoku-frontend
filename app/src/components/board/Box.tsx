import React from "react";
import { SquareInputContainer } from "./SquareInputContainer";
import { Square } from "./board-context";

interface BoxProps {
    squares: Square[];
}

export const Box: React.FunctionComponent<BoxProps> = ({ squares }) => {
    return (
        <div className="w-1/3 h-1/3 flex flex-row flex-wrap border-2 border-gray-800">
            {squares.map(sq => (
                <SquareInputContainer key={sq.id} sq={sq} />
            ))}
        </div>
    );
};
