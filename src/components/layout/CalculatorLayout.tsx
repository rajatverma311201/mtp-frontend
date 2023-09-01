import { Link, Outlet, useLocation } from "react-router-dom";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "../ui/menubar";
import { CALCULATORS } from "@/features/calculators/constants";
import { ScrollArea } from "../ui/scroll-area";

function CalculatorLayout() {
    const { pathname } = useLocation();
    console.log(pathname);

    const availableCalculators = CALCULATORS.filter(
        (calculator) => !pathname.endsWith(calculator.path),
    );
    return (
        <div>
            <div className=" flex justify-between">
                <Link
                    to={"/calculators"}
                    className="text-4xl font-bold text-left"
                >
                    Calculators
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
                                        className="w-full h-full block cursor-pointer"
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
