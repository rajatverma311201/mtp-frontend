"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
    setDate: (date: Date | undefined) => void;
};

export function DatePicker({ setDate }: DatePickerProps) {
    const [currentDate, setCurrentDate] = React.useState<Date>();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild onClick={() => setIsOpen((open) => !open)}>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !currentDate && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {currentDate ? (
                        format(currentDate, "PPP")
                    ) : (
                        <span>Pick a Date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={(date) => {
                        setDate(date);
                        setCurrentDate(date);
                        setIsOpen(false);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
