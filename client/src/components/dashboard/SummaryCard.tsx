type SummaryCardProps = {
  title: string;
  amount: number;
  color: string;
};

function SummaryCard({
  title,
  amount,
  color,
}: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-slate-500 font-medium">
        {title}
      </h2>

      <p
        className={`text-3xl font-bold mt-3 text-${color}-600`}
      >
        ₹{amount.toLocaleString()}
      </p>

    </div>
  );
}

export default SummaryCard;