import XirrComponent from "@/features/calculators/xirr/XirrComponent";
import useAuthContext from "@/hooks/useAuthContext";
import InvestmentTable from "../features/calculators/xirr/InvestmentTable";

function XirrPage() {
    const authCtx = useAuthContext();
    const jwt = authCtx.jwt;

    return (
        <>
            <XirrComponent />
            {jwt && <InvestmentTable token={jwt} />}
        </>
    );
}

export default XirrPage;
