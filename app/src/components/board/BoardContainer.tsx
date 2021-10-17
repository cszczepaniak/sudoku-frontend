import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useMemo, useState } from "react";
import { useTimedState } from "../../common/hooks/use-timed-state";
import { Board } from "./Board";
import { BoardControls } from "./BoardControls";
import { useBoard, useBoardSize } from "./use-board";
import { useSelection } from "./use-selection";

const solveURL =
    "https://ez5jsbsj7c.execute-api.us-east-2.amazonaws.com/dev/api/solve";

interface invalidSquare {
    row: number;
    col: number;
    msg: string;
}

interface errorResponse {
    error: string;
    invalidSquares?: invalidSquare[];
}

export const BoardContainer: React.FunctionComponent = () => {
    const [currentSelection, setCurrentSelection] = useSelection();
    const { board, setBoard, setSquare, clearSquare, clearBoard } =
        useBoard(currentSelection);
    const [error, setError] = useTimedState("", 5000);
    const [invalidSquares, setInvalidSquares] = useState<invalidSquare[]>([]);
    const boardSize = useBoardSize();

    const invalidIndices: Set<number> = useMemo(() => {
        const s = new Set<number>();
        invalidSquares.forEach(sq => s.add(9 * sq.row + sq.col));
        return s;
    }, [invalidSquares]);

    const handleClear = () => {
        clearBoard();
        setInvalidSquares([]);
    };

    const solve = async () => {
        const data = board.map(r => [...r.map(n => n.value)]);
        setInvalidSquares([]);
        try {
            const response: AxiosResponse<number[][]> = await axios.post(
                solveURL,
                data,
            );
            setBoard(response.data);
        } catch (err) {
            let maybeAxiosErr = err as Error | AxiosError;
            if (!axios.isAxiosError(maybeAxiosErr)) {
                return;
            }
            const errResp: errorResponse = maybeAxiosErr.response?.data;
            if (!errResp) {
                setError("unknown error occurred");
                return;
            }
            setError(errResp.error);
            if (errResp.invalidSquares) {
                setInvalidSquares(errResp.invalidSquares);
            }
        }
    };

    return (
        <div className="p-16">
            <BoardControls
                clearBoard={handleClear}
                solve={solve}
                solveError={error}
            />
            <Board
                size={boardSize}
                board={board}
                currentSelection={currentSelection}
                setCurrentSelection={setCurrentSelection}
                setSquare={setSquare}
                clearSquare={clearSquare}
                invalidIndices={invalidIndices}
            />
        </div>
    );
};
