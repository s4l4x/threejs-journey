// import * as React from 'react';
import { useMemo, useState } from "react";
import tinycolor from "tinycolor2";
import "./App.css";
import Clicker from "./Clicker";
import People from "./People";

function App({ clickersCount = 1, children }) {
  const [showClicker, setShowClicker] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < clickersCount; i++) {
      colors.push(tinycolor.random().toString());
    }
    return colors;
  }, [clickersCount]);

  function increment() {
    setTotalCount(totalCount + 1);
  }

  function onClick(e) {
    setShowClicker(!showClicker);
  }

  return (
    <div className="App">
      <div className="appPanel">
        <h1>{`Clicker: ${totalCount}`}</h1>
        <button onClick={onClick}>
          {showClicker ? "Hide Clicker" : "Show Clicker"}
        </button>
        {showClicker && (
          <>
            <hr />
            {/* {Array.from(Array(5)).map((e, i) => ( */}
            {/* {[...Array(5)].map((e, i) => { */}
            {colors.map((color, i) => {
              const key = `Clicker_${i}`;
              return (
                <Clicker
                  key={key}
                  keyName={key}
                  increment={increment}
                  color={color}
                />
              );
            })}
          </>
        )}
      </div>
      <div className="appPanel">
        <People></People>
      </div>
    </div>
  );
}
export default App;
