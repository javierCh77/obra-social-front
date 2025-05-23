"use client";

import { Pencil, Trash2, Eye } from "lucide-react";
import { Afiliado } from "@/types/afiliado";

interface AfiliadoTableProps {
  afiliados: Afiliado[];
  onEdit: (afiliado: Afiliado) => void;
  onDelete: (id: string) => void;
  onView: (afiliado: Afiliado) => void;
}

export default function AfiliadoTable({ afiliados, onEdit, onDelete, onView }: AfiliadoTableProps) {
  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="overflow-x-auto h-[72vh] rounded-lg shadow-md">
      <table className="min-w-full border-collapse shadow-md">
        <thead className="bg-[#202f4b] text-white text-sm">
          <tr>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">N° Afiliado</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Nombre</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Apellido</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Sexo</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Titular</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">CUIL</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Nacimiento</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Teléfono</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Email</th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {afiliados.map((a) => (
            <tr key={a.id}>
              <td className="px-6 py-2 text-xs text-gray-700">{a.numeroAfiliado}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.nombre}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.apellido}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.sexo}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.esTitular ? "Sí" : "No"}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.cuil}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{formatFecha(a.fechaNacimiento)}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.telefono}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.email}</td>
              <td className="px-6 py-2 text-xs text-gray-700 flex gap-3">
                <button onClick={() => onView(a)} className="text-blue-500 hover:underline cursor-pointer" title="Ver Detalles">
                  <Eye size={18} />
                </button>
                <button onClick={() => onEdit(a)} className="text-[#1F5D89] hover:underline cursor-pointer" title="Editar">
                  <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(a.id)} className="text-red-400 hover:underline cursor-pointer" title="Eliminar">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}