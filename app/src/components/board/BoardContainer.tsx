import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useTimedState } from "../../common/hooks/use-timed-state";
import { Board } from "./Board";
import { BoardControls } from "./BoardControls";
import { useBoard } from "./board-context";
import { useBoardSize } from "./use-board-size";

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
    const {
        board,
        setBoard,
        clearBoard,
        markSquaresInvalid,
        clearInvalidSquares,
    } = useBoard();
    const [error, setError] = useTimedState("", 5000);
    const boardSize = useBoardSize();

    const handleClear = () => {
        clearBoard();
        clearInvalidSquares();
    };

    const solve = async () => {
        const data = board.map(r => [...r.map(n => n.value)]);
        clearInvalidSquares();
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
                markSquaresInvalid(
                    errResp.invalidSquares.map(sq => [sq.row, sq.col]),
                );
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
            <Board size={boardSize} />
        </div>
    );
};
