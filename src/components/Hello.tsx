import React, { useCallback } from "react";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => {
  const handleClick = useCallback(() => {
    console.log("@@@@@@@@@@@@@");
  }, []);

  return (
    <h1 onClick={handleClick}>
      Hello from {props.compiler} and {props.framework}!
    </h1>
  );
};
