import { useParams, Link } from "react-router-dom";
import jobs from "../jobs";

const JobDetail = () => {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === parseInt(id));

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
              {job.company}
            </p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full">
            {job.type}
          </span>
        </div>

        <div className="flex gap-6 text-gray-500 text-sm mb-6">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            About the Role
          </h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Requirements
          </h2>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <span className="text-indigo-500 font-bold mt-0.5">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-lg">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetail;