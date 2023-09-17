import { Link, Outlet, useLocation } from "react-router-dom";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { CALCULATORS } from "@/features/calculators/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

function CalculatorLayout() {
    const { pathname } = useLocation();

    const availableCalculators = CALCULATORS.filter(
        (calculator) => !pathname.endsWith(calculator.path),
    );
    return (
        <div>
            <div className="flex justify-between">
                <Link
                    to={"/calculators"}
                    className="text-left text-4xl font-bold"
                >
                    Calculators
                </Link>
                <Link to={"/"} className="text-left text-4xl font-bold">
                    Home
                </Link>
                {pathname !== "/calculators" && (
                    <MoreBtn links={availableCalculators} />
                )}
            </div>
            <main className="p-10">
                <Outlet />
            </main>
        </div>
    );
}

const MoreBtn = ({ links }: { links: typeof CALCULATORS }) => {
    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="">
                        Other Calculators
                    </MenubarTrigger>
                    <MenubarContent className="mr-5">
                        <ScrollArea className="">
                            {links.map((calculator) => (
                                <MenubarItem
                                    asChild
                                    key={calculator.path}
                                    className="px-5"
                                >
                                    <Link
                                        key={calculator.path}
                                        to={calculator.path}
                                        className="block h-full w-full cursor-pointer"
                                    >
                                        {calculator.name}
                                    </Link>
                                </MenubarItem>
                            ))}
                        </ScrollArea>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </>
    );
};

export default CalculatorLayout;
