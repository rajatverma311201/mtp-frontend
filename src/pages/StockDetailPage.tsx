import StockChart from "@/features/charts/StockChart";
import { Stocks } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function StockDetailPage() {
    const params = useParams();
    const searchId = params.searchId;

    const { data: stockDetails, isLoading } = useQuery({
        queryKey: ["fetch-stock-details", searchId],
        queryFn: () => Stocks.getStockDetails(searchId as string),
    });

    if (stockDetails) console.log(stockDetails.data.header);

    return (
        !isLoading && (
            <StockChart
                exchange="NSE"
                scriptCode={stockDetails.data.header.nseScriptCode}
            />
        )
    );
}

export default StockDetailPage;
