"use client";

import { useEffect, useState } from "react";

type Usuario = {
    name: string | null;
    email: string | null;
    isAdmin: boolean;
};

export function UserMenu() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        async function carregarUsuario() {
            const resposta = await fetch("/api/me");
            const dados = await resposta.json();
            setUsuario(dados);
        }

        carregarUsuario();
    }, []);

    if (!usuario?.email) {
        return (
            <a
                href="/api/auth/signin"
                className="ml-auto rounded-lg border border-white/40 px-4 py-2 font-semibold hover:bg-white hover:text-green-800"
            >
                Entrar
            </a>
        );
    }

    return (
        <div className="ml-auto flex items-center gap-4">
            <span className="text-sm font-semibold">
                Olá, {usuario.name ?? usuario.email}
            </span>

            <a
                href="/api/auth/signout"
                className="rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500 hover:text-white"
            >
                Sair
            </a>
        </div>
    );
}