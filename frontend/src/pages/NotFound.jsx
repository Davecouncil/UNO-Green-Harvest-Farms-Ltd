import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-green-700">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;