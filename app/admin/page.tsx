"use client";

import { useEffect, useState } from "react";

type Match = {
    id: number;
    mandante: string;
    visitante: string;
    dataHora: string;
    golsMandante: number | null;
    golsVisitante: number | null;
};

export default function Admin() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        async function carregarDados() {
            const respostaUsuario = await fetch("/api/me");
            const usuario = await respostaUsuario.json();

            if (!usuario.isAdmin) {
                setAdmin(false);
                setCarregando(false);
                return;
            }

            setAdmin(true);

            const respostaJogos = await fetch("/api/matches");
            const dadosJogos = await respostaJogos.json();

            setMatches(dadosJogos);
            setCarregando(false);
        }

        carregarDados();
    }, []);

    async function salvarResultado(
        id: number,
        golsMandante: string,
        golsVisitante: string
    ) {
        const resposta = await fetch(`/api/matches/${id}/result`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                golsMandante,
                golsVisitante,
            }),
        });

        const dados = await resposta.json();
        alert(dados.mensagem);
    }

    if (carregando) {
        return <main className="p-8">Carregando...</main>;
    }

    if (!admin) {
        return (
            <main className="p-8">
                <h1 className="text-3xl font-bold mb-4">Acesso negado</h1>
                <p>Você não tem permissão para acessar a administração.</p>
            </main>
        );
    }

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Administração</h1>

            <div className="flex flex-col gap-4">
                {matches.map((jogo) => (
                    <div key={jogo.id} className="border rounded-lg p-4 bg-white">
                        <p className="font-semibold">
                            {jogo.mandante} x {jogo.visitante}
                        </p>

                        <div className="flex items-center gap-3 mt-4">
                            <input
                                id={`mandante-${jogo.id}`}
                                type="number"
                                defaultValue={jogo.golsMandante ?? ""}
                                className="w-16 border rounded p-2 text-center"
                            />

                            <span>x</span>

                            <input
                                id={`visitante-${jogo.id}`}
                                type="number"
                                defaultValue={jogo.golsVisitante ?? ""}
                                className="w-16 border rounded p-2 text-center"
                            />

                            <button
                                onClick={() => {
                                    const golsMandante = (
                                        document.getElementById(
                                            `mandante-${jogo.id}`
                                        ) as HTMLInputElement
                                    ).value;

                                    const golsVisitante = (
                                        document.getElementById(
                                            `visitante-${jogo.id}`
                                        ) as HTMLInputElement
                                    ).value;

                                    salvarResultado(jogo.id, golsMandante, golsVisitante);
                                }}
                                className="bg-green-700 text-white px-4 py-2 rounded"
                            >
                                Salvar resultado
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}