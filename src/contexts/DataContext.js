import React, { Component } from "react";

export const DataContext = React.createContext();

export const DataProvider = class extends Component {
  constructor(props) {
    super(props);
    this.state = { resultData: props.resultData, methodName: props.methodName };
    this.updateResult = this.updateResult.bind(this);
    this.updateMethodName = this.updateMethodName.bind(this);
  }
  updateResult(result) {
    this.setState({ resultData: result });
  }
  updateMethodName(name) {
    this.setState({ methodName: name });
  }
  render() {
    return (
      <DataContext.Provider
        value={{
          methodName: this.state.methodName,
          resultData: this.state.resultData,
          updateResult: this.updateResult,
          updateMethodName: this.updateMethodName
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
};
