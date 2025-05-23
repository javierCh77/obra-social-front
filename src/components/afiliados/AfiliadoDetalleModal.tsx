"use client";

import { useEffect, useRef } from "react";
import { BadgeInfo, X } from "lucide-react";
import { Afiliado } from "@/types/afiliado";

interface AfiliadoDetalleModalProps {
  open: boolean;
  afiliado: Afiliado | null;
  onClose: () => void;
}

export default function AfiliadoDetalleModal({ open, afiliado, onClose }: AfiliadoDetalleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open || !afiliado) return null;

  const campos: [string, string][] = [
    ["N° Afiliado", afiliado.numeroAfiliado],
    ["Nombre", afiliado.nombre],
    ["Apellido", afiliado.apellido],
    ["Sexo", afiliado.sexo],
    ["Titular", afiliado.esTitular ? "Sí" : "No"],
    ["CUIL", afiliado.cuil],
    ["DNI", afiliado.dni],
    ["CUIL Familiar", afiliado.cuilFamiliar ?? "-"],
    ["DNI Familiar", afiliado.dniFamiliar ?? "-"],
    ["Fecha de Nacimiento", afiliado.fechaNacimiento],
    ["Fecha de Ingreso", afiliado.fechaIngreso],
    ["Dirección", afiliado.direccion],
    ["Piso", afiliado.piso ?? "-"],
    ["Departamento", afiliado.departamento ?? "-"],
    ["Teléfono", afiliado.telefono],
    ["Email", afiliado.email],
    ["Estado", afiliado.estado ?? "-"],
    ["Observaciones", afiliado.observaciones ?? "-"],
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl border border-gray-200" ref={modalRef}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px', color: '#9ca3af', cursor: 'pointer' }}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <BadgeInfo style={{ color: '#1e3a8a' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a' }}>Ficha del Afiliado</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
          {campos.map(([label, value]) => (
            <div key={label} style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', marginBottom: '4px' }}>{label}</p>
              <p style={{ color: '#1a1a1a', fontWeight: 600, wordBreak: 'break-word' }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', backgroundColor: '#d1d5db', borderRadius: '8px', fontSize: '14px' }}
            aria-label="Cerrar modal de ficha del afiliado"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
