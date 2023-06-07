import React from 'react';
import './App.css';
import Header from './Header';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <Header/>
      <header className="App-header">
        <div class="square">
          <Form/>
        </div>
      </header>
    </div>
  );
}

export default App;
