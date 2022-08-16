import React from "react";

const ForceSync = (props) => {
  const { onClick } = props;

  return (
    <button
      style={{
        marginLeft: 40,
      }}
      onClick={onClick}
    >
      Sync
    </button>
  );
};

export default ForceSync;
