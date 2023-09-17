import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { XirrTransaction } from "types";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import useDeleteInvestment from "./useDeleteInvestment";

type ExtendedXirrTransaction = XirrTransaction & {
    action: () => void;
    isDeleting: boolean;
};

const columns: ColumnDef<ExtendedXirrTransaction>[] = [
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
        cell: ({ row }) => <p> {(row.getValue("date") as Date).toString()}</p>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <>
                    <div className="flex gap-5 text-lg">
                        <FiEdit
                            className="cursor-pointer"
                            onClick={() => {
                                alert("edit");
                            }}
                        />
                        <HiOutlineTrash
                            disabled={payment.isDeleting}
                            className="cursor-pointer"
                            onClick={payment.action}
                        />
                    </div>
                </>
            );
        },
    },
];

type InvestmentTablePropTypes = {
    dates: Date[];
    values: number[];
};

function InvestmentTable({ dates, values }: InvestmentTablePropTypes) {
    const { deleteInvestment, isDeleting } = useDeleteInvestment();

    // console.log(dates);
    if (dates.length == 0) {
        return null;
    }

    const data: ExtendedXirrTransaction[] = [];

    for (let i = 0; i < dates.length; i++) {
        data.push({
            isDeleting,
            action: () => deleteInvestment(dates[i]),
            date: dates[i],
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
