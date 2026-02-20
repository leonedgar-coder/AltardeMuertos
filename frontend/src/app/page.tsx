"use client";
import { useEffect, useState } from "react";
import PapelPicado from "@/components/Altar/PapelPicado";
import MarigoldPetals from "@/components/Altar/MarigoldPetals";
import AltarLayout, { AltarTier } from "@/components/Altar/AltarLayout";
import FlickeringCandle from "@/components/Altar/FlickeringCandle";
import ContributionForm from "@/components/UI/ContributionForm";
import MemoryUpload from "@/components/UI/MemoryUpload";
import decos from "@/components/Altar/Decorations.module.scss";
import atmos from "@/components/Altar/Atmosphere.module.scss";
import { Relative } from "../../../shared/relative.interface";
import { API_BASE_URL } from "@/lib/api";

type ContributionTab = "MESSAGE" | "PHOTO";

export default function Home() {
  const [relatives, setRelatives] = useState<Relative[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRelativeId, setSelectedRelativeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ContributionTab>("MESSAGE");

  // Generamos motas de polvo espirituales
  const motes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 10}s`,
  }));

  const fetchRelatives = () => {
    fetch(`${API_BASE_URL}/relatives`)
      .then((res) => res.json())
      .then((data) => {
        setRelatives(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching relatives:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRelatives();
  }, []);

  const handleOpenModal = (id: string, tab: ContributionTab = "MESSAGE") => {
    setSelectedRelativeId(id);
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a0f02] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-orange-200 animate-pulse italic text-lg font-serif">Invocando recuerdos...</p>
      </div>
    );
  }

  return (
    <div className="altar-gradient min-h-screen relative overflow-hidden">
      {/* Efectos Ambientales */}
      <div className={atmos.ambientGlow} />
      <div className={atmos.atmosphere}>
        {motes.map((mote) => (
          <div
            key={mote.id}
            className={atmos.mote}
            style={{
              left: mote.left,
              animationDelay: mote.delay,
              animationDuration: mote.duration
            }}
          />
        ))}
      </div>

      <MarigoldPetals />

      <div className="absolute top-0 left-0 w-full z-10 overflow-hidden">
        <PapelPicado />
      </div>

      <main className="pt-32 pb-20 relative z-20 flex flex-col items-center">
        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-6xl font-bold text-orange-500 drop-shadow-[0_5px_15px_rgba(255,165,0,0.4)] mb-2 font-serif">
            Altar de Muertos
          </h1>
          <p className="text-orange-200 opacity-80 italic text-xl">
            Honrando a los que ya no están
          </p>
        </header>

        <AltarLayout>
          {/* Nivel 1: Cúspide */}
          <AltarTier level={1}>
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-8 items-center">
                <FlickeringCandle />
                {relatives.filter(r => r.level === 1).map(r => (
                  <div key={r.id} className="flex flex-col items-center gap-4">
                    <div
                      onClick={() => handleOpenModal(r.id)}
                      className="w-48 h-64 bg-zinc-800 border-8 border-orange-400 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative group transition-transform hover:scale-105 duration-500 cursor-pointer"
                    >
                      <img src={r.mainImageUrl} alt={r.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3 text-sm text-center text-orange-200">
                        {r.name}
                      </div>
                    </div>

                    {/* Sección de Mensajes */}
                    <div className="max-w-[300px] text-center space-y-3">
                      <div className="space-y-2">
                        {r.comments.slice(-2).map(c => (
                          <div key={c.id} className="text-[10px] text-orange-100/40 italic bg-white/5 p-2 rounded-sm border-l border-orange-500/30">
                            "{c.text}" — {c.author}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={() => handleOpenModal(r.id, "MESSAGE")}
                          className="text-[10px] text-orange-400 hover:text-orange-300 underline"
                        >
                          Dejar mensaje
                        </button>
                        <button
                          onClick={() => handleOpenModal(r.id, "PHOTO")}
                          className="text-[10px] text-orange-400 hover:text-orange-300 underline"
                        >
                          Subir foto
                        </button>
                      </div>
                    </div>

                    {/* Galería de Recuerdos (Memories) */}
                    {r.memories.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {r.memories.slice(0, 3).map(m => (
                          <div key={m.id} className="w-8 h-8 rounded-full border border-orange-400/50 overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-zoom-in">
                            <img src={m.url} alt="Recuerdo" className="w-full h-full object-cover grayscale" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <FlickeringCandle />
              </div>
            </div>
          </AltarTier>

          {/* Nivel 2: Intermedio */}
          <AltarTier level={2}>
            <div className="flex gap-12 items-center px-10">
              <FlickeringCandle />
              {relatives.filter(r => r.level === 2).map(r => (
                <div key={r.id} className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => handleOpenModal(r.id)}
                    className="w-32 h-40 bg-zinc-800 border-2 border-orange-300 rounded-sm shadow-xl overflow-hidden relative group hover:rotate-2 transition-all cursor-pointer"
                  >
                    <img src={r.mainImageUrl} alt={r.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <button onClick={() => handleOpenModal(r.id, "PHOTO")} className="text-[8px] text-orange-500/40 hover:text-orange-300 underline uppercase tracking-tighter">Añadir foto</button>
                </div>
              ))}
              <FlickeringCandle />
            </div>
          </AltarTier>

          {/* Nivel 3: Base */}
          <AltarTier level={3}>
            <div className="grid grid-cols-4 gap-12 items-center py-4">
              <FlickeringCandle />
              <div className={decos.panMuerto} title="Pan de Muerto">🍞</div>
              <div className={decos.calaverita} title="Calaverita">💀</div>
              <FlickeringCandle />
            </div>
          </AltarTier>
        </AltarLayout>

        {/* Modal Unificado */}
        {selectedRelativeId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md">
              {/* Tabs Switcher */}
              <div className="flex gap-1 mb-2">
                <button
                  onClick={() => setActiveTab("MESSAGE")}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-t-sm transition-colors ${activeTab === "MESSAGE" ? "bg-orange-600 text-white" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"}`}
                >
                  Mensaje
                </button>
                <button
                  onClick={() => setActiveTab("PHOTO")}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-t-sm transition-colors ${activeTab === "PHOTO" ? "bg-orange-600 text-white" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"}`}
                >
                  Subir Foto
                </button>
              </div>

              {activeTab === "MESSAGE" ? (
                <ContributionForm
                  relativeId={selectedRelativeId}
                  onSuccess={() => {
                    fetchRelatives();
                    setSelectedRelativeId(null);
                  }}
                  onClose={() => setSelectedRelativeId(null)}
                />
              ) : (
                <MemoryUpload
                  relativeId={selectedRelativeId}
                  onSuccess={() => {
                    fetchRelatives();
                    setSelectedRelativeId(null);
                  }}
                  onClose={() => setSelectedRelativeId(null)}
                />
              )}
            </div>
          </div>
        )}

        <footer className="mt-20 text-orange-200/30 text-[10px] tracking-widest uppercase">
          Fase 4: Altar Premium | Sistema de Memorias | Animaciones GPU
        </footer>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
