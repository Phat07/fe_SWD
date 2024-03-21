import React, { useState, useEffect } from "react";

const messages = [
  "Chúng tôi tự hào là một trong những nhà đấu giá lớn nhất Việt Nam",
  "Đấu giá trực tuyến luôn là đơn vị tiên phong ứng dụng công nghệ thông tin vào hoạt động đấu giá.",
  "Với phương châm hoạt động: “Mang lại hiệu quả kinh tế vượt trội”",
  "Chúng tôi hy vọng sẽ làm bạn hài lòng và mong muốn được đồng hành cùng bạn trong quá trình phát triển.",
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
      <h5 style={{ textAlign: "center", paddingTop: "15px" }}>
        {messages[currentMessageIndex]}
      </h5>
    </div>
  );
}

export default Promotions;
