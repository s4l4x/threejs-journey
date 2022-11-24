// import * as React from "react";
import { useEffect, useState, useRef } from "react";
import tinycolor from "tinycolor2";
import chalk from "chalk";
import "./Clicker.css";

function Clicker({ keyName = "count", color, increment }) {
  const log = (text) => console.log(`${chalk.blue("[Clicker]")} ${text}`);

  /**
   * Hooks
   */
  const buttonRef = useRef();

  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  );

  const [baseColor, setBaseColor] = useState(color ?? "coral");

  // Init
  useEffect(() => {
    const clr = color ?? tinycolor.random().toString();
    setBaseColor(clr);

    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);

  // Count change
  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  function onClick() {
    setCount(count + 1);
    increment();
  }

  /**
   * Render
   */
  return (
    <div className="Clicker">
      <button
        ref={buttonRef}
        className="clickerButton"
        onClick={onClick}
        style={{ backgroundColor: baseColor }}
      >
        Click Me!
      </button>
      <p className="clickerP">Button clicked {count} times</p>
    </div>
  );
}
export default Clicker;
