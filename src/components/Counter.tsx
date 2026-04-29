import { useState, useEffect } from "react";

function Counter() {
    // USE STATES FOR COUNT AND STEP VALUE
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem("countHistory");
        if(saved) {
            const parsed = JSON.parse(saved);
            return parsed[parsed.length - 1]; 
        } return 0
    });
    const [stepValue, setStepValue] = useState<number>(1);
    // USE STATE FOR COUNT HISTORY
    const [history, setHistory] = useState<number[]>(() => {
        const saved = localStorage.getItem('countHistory');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        setHistory((prevHistory) => {
            if(prevHistory[prevHistory.length - 1] === count) {
                return prevHistory // PREVENTS DUPLICATES
            }

            const updated = [...prevHistory, count];
            localStorage.setItem("countHistory", JSON.stringify(updated));
            return updated;
        })
    }, [count]);

    // FUNCTIONS FOR INCREMENT, DECREMENT, AND RESET COUNT
    const add = () => {
        setCount(count + stepValue)
    }

    const sub = () => {
        setCount(count - stepValue)
    }

    // RESET COUNT AND STEP VALUE
    const reset = () => {
        setCount(0)
        setStepValue(1)

        const resetHistory = [0]
        setHistory(resetHistory)
        localStorage.setItem("countHistory", JSON.stringify(resetHistory))
    }

    // HANDLE STEP VALUE CHANGE
    const handleStepValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value)
        setStepValue(newValue)
    }


    return (
        <div className="counter">
            <p>counter</p>
            <h1>Current Count: {count}</h1>

            <div className="button-container">
                <button onClick={add}>Increment</button>
                <button onClick={sub}>Decrement</button>
                <button onClick={reset} className="reset">Reset</button>
            </div>

            <label> Step Value:
                <input type="number" value={stepValue} onChange={handleStepValue} />
            </label>

            <div className="count-history">
                <p>Count History: </p>
                <hr />
                <div className="history">
                    <ul>
                        {history.map((value, index) =>
                            <li key={index}>{value}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Counter;