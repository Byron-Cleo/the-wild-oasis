import styled from "styled-components";
import PropTypes from "prop-types";
import { HiXMark } from "react-icons/hi2";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
     stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// the 4 steps to folow as normal recipe creating compounded component
//1. creating new context as the global storage of state
const Modalcontext = createContext();

//2. defining a parent component
//this is the modal itself so that it can display the button and the window area for displaying
// //the modal content.
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <Modalcontext.Provider value={{ openName, close, open }}>
      {children}
    </Modalcontext.Provider>
  );
}

//3.
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(Modalcontext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  //getting values from the global context
  const { openName, close } = useContext(Modalcontext);
  const ref = useRef();
  console.log("TT", ref.current);

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Click outside");
          close();
        }
      }

      document.addEventListener("click", handleClick, true);

      //this is to unmount the eventlistener when the component unmounts
      return () => document.removeEventListener("click", handleClick, true);
    },
    [close]
  );

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.propTypes = {
  children: PropTypes.element,
};
Open.propTypes = {
  children: PropTypes.element,
  opens: PropTypes.string,
};
Window.propTypes = {
  children: PropTypes.element,
  name: PropTypes.string,
};

//4.now inserting the chldren components as properties to the parent modla component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
