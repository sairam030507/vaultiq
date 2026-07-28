function Testimonials() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            What Our Users Say
          </h2>

          <p className="mt-4 text-slate-600">
            Thousands of users trust VaultIQ to manage their finances.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="text-yellow-400 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-4 text-slate-600">
              VaultIQ completely changed the way I track my expenses.
            </p>

            <h3 className="mt-6 font-bold">
              Rahul Sharma
            </h3>

            <p className="text-sm text-slate-500">
              Software Engineer
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="text-yellow-400 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-4 text-slate-600">
              The expense splitter is incredibly useful for trips with friends.
            </p>

            <h3 className="mt-6 font-bold">
              Pooja Rao
            </h3>

            <p className="text-sm text-slate-500">
              Product Designer
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="text-yellow-400 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="mt-4 text-slate-600">
              AI insights helped me reduce unnecessary monthly expenses.
            </p>

            <h3 className="mt-6 font-bold">
              Arjun Patel
            </h3>

            <p className="text-sm text-slate-500">
              Entrepreneur
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;