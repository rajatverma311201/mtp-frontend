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
        <>
            <div className="relative flex-1">
                {/* <Link
                    to={"/calculators"}
                    className="text-left text-4xl font-bold"
                >
                    Calculators
                </Link> */}
                <div className="absolute right-0">
                    {pathname !== "/calculators" && (
                        <MoreBtn links={availableCalculators} />
                    )}
                </div>
                <div className="flex w-full justify-center">
                    <Outlet />
                </div>
            </div>
        </>
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
