import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const JobDetail = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    "https://remotive.com/api/remote-jobs?category=software-dev&limit=20"
  );

  const job = data?.jobs?.find((j) => j.id === parseInt(id));

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-lg">{error}</p>
        <Link to="/" className="text-indigo-600 mt-4 inline-block">
          Back to Jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700">Job not found</h2>
        <Link to="/" className="text-indigo-600 mt-4 inline-block">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link
        to="/"
        className="text-indigo-600 font-medium hover:underline mb-6 inline-block"
      >
        Back to Jobs
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {job.title}
            </h1>
            <p className="text-indigo-600 font-semibold text-lg">
              {job.company_name}
            </p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full">
            {job.job_type}
          </span>
        </div>

        <div className="flex gap-6 text-gray-500 text-sm mb-6">
          <span>
            {job.candidate_required_location || "Worldwide"}
          </span>
          <span>
            {new Date(job.publication_date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            About the Role
          </h2>
          <div
            className="text-gray-600 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          className="block text-center w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-lg"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetail;