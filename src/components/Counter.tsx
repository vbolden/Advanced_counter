import { useState } from "react";

function Counter () {
    // USE STATES FOR COUNT AND STEP VALUE
    const [count, setCount] = useState(0)
    const [stepValue, setStepValue] = useState<number>(1)

    return (
        <div className="counter">
            <p>counter</p>
            <h1>Current Count: {count}</h1>

            <div className="button-container">
                <button>Increment</button>
                <button>Decrement</button>
                <button>Reset</button>
            </div>

            <label> Step Value: 
                <input type="number" value={stepValue} />
            </label>

            <div className="count-history">
                <p>Count History: </p>
            </div>
        </div>
    )
}

export default Counter;