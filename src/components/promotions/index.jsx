import React, { useState, useEffect } from "react";

const messages = [
  "We are proud to be one of the largest auction houses in Vietnam",
  "Online Bids has always been a pioneer in applying information technology to auction activities.",
  "With the operating motto: “Bringing outstanding economic efficiency”",
  "We hope to satisfy you and look forward to accompanying you in the development process.",
];

function Promotions() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(currentMessageIndex + 1);
      } else {
        setCurrentMessageIndex(0);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentMessageIndex]);

  return (
    <div
      style={{
        backgroundColor: "#0F1A2A",
        height: "60px",
        overflow: "hidden",
        marginBottom: "20px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        color: "white",
      }}
    >
      <h5 style={{ textAlign: "center", paddingTop: "10px" }}>
        {messages[currentMessageIndex]}
      </h5>
    </div>
  );
}

export default Promotions;
