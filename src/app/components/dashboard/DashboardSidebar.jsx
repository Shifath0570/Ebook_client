"use client"
import { Drawer, Button, Card, Table, Input, TextArea } from "@heroui/react";
import { House, BookOpen, Plus, PencilToLine, Bookmark, Compass, Bars, ArrowRightFromSquare, Clock, Person, LayoutHeaderCellsLarge, CardClub } from "@gravity-ui/icons";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const DashboardSidebar = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const { data: session, isPending } = useSession()
    const user = session?.user;

    // console.log(user)

    const writerNavItems = [
        { id: "overview", href: "/Dashboard/writer", label: "Overview", icon: <House className="w-5 h-5" /> },
        { id: "manage", href: "/Dashboard/writer/manageEbook", label: "Manage Ebooks", icon: <BookOpen className="w-5 h-5" /> },
        { id: "add", href: "/Dashboard/writer/addEbook", label: "Add Ebook", icon: <Plus className="w-5 h-5" /> },
        { id: "bookmarks", href: "/Dashboard/writer/bookMark", label: "Bookmarks", icon: <Bookmark className="w-5 h-5" /> },
        { id: "sales", href: "/Dashboard/writer/salesHistory", label: "Sales History", icon: <Compass className="w-5 h-5" /> },
    ];


    const readerNavItems = [
        { id: "overview", href: "/Dashboard/reader", label: "Overview", icon: <House className="w-5 h-5" /> },
        { id: "purchase-history", href: "/Dashboard/reader/purchaseHistory", label: "Purchase History", icon: <Clock className="w-5 h-5" /> },
        { id: "purchased-ebooks", href: "/Dashboard/reader/purchasedEbooks", label: "Purchased Ebooks", icon: <BookOpen className="w-5 h-5" /> },
        { id: "profile", href: "/Dashboard/reader/profile", label: "Profile Management", icon: <Person className="w-5 h-5" /> },
        { id: "bookmarks", href: "/Dashboard/reader/bookMark", label: "Bookmark Page", icon: <Bookmark className="w-5 h-5" /> },
    ];

    const adminNavItems = [
        { id: "home", href: "/Dashboard/admin", label: "Dashboard Home", icon: <LayoutHeaderCellsLarge className="w-5 h-5" />},
        { id: "manage-users", href: "/Dashboard/admin/manageUsers", label: "Manage Users", icon: <Person className="w-5 h-5" />},
        { id: "manage-ebooks", href: "/Dashboard/admin/manageEbooks", label: "Manage All Ebooks", icon: <BookOpen className="w-5 h-5" />},
        { id: "transactions", href: "/Dashboard/admin/transaction", label: "View All Transactions", icon: <CardClub className="w-5 h-5" />},
    ];


    const navLinkMap = {
        reader: readerNavItems,
        writer: writerNavItems,
        admin: adminNavItems,
    }

    const navItem = navLinkMap[user?.role || 'reader']

    // Router dispatcher
    // const renderPage = () => {
    //     switch (activeTab) {
    //         case "overview": return <OverviewPage />;
    //         case "manage": return <ManageEbooksPage />;
    //         case "add": return <AddEbookPage />;
    //         case "edit": return <EditEbookPage />;
    //         case "bookmarks": return <BookmarksPage />;
    //         case "sales": return <SalesHistoryPage />;
    //         default: return <OverviewPage />;
    //     }
    // };

    return (
        <div>
            {/* SIDEBAR FOR DESKTOP */}
            <aside className="hidden md:flex flex-col justify-between w-64 border-r border-divider bg-content1 p-6 h-screen sticky top-0">
                <div>
                    <h1 className="text-xl font-black tracking-wide text-primary mb-8 px-4 uppercase text-center">{user?.role}</h1>
                    <nav className="flex flex-col gap-1">
                        {navItem.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left font-medium text-sm ${activeTab === item.id
                                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                                    : "text-default-600 hover:bg-default-100"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <Button variant="light" color="danger" className="w-full flex items-center justify-start gap-3 px-4">
                    <ArrowRightFromSquare className="w-5 h-5" />
                    Logout
                </Button>
            </aside>

            {/* DRAWER FOR MOBILE NAVIGATION */}
            <div className="md:hidden p-4 border-b border-divider flex items-center justify-between bg-content1">
                <Drawer>
                    <Button variant="flat" isIconOnly aria-label="Open Mobile Menu">
                        <Bars className="w-6 h-6" />
                    </Button>
                    <Drawer.Backdrop variant="blur">
                        <Drawer.Content placement="left">
                            <Drawer.Dialog className="max-w-[280px] h-full bg-background border-r border-divider flex flex-col justify-between">
                                <div>
                                    <Drawer.Header className="flex items-center justify-between border-b border-divider px-6 py-4">
                                        <Drawer.Heading className="text-xl font-bold text-foreground uppercase">{user?.role}</Drawer.Heading>
                                        <Drawer.CloseTrigger />
                                    </Drawer.Header>
                                    <Drawer.Body className="py-6 px-4 flex flex-col gap-1">
                                        {navItem.map((item) => (
                                            <Link
                                                slot="close"
                                                key={item.id}
                                                href={item.href}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center justify-start gap-4 px-4 py-3 rounded-xl h-auto text-left font-medium text-sm ${activeTab === item.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-transparent text-default-600 hover:bg-default-100"
                                                    }`}
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </Drawer.Body>
                                </div>
                                <Drawer.Footer className="border-t border-divider p-4">
                                    <Button slot="close" color="danger" variant="light" className="w-full flex items-center justify-start gap-3 px-4">
                                        <ArrowRightFromSquare className="w-5 h-5" />
                                        Logout
                                    </Button>
                                </Drawer.Footer>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>

            {/* MAIN CONTENT WORKSPACE
            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
                {renderPage()}
            </main> */}

        </div>
    );
};

export default DashboardSidebar;