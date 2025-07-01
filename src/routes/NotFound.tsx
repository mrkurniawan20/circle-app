import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#213547' }}>
      <div className="text-center text-white max-w-md">
        <div className="flex justify-center mb-6 animate-bounce">
          <AlertTriangle className="h-16 w-16 text-yellow-400" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">Sorry, the page you’re looking for doesn’t exist.</p>
        <Link to="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all duration-200">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
