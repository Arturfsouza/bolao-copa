import Link from "next/link";
import { UserMenu } from "./UserMenu";

export function Navbar() {
    return (
        <nav className="flex flex-col gap-3 px-4 py-4 bg-green-900 text-white shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:px-8">
            <div className="flex gap-4">
                <Link href="/jogos" className="font-semibold hover:text-green-200">
                    Jogos
                </Link>

                <Link href="/ranking" className="font-semibold hover:text-green-200">
                    Ranking
                </Link>

                <Link href="/admin" className="font-semibold hover:text-green-200">
                    Admin
                </Link>
            </div>

            <UserMenu />
        </nav>
    );
}