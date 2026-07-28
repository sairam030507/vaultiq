import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow p-5">

      <div className="relative w-96">

        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">
          <FaBell className="text-2xl text-gray-600 hover:text-blue-600 transition" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <h3 className="font-semibold">
              Sairam
            </h3>

            <p className="text-sm text-gray-500">
              Welcome Back 👋
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;