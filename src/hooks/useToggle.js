import { useState } from "react";

const useToggle = (initial = false) => {
  const [toggle, setToggle] = useState(initial);

  function handleToggle() {
    setToggle(!toggle);
  }

  return { toggle, handleToggle };
};

export default useToggle;