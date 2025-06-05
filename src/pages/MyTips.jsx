import { use, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const MyTips = () => {
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(true);

// console.log(tips);

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gardening-hub-server.vercel.app/tips/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remaining = tips.filter((tip) => tip._id != id);
              setTips(remaining);
            }
          });
      }
    });
  };

  const {user} = use(AuthContext);
  // console.log(user.email)

  useEffect(() => {
    fetch(`https://gardening-hub-server.vercel.app/mytips/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gardeners:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
   <div className="min-h-screen bg-[#f4f7f3] dark:bg-gray-900 py-10 px-4 md:px-12">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-[#2e4d2c] dark:text-green-400 mb-6">
      🌱 My Garden Tips
    </h2>

    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md dark:shadow-black/40 rounded-xl border border-green-100 dark:border-green-700">
      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="bg-green-100 dark:bg-green-900 text-[#2f4f2f] dark:text-green-300 uppercase text-xs">
          <tr>
            <th scope="col" className="px-6 py-4">Image</th>
            <th scope="col" className="px-6 py-4">Title</th>
            <th scope="col" className="px-6 py-4">Category</th>
            <th scope="col" className="px-6 py-4">Availability</th>
            <th scope="col" className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        {tips.length ? (
          <tbody>
            {tips.map((tip) => (
              <tr
                key={tip.id}
                className="border-b border-green-100 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-800 transition duration-300"
              >
                <td className="px-6 py-4">
                  <img
                    src={tip.imageUrl}
                    alt={tip.title}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm dark:shadow-black"
                  />
                </td>
                <td className="px-6 py-4 font-semibold dark:text-green-200">{tip.title}</td>
                <td className="px-6 py-4 dark:text-green-300">{tip.category}</td>
                <td className="px-6 py-4 dark:text-green-300">{tip.availability}</td>
                <td className="px-6 py-4 text-center flex gap-2 justify-center">
                  <Link to={`/tip/${tip._id}`}>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition flex items-center gap-1">
                      <Pencil size={16} />
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(tip._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-500 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Your Garden of Knowledge is Empty
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                You haven't shared any gardening tips yet. Start cultivating
                our community by sharing your wisdom!
              </p>
              <Link
                to="/ShareTip"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Share Your First Tip
              </Link>
            </div>
          </div>
        )}
      </table>
    </div>
  </div>
</div>

  );
};

export default MyTips;
