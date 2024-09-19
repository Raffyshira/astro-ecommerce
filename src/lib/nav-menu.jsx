import {
    ReceiptText,
    Heart,
    Star,
    Store,
    UserRoundX,
    SquareUserRound,
    QrCode
} from "lucide-react";

// export const MenuPromo = [
//     {
//         id: 1,
//         name: "Kategori",
//         link: "/",
//         icon: <IoBagHandleOutline className="text-xl" />
//     },
//     {
//         id: 2,
//         name: "Top-up & Tagihan",
//         link: "/",
//         icon: <IoReceiptOutline className="text-xl" />
//     },
//     {
//         id: 3,
//         name: "Travel & Entertainment",
//         link: "/",
//         icon: <IoAirplaneOutline className="text-xl" />
//     },
//     {
//         id: 4,
//         name: "Keuangan",
//         link: "/",
//         icon: <IoCashOutline className="text-xl" />
//     },
//     {
//         id: 5,
//         name: "Layanan Lainnya",
//         link: "/",
//         icon: <IoEllipsisHorizontalCircle className="text-xl" />
//     }
// ];

export const MenuItems = [
    {
        id: 1,
        name: "Daftar Transaksi",
        link: "/",
        icon: <ReceiptText className="size-5" />
    },
    {
        id: 2,
        name: "Wishlist",
        link: "/",
        icon: <Heart className="size-5" />
    },
    {
        id: 3,
        name: "Ulasan",
        link: "/",
        icon: <Star className="size-5" />
    },
    {
        id: 4,
        name: "Toko yang di-follow",
        link: "/",
        icon: <Store className="size-5" />
    },
    {
        id: 5,
        name: "Pesanan Dikomplain",
        link: "/",
        icon: <UserRoundX className="size-5" />
    },
    {
        id: 6,
        name: "Bantuan Tokopedia Care",
        link: "/",
        icon: <SquareUserRound className="size-5" />
    },
    {
        id: 7,
        name: "Scan Kode QR",
        link: "/",
        icon: <QrCode className="size-5" />
    }
];
