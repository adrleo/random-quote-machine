import React, { useEffect, useState } from "react";
import "./App.scss";

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
  };

  console.log(currentQuote);

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text">"{currentQuote.quote}"</p>
        <p id="author">- {currentQuote.author}</p>
        <div className="buttons">
          <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${currentQuote.quote} - ${currentQuote.author}`}>
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <button id="new-quote" onClick={() => handleNewQuote()}>
            Change Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
