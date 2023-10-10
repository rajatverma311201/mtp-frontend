import { FEATURES } from "@/features/constants";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex items-start gap-10">
            {FEATURES.map((feature) => (
                <Link
                    to={feature.path}
                    key={feature.path}
                    className="hover: w-56 rounded-md border border-solid p-4 transition hover:scale-110 hover:shadow"
                >
                    <h2 className="mb-1 text-xl font-semibold">
                        {feature.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {feature.description}
                    </p>
                </Link>
            ))}
        </div>
    );
}

export default HomePage;
