import { useMemo, useRef } from "react";

const BackDrop = ({ visible }) => {
  let zIndex = useRef(0);
  let visibility = useRef("hidden");
  let style = {
    zIndex: zIndex.current,
    visibility: visibility.current,
  };

  useMemo(() => {
    if (!visible) {
      zIndex.current = 0;
      visibility.current = "hidden";
    } else {
      zIndex.current = 90;
      visibility.current = "visible";
    }
  }, [visible]);

  return (
    <div
      id="backdrop"
      className={visible ? "open" : "close"}
      style={style}
    ></div>
  );
};

export default BackDrop;
