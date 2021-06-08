import React, { Component } from "react";
import { Table } from "reactstrap";
import { DataContext } from "../../contexts/DataContext";
import ProcessData from "./ProcessData";
import ShowData from "./ShowData";
const TableBody = (props) => {
  const rows = props.data.map((item, i) => {
    return (
      <tr className="text-center">
        <td>{item.idPTN}</td>
        <td>{item.result}</td>
        <td>{item.zcore}</td>
        <td>
          {Math.abs(item.zcore) < 2 ? (
            <div className="alert-info text-center">Đạt</div>
          ) : Math.abs(item.zcore) >= 2 && Math.abs(item.zcore) <= 3 ? (
            <div className="alert-warning text-center">Nghi ngờ</div>
          ) : (
            <div className="alert-danger text-center">Số lạc</div>
          )}
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
};
class ResultData extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {({ resultData, methodName }) => {
          if (resultData) {
            console.log(resultData.map((item) => item.result));
            let processData = new ProcessData();
            let { avg, rsd } = processData.calc(
              resultData.map((item) => item.result)
            );

            let data = resultData.map((item) => {
              return {
                idPTN: item.idPTN,
                result: Number(item.result).toFixed(2),
                zcore:
                  rsd !== 0 ? Number((item.result - avg) / rsd).toFixed(2) : 0
              };
            });

            return (
              <div className="col-xl-8 col-md-8 col-sm-12">
                <h4>Bảng 1. Kết quả đánh giá</h4>
                <Table>
                  <thead>
                    <tr className="text-center">
                      <th>Mã Số PTN</th>
                      <th>Kết quả trung bình</th>
                      <th>Z-core</th>
                      <th>Đánh giá</th>
                    </tr>
                  </thead>

                  <TableBody data={data} />
                </Table>
                <br />
                <h4>Bảng 2. Tóm tắt thông số đánh giá</h4>
                <Table bordered>
                  <thead>
                    <tr className="text-center">
                      <th>Tên chỉ tiêu</th>
                      <th>Giá trị ấn định (%)</th>
                      <th>Độ KĐBĐ (%)</th>
                      <th>Độ lệch chuẩn (%)</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="text-center">
                      <td>{methodName}</td>
                      <td>{Number(avg).toFixed(2)}</td>
                      <td>
                        {Number((1.25 * rsd) / Math.sqrt(data.length)).toFixed(
                          2
                        )}
                      </td>
                      <td>{Number(rsd).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
                <ShowData data={data} />
              </div>
            );
          }
        }}
      </DataContext.Consumer>
    );
  }
}

export default ResultData;
