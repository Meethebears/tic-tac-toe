import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "@/components/header.component";
import TicTacToe from "@/components/TicTacToe"

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <Header />
      <TicTacToe/>
    </>
  );
}
