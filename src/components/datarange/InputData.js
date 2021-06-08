import React, { Component } from "react";
import { Button, Label, Alert, Input, Table } from "reactstrap";
import InputLine from "./InputLine";
import "./input.css";
import AddIcon from "../../icons/plus.svg";

import { DataContext } from "../../contexts/DataContext";
const TableBody = (props) => {
  const rows = props.data.map((item, i) => {
    return (
      <InputLine
        itemObject={item}
        labId={i}
        removeRow={props.removeRow}
        onChange={props.handleOnChange}
      />
    );
  });
  return <tbody>{rows}</tbody>;
};

class InputData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: props.resultData,
      data: [],
      numberOfLines: 0,
      isRenderForm: false,
      methodName: props.methodName
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.setRows = this.setRows.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.setNumOfLines = this.setNumOfLines.bind(this);
    this.setMethodName = this.setMethodName.bind(this);
    this.addALine = this.addALine.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(e) {
    let objectItem = e.target.name.split("-");
    let itemID = objectItem[1];
    let prop = objectItem[0];
    let prevState = [...this.state.data];
    // console.log(e.target.name);
    let index = prevState.findIndex((i) => {
      return i.idData === parseInt(itemID);
    });
    if (index !== -1) {
      prevState[index][prop] = e.target.value;
      this.setState((state) => {
        return { data: prevState };
      });
    }
  }
  setNumOfLines(e) {
    this.setState({ numberOfLines: Number(e.target.value) });
  }
  setMethodName(e) {
    this.setState({ methodName: e.target.value });
  }
  async addALine() {
    this.setState((state) => {
      return {
        numberOfLines: state.numberOfLines + 1,
        data: [
          ...state.data,
          {
            idData:
              this.state.data.length !== 0
                ? Math.max(
                    ...this.state.data.map((item) => parseInt(item.idData))
                  ) + 1
                : 0,
            idPTN:
              this.state.data.length !== 0
                ? Math.max(
                    ...this.state.data.map((item) => parseInt(item.idData))
                  ) + 1
                : 0,
            result1: 0,
            result2: 0
          }
        ]
      };
    });
    this.updateInputValue(this.state.numberOfLines + 1);
  }

  updateInputValue(value) {
    let input = document.getElementById("no-of-lines");
    input.value = value;
  }
  createNewLine(i) {
    return <InputLine labId={i} removeRow={this.removeRow} />;
  }

  setRows() {
    if (this.state.numberOfLines !== 0) {
      let newState = [];
      for (let i = 0; i < this.state.numberOfLines; i++) {
        newState.push({
          idData: i,
          idPTN: i,
          result1: 0,
          result2: 0
        });
      }
      this.setState({ data: newState, isRenderForm: true });
    }
  }
  removeRow(id) {
    this.updateInputValue(
      this.state.numberOfLines === 0 ? 0 : this.state.numberOfLines - 1
    );
    this.setState({
      data: this.state.data.filter((item, i) => {
        return id !== item;
      }),
      numberOfLines:
        this.state.numberOfLines === 0 ? 0 : this.state.numberOfLines - 1
    });
  }
  renderForm() {
    return (
      <div>
        <Table borderless>
          <thead>
            <tr>
              <th>Mã Số PTN</th>
              <th colSpan="2" className="tb-header">
                Kết quả
              </th>
              <th></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="tb-header pd-sm">
                <img onClick={this.addALine} className="icon" src={AddIcon} />
              </th>
              <th className="tb-header tb-header--input">Lần 1</th>
              <th className="tb-header tb-header--input">Lần 2</th>
              <th></th>
            </tr>
          </thead>
          <TableBody
            data={this.state.data}
            removeRow={this.removeRow}
            handleOnChange={this.handleOnChange}
          />
        </Table>
        <DataContext.Consumer>
          {({ updateResult, updateMethodName }) => (
            <Button
              className="submit-btn"
              onClick={(e) => {
                this.onSubmit(e, updateResult, updateMethodName);
              }}
              color="primary"
            >
              Tính toán
            </Button>
          )}
        </DataContext.Consumer>
      </div>
    );
  }

  onSubmit(event, updateResult, updateMethodName) {
    event.preventDefault();
    updateMethodName(this.state.methodName);
    updateResult(
      this.state.data.map((item) => {
        return {
          idPTN: item.idPTN,
          result: (parseFloat(item.result1) + parseFloat(item.result2)) / 2
        };
      })
    );
  }
  render() {
    let { isRenderForm } = this.state;
    return (
      <div className="input-layout col-xl-4 col-md-4 col-sm-12">
        <Alert color="primary">
          <h3>Dữ liệu phân tích</h3>
        </Alert>
        <Alert color="info">
          <div className="input-form--numlabs">
            <Label
              for="method-name"
              className="input-label input-label__numberoflab input-label--methodname"
            >
              Tên chỉ tiêu:
            </Label>
            <Input
              className="input-box__methodname"
              type="text"
              id="method-name"
              onInput={this.setMethodName}
            />
          </div>
        </Alert>
        <div className="input-form">
          <div className="input-form--numlabs">
            <Label
              for="no-of-lines"
              className="input-label input-label__numberoflab"
            >
              Số lượng PTN:
            </Label>
            <Input
              className="input-box__name"
              type="number"
              min="0"
              id="no-of-lines"
              onInput={this.setNumOfLines}
            />
          </div>
          <Button size="sm" onClick={this.setRows}>
            Tạo
          </Button>
        </div>
        {isRenderForm && this.renderForm()}
      </div>
    );
  }
}

export default InputData;
