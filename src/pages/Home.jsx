import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const { data, loading, error } = useFetch(
    "https://remotive.com/api/remote-jobs?category=software-dev&limit=20"
  );

  useEffect(() => {
    if (data?.jobs) {
      setFiltered(
        data.jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, data]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Find Your Dream Job
        </h1>
        <p className="text-gray-500 text-lg">
          Browse the latest remote tech roles worldwide
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or company..."
          className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 outline-none focus:border-indigo-500 shadow-sm"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-20">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="text-center mt-20">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <p className="text-gray-400 mt-2">Please try again later.</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-20">
          No jobs found matching your search.
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
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
                  <p className="text-indigo-600 font-medium">
                    {job.company_name}
                  </p>
                </div>
                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {job.job_type}
                </span>
              </div>

              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <span>
                  {job.candidate_required_location || "Worldwide"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition font-medium"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;