import clsx from "clsx";
import React from "react";
import { Square } from "./use-board";

interface SquareProps {
    sq: Square;
    pos: [number, number];
    isSelected: boolean;
    isValid: boolean;
    ref: React.MutableRefObject<HTMLInputElement | null>;
    handleInputChange: React.ChangeEventHandler;
    handleFocus: () => void;
}

export const SquareInput = React.forwardRef<HTMLInputElement, SquareProps>(
    (
        {
            sq,
            pos: [row, col],
            isSelected,
            isValid,
            handleInputChange,
            handleFocus,
        },
        ref,
    ) => {
        return (
            <input
                ref={ref}
                key={sq.id}
                aria-label={`cell_${row}_${col}`}
                className={clsx(
                    "w-1/3 h-1/3 border border-gray-400 text-center flex flex-row items-center justify-around cursor-default caret-transparent focus:outline-none",
                    !isValid && "bg-red-200",
                    isSelected && isValid && "bg-blue-300",
                    !isSelected && isValid && "hover:bg-blue-100",
                )}
                onFocus={handleFocus} // onFocus makes tab OR click work
                onChange={handleInputChange}
                type="tel" // force numeric keybaord on mobile
                value={sq.value === 0 ? "" : sq.value}
            />
        );
    },
);
