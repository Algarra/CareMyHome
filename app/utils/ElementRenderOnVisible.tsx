"use client";
import React, { useRef, useEffect, useState, ReactNode } from "react";

export const ElementRenderOnVisible = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "30%", // no margin
        threshold: 0, // 50% of target visible
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Clean up the observer
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return <div ref={targetRef}>{isVisible ? children : fallback ?? null}</div>;
};
