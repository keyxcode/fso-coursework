import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

// The function that creates the component is wrapped inside a forwardRef()
// This way the component can access the ref that is assigned to it.
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // useImperativeHandle() is a React hook
  // used for defining functions in a component, which can be invoked from outside of the component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {/* props.children is a special prop */}
        {/* It's an array of children React components that are jammed between <Togglable><Children /></Togglable> */}
        {/* If a component is self closing then the children array is empty */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
