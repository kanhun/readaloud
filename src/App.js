import React from "react";
import "./styles.css";
import { words } from "./word";
import { Card } from "./card";
import { spelling } from "./spelling";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

const WordDisplay = () => {
  let params = useParams();
  // Correcting the adjustment for 1-based index input, ensuring it starts from 0 for JavaScript arrays
  let startIndex = Math.max(parseInt(params.startIndex, 10), 1) - 1; // Ensure it's at least 1 before subtracting
  let endIndex = parseInt(params.endIndex, 10) - 1; // Subtract 1 to convert to 0-based index

  // Handle cases where indices are not numbers or endIndex is not greater than startIndex
  if (isNaN(startIndex) || isNaN(endIndex) || endIndex <= startIndex) {
    startIndex = 0; // Default to starting from the first word
    endIndex = words.length; // Show all words by default
  }

  const speak = (idx) => {
    let w = spelling[idx];
    var u = new SpeechSynthesisUtterance();
    u.text = w;
    console.log(w);
    u.lang = "th-TH";
    u.rate = 1.2;
    speechSynthesis.speak(u);
  };

  return (
    <div className="App">
      {words.slice(startIndex, endIndex + 1).map((w, idx) => (
        <h1 key={idx} onClick={() => speak(startIndex + idx)}>
          <Card word={w} index={startIndex + idx} />{" "}
          {/* Adjust index to be 1-based for display */}
        </h1>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WordDisplay />} />
        <Route path="/:startIndex/:endIndex" element={<WordDisplay />} />
      </Routes>
    </Router>
  );
}
