const ListItem = ({ task, isComplete }) => {
  return (
    <li className="card list">
      <input type="checkbox" className="list-select"></input>
      <h3 className="card-header">{task}</h3>
      <input type="text" maxlength="12" className="edit-text"></input>
      <button class="edit">
        <i className="material-icons">create</i>
      </button>
      <button className="delete">
        <i className="material-icons">delete</i>
      </button>
    </li>
  );
};

export default ListItem;
