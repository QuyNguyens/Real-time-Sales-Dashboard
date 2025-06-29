import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 text-white bg-primary-1 hover:bg-primary-3 rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage
