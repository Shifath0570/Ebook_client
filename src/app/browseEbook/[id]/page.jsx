
import { getBookMarks, getBooksDetails } from "@/lib/api/books";
import ClientDetails from "./ClientDetails";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";


const EbookDetailsPage = async ({ params }) => {
    const { id } = await params;
    const book = await getBooksDetails(id);

    const user = await getUserSession()

    const bookMarks = await getBookMarks()

    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // const res = await fetch(`${baseUrl}/api/bookPurches/${user.id}`)
    // const purchese = await res.json()
    // console.log(purcheserId)

    // Error State Guard: Render message for invalid IDs
    if (!book) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
                <div className="p-4 bg-slate-900/60 rounded-full border border-slate-800 text-slate-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-200">Ebook not found</h2>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">The digital masterpiece you are trying to view does not exist or has been removed from our databases.</p>
                <Link href="/browse" className="mt-6 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl transition-all">
                    Return to Library Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-4 sm:p-8 md:p-12 text-slate-100">
            <div className="max-w-6xl mx-auto">
                <ClientDetails book={book} user={user} bookMarks={bookMarks}/>
            </div>
        </div>
    );
};

export default EbookDetailsPage;