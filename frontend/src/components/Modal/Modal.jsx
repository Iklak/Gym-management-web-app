import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

function Modal({ handleClose, content, header }) {
  return (
    <div className="w-full h-[100vh] flex justify-center text-black top-0 left-0 fixed">
      <div className="w-1/2 bg-white rounded-lg h-fit mt-32">
        <div className="flex justify-between p-5">
          <div className="text-4xl font-semibold ">{header}</div>
          <div onClick={handleClose}>
            <ClearIcon sx={{ fontSize: "32px", cursor: "pointer" }} />
          </div>
        </div>
        <div className="mt-10">{content}</div>
      </div>
    </div>
  );
}

export default Modal;
