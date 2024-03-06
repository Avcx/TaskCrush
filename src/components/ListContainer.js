const ListContainer = ({ type }) => {
  let className = "list-conatiner ";
  type === "incomplete"
    ? (className += "incompete")
    : (className += "complete");
  return <ul className={className}></ul>;
};

export default ListContainer;
