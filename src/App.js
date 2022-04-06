import React, { useEffect, useState } from "react";
import "./App.scss";
import COLORS_ARRAY from "./colorsArray";

const quoteURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const randomizeArrayIndex = (arr) => {
  console.log(arr);
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const useFetch = (url) => {
  const [data, setData] = useState(null);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return data;
};

function App() {
  const [color, setColor] = useState("#4FC1FF");

  const quotes = useFetch(quoteURL);
  console.log(quotes);
  const [currentQuote, setCurrentQuote] = useState({ author: "", quote: "" });
  useEffect(() => {
    if (quotes) {
      handleNewQuote();
    }
  }, [quotes]);

  const handleNewQuote = () => {
    let quoteArray = quotes.quotes;
    setCurrentQuote(randomizeArrayIndex(quoteArray));
    setColor(`${randomizeArrayIndex(COLORS_ARRAY)}`);
  };

  console.log(currentQuote);
  console.log(color);

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <div id="quote-box" style={{ color: color }}>
        <p id="text">"{currentQuote.quote}"</p>
        <p id="author">- {currentQuote.author}</p>
        <div className="buttons">
          <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${currentQuote.quote} - ${currentQuote.author}`}>
            <i class="fa fa-twitter" aria-hidden="true" style={{ color: color }}></i>
          </a>
          <button id="new-quote" onClick={() => handleNewQuote()} style={{ backgroundColor: color }}>
            Change Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
