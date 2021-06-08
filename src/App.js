import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import InputData from "./components/datarange/InputData";
import Navbar from "./components/layout/Navbar";
import ResultData from "./components/resultrange/ResultData";
import { DataProvider } from "./contexts/DataContext";

class App extends Component {
  constructor() {
    super();
    this.state = {
      resultData: [],
      analizeData: [],
      meanValue: 0,
      methodName: ""
    };
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="row">
          <DataProvider>
            <InputData resultData={this.state.resultData} />
            <ResultData resultData={this.state.resultData} />
          </DataProvider>
        </div>
      </div>
    );
  }
}

export default App;
