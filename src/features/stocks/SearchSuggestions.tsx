import { cn } from "@/lib/utils";
import { MutableRefObject } from "react";
import { StockReferenceData } from "types";

type SearchSuggestionProps = {
    size: string;
    setSearchText: (text: string) => void;
    setSize: (size: string) => void;
    suggestions: StockReferenceData[];
    handleSubmit: (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: StockReferenceData,
    ) => void;
    inputRef: MutableRefObject<HTMLInputElement>;
};

const SearchSuggestions = ({
    size,
    suggestions,
    setSearchText,
    setSize,
    handleSubmit,
    inputRef,
}: SearchSuggestionProps) => {
    const inputHeight =
        inputRef?.current?.getBoundingClientRect().height + 10 + "px";
    return (
        <div
            style={{
                transform: `translateY(${inputHeight})`,
            }}
            className={cn(
                `absolute grid w-full rounded-sm bg-white p-2 transition-all duration-100`,

                size === "0fr"
                    ? "grid-rows-[0fr] opacity-0"
                    : "grid-rows-[1fr] border-2 opacity-100 shadow-sm",
            )}
        >
            <div className="overflow-hidden ">
                {suggestions.map((item, idx) => {
                    return (
                        <div
                            onMouseDown={(e) => {
                                setSearchText(item.title);
                                setSize("0fr");
                                handleSubmit(
                                    e as React.MouseEvent<
                                        HTMLDivElement,
                                        MouseEvent
                                    >,
                                    item,
                                );
                            }}
                            className="cursor-pointer p-1 text-base hover:bg-blue-50"
                            key={idx}
                        >
                            {item.title}
                        </div>
                    );
                })}
                {suggestions.length == 0 && (
                    <div className="italic">No Results</div>
                )}
            </div>
        </div>
    );
};

export default SearchSuggestions;
