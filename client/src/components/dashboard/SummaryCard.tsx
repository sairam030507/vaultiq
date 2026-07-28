import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  amount: string;
  icon: ReactNode;
  color: string;
}

function SummaryCard({
  title,
  amount,
  icon,
  color,
}: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition">

      <div>
        <h2 className="text-gray-500 text-sm">
          {title}
        </h2>

        <h1 className="text-3xl font-bold mt-2">
          {amount}
        </h1>
      </div>

      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl ${color}`}
      >
        {icon}
      </div>

    </div>
  );
}

export default SummaryCard;