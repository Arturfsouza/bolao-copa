"use client";

import { useState } from "react";
import { getFlagUrl } from "@/lib/flags";

type MatchCardProps = {
    id: number;
    mandante: string;
    visitante: string;
    data: string;
    horario: string;
    onPalpiteChange: (
        jogoId: number,
        golsMandante: string,
        golsVisitante: string
    ) => void;
};

export function MatchCard({
    id,
    mandante,
    visitante,
    data,
    horario,
    onPalpiteChange,
}: MatchCardProps) {
    const [golsMandante, setGolsMandante] = useState("");
    const [golsVisitante, setGolsVisitante] = useState("");

    const mandanteFlag = getFlagUrl(mandante);
    const visitanteFlag = getFlagUrl(visitante);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition">
            <div className="text-center mb-4">
                <p className="text-sm text-gray-500">
                    {data} às {horario}
                </p>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                    {mandanteFlag && (
                        <img
                            src={mandanteFlag}
                            alt={mandante}
                            className="w-10 h-7 object-cover rounded-sm shadow-sm"
                        />
                    )}

                    <span className="text-sm font-semibold text-center leading-tight">
                        {mandante}
                    </span>

                    <input
                        type="number"
                        value={golsMandante}
                        onChange={(e) => {
                            setGolsMandante(e.target.value);
                            onPalpiteChange(id, e.target.value, golsVisitante);
                        }}
                        className="w-16 border rounded-lg p-2 text-center text-lg font-bold"
                    />
                </div>

                <span className="text-xl font-bold text-gray-400 mt-10">x</span>

                <div className="flex flex-col items-center gap-2">
                    {visitanteFlag && (
                        <img
                            src={visitanteFlag}
                            alt={visitante}
                            className="w-10 h-7 object-cover rounded-sm shadow-sm"
                        />
                    )}

                    <span className="text-sm font-semibold text-center leading-tight">
                        {visitante}
                    </span>

                    <input
                        type="number"
                        value={golsVisitante}
                        onChange={(e) => {
                            setGolsVisitante(e.target.value);
                            onPalpiteChange(id, golsMandante, e.target.value);
                        }}
                        className="w-16 border rounded-lg p-2 text-center text-lg font-bold"
                    />
                </div>
            </div>
        </div>
    );
}