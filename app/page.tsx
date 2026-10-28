"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float, Environment } from "@react-three/drei";
import { Plane, CheckCircle2, Ticket, Sparkles, ArrowLeft, Shield, Wifi, Coffee, Compass, UserCheck } from "lucide-react";

// --- Ավելի մանրամասն և իրական 3D Աթոռ (Cabin Seat) ---
function Seat3D({
  position,
  seatNumber,
  isBooked,
  isSelected,
  onSelect,
}: {
  position: [number, number, number];
  seatNumber: string;
  isBooked: boolean;
  isSelected: boolean;
  onSelect: (seat: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  let color = "#1e293b"; // Slate
  if (isBooked) color = "#991b1b"; // Zbaghvac (Dark Red)
  if (isSelected) color = "#059669"; // Entrvac (Emerald Green)
  if (hovered && !isBooked && !isSelected) color = "#0284c7"; // Hover (Cyan)

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (!isBooked) onSelect(seatNumber);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!isBooked) setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Nstatelu baza */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.6, 0.12, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Tiknak */}
      <mesh position={[0, 0.35, -0.24]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.6, 0.85, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Bazki henakner (Armrests) */}
      <mesh position={[-0.32, 0.1, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      <mesh position={[0.32, 0.1, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* Nstatexi hamar 3D */}
      <Text
        position={[0, 0.38, -0.16]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {seatNumber}
      </Text>
    </group>
  );
}

// --- Իրական Ներքին Սրահ (Cabin Interior with Details) ---
function CabinInterior({
  selectedSeat,
  onSelectSeat,
}: {
  selectedSeat: string | null;
  onSelectSeat: (seat: string) => void;
}) {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ["A", "B", "C", "D"];
  const bookedSeats = ["1B", "2C", "4A", "6D", "7B"];

  return (
    <group position={[0, -1, 0]}>
      {/* Hatak */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 18]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh>

      {/* Dzax ev aj sharqer */}
      {rows.map((row, rIdx) =>
        cols.map((col, cIdx) => {
          const seatId = `${row}${col}`;
          // Mijancqen mejtexum e (cIdx < 2 dzax e, isk cIdx >= 2 aj e)
          const xPos = cIdx < 2 ? cIdx * 0.9 - 1.3 : cIdx * 0.9 - 0.1;
          const zPos = rIdx * 1.2 - 4;

          return (
            <Seat3D
              key={seatId}
              position={[xPos, 0, zPos]}
              seatNumber={seatId}
              isBooked={bookedSeats.includes(seatId)}
              isSelected={selectedSeat === seatId}
              onSelect={onSelectSeat}
            />
          );
        })
      )}
    </group>
  );
}

// --- Hիմնական 3D Արտաքին Տեսք (Detailed Procedural Jet) ---
function JetModel({ isInside }: { isInside: boolean }) {
  if (isInside) return null;

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group rotation={[0, Math.PI / 4, 0]}>
        {/* Glxavor Iran (Fuselage) */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.4, 1.0, 10, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Qit (Nose) */}
        <mesh position={[5.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[1.4, 1.5, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Tever (Wings) */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[3.2, 11, 0.15]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Poj (Tail) */}
        <mesh position={[-4.5, 1.5, 0]} rotation={[0, 0, -Math.PI / 3]}>
          <boxGeometry args={[1.8, 2, 0.1]} />
          <meshStandardMaterial color="#0284c7" roughness={0.2} />
        </mesh>

        {/* Sharzhichner (Engines) */}
        <mesh position={[-0.5, -0.6, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 2, 24]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.5, -0.6, -2.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 2, 24]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Home() {
  const [isInside, setIsInside] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white overflow-hidden font-sans select-none">
      {/* Top Header */}
      <header className="absolute top-0 left-0 w-full z-30 px-8 py-5 flex justify-between items-center bg-slate-950/40 backdrop-blur-xl border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl shadow-lg shadow-cyan-500/10">
            <Plane className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              SKYLUX 3D
            </span>
            <span className="block text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
              Global Aviation Experience
            </span>
          </div>
        </div>

        {isInside && (
          <button
            onClick={() => {
              setIsInside(false);
              setSelectedSeat(null);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/90 border border-slate-700 hover:bg-slate-800 text-sm font-bold rounded-2xl transition shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Back to Exterior
          </button>
        )}
      </header>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: isInside ? [0, 3, 5] : [0, 3, 10], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 20, 15]} intensity={2.5} />
          <pointLight position={[-10, -10, -10]} intensity={1} />

          {!isInside ? (
            <>
              <JetModel isInside={isInside} />
              <Environment preset="city" />
            </>
          ) : (
            <CabinInterior selectedSeat={selectedSeat} onSelectSeat={setSelectedSeat} />
          )}

          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2.1} minDistance={2} maxDistance={16} />
        </Canvas>
      </div>

      {/* Exterior Landing Hero UI */}
      {!isInside && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 items-center pointer-events-none bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent">
          <div className="text-center max-w-2xl px-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 shadow-inner">
              <Sparkles className="w-4 h-4" /> Next-Gen 3D Flight Booking Platform
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-none">
              The Future of <span className="text-cyan-400">Air Travel</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-10 font-medium leading-relaxed">
              Explore our aircraft in photorealistic 3D, step inside the spacious cabin, and select your exact seat with live pricing and instant booking.
            </p>
            <button
              onClick={() => setIsInside(true)}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-lg rounded-2xl shadow-2xl shadow-cyan-500/40 transition transform hover:scale-105"
            >
              Enter 3D Cabin & Pick Seat
            </button>
          </div>
        </div>
      )}

      {/* Cabin Seat Selection & Booking Dashboard UI */}
      {isInside && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-lg px-4">
          <div className="bg-slate-900/95 border border-slate-800/80 backdrop-blur-2xl p-7 rounded-3xl shadow-2xl">
            {selectedSeat ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Selected Seat
                    </span>
                    <h3 className="text-4xl font-black text-cyan-400 mt-1">{selectedSeat}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Price
                    </span>
                    <p className="text-3xl font-black text-emerald-400 mt-1">$540</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 text-center">
                    <Wifi className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">High-Speed Wi-Fi</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 text-center">
                    <Coffee className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">VIP Catering</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 text-center">
                    <Shield className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Priority Pass</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Շնորհավորում ենք! Seat ${selectedSeat} հաջողությամբ ամրագրվեց:`)}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base rounded-2xl transition flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-6 h-6" /> Confirm Booking & Boarding Pass
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Ticket className="w-10 h-10 text-cyan-400 mx-auto mb-3 animate-bounce" />
                <h4 className="text-lg font-bold text-white mb-1">Select Your Seat in 3D</h4>
                <p className="text-xs text-slate-400">
                  Click on any available green seat inside the 3D cabin to view details and confirm.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}