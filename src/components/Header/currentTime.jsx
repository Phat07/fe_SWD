import React from "react";

function CurrentTime(props) {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const formatDateTime = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    let dateTimeString = date.toLocaleDateString("vi-VN", options);
    // Remove the word "lúc" from the string
    dateTimeString = dateTimeString.replace('lúc', '');
    // Move "Thứ Tư" to a new line
    dateTimeString = dateTimeString.replace(/(GMT\+7)/, '\n$1');
    // Move "Thứ Tư" to a new line
    return dateTimeString;
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <strong>{formatDateTime(currentTime)}</strong>
    </div>
  );
}

export default CurrentTime;
