import { Link } from "react-router";
import { Eye, Turtle } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insideLoading, setInsideLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  // console.log(selectedDifficulty);

  // console.log(tips);
  useEffect(() => {
    setInsideLoading(true)
    let dynamicURL = `https://gardening-hub-server.vercel.app/tips`
    if(selectedDifficulty != "All"){
      dynamicURL += `?difficulty=${selectedDifficulty}`
    }
    // console.log(dynamicURL);
    fetch(dynamicURL)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tips:", err);
        setLoading(false);
            setInsideLoading(false)

      });
  }, [selectedDifficulty]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
<div className="min-h-screen bg-[#f4f7f3] dark:bg-gray-900 px-4 py-10 md:px-10">
  <h2 className="text-3xl md:text-4xl font-bold text-[#345c2c] dark:text-green-300 mb-6 text-center">
    🌿 Browse Public Gardening Tips
  </h2>

  {/* Difficulty Filter */}
  <div className="mb-6 flex justify-center">
    <select
      className="px-4 py-2 border border-green-300 dark:border-green-600 rounded-md shadow-sm text-green-900 dark:text-green-200 bg-white dark:bg-gray-800"
      value={selectedDifficulty}
      onChange={(e) => setSelectedDifficulty(e.target.value)}
    >
      <option value="All">All Difficulty Levels</option>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
      <thead className="bg-[#d4e8cc] dark:bg-green-900 text-[#2f4f2f] dark:text-green-300 uppercase text-sm md:text-base">
        <tr>
          <th className="py-4 px-6 text-left">Image</th>
          <th className="py-4 px-6 text-left">Title</th>
          <th className="py-4 px-6 text-left">Category</th>
          <th className="py-4 px-6 text-left">Difficulty</th>
          <th className="py-4 px-6 text-left">Status</th>
          <th className="py-4 px-6 text-left">Action</th>
        </tr>
      </thead>
<tbody>
        {tips.map((tip) => (
          <tr
            key={tip._id}
            className="border-t border-green-100 dark:border-green-700 hover:bg-[#f0f7ee] dark:hover:bg-green-800 transition duration-200"
          >
            <td className="py-3 px-6">
              <img
                src={tip.imageUrl}
                alt={tip.title}
                className="w-16 h-16 rounded-lg object-cover border border-green-200 dark:border-green-600"
                loading="lazy"
              />
            </td>
            <td className="py-3 px-6 font-semibold text-[#2d4722] dark:text-green-200">
              {tip.title}
            </td>
            <td className="py-3 px-6 text-[#446842] dark:text-green-300">{tip.category}</td>
            <td className="py-3 px-6 text-[#446842] dark:text-green-300">
              {tip.difficulty || "N/A"}
            </td>
            <td className="py-3 px-6 text-[#446842] dark:text-green-300">{tip.availability}</td>
            <td className="py-3 px-6">
              <Link to={`/tipDetails/${tip._id}`}>
                <button className="flex items-center cursor-pointer gap-1 bg-[#6b8e23] hover:bg-[#56751c] dark:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm transition">
                  <Eye size={18} />
                  <span className="hidden sm:inline">See More</span>
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default BrowseTips;
