type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="text-5xl">{icon}</div>

      <h3 className="mt-5 text-2xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-3 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;