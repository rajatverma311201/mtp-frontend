import { CALCULATORS } from "@/features/calculators/constants";
import { Link } from "react-router-dom";

function CalculatorsPage() {
    return (
        <div className="flex gap-10">
            {CALCULATORS.map((calculator) => (
                <Link
                    to={calculator.path}
                    key={calculator.path}
                    className="hover: w-56 rounded-md border border-solid p-4 transition hover:scale-110 hover:shadow"
                >
                    <h2 className="text-xl font-semibold uppercase">
                        {calculator.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {calculator.description}
                    </p>
                </Link>
            ))}
        </div>
    );
}

export default CalculatorsPage;
