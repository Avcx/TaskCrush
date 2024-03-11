import { useRef } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
} from "reactstrap";
import ListItem from "./ListItem";

const AddBox = ({ open, toggleAddBox }) => {
  const item = useRef();

  const addItem = () => {
    toggleAddBox();
    return <ListItem task={item.current} isComplete={false} />;
  };
  return (
    <Modal isOpen={open} toggle={toggleAddBox} backdrop centered>
      <ModalHeader>Add new item:</ModalHeader>
      <ModalBody>
        <Input />
      </ModalBody>
      <ModalFooter>
        <Button onClick={addItem}>
          <i className="material-icons" onClick={addItem}>
            add
          </i>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddBox;

// <div className={open ? "card add-box open" : "card add-box close"}>
//   <button id="close-dialog" onClick={toggleAddBox}>
//     <i className="material-icons">close</i>
//   </button>
//   <h2>Add new item:</h2>
//   <input maxLength="40" id="input-text" type="text" ref={item}></input>
//   <button id="add-item">
//     <i className="material-icons" onClick={addItem}>
//       add
//     </i>
//   </button>
// </div>
