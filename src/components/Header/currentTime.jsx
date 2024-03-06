import React from "react";

function CurrentTime(props) {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <strong>{currentTime.toLocaleTimeString()}</strong>
      <br />
      {formatDate(currentTime)}
    </div>
  );
}

export default CurrentTime;
