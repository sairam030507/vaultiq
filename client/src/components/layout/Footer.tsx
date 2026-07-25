function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="text-3xl font-bold">
            VaultIQ
          </h2>

          <p className="mt-2 text-slate-400">
            Smart Finance. Smarter Decisions.
          </p>
        </div>

        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-blue-400">
            Home
          </a>

          <a href="#" className="hover:text-blue-400">
            Features
          </a>

          <a href="#" className="hover:text-blue-400">
            About
          </a>

          <a href="#" className="hover:text-blue-400">
            Contact
          </a>
        </div>
      </div>

      <div className="text-center mt-10 text-slate-500">
        © 2026 VaultIQ. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;