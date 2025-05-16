import React, { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import TrendingTopics from "../components/TrendingTopics";
const HomePage = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemes(shuffleArray(data.data.memes));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="flex w-full h-screen">
      {/* Left Spacer (optional sidebar space) */}
      <div className="hidden lg:block w-[10%]"></div>
    <div
      className="flex flex-col flex-1 items-center overflow-y-auto mr-3 my-4 p-4 h-[95vh] w-full rounded-[14px] border border-gray-300 shadow-md bg-white relative"
      style={{
        background: "rgba(157, 157, 157, 0.4)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Refresh Button */}
      <button
        onClick={fetchMemes}
        className="fixed top-6 right-8 p-2 rounded-full shadow-lg hover:bg-white/20 transition-all z-10 backdrop-blur-md bg-white/10"
        style={{
          background: "rgba(255, 255, 255, 0.1)", // very light transparent
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)", // light border for glass effect
        }}
      >
        <FiRefreshCw className="w-7 h-7 text-black" />
      </button>

      {/* Main Content */}
      {loading ? (
        <p className="text-black text-2xl font-bold mt-20">Loading memes...</p>
      ) : (
        <div className="flex flex-col items-center gap-8 mt-20 pb-10 w-full">
          {memes.map((meme, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg"
              style={{
                width: "100%",
                maxWidth: "600px", // max width in center
              }}
            >
              <div
                className="w-full flex justify-center items-center bg-gray-100"
                style={{
                  width: "100%",
                  aspectRatio: "1/1", // 1080x1080
                }}
              >
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="object-cover w-full h-full"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Caption */}
              <div className="p-4 w-full text-center">
                <h2 className="text-black font-semibold text-xl">
                  {meme.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
     {/* Right Trends Panel */}
      <div className="hidden lg:block w-[20%] pr-4 pt-6">
        <div className="sticky top-24">
          <TrendingTopics />
        </div>
      </div>
    </div>

  );
};

export default HomePage;
