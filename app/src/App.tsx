import { BoardContainer } from "./components/board/BoardContainer";
import { BoardProvider } from "./components/board/board-context";

function App() {
    return (
        <div className="w-full h-screen flex flex-col justify-around items-center">
            <BoardProvider>
                <BoardContainer />
            </BoardProvider>
        </div>
    );
}

export default App;
