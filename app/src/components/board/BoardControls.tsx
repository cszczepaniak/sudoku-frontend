import React from "react";

interface BoardControlsProps {
    solve: () => void;
    solveError: string;
}

export const BoardControls: React.FunctionComponent<BoardControlsProps> = ({
    solve,
    solveError,
}) => {
    return (
        <div className="flex flex-row justify-between mb-2">
            <button
                aria-label="solve"
                className="py-1 px-2 w-32 rounded-md shadow-md text-gray-50 bg-blue-500 hover:bg-blue-600"
                onClick={solve}
            >
                Solve
            </button>
            {solveError !== "" && (
                <div
                    aria-label="solve-error"
                    className="py-1 px-2 bg-red-200 rounded-md"
                >
                    {solveError}
                </div>
            )}
        </div>
    );
};
