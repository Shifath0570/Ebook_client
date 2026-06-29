import Image from "next/image";
import Banner from "./components/Banner";
import Featured from "./components/Featured";
import TopWriters from "./components/TopWriters";
import EbookGenres from "./components/EbookGenres";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <TopWriters></TopWriters>
      <EbookGenres></EbookGenres>
    </div>
  );
}
// className="text-white"
// className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"