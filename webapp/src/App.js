import React from 'react';
import './App.css';

function App() {
  return (
    <form id="wordItForm">
    <header>
        <div class="bubble" ng-if="submitted">
            <div class="bubble__triangle"></div>
        </div>

        <div class="title">
            <span class="title__name">w0rd.it</span>
            <span class="title__slash">/</span>
            <span class="title__hash"></span>
        </div>

        <div class="primer">Get a memorable word for your bad-ass URL.</div>
    </header>

    <fieldset class="content">
        <div class="control">
            <input class="control__input" type="text" placeholder="Paste your URL."/>
            <button class="control__button" type="submit">
                <span>Word it</span>
            </button>
        </div>
    </fieldset>

    <footer>A serverless pet project.</footer>
</form>
  );
}

export default App;
