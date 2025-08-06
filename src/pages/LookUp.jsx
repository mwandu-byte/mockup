import { useState } from 'react';
import { motion } from 'framer-motion';
import mockData from '../utils/MockData';
import { FaSearch, FaInfoCircle, FaCheckCircle, FaExclamationCircle, FaUser, FaRegBuilding, FaHistory, FaTachometerAlt } from 'react-icons/fa';

// Data ya mfano kwa ajili ya dashboard na utafutaji wa haraka
const dashboardStats = {
  totalSearches: '1,234,567',
  activeInstitutions: '10',
  mostSearched: 'TRA, Immigration'
};

const recentSearches = [
  { nida: '123456789-0', name: 'John Doe' },
  { nida: '098765432-1', name: 'Jane Smith' },
  { nida: '112233445-5', name: 'Peter Pan' },
];

const Card = ({ title, icon, children }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-bold ml-3 text-blue-400">{title}</h3>
    </div>
    <div className="text-gray-300">{children}</div>
  </motion.div>
);

export default function Lookup() {
  const [nida, setNida] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSelected(null);
    setShowResults(false);
    setTimeout(() => {
      const data = mockData.find(item => item.nida === nida);
      if (data) {
        setResult(data);
        setError('');
        setShowResults(true);
      } else {
        setResult(null);
        setError('NIDA record not found.');
        setShowResults(true);
      }
      setLoading(false);
    }, 1000);
  };

  const handleNewSearch = () => {
    setNida('');
    setResult(null);
    setError('');
    setSelected(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white font-sans">
      
      {/* Search and Input Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold mb-2 text-white">NIDA Lookup System</h1>
        <p className="text-gray-400 mb-6">Verify NIDA numbers and their usage across government institutions.</p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              value={nida}
              onChange={e => setNida(e.target.value)}
              placeholder="Enter NIDA number"
              className="p-3 pl-10 rounded-full bg-gray-800 text-white w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 px-6 py-3 rounded-full text-white font-semibold"
          >
            <FaSearch /> Search
          </button>
        </form>
      </motion.div>

      {/* Lookup Status Section */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4"
        >
          <FaInfoCircle className="inline-block text-blue-400 text-3xl mb-2 animate-bounce" />
          <p className="text-lg text-blue-400 font-medium">Searching...</p>
        </motion.div>
      )}

      {/* Result & Error Display Section */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-10"
        >
          {error && (
            <div className="text-center p-4 bg-gray-800 rounded-xl mb-4">
              <FaExclamationCircle className="inline-block text-red-500 text-3xl mb-2" />
              <p className="text-lg text-red-500 font-medium">{error}</p>
            </div>
          )}

          {result && (
            <Card
              title="NIDA Found"
              icon={<FaCheckCircle className="text-green-500 text-3xl" />}
            >
              <div className="flex items-start gap-6 mb-6">
                <img src={result.photoUrl} alt="User" className="w-24 h-24 rounded-full border-2 border-gray-600" />
                <div>
                  <h4 className="text-2xl font-bold text-white">{result.name}</h4>
                  <p className="text-gray-400">NIDA: {result.nida}</p>
                  <p className="text-gray-400">Date of Birth: {result.dob}</p>
                  <p className="text-gray-400 mt-2">Issued: {result.issueDate}</p>
                </div>
              </div>

              <h4 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Usage History</h4>
              <ul className="space-y-4">
                {result.usedIn.map((place, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center justify-between bg-gray-700 p-4 rounded-xl border border-gray-600"
                  >
                    <span className="flex items-center">
                      <FaRegBuilding className="text-blue-400 mr-3" />
                      {place.name}
                    </span>
                    <button
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      onClick={() => setSelected(place)}
                    >
                      View Details
                    </button>
                  </motion.li>
                ))}
              </ul>
              <button
                onClick={handleNewSearch}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 transition-colors duration-200 px-6 py-3 rounded-full text-white font-semibold"
              >
                New Search
              </button>
            </Card>
          )}

          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-6 bg-gray-700 rounded-xl shadow-inner border border-gray-600"
            >
              <h3 className="text-2xl font-bold mb-3 text-blue-300">Details for {selected.name}</h3>
              <p className="text-gray-300">{selected.description}</p>
            </motion.div>
          )}
        </motion.div>
      )}

      <hr className="border-gray-700 my-10" />

      {/* Dashboard & History Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card title="Dashboard" icon={<FaTachometerAlt className="text-green-400 text-3xl" />}>
          <div className="space-y-2 text-gray-300">
            <p><strong>Total Searches:</strong> {dashboardStats.totalSearches}</p>
            <p><strong>Active Institutions:</strong> {dashboardStats.activeInstitutions}</p>
            <p><strong>Most Searched:</strong> {dashboardStats.mostSearched}</p>
          </div>
        </Card>
        <Card title="Recent Searches" icon={<FaHistory className="text-orange-400 text-3xl" />}>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {recentSearches.map((item, index) => (
              <li key={index}>
                <span className="font-semibold text-white">{item.nida}</span> - {item.name}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Data Security" icon={<FaInfoCircle className="text-blue-400 text-3xl" />}>
          <p>
            This system protects user data with advanced encryption and complies with all national data protection laws.
          </p>
        </Card>
      </div>

      <hr className="border-gray-700 my-10" />

      {/* System Overview Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Purpose" icon={<FaInfoCircle className="text-green-400 text-3xl" />}>
          <p>This platform allows users to verify how a given NIDA number has been used across various government institutions and services.</p>
        </Card>
        <Card title="How it Works" icon={<FaSearch className="text-purple-400 text-3xl" />}>
          <p>A user enters a valid NIDA number. The system checks against predefined records and displays institutions where the NIDA was used.</p>
        </Card>
        <Card title="Sector Benefits" icon={<FaRegBuilding className="text-yellow-400 text-3xl" />}>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>TRA:</strong> Identity verification for tax registration</li>
            <li><strong>Immigration:</strong> Passport and visa processing</li>
            <li><strong>Police:</strong> Criminal clearance and background checks</li>
            <li><strong>Driving License:</strong> Issuance & renewal of licenses</li>
          </ul>
        </Card>
        <Card title="Goal" icon={<FaCheckCircle className="text-blue-400 text-3xl" />}>
          <p>To provide transparency, reduce fraud, and improve service delivery by leveraging NIDA integration across government systems.</p>
        </Card>
      </div>
    </div>
  );
}