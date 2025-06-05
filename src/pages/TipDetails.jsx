import { useLoaderData, useParams } from "react-router";
import { Heart } from "lucide-react";
import { useState } from "react";


const TipDetails = () => {
  const tipDetails = useLoaderData();
  const [liked, setLiked] = useState(tipDetails.totalLike);
  

  const handleLiked = (id) => {
    setLiked(liked + 1);
    fetch(`https://gardening-hub-server.vercel.app/like/${id}`, {
      method: "PUT",
    });
  };

  // console.log(tipDetails);


  return (
    <div className="bg-[#f4f7f3] dark:bg-gray-900 min-h-screen px-4 md:px-10 py-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-green-100 dark:border-green-700">
        <img
          src={tipDetails.imageUrl}
          alt={tipDetails.title}
          className="w-full h-72 md:h-96 object-cover"
        />

        <div className="p-6 md:p-10 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#2f4f2f] dark:text-green-400">
                {tipDetails.title}
              </h2>
              <p className="inline-flex items-center justify-center border border-gray-300 text-gray-700 text-lg font-bold px-5 py-2 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:border-blue-400 hover:text-blue-600 my-2
            dark:border-gray-600 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400">
  Like <span className="ml-2 text-blue-600 dark:text-blue-400 cursor-pointer">{liked}</span>
</p>
            </div>
            <button
              onClick={() => handleLiked(tipDetails._id)}
              className={`text-red-500 transition ${
                liked ? "fill-red-500" : "fill-none"
              }`}
            >
              <Heart
                size={28}
                fill={liked ? "red" : "none"}
                strokeWidth={1.5}
                className="hover:scale-110 transition"
              />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-[#f0f7ee] dark:bg-green-900/70 p-4 rounded-xl">
            <p className="dark:text-white">
              <span className="font-semibold text-[#345c2c] dark:text-green-300">
                Category:
              </span>{" "}
              {tipDetails.category}
            </p>
            <p className="dark:text-white">
              <span className="font-semibold text-[#345c2c] dark:text-green-300">
                Topic:
              </span>{" "}
              {tipDetails.topic}
            </p>
            <p className="dark:text-white">
              <span className="font-semibold text-[#345c2c] dark:text-green-300">
                Difficulty:
              </span>{" "}
              {tipDetails.difficulty}
            </p>
            <p className="dark:text-white">
              <span className="font-semibold text-[#345c2c] dark:text-green-300">
                Availability:
              </span>{" "}
              {tipDetails.availability}
            </p>
            <p className="dark:text-white">
              <span className="font-semibold text-[#345c2c] dark:text-green-300">
                Shared By:
              </span>{" "}
              {tipDetails.userName} ({tipDetails.userEmail})
            </p>
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-semibold text-[#2d4722] dark:text-green-400 mb-2">
              🌱 Description
            </h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {tipDetails.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;
