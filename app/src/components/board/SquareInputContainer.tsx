import React, { useEffect, useRef } from "react";
import { SquareInput } from "./SquareInput";
import { Square } from "./use-board";

interface SquareInputContainerProps {
    pos: [number, number];
    currentSelection: [number, number];
    isValid: boolean;
    sq: Square;
    createInputChangeHandler: (
        i: number,
        j: number,
    ) => React.ChangeEventHandler;
    setCurrentSelection: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export const SquareInputContainer: React.FunctionComponent<SquareInputContainerProps> =
    ({
        pos: [thisRow, thisCol],
        currentSelection: [selectedRow, selectedCol],
        sq,
        isValid,
        createInputChangeHandler,
        setCurrentSelection,
    }) => {
        const ref = useRef<HTMLInputElement | null>(null);
        const isSelected = thisRow === selectedRow && thisCol === selectedCol;

        useEffect(() => {
            if (isSelected) {
                ref.current?.focus();
            }
        }, [isSelected]);

        return (
            <SquareInput
                ref={ref}
                handleFocus={() => setCurrentSelection([thisRow, thisCol])}
                handleInputChange={createInputChangeHandler(thisRow, thisCol)}
                isSelected={isSelected}
                isValid={isValid}
                pos={[thisRow, thisCol]}
                sq={sq}
            />
        );
    };
