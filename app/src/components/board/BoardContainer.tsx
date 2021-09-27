import axios, { AxiosResponse } from "axios";
import React from "react";
import { Board } from "./Board";
import { useBoard } from "./use-board";
import { useSelection } from "./use-selection";

const solveURL =
    "https://ez5jsbsj7c.execute-api.us-east-2.amazonaws.com/dev/api/solve";

export const BoardContainer: React.FunctionComponent = () => {
    const [currentSelection, setCurrentSelection] = useSelection();
    const { board, setBoard } = useBoard(currentSelection);

    const solve = async () => {
        const data = board.map(r => [...r.map(n => n.value)]);
        const response: AxiosResponse<number[][]> = await axios.post(
            solveURL,
            data,
        );
        setBoard(response.data);
    };

    return (
        <div className="p-16">
            <button
                className=" mb-2 py-1 px-2 w-32 rounded-md shadow-md text-gray-50 bg-blue-500 hover:bg-blue-600"
                onClick={solve}
            >
                Solve
            </button>
            <Board
                board={board}
                currentSelection={currentSelection}
                setCurrentSelection={setCurrentSelection}
            />
        </div>
    );
};
