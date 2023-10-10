import "./SearchSuggestions.css";

interface SearchSuggestionsProps {
    data: { name: string }[];
    setStockName: (x: string) => void;
    stockRef: React.MutableRefObject<string>;
}

function SearchSuggestions({
    data,
    setStockName,
    stockRef,
}: SearchSuggestionsProps) {
    return (
        <div className="search-list">
            {data.map((item, id) => {
                return (
                    <div
                        onClick={() => {
                            stockRef.current = item.name;
                            setStockName(item.name);
                        }}
                        className="list-item dark:hover:bg-black"
                        key={id}
                    >
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
}

export default SearchSuggestions;
