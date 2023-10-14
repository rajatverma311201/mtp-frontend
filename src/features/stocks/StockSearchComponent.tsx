import { Input } from "@/components/ui/input";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import { StockReferenceData } from "types";
import { useNavigate } from "react-router-dom";

function StockSearchComponent() {
    const [size, setSize] = useState("0fr");
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const formRef = useRef<HTMLDivElement>();
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const res = await fetch(
                `http://127.0.0.1:3000/api/stocks?q=${searchText}`,
            );

            const searchRes = await res.json();
            if (!res.ok) {
                console.log(searchRes.message);
            } else {
                console.log(searchRes.content);
                setSuggestions(searchRes.content);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchText]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!formRef.current?.contains(e.target as Node)) {
                setSize("0fr");
            }
        };

        document.addEventListener("mousedown", handler, { capture: true });
        return () =>
            document.removeEventListener("mousedown", handler, {
                capture: true,
            });
    }, []);

    function handleSubmit(
        e:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.FormEvent<HTMLFormElement>,
        item?: StockReferenceData,
    ) {
        e.preventDefault();
        console.log(item);
        navigate(`/stocks/${item?.search_id}`);
    }

    return (
        <div className="flex flex-1">
            <form
                onSubmit={(e) => handleSubmit(e, suggestions[0])}
                className="flex flex-1 justify-center gap-3"
            >
                <div
                    ref={formRef as MutableRefObject<HTMLDivElement>}
                    className="relative flex w-1/3 flex-col gap-2"
                >
                    <Input
                        ref={inputRef as MutableRefObject<HTMLInputElement>}
                        onFocus={() => setSize("1fr")}
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            size == "0fr" && setSize("1fr");
                        }}
                    />
                    <SearchSuggestions
                        inputRef={
                            inputRef as MutableRefObject<HTMLInputElement>
                        }
                        size={size}
                        suggestions={suggestions}
                        setSearchText={setSearchText}
                        setSize={setSize}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
}

export default StockSearchComponent;
