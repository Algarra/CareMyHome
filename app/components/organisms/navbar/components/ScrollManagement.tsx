"use client";
import { useCartStore } from "../../../../zustand/cart";
import { useEffect } from "react";

export const ScrollManagement = ({
  alwaysTransparent,
}: {
  alwaysTransparent?: boolean;
}) => {
  const cartOpen = useCartStore((state) => state.open);
  const setNavbarAsTransparent = () => {
    document.getElementById("top-navbar")?.classList.add("navbar-transparent");
    document.getElementById("top-navbar")?.classList.remove("navbar-opaque");
  };

  const setNavbarAsNotTransparent = () => {
    document
      .getElementById("top-navbar")
      ?.classList.remove("navbar-transparent");
    document.getElementById("top-navbar")?.classList.add("navbar-opaque");
  };

  useEffect(() => {
    if (!alwaysTransparent) {
      const checkScrollPosition = () => {
        if (window.scrollY > 40) {
          setNavbarAsTransparent();
        } else {
          setNavbarAsNotTransparent();
        }
      };
      document.addEventListener("scroll", checkScrollPosition);
      return () => {
        document.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, []);

  useEffect(() => {
    if (cartOpen) {
      document
        .getElementById("top-navbar")
        ?.classList.add("force-navbar-to-opaque");
    } else {
      document
        .getElementById("top-navbar")
        ?.classList.remove("force-navbar-to-opaque");
    }
  }, [cartOpen]);

  return null;
};
