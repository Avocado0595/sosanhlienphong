import React from "react";
import { Input } from "reactstrap";
import TrashIcon from "../../icons/trash.svg";
const InputLine = (props) => {
  let { labId, removeRow, itemObject, onChange } = props;
  return (
    <tr className="text-center">
      <td>
        <Input
          onChange={(e) => onChange(e)}
          key={"idPTN-" + itemObject.idData}
          className="form-control input-box__name"
          id={"idPTN-" + labId}
          type="text"
          name={"idPTN-" + itemObject.idData}
          defaultValue={itemObject.idPTN}
        />
      </td>

      <td>
        <Input
          onChange={(e) => onChange(e)}
          className="input-box__number"
          id={"result-" + labId + "1"}
          type="number"
          min="0"
          step="0.01"
          name={"result1-" + itemObject.idData}
          key={"result1-" + itemObject.idData}
          defaultValue={itemObject.result1}
        />
      </td>

      <td>
        <Input
          onChange={(e) => onChange(e)}
          className="input-box__number"
          id={"result-" + labId + "2"}
          type="number"
          min="0"
          step="0.01"
          name={"result2-" + itemObject.idData}
          key={"result2-" + itemObject.idData}
          defaultValue={itemObject.result2}
        />
      </td>

      <td>
        <img
          alt="delete-btn"
          src={TrashIcon}
          className="icon"
          id={"del-" + labId}
          onClick={() => removeRow(itemObject)}
          name={"delete-" + itemObject.idData}
        />
      </td>
    </tr>
  );
};

export default InputLine;
