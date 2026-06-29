import { getUserSession } from '@/lib/core/session';
import BookMarkCard from '@/app/components/dashboard/BookMarkCard';

const BookMarkPage = async () => {
  const user = await getUserSession();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/bookmark/${user.id}`, {
    cache: 'no-store'
  });
  const bookMarks = await res.json();

  return (
    <div className="min-h-screen bg-[#0d1117] bg-gradient-to-br from-[#0b0f19] via-[#0d1117] to-[#1a1025] text-white px-6 py-12 md:px-16 lg:px-24">
      {/* Header matching screenshot design */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100 mb-3">
          The Bookmark
        </h1>
      </header>

      <hr className="border-gray-800/60 mb-10" />

      {bookMarks.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-light">
          No bookmarks found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookMarks.map((bookMark, index) => (
            <BookMarkCard key={bookMark._id} bookMark={bookMark} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookMarkPage;