type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;