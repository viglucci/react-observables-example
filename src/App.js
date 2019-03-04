import React, { Component } from "react";
import "./App.css";
import Dragable from "./components/Dragable.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dragable />
      </div>
    );
  }
}

export default App;
