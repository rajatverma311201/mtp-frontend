import { useParams } from "react-router-dom";

function StockDetailPage() {
    const params = useParams();
    console.log(params);

    return <div>StockDetailPage</div>;
}

export default StockDetailPage;
