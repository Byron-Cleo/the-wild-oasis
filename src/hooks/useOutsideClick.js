import { useEffect, useRef } from "react";

export function useOutsideClick(hanlder, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Click outside");
          hanlder();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      //this is to unmount the eventlistener when the component unmounts
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [hanlder, listenCapturing]
  );

  return ref;
}
