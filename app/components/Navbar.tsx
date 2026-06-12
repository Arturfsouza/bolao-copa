"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserMenu } from "./UserMenu";

type Usuario = {
    email: string | null;
    isAdmin: boolean;
};

export function Navbar() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        async function carregarUsuario() {
            const resposta = await fetch("/api/me");
            const dados = await resposta.json();
            setUsuario(dados);
        }

        carregarUsuario();
    }, []);

    return (
        <nav className="flex flex-col gap-3 px-4 py-4 bg-green-900 text-white shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:px-8">
            <div className="flex gap-4">
                <Link href="/jogos" className="font-semibold hover:text-green-200">
                    Jogos
                </Link>

                <Link href="/ranking" className="font-semibold hover:text-green-200">
                    Ranking
                </Link>

                {usuario?.isAdmin && (
                    <Link href="/admin" className="font-semibold hover:text-green-200">
                        Admin
                    </Link>
                )}
            </div>

            <UserMenu />
        </nav>
    );
}