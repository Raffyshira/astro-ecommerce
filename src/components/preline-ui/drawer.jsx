import { AlignJustify, X } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";

import { MenuItems } from "@/lib/nav-menu.jsx";

const NavDrawer = () => {
    return (
        <>
            <Button
                type="button"
                variant="link"
                size="sm"
                className="px-0"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-offcanvas-bottom"
                data-hs-overlay="#hs-offcanvas-bottom"
            >
                <AlignJustify className="size-5" />{" "}
                <span className="sr-only">open drawer</span>
            </Button>
            <div
                id="hs-offcanvas-bottom"
                className="hs-overlay flex flex-col overflow-y-scroll hs-overlay-open:translate-y-0 bg-slate-100 translate-y-full fixed bottom-0 inset-x-0 transition-all duration-300 transform max-h-full size-full z-[80] bg-white border-b hidden"
                role="dialog"
                tabindex="-1"
                aria-labelledby="hs-offcanvas-bottom-label"
            >
                <div className="flex justify-start items-center py-3 sticky top-0 left-0 right-0 px-4 border-b bg-white z-50">
                    <Button
                        type="button"
                        variant="link"
                        className="p-0 mr-3"
                        aria-label="Close"
                        data-hs-overlay="#hs-offcanvas-bottom"
                    >
                        <span className="sr-only">Close</span>
                        <X className="size-5" />
                    </Button>
                    <h3
                        id="hs-offcanvas-bottom-label"
                        className="font-bold text-gray-800"
                    >
                        Menu Utama
                    </h3>
                </div>
                <div className="p-4 w-full flex flex-row justify-between items-center bg-white gap-4">
                    <Button className="w-full bg-green-500" asChild>
                        <a href="/auth/login">Masuk</a>
                    </Button>
                    <Button variant="outline" className="w-full text-green-500">
                        Daftar
                    </Button>
                </div>
                <div className="flex flex-col p-4 bg-white mt-2.5">
                    {MenuItems.slice(0, 4).map((item, index) => (
                        <a
                            className="inline-flex items-center gap-x-3 mt-3.5"
                            key={item.id}
                            href={item.link}
                        >
                            {item.icon}
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="flex flex-col p-4 bg-white mt-2.5 h-full">
                    {MenuItems.slice(4, 7).map((item, index) => (
                        <a
                            className="inline-flex items-center gap-x-3 mt-3.5"
                            key={item.id}
                            href={item.link}
                        >
                            {item.icon}
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default NavDrawer;
