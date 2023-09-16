import { DataTable } from "@/components/ui/data-table";
import { Calculator } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { XirrTransaction } from "types";

const columns: ColumnDef<XirrTransaction>[] = [
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
];

function InvestmentTable({ token }: { token: string }) {
    const { data, isLoading } = useQuery({
        queryKey: ["fetch-xirr"],
        queryFn: () => Calculator.getXirrInvestments(token),
    });

    if (isLoading) {
        return <p>Please Wait...</p>;
    }

    const investment = data.data.map(
        (item: { amount: string | number; date: Date }) => {
            const { amount, date } = item;
            return { amount, date: new Date(date).toLocaleDateString("en-GB") };
        },
    );

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={investment} />
        </div>
    );
}

export default InvestmentTable;
