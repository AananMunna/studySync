import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";


const ExploreGardeners = () => {
    const [gardeners, setGardeners] = useState([]);
    const [loading, setLoading] = useState(true);
  // console.log(gardeners);
    useEffect(() => {
      fetch("https://gardening-hub-server.vercel.app/gardeners/all")
        .then((res) => res.json())
        .then((data) => {
          setGardeners(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching gardeners:", err);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return (
        <LoadingSpinner />
      );
    }
  return (
<div className="bg-green-50 dark:bg-gray-900 min-h-screen py-12 px-6 md:px-16 lg:px-24">
  <h1 className="text-4xl font-extrabold text-center text-green-800 dark:text-green-300 mb-12 drop-shadow-md">
    🌿 Explore Gardeners
  </h1>

  <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {gardeners.map((gardener) => (
      <div
        key={gardener.id}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 overflow-hidden"
      >
        <div className="relative h-60 w-full">
          <img
            src={gardener.photoUrl}
            alt={gardener.name}
            className="object-cover w-full h-full rounded-t-2xl"
            loading="lazy"
          />
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
              gardener.status === "active"
                ? "bg-green-600 text-white dark:bg-green-500"
                : "bg-gray-400 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
            }`}
          >
            {gardener.status}
          </span>
        </div>

        <div className="p-6 text-left">
          <h2 className="text-2xl font-semibold text-green-900 dark:text-green-300 mb-2">
            {gardener.name}
          </h2>
          <p className="text-green-700 dark:text-green-400 font-medium mb-4">
            {gardener.about}
          </p>

          <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
            <li><strong>Age:</strong> {gardener.age}</li>
            <li><strong>Gender:</strong> {gardener.gender}</li>
            <li><strong>Experience:</strong> {gardener.experience}</li>
            <li><strong>Location:</strong> {gardener.location}</li>
            <li><strong>Specialty:</strong> {gardener.specialty}</li>
            <li><strong>Shared Tips:</strong> {gardener.totalSharedTips}</li>
          </ul>

          <button
            type="button"
            className="mt-6 w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold py-2 rounded-lg shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() =>
              Swal.fire({
                title: "Private Profile",
                text: "This user has set their profile to private. You can't view it at the moment.",
                icon: "info",
                confirmButtonText: "Okay",
                confirmButtonColor: "#3085d6",
                background: "#f7f9fc",
                timer: 4000,
                timerProgressBar: true,
                showClass: {
                  popup: "animate__animated animate__fadeInUp animate__faster",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutDown animate__faster",
                },
              })
            }
          >
            View Profile
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


  );
};

export default ExploreGardeners;
