import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import "./StockSearchComponent.css";
import { StockReferenceData } from "types";

function StockSearchComponent() {
    const [stockName, setStockName] = useState("");
    const stockRef = useRef("");
    const [data, setData] = useState([]);
    const [openSearchList, setOpenSearchList] = useState(false);

    useEffect(() => {
        if (data.length == 0) {
            if (openSearchList) setOpenSearchList(false);
        } else {
            if (!openSearchList) setOpenSearchList(true);
        }
    }, [data, openSearchList]);

    useEffect(() => {
        if (!stockName || stockName == stockRef.current) return setData([]);
        const timer = setTimeout(() => {
            fetch(`https://api.twelvedata.com/stocks?country=india`)
                .then((res) => res.json())
                .then((json) => {
                    console.log(json.data.length);
                    const _data = json.data.filter(
                        (item: StockReferenceData) => {
                            return item.name.toLowerCase().includes(stockName);
                        },
                    );

                    setData(_data.slice(0, Math.min(_data.length, 7)));
                    console.log(_data);
                });
        }, 500);

        return () => clearTimeout(timer);
    }, [stockName]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(stockName);
    }

    return (
        <>
            <form
                className="flex w-1/3 justify-center gap-2"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="search-container">
                    <Input
                        className="rounded-full dark:bg-gray-700"
                        placeholder="Search..."
                        value={stockName}
                        onChange={(e) => setStockName(e.target.value)}
                    />

                    {openSearchList && (
                        <SearchSuggestions
                            stockRef={stockRef}
                            setStockName={setStockName}
                            data={data}
                        />
                    )}
                </div>

                <Button className="rounded-full">Search</Button>
            </form>
        </>
    );
}

export default StockSearchComponent;
