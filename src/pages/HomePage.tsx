import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <Link
                    className={buttonVariants({ variant: "outline" })}
                    to="/calculators"
                >
                    Calculators
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
