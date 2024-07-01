import Link from "next/link";

import { NavBar } from "~/components/NavBar";
import { Chat } from "~/components/Chat";

export default async function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
            Makers Tech
          </h1>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-[3rem]">
            Buy and search by chatting📱
          </h2>
          <Chat />
        </div>
      </main>
    </>
  );
}
