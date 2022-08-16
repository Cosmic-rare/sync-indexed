import React, { useState, useEffect } from "react";

const useSync = (props) => {
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    setStatus(navigator.onLine ? "Online" : "Offline");
  }, []);

  window.addEventListener("online", () => {
    setStatus("Online");
  });

  window.addEventListener("offline", () => {
    setStatus("Offline");
  });

  return status;
};

export default useSync;
