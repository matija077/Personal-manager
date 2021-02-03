import { useEffect } from "react";
import { createPortal } from "react-dom";

type PortalpropsType = {
    children: any
}

const Portal = ({children}: PortalpropsType) => {
  const mount = document.getElementById("portal-root");
  const el = document.createElement("article");
  console.log(children);

  useEffect(() => {
    if (!mount) {
        return;
    }

    mount.appendChild(el);

    return () => { mount.removeChild(el) };
  }, [el, mount]);

  return createPortal(children, el)
};

export default Portal;