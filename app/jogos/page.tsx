"use client";

import { useEffect, useState } from "react";
import { MatchCard } from "../components/MatchCard";
import { Bet } from "@/types/bet";

type Palpite = Omit<Bet, "matchId">;

type Match = {
    id: number;
    grupo: string;
    mandante: string;
    visitante: string;
    dataHora: string;
};

export default function Jogos() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [palpites, setPalpites] = useState<Record<number, Palpite>>({});
    const [usuario, setUsuario] = useState<{ email: string | null } | null>(null);

    useEffect(() => {
        async function carregarDados() {
            const respostaUsuario = await fetch("/api/me");
            const dadosUsuario = await respostaUsuario.json();
            setUsuario(dadosUsuario);

            if (!dadosUsuario.email) {
                return;
            }

            const resposta = await fetch("/api/matches");
            const dados = await resposta.json();
            setMatches(dados);
            const respostaPalpites = await fetch("/api/meus-palpites");
            const dadosPalpites = await respostaPalpites.json();
            setPalpites(dadosPalpites);
        }

        carregarDados();
    }, []);

    function atualizarPalpite(
        jogoId: number,
        golsMandante: string,
        golsVisitante: string
    ) {
        setPalpites((palpitesAtuais) => ({
            ...palpitesAtuais,
            [jogoId]: {
                golsMandante,
                golsVisitante,
            },
        }));
    }

    if (usuario && !usuario.email) {
        return (
            <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
                <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center shadow-lg border border-gray-200">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                        ⚽
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Bolão da Copa
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Entre com sua conta Google para fazer seus palpites e acompanhar o ranking.
                    </p>

                    <a
                        href="/api/auth/signin"
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-green-800 px-5 py-3 font-semibold text-white shadow hover:bg-green-900"
                    >
                        Entrar com Google
                    </a>

                </div>
            </main>
        );
    }
    const jogosPorData = matches.reduce<Record<string, Match[]>>((acc, jogo) => {
        const data = new Date(jogo.dataHora).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
        });

        if (!acc[data]) {
            acc[data] = [];
        }

        acc[data].push(jogo);
        return acc;
    }, {});

    return (
        <main className="p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6">Jogos da Copa</h1>

            <div className="flex flex-col gap-4">
                {Object.entries(jogosPorData).map(([dataGrupo, jogos]) => (
                    <section key={dataGrupo} className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 capitalize">
                            {dataGrupo}
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {jogos.map((jogo) => {
                                const data = new Date(jogo.dataHora).toLocaleDateString("pt-BR");
                                const horario = new Date(jogo.dataHora).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });

                                return (
                                    <MatchCard
                                        key={jogo.id}
                                        id={jogo.id}
                                        mandante={jogo.mandante}
                                        visitante={jogo.visitante}
                                        data={data}
                                        horario={horario}
                                        golsMandanteInicial={palpites[jogo.id]?.golsMandante ?? ""}
                                        golsVisitanteInicial={palpites[jogo.id]?.golsVisitante ?? ""}
                                        onPalpiteChange={atualizarPalpite}
                                    />
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>

            <button
                onClick={async () => {
                    if (Object.keys(palpites).length === 0) {
                        alert("Preencha pelo menos um palpite.");
                        return;
                    }

                    const resposta = await fetch("/api/palpites", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(palpites),
                    });

                    const dados = await resposta.json();

                    alert(dados.mensagem);
                    console.log(dados);
                }}
                className="mt-6 bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-xl shadow"
            >
                Salvar palpites
            </button>
        </main>
    );
}