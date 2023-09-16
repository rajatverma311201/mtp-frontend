import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { XirrTransaction } from "types";
import Dropdown from "./Dropdown";

const columns: ColumnDef<XirrTransaction>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
            return <Dropdown />;
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const sign = amount / Math.abs(amount);
            const color = sign < 0 ? "text-red-600" : "text-emerald-600";
            return (
                <div className={`font-medium ${color}`}>
                    &#8377; {Math.abs(amount)}
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: "Date",
    },
];

type InvestmentTablePropTypes = {
    dates: Date[];
    values: number[];
};

function InvestmentTable({ dates, values }: InvestmentTablePropTypes) {
    if (dates.length == 0) {
        return null;
    }

    const data: XirrTransaction[] = [];

    for (let i = 0; i < dates.length; i++) {
        data.push({
            date: dates[i].toLocaleDateString("en-GB"),
            amount: values[i],
        });
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default InvestmentTable;
