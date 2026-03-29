import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jobs from "../jobs";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(jobs);

  useEffect(() => {
    setFiltered(
      jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Find Your Dream Job
        </h1>
        <p className="text-gray-500 text-lg">
          Browse the latest React and frontend roles in Pakistan
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, company or location..."
          className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 outline-none focus:border-indigo-500 shadow-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-20">
          No jobs found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-indigo-600 font-medium">{job.company}</p>
                </div>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <span>{job.location}</span>
                <span>{job.salary}</span>
              </div>
              <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                {job.description}
              </p>
              <Link
                to={`/jobs/${job.id}`}
                className="block text-center bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition font-medium"
              >
                View Job
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;