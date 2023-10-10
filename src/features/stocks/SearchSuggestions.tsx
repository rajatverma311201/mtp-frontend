import { useState } from "react";
import "./SearchSuggestions.css";

function SearchSuggestions({ data, setStockName, stockRef }) {
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
