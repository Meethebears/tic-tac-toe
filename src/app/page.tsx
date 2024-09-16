import Header from "@/components/header.component";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="text-2xl h-[5rem]">Welcome to</div>
        <div className="text-orange-700 text-7xl h-[15rem]">Tic Tac Toe Game!!!</div>
        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Play
        </Link>
      </main>
    </>
  );
}
