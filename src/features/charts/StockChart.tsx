import { Stocks } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";

function StockChart({
    exchange,
    scriptCode,
}: {
    exchange: string;
    scriptCode: string;
}) {
    const { data: chartData, isLoading } = useQuery({
        queryKey: ["fetch-stock-chart-data", scriptCode],
        queryFn: () =>
            Stocks.getStockChartData(exchange, scriptCode, "1y", "1"),
    });

    if (isLoading) {
        return (
            <Loader2 className="h-14 w-14 animate-spin pt-20 text-primary" />
        );
    }

    const candles = chartData.data.candles || [];
    let minClosePrice = Number.MAX_VALUE;
    let maxClosePrice = Number.MIN_VALUE;

    const priceHistory = candles.map((item: number[]) => {
        minClosePrice = Math.min(minClosePrice, item[4]);
        maxClosePrice = Math.max(maxClosePrice, item[4]);
        return {
            timestamp: item[0],
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
            volume: item[5],
        };
    });

    const domainLowerBound = 0.9 * minClosePrice;
    const domainUpperBound = 1.1 * maxClosePrice;
    console.log(priceHistory);
    return (
        <ResponsiveContainer width="65%" height="75%">
            <AreaChart
                data={priceHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#008d69"
                            stopOpacity={0.4}
                        />
                        <stop
                            offset="95%"
                            stopColor="#008d69"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis />
                <YAxis domain={[domainLowerBound, domainUpperBound]} />
                <CartesianGrid vertical={false} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#008d69"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default StockChart;
