import { CALCULATORS } from "@/features/calculators/constants";
import { Link } from "react-router-dom";

function CalculatorsPage() {
    return (
        <div className="flex gap-10">
            {CALCULATORS.map((calculator) => (
                <Link
                    to={calculator.path}
                    key={calculator.path}
                    className="border border-solid w-56 p-4 rounded-md hover:shadow hover: hover:scale-110 transition"
                >
                    <h2 className="text-xl font-semibold uppercase">
                        {calculator.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {calculator.description}
                    </p>
                </Link>
            ))}
        </div>
    );
}

export default CalculatorsPage;
