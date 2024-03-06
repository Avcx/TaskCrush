import AddBox from "./AddBox";
import { useState } from "react";
import ListContainer from "./ListContainer";
import BackDrop from "./BackDrop";
import ListItem from "./ListItem";

const AppContainer = () => {
  const [Open, setOpen] = useState(false);

  const toggleAddBox = () => {
    if (!Open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  return (
    <div className="container">
      <AddBox open={Open} toggleAddBox={toggleAddBox} />
      <BackDrop visible={Open} />
      <div className="app">
        <ListContainer type="incomplete" />
        <ListContainer type="complete" />
      </div>
      <button className="float-btn" onClick={toggleAddBox}>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
};

export default AppContainer;
