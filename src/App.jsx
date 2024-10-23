import React, { useState, useCallback, useEffect } from 'react';

import { fetchCounter, randomize } from "./helpers";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [counters, setCounters] = useState({});

  const incrementCounter = useCallback((counterId) => {
    if (typeof counters[counterId] === 'undefined') {
      return;
    }
    const currentValue = counters[counterId];
    setCounters({...counters, [counterId]: currentValue + 1 });
  }, [counters]);

  const decrementCounter = useCallback((counterId) => {
    if (typeof counters[counterId] === 'undefined') {
      return;
    }
    const currentValue = counters[counterId];
    setCounters({...counters, [counterId]: currentValue - 1 });
  }, [counters]);

  const randomizeCounter = useCallback((counterId) => {
    const newNumber = randomize();
    if (typeof counters[counterId] === 'undefined') {
      return;
    }
    setCounters({...counters, [counterId]: newNumber });
  }, [counters]);

  const addCounter = useCallback(async () => {
    setIsLoading(true);
    const sortedCounters = Object.keys(counters).map(key => parseInt(key)).sort((a, b) => b - a);
    const lastCounter = sortedCounters.length > 0 ? sortedCounters[0] : 0;
    const fetchedValue = await fetchCounter();
    setCounters({...counters, [lastCounter + 1]: fetchedValue });
    setIsLoading(false);
  }, [counters]);

  useEffect(() => {
    addCounter();
  }, []);

  return (
    <div>
      {isLoading && 'Loading...'}
      {!isLoading && (
        <div>
          {Object.entries(counters).map(([id, value]) => (
            <div key={id}>
              <button onClick={() => decrementCounter(id)}>Decrement</button>
              &nbsp;
              <span>Counter: {value}</span>
              &nbsp;
              <button onClick={() => incrementCounter(id)}>Increment</button>
              &nbsp;
              <button onClick={() => randomizeCounter(id)}>Randomize</button>
              <br/>
              <br/>
            </div>
          ))}
          <button onClick={addCounter}>Add counter</button>
        </div>
      )}
    </div>
  )
}

export default App;
