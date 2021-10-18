import React, { useEffect, useRef } from "react";
import { SquareInput } from "./SquareInput";
import { Square, useBoard } from "./board-context";

interface SquareInputContainerProps {
    sq: Square;
}

export const SquareInputContainer: React.FunctionComponent<SquareInputContainerProps> =
    ({ sq }) => {
        const {
            selection: [selectedRow, selectedCol],
            setSelection,
            clearSquare,
            setSquare,
        } = useBoard();

        const ref = useRef<HTMLInputElement | null>(null);

        const { row, col } = sq;
        const isSelected = row === selectedRow && col === selectedCol;

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "") {
                clearSquare(row, col);
                return;
            }
            const lastVal = e.target.value.substring(e.target.value.length - 1);
            const parsed = parseInt(lastVal);
            if (parsed === 0) {
                clearSquare(row, col);
                return;
            }
            if (parsed > 0 && parsed < 10) {
                setSquare(row, col, parsed);
            }
        };

        useEffect(() => {
            if (isSelected) {
                ref.current?.focus();
            }
        }, [isSelected]);

        return (
            <SquareInput
                ref={ref}
                handleFocus={() => setSelection([row, col])}
                handleInputChange={handleInputChange}
                isSelected={isSelected}
                sq={sq}
            />
        );
    };
