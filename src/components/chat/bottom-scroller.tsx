"use client";

import React, { useEffect, useRef } from "react";

interface BottomScrollerProps {
  dependencies: any[];
}

const BottomScroller: React.FC<BottomScrollerProps> = ({ dependencies }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [dependencies.length]);

  return <div ref={containerRef} style={{ height: 0, overflow: "hidden" }} />;
};

export default BottomScroller;
