import React from "react";

export default function ConfirmDialog({ 
  title, 
  description, 
  onConfirm, 
  onCancel, 
  isOpen 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#212121] p-10 shadow-lg w-80 text-center">
          <svg className="mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" width="92" height="92" fill="none" viewBox="0 0 92 92">
            <path className="fill-[#1A1A1A] dark:fill-white" fillOpacity="0.1" d="M92 46c0 25.405-20.595 46-46 46S0 71.405 0 46 20.595 0 46 0s46 20.595 46 46"></path>
            <path className="fill-[#1A1A1A] dark:fill-white" d="M44.682 62.336c2.14 0 3.876 1.723 3.876 3.848v.03c0 2.125-1.736 3.848-3.876 3.848h-.03c-2.141 0-3.876-1.723-3.876-3.848v-.03c0-2.125 1.735-3.848 3.876-3.848zm-3.903-7.695v-2.885c0-5.496 4.558-8.932 7.805-10.495h.004a7.6 7.6 0 0 0 1.722-1.123l.012-.011c2.775-2.41 2.776-6.078 0-8.488h-.004c-3.077-2.674-8.26-2.674-11.337 0a3.9 3.9 0 0 1-5.47-.36 3.83 3.83 0 0 1 .368-5.43c5.999-5.212 15.541-5.214 21.542-.004 6.308 5.477 6.312 14.599.003 20.075l-.004-.003a15.4 15.4 0 0 1-3.46 2.273l-.003-.004c-1.104.532-2.04 1.213-2.657 1.913-.598.679-.769 1.226-.769 1.657v2.885c0 2.125-1.735 3.848-3.876 3.848s-3.875-1.723-3.876-3.848"></path>
          </svg>
          <h2 className="text-[#1A1A1A] dark:text-white text-2xl font-bold mb-1">{title}</h2>
          <p className="text-[#7f7f7f] dark:text-[#9e9e9e] mb-6">{description}</p>
          <div className="flex gap-3 justify-around">
            <button
              onClick={onConfirm}
              className="
              bg-[#212121]
              text-white
              hover:bg-[#6941C6]
              dark:bg-white
              dark:text-[#212121]
              dark:hover:text-white
              w-[50%]
              px-4 py-2
              rounded
              cursor-pointer
              "  
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="
              bg-[#E9E9E9]
              hover:bg-[#C5C4C4]
              dark:bg-[#393939]
              dark:hover:bg-[#535353]
              w-[50%]
              px-4 py-2
              rounded
              cursor-pointer"
            >
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
}
