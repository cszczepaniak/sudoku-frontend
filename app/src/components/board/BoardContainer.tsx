import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { BoardControls } from "./BoardControls";
import { useBoard } from "./use-board";
import { useSelection } from "./use-selection";

const solveURL =
    "https://ez5jsbsj7c.execute-api.us-east-2.amazonaws.com/dev/api/solve";

export const BoardContainer: React.FunctionComponent = () => {
    const [currentSelection, setCurrentSelection] = useSelection();
    const { board, setBoard } = useBoard(currentSelection);
    const [error, setError] = useState("");
    useEffect(() => {
        if (error !== "") {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

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
            <BoardControls solve={solve} solveError={error} />
            <Board
                board={board}
                currentSelection={currentSelection}
                setCurrentSelection={setCurrentSelection}
            />
        </div>
    );
};
