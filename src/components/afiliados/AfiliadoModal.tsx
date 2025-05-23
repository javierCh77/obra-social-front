// ✅ /components/afiliados/AfiliadoModal.tsx
"use client";

import { Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AfiliadoInput } from "@/types/afiliado";

interface AfiliadoModalProps {
  open: boolean;
  isEditing: boolean;
  afiliado?: AfiliadoInput;
  onClose: () => void;
  onSave: (data: AfiliadoInput) => void;
}

export default function AfiliadoModal({
  open,
  isEditing,
  afiliado,
  onClose,
  onSave,
}: AfiliadoModalProps) {
  const [formData, setFormData] = useState<AfiliadoInput>({
    nombre: "",
    apellido: "",
    sexo: "F",
    esTitular: true,
    numeroAfiliado: "",
    dni: "",
    cuil: "",
    dniFamiliar: "",
    cuilFamiliar: "",
    fechaNacimiento: "",
    fechaIngreso: "",
    direccion: "",
    piso: "",
    departamento: "",
    telefono: "",
    email: "",
    estado: "",
    observaciones: "",
  });

  const [errores, setErrores] = useState<
    Partial<Record<keyof AfiliadoInput, string>>
  >({});
  const nombreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (afiliado) setFormData(afiliado);
    if (open && nombreInputRef.current)
      setTimeout(() => nombreInputRef.current?.focus(), 100);
  }, [afiliado, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const nuevosErrores: Partial<Record<keyof AfiliadoInput, string>> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string" && !value.trim()) {
        nuevosErrores[key as keyof AfiliadoInput] = "Campo obligatorio";
      }
    });
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-6xl">
        <div className="flex gap-2 items-center mb-4">
          <Users />
          <h2 className="text-lg font-semibold">
            {isEditing ? "Editar Afiliado" : "Nuevo Afiliado"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(formData).map(([campo, valor]) =>
            campo !== "sexo" && campo !== "esTitular" ? (
              <div key={campo} className="flex flex-col">
                <label
                  htmlFor={campo}
                  className="text-sm font-medium text-gray-700 capitalize"
                >
                  {campo.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  id={campo}
                  name={campo}
                  type={
                    campo.includes("fecha")
                      ? "date"
                      : campo.includes("email")
                      ? "email"
                      : "text"
                  }
                  ref={campo === "nombre" ? nombreInputRef : undefined}
                  value={valor as string}
                  onChange={handleChange}
                  className={`border p-2 rounded bg-white ${
                    errores[campo as keyof AfiliadoInput]
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errores[campo as keyof AfiliadoInput] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errores[campo as keyof AfiliadoInput]}
                  </p>
                )}
              </div>
            ) : null
          )}
          {/* Sexo */}
          <div className="flex flex-col">
            <label htmlFor="sexo" className="text-sm font-medium text-gray-700">
              Sexo
            </label>
            <select
              name="sexo"
              id="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="border p-2 rounded bg-white"
            >
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
              <option value="X">Otro</option>
            </select>
          </div>
          {/* Titular */}
          <div className="flex flex-col">
            <label
              htmlFor="esTitular"
              className="text-sm font-medium text-gray-700"
            >
              ¿Es titular?
            </label>
            <input
              type="checkbox"
              name="esTitular"
              id="esTitular"
              checked={formData.esTitular}
              onChange={handleChange}
              className="mt-2 w-4 h-4"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#1F5D89] hover:bg-[#164766] text-white rounded-lg"
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
