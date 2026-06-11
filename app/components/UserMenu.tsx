"use client";

import { useEffect, useState } from "react";

type Usuario = {
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
            <a href="/api/auth/signin" className="ml-auto">
                Entrar
            </a>
        );
    }

    return (
        <div className="ml-auto flex gap-4">
            <span>{usuario.email}</span>
            <a href="/api/auth/signout">Sair</a>
        </div>
    );
}