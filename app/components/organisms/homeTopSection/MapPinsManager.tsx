"use client";

import { useEffect } from "react";

const MapPinsManager = () => {
  useEffect(() => {
    let elementMoving = 0;
    setInterval(function () {
      const pins = document.getElementsByClassName("image-pin");

      Array.from(pins).forEach((element, index) => {
        if (index === elementMoving) {
          element.classList.add("customBounce");
        } else {
          element.classList.remove("customBounce");
        }
      });

      if (elementMoving === 3) elementMoving = 0;
      else elementMoving = elementMoving + 1;
    }, 2000);
  }, []);

  return null;
};

export default MapPinsManager;
