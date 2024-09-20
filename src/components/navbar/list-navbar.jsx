import { MenuItems } from "@/lib/nav-menu.jsx";

export const ListNavbar = ({start, end}) => {
    return (
        <>
            {MenuItems.slice(start, end).map(item => (
                <a
                    class="inline-flex items-center gap-x-3 mt-3.5"
                    href={item.link}
                >
                    {item.icon}
                    {item.name}
                </a>
            ))}
        </>
    );
};
