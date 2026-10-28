"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { CheckCircle2, Ticket, Sparkles, ArrowLeft, Shield, Wifi, Coffee, Send } from "lucide-react";

// --- Իրական Պրոֆեսիոնալ Կոմերցիոն Ինքնաթիռ (Boeing / Airbus Style) ---
function CommercialJetModel({ isInside }: { isInside: boolean }) {
  const planeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (planeRef.current && !isInside) {
      planeRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      planeRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.12;
    }
  });

  if (isInside) return null;

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={planeRef} rotation={[0.1, Math.PI / 4, 0]} scale={[0.9, 0.9, 0.9]}>
        
        {/* --- 1. Գլխավոր իրան (Fuselage - Sleek & Aerodynamic) --- */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.1, 0.9, 12, 48]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Քիթ (Nose Cone - Rounded & Realistic) */}
        <mesh position={[6.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[1.1, 1.8, 48]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.15} metalness={0.85} />
        </mesh>

        {/* Խցիկի ապակիներ (Cockpit Windows - Dark Tinted Glass) */}
        <mesh position={[5.8, 0.35, 0]} rotation={[0, 0, -Math.PI / 5]}>
          <boxGeometry args={[0.7, 0.35, 1.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.05} metalness={0.9} />
        </mesh>

        {/* --- 2. Թևեր (Swept-back Wings with Winglets) --- */}
        <mesh position={[0.5, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[2.8, 14.5, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Աջ և ձախ վինգլետներ (Wingtips) */}
        <mesh position={[0.5, 0.1, 7.1]} rotation={[0.2, 0, 0.4]}>
          <boxGeometry args={[0.4, 0.8, 0.08]} />
          <meshStandardMaterial color="#dc2626" roughness={0.3} />
        </mesh>
        <mesh position={[0.5, 0.1, -7.1]} rotation={[-0.2, 0, -0.4]}>
          <boxGeometry args={[0.4, 0.8, 0.08]} />
          <meshStandardMaterial color="#dc2626" roughness={0.3} />
        </mesh>

        {/* --- 3. Պոչային Համակարգ (Tail Fin & American Airlines Livery) --- */}
        <group position={[-5.5, 1.8, 0]}>
          {/* Ուղղահայաց պոչ */}
          <mesh rotation={[0, 0, -Math.PI / 3.2]}>
            <boxGeometry args={[1.8, 2.4, 0.08]} />
            <meshStandardMaterial color="#dc2626" roughness={0.2} />
          </mesh>
          {/* Կապույտ շերտեր պոչին */}
          <mesh position={[0.2, 0.3, 0.05]} rotation={[0, 0, -Math.PI / 3.2]}>
            <boxGeometry args={[1.5, 0.4, 0.02]} />
            <meshStandardMaterial color="#1d4ed8" />
          </mesh>
        </group>
        {/* Հորիզոնական պոչային թևեր */}
        <mesh position={[-5.3, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[1.2, 4.2, 0.05]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.7} />
        </mesh>

        {/* --- 4. Ժամանակակից Երկվորյակ Ռեակտիվ Շարժիչներ (Turbofan Engines) --- */}
        <group position={[0.8, -0.7, 3.2]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2.5, 32]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Շարժիչի ներսի մաս (Intake) */}
          <mesh position={[0, 0, 1.25]}>
            <ringGeometry args={[0.2, 0.45, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} />
          </mesh>
        </group>

        <group position={[0.8, -0.7, -3.2]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2.5, 32]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0, 1.25]}>
            <ringGeometry args={[0.2, 0.45, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} />
          </mesh>
        </group>

        {/* --- 5. Կոմերցիոն գծեր և գրառում (Fuselage Stripe) --- */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.12, 1.12, 8, 32, 1, true]} />
          <meshStandardMaterial color="#2563eb" roughness={0.2} transparent opacity={0.8} />
        </mesh>

      </group>
    </Float>
  );
}

// --- Ինտերակտիվ Նստատեղ (3D Cabin Seat) ---
function LightSeat3D({
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

  let color = "#2563eb";
  if (isBooked) color = "#ef4444";
  if (isSelected) color = "#10b981";
  if (hovered && !isBooked && !isSelected) color = "#0284c7";

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
        <boxGeometry args={[0.6, 0.12, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.35, -0.24]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.6, 0.85, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      <mesh position={[-0.32, 0.1, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0.32, 0.1, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

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

// --- Սրահի Ներսում (Cabin Interior) ---
function LightCabinInterior({
  selectedSeat,
  onSelectSeat,
}: {
  selectedSeat: string | null;
  onSelectSeat: (seat: string) => void;
}) {
  const rows = [1, 2, 3, 4, 5, 6, 7];
  const cols = ["A", "B", "C", "D"];
  const bookedSeats = ["1B", "2C", "4A", "6D"];

  return (
    <group position={[0, -1, 0]}>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 18]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>

      {rows.map((row, rIdx) =>
        cols.map((col, cIdx) => {
          const seatId = `${row}${col}`;
          const xPos = cIdx < 2 ? cIdx * 0.9 - 1.3 : cIdx * 0.9 - 0.1;
          const zPos = rIdx * 1.2 - 3.5;

          return (
            <LightSeat3D
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

export default function Home() {
  const [isInside, setIsInside] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-sky-100 via-slate-50 to-white text-slate-800 overflow-hidden font-sans select-none">
      {/* Light Header */}
      <header className="absolute top-0 left-0 w-full z-30 px-8 py-5 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-2xl shadow-md shadow-blue-500/20 text-white">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider text-blue-900">
              AMERICAN AIR 3D
            </span>
            <span className="block text-[10px] text-blue-600 font-bold tracking-widest uppercase">
              Premium Flight Booking
            </span>
          </div>
        </div>

        {isInside && (
          <button
            onClick={() => {
              setIsInside(false);
              setSelectedSeat(null);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-sm font-bold rounded-2xl transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" /> Exterior View
          </button>
        )}
      </header>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: isInside ? [0, 3, 5] : [0, 3, 10], fov: 45 }}>
          <ambientLight intensity={1.8} />
          <directionalLight position={[10, 20, 15]} intensity={2.5} />

          {!isInside ? (
            <CommercialJetModel isInside={isInside} />
          ) : (
            <LightCabinInterior selectedSeat={selectedSeat} onSelectSeat={setSelectedSeat} />
          )}
          <Environment preset="city" />

          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2.1} minDistance={2} maxDistance={16} />
        </Canvas>
      </div>

      {/* Light Theme Landing Hero */}
      {!isInside && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 items-center pointer-events-none bg-gradient-to-t from-white via-white/40 to-transparent">
          <div className="text-center max-w-2xl px-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" /> Official Commercial 3D Experience
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-none">
              Book Your Flight in <span className="text-blue-600">Interactive 3D</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mb-8 font-medium">
              Inspect the full commercial airliner, go inside the cabin, and select your exact seat with live pricing.
            </p>
            <button
              onClick={() => setIsInside(true)}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/30 transition transform hover:scale-105"
            >
              Enter 3D Cabin & Pick Seat
            </button>
          </div>
        </div>
      )}

      {/* Light Theme Booking Card */}
      {isInside && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-lg px-4">
          <div className="bg-white/95 border border-slate-200 backdrop-blur-2xl p-7 rounded-3xl shadow-2xl">
            {selectedSeat ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Selected Seat
                    </span>
                    <h3 className="text-4xl font-black text-blue-600 mt-1">{selectedSeat}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Price
                    </span>
                    <p className="text-3xl font-black text-emerald-600 mt-1">$580</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <Wifi className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-600 font-bold uppercase">Wi-Fi</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <Coffee className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-600 font-bold uppercase">Meals</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <Shield className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-600 font-bold uppercase">Priority</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Seat ${selectedSeat} booked successfully!`)}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl transition flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20"
                >
                  <CheckCircle2 className="w-6 h-6" /> Confirm Seat & Get Pass
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Ticket className="w-10 h-10 text-blue-600 mx-auto mb-3 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900 mb-1">Select Seat in 3D</h4>
                <p className="text-xs text-slate-500">
                  Click on any available seat inside the cabin to view details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}