function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          VaultIQ
        </h1>

        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li className="cursor-pointer hover:text-blue-600">Home</li>
          <li className="cursor-pointer hover:text-blue-600">Features</li>
          <li className="cursor-pointer hover:text-blue-600">Pricing</li>
          <li className="cursor-pointer hover:text-blue-600">About</li>
        </ul>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
