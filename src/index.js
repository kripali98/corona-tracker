import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tracker from "./Components/Tracker";

class App extends React.Component {
  render() {
    return <Tracker/>;
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
