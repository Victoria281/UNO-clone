import React from "react";
import AnimatedCursor from "react-animated-cursor";

const CursorTrails = ({ }) => {
  return (
    <div className="App">
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="193, 11, 111"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
      />
      <h1>Hello CodeSandbox</h1>
      <h1>Hello CodeSandbox</h1>
      <h1>Hello CodeSandbox</h1>
      <h1>Hello CodeSandbox</h1>

      <a className="link" href="#">
        shit
      </a>
      {/* <CustomCursor
        opacity={1}
        targets={[".link"]}
        customClass="custom-cursor"
        dimensions={50}
        fill="#000"
        smoothness={{
          movement: 0.2,
          scale: 0.1,
          opacity: 0.2
        }}
        targetOpacity={0.2}
        targetScale={2}
      /> */}
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default CursorTrails;