// import * as React from "react";
import { useEffect, useState } from "react";
import "./People.css";

function People() {
  const [people, setPeople] = useState([]);

  const getPeople = async () => {
    console.log("getPeople");

    // Version 1 (no async)
    // const request = fetch("https://jsonplaceholder.typicode.com/users");
    // request.then((response) => {
    //   const parse = response.json();
    //   parse.then((result) => console.log(result));
    // });

    // Version 2 (no async)
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then((result) => console.log(result));

    // Version 3
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();
    setPeople(result);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="People">
      <h1>People</h1>
      <ul>
        {people.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
export default People;
