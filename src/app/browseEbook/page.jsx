
import { getBooks } from "@/lib/api/books";
import ClientBrowse from "../components/dashboard/ClientBrowse";


const BrowseEbookPage = async ({ searchParams }) => {
    const resolvedParams = await searchParams;
    const books = await getBooks(resolvedParams);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-4 sm:p-8 md:p-12 text-slate-100">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Section Header */}
                <div className="border-b border-slate-800/60 pb-6">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-200 bg-clip-text text-transparent">
                        Fable Library
                    </h1>
                    <p className="text-sm text-slate-400 mt-2">
                        Explore, search, and discover premium community stories across the platform.
                    </p>
                </div>

                {/* Delegate state hydration down to the unified HeroUI interface wrapper */}
                <ClientBrowse initialBooks={books} currentParams={resolvedParams} />
                
            </div>
        </div>
    );
};

export default BrowseEbookPage;











// import { getBooks } from "@/lib/api/books";

// const BrowseEbookPage =async () => {
//     const books = await getBooks()
//     console.log(books)
//     return (
//         <div>
//             <h2>all ebook</h2>
//         </div>
//     );
// };

// export default BrowseEbookPage;











