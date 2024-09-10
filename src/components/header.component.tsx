"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="bg-blue-400">
      <nav className="h-full flex justify-between container items-center px-5">
        <div>
          <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
            Tic Tac Toe
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className="text-ct-dark-600">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/login" className="text-ct-dark-600">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-ct-dark-600">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link href="/profile" className="text-ct-dark-600">
                  Profile
                </Link>
              </li>
              <li className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </li>
            </>
          )}
          {user && (
            <>
              <div className="w-[50px]">
                <img
                  src={user.image ? user.image : "/images/default.png"}
                  className="max-h-36"
                  alt={`profile photo of ${user.name}`}
                />
              </div>
              <div className="flex items-center">
                <p>{user.name}</p>
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
