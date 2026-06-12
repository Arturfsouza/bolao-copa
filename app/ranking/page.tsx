"use client";

import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    totalApostas: number;
    pontos: number;
};

export default function Ranking() {
    const [usuarios, setUsuarios] = useState<User[]>([]);

    useEffect(() => {
        async function carregarRanking() {
            const resposta = await fetch("/api/ranking");
            const dados = await resposta.json();

            if (Array.isArray(dados)) {
                setUsuarios(dados);
            } else {
                setUsuarios([]);
            }
        }

        carregarRanking();
    }, []);

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Ranking</h1>

            <div className="flex flex-col gap-4">
                {usuarios.map((usuario, index) => {
                    const medalha =
                        index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅";

                    return (
                        <div key={usuario.id} className="border rounded-lg p-4 bg-white">
                            <h2 className="font-semibold text-xl">
                                {medalha} {usuario.name}
                            </h2>

                            <p className="text-gray-600">{usuario.email}</p>

                            <p className="mt-2 font-bold">
                                {usuario.pontos} pontos
                            </p>

                            <p className="text-sm text-gray-500">
                                Total de apostas: {usuario.totalApostas}
                            </p>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}