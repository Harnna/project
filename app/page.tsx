"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { Plane, CheckCircle2, Ticket, Sparkles, ArrowLeft } from "lucide-react";

// --- 3D Ինքնաթիռի Մոդել ---
function AirplaneModel({ isInside }: { isInside: boolean }) {
  const planeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (planeRef.current && !isInside) {
      planeRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      planeRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  if (isInside) return null;

  return (
    <group ref={planeRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Fuselage */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.2, 0.8, 8, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Cockpit */}
        <mesh position={[4.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.8, 1, 32]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Wings */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[2.5, 9, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Tail */}
        <mesh position={[-3.8, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
      </Float>
    </group>
  );
}

// --- 3D Կաբինայի Աթոռ ---
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

  let color = "#334155";
  if (isBooked) color = "#ef4444";
  if (isSelected) color = "#22c55e";
  if (hovered && !isBooked && !isSelected) color = "#06b6d4";

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
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.25, -0.25]}>
        <boxGeometry args={[0.6, 0.8, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      <Text
        position={[0, 0.3, -0.18]}
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

// --- 3D Կաբինայի Սրահ ---
function Cabin3D({
  selectedSeat,
  onSelectSeat,
}: {
  selectedSeat: string | null;
  onSelectSeat: (seat: string) => void;
}) {
  const rows = [1, 2, 3, 4, 5];
  const cols = ["A", "B", "C", "D"];
  const bookedSeats = ["1B", "2C", "4A"];

  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 12]} />
        <meshStandardMaterial color="#090d16" roughness={0.8} />
      </mesh>

      {rows.map((row, rIdx) =>
        cols.map((col, cIdx) => {
          const seatId = `${row}${col}`;
          const xPos = cIdx < 2 ? cIdx * 0.9 - 1.4 : cIdx * 0.9 - 0.5;
          const zPos = rIdx * 1.2 - 2.4;

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

// --- ՀԻՄՆԱԿԱՆ ԷՋԸ ---
export default function Home() {
  const [isInside, setIsInside] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white overflow-hidden font-sans">
      <header className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Plane className="w-7 h-7 text-cyan-400" />
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AERO3D
          </span>
        </div>

        {isInside && (
          <button
            onClick={() => {
              setIsInside(false);
              setSelectedSeat(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Back to Exterior
          </button>
        )}
      </header>

      <div className="w-full h-full">
        <Canvas camera={{ position: isInside ? [0, 3, 5] : [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {!isInside ? (
            <AirplaneModel isInside={isInside} />
          ) : (
            <Cabin3D selectedSeat={selectedSeat} onSelectSeat={setSelectedSeat} />
          )}

          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </div>

      {!isInside && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 items-center pointer-events-none bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent">
          <div className="text-center max-w-xl px-6 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen 3D Booking
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
              Explore & Book Your <span className="text-cyan-400">Flight Seat</span>
            </h1>
            <p className="text-slate-400 text-base mb-8">
              Interactive 3D airplane interior experience. Choose your exact seat directly in 3D.
            </p>
            <button
              onClick={() => setIsInside(true)}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/25 transition transform hover:scale-105"
            >
              Enter 3D Cabin & Select Seat
            </button>
          </div>
        </div>
      )}

      {isInside && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
          <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-6 rounded-3xl shadow-2xl">
            {selectedSeat ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Selected Seat
                    </span>
                    <h3 className="text-3xl font-black text-cyan-400">{selectedSeat}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Price
                    </span>
                    <p className="text-2xl font-bold text-emerald-400">$450</p>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 mb-4 text-xs text-slate-400 space-y-1">
                  <p className="flex justify-between">
                    <span>Flight:</span> <strong className="text-slate-200">AR-302 (Yerevan ➔ LA)</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Class:</span> <strong className="text-slate-200">Business Executive</strong>
                  </p>
                </div>

                <button
                  onClick={() => alert(`Seat ${selectedSeat} successfully booked!`)}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-5 h-5" /> Confirm & Issue Boarding Pass
                </button>
              </div>
            ) : (
              <div className="text-center py-2">
                <Ticket className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-semibold text-slate-300">
                  Click on any green/blue 3D seat to inspect & book
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}