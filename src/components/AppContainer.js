import { useState } from "react";
import ListContainer from "./ListContainer";
import { Col, Row } from "reactstrap";

const AppContainer = () => {
  const [Open, setOpen] = useState(false);

  const toggleAddBox = () => {
    setOpen(!Open);
  };
  return (
    <>
      <div className='container-md'>
        <Row>
          <Col>
            <ListContainer type='incomplete' />
          </Col>
          <Col>
            <ListContainer type='complete' />
          </Col>
        </Row>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={toggleAddBox}
        >
          <i className='material-icons'>add</i>
        </button>
      </div>
      <AddBox open={Open} toggleAddBox={toggleAddBox} />
    </>
  );
};

export default AppContainer;
