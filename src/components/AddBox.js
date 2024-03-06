import { useRef } from "react";
import ListItem from "./ListItem";

const AddBox = ({ open, toggleAddBox }) => {
  const item = useRef();

  const addItem = () => {
    return <ListItem task={item.current.value} isComplete={false} />;
  };
  return (
    <div className={open ? "card add-box open" : "card add-box close"}>
      <button id="close-dialog" onClick={toggleAddBox}>
        <i className="material-icons">close</i>
      </button>
      <h2>Add new item:</h2>
      <input maxLength="40" id="input-text" type="text" ref={item}></input>
      <button id="add-item">
        <i className="material-icons" onClick={addItem}>
          add
        </i>
      </button>
    </div>
  );
};

export default AddBox;
