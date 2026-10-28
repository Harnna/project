"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Plane, CheckCircle2, Ticket, Sparkles, ArrowLeft, ShieldCheck, Compass } from "lucide-react";

// --- Իրական 3D Ինքնաթիռի Մոդել (GLTF) ---
function RealAirplane({ isInside }: { isInside: boolean }) {
  const planeRef = useRef<THREE.Group>(null);
  
  // Բեռնում ենք պրոֆեսիոնալ 3D ինքնաթիռի մոդել բաց շտեմարանից
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/airplane/model.gltf");

  useFrame((state) => {
    if (planeRef.current && !isInside) {
      planeRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      planeRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
    }
  });

  if (isInside) return null;

  return (
    <group ref={planeRef} scale={[1.2, 1.2, 1.2]}>
      <primitive object={scene} />
    </group>
  );
}

// --- Պրոֆեսիոնալ 3D Աթոռ (Cabin Seat) ---
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

  let color = "#1e293b"; // Dark Slate
  if (isBooked) color = "#7f1d1d"; // Dark Red (Booked)
  if (isSelected) color = "#059669"; // Emerald (Selected)
  if (hovered && !isBooked && !isSelected) color = "#0284c7"; // Cyan Hover

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
      {/* Աթոռի նստատեղ (Leather texture look) */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.55, 0.12, 0.55]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Աթոռի թիկնակ */}
      <mesh position={[0, 0.3, -0.22]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.55, 0.75, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Գլխանոց (Headrest) */}
      <mesh position={[0, 0.75, -0.25]}>
        <boxGeometry args={[0.35, 0.15, 0.08]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* Նստատեղի համարը */}
      <Text
        position={[0, 0.3, -0.16]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {seatNumber}
      </Text>
    </group>
  );
}

// --- Իրատեսական Սրահի Ներսում (Cabin Interior) ---
function CabinInterior({
  selectedSeat,
  onSelectSeat,
}: {
  selectedSeat: string | null;
  onSelectSeat: (seat: string) => void;
}) {
  const rows = [1, 2, 3, 4, 5, 6];
  const cols = ["A", "B", "C", "D"];
  const bookedSeats = ["1B", "3A", "5C", "2D"];

  return (
    <group position={[0, -0.8, 0]}>
      {/* Հատակ */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 14]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh>

      {/* Աթոռների դասավորություն */}
      {rows.map((row, rIdx) =>
        cols.map((col, cIdx) => {
          const seatId = `${row}${col}`;
          const xPos = cIdx < 2 ? cIdx * 0.8 - 0.9 : cIdx * 0.8 - 0.1;
          const zPos = rIdx * 1.1 - 3;

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

// --- ՀԻՄՆԱԿԱՆ ՀԱՎԵԼՎԱԾ ---
export default function Home() {
  const [isInside, setIsInside] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white overflow-hidden font-sans">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 px-8 py-5 flex justify-between items-center bg-slate-950/60 backdrop-blur-xl border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
            <Plane className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            AEROFLOT 3D
          </span>
        </div>

        {isInside && (
          <button
            onClick={() => {
              setIsInside(false);
              setSelectedSeat(null);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-semibold rounded-xl transition shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Exterior View
          </button>
        )}
      </header>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: isInside ? [0, 2.5, 4] : [0, 3, 9], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 20, 15]} intensity={2.5} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} />

          {!isInside ? (
            <>
              <RealAirplane isInside={isInside} />
              <Environment preset="sunset" />
            </>
          ) : (
            <CabinInterior selectedSeat={selectedSeat} onSelectSeat={setSelectedSeat} />
          )}

          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2.1} minDistance={2} maxDistance={15} />
        </Canvas>
      </div>

      {/* Hero UI */}
      {!isInside && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 items-center pointer-events-none bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent">
          <div className="text-center max-w-2xl px-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 shadow-inner">
              <Sparkles className="w-4 h-4" /> Photorealistic 3D Aircraft Experience
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-none">
              Experience Flight <span className="text-cyan-400">Before You Fly</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 font-medium">
              Inspect the aircraft exterior in high fidelity, step inside the executive cabin, and pick your exact seat in interactive 3D.
            </p>
            <button
              onClick={() => setIsInside(true)}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-lg rounded-2xl shadow-2xl shadow-cyan-500/30 transition transform hover:scale-105"
            >
              Enter 3D Cabin & Select Seats
            </button>
          </div>
        </div>
      )}

      {/* Booking Dashboard */}
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
                      Total Price
                    </span>
                    <p className="text-3xl font-black text-emerald-400 mt-1">$680</p>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/60 rounded-2xl p-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Route:</span> 
                    <strong className="font-semibold">EVN ➔ LAX (Direct)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Class:</span> 
                    <strong className="font-semibold text-cyan-400">First Class Executive</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Luggage:</span> 
                    <strong className="font-semibold">2x 23kg Included</strong>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Congratulations! Seat ${selectedSeat} booked successfully. Boarding pass generated!`)}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base rounded-2xl transition flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-6 h-6" /> Confirm Booking & Get Boarding Pass
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Ticket className="w-10 h-10 text-cyan-400 mx-auto mb-3 animate-pulse" />
                <h4 className="text-lg font-bold text-white mb-1">Choose Your Seat in 3D</h4>
                <p className="text-xs text-slate-400">
                  Click on any available green seat inside the cabin to view pricing and details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}