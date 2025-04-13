import React from 'react'

const HomePage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-white font-bold text-4xl h-[95vh] mr-3 my-4 w-screen rounded-[14px] border border-gray-300 shadow-md"
      style={{
        background: "rgba(157, 157, 157, 0.5)", 
        backdropFilter: "blur(5px)", 
      }}
    >
      Home
    </div>
  );
}

export default HomePage
