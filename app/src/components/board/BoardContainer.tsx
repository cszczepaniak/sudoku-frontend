import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useTimedState } from "../../common/hooks/use-timed-state";
import { Board } from "./Board";
import { BoardControls } from "./BoardControls";
import { useBoard, useBoardSize } from "./use-board";
import { useSelection } from "./use-selection";

const solveURL =
    "https://ez5jsbsj7c.execute-api.us-east-2.amazonaws.com/dev/api/solve";

export const BoardContainer: React.FunctionComponent = () => {
    const [currentSelection, setCurrentSelection] = useSelection();
    const { board, setBoard, setSquare, clearSquare, clearBoard } =
        useBoard(currentSelection);
    const [error, setError] = useTimedState("", 5000);
    const boardSize = useBoardSize();

    const solve = async () => {
        const data = board.map(r => [...r.map(n => n.value)]);
        try {
            const response: AxiosResponse<number[][]> = await axios.post(
                solveURL,
                data,
            );
            setBoard(response.data);
        } catch (err) {
            let maybeAxiosErr = err as Error | AxiosError;
            if (!axios.isAxiosError(maybeAxiosErr)) {
                console.log(maybeAxiosErr.message);
                return;
            }
            setError(maybeAxiosErr.response?.data?.detail ?? "");
        }
    };

    return (
        <div className="p-16">
            <BoardControls
                clearBoard={clearBoard}
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
            />
        </div>
    );
};
