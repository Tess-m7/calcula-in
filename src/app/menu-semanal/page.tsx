'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { exportMenuToPDF } from '@/utils/exportMenuPDF';
import { FaFilePdf } from 'react-icons/fa';
import { nombresRecetasAlmuerzo, nombresAcompanamientos } from '@/utils/recetas-almuerzo';

type TipoComensal = 'chica' | 'mediana' | 'grande';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const MenuSemanal = () => {
  const [menu, setMenu] = useState(
    diasSemana.map((dia) => ({
      dia,
      principal: '',
      acompanamiento: '',
      sinMenu: false,
      porciones: { chica: 0, mediana: 0, grande: 0 }
    }))
  );

  const manejarCambio = (index: number, campo: 'principal' | 'acompanamiento', valor: string) => {
    const nuevoMenu = [...menu];
    nuevoMenu[index][campo] = valor;
    setMenu(nuevoMenu);
  };

  const manejarCambioPorciones = (index: number, tipo: TipoComensal, valor: string) => {
    const nuevoMenu = [...menu];
    nuevoMenu[index].porciones[tipo] = Number(valor);
    setMenu(nuevoMenu);
  };

  const manejarSinMenu = (index: number, valor: boolean) => {
    const nuevoMenu = [...menu];
    nuevoMenu[index].sinMenu = valor;
    if (valor) {
      nuevoMenu[index].principal = '';
      nuevoMenu[index].acompanamiento = '';
      nuevoMenu[index].porciones = { chica: 0, mediana: 0, grande: 0 };
    }
    setMenu(nuevoMenu);
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <Link href="/" className="flex items-center text-logoGreen hover:underline mb-4">
        <ArrowLeft className="mr-2" />
        Volver al inicio
      </Link>

      <h2 className="text-2xl font-bold text-logoGreen mb-4">Menú Semanal</h2>

      {menu.map((item, index) => (
        <div key={item.dia} className="mb-4 border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700">{item.dia}</h3>

          <div className="mt-2 w-full max-w-md">
            <label className="block mb-1 text-sm text-gray-600">Receta principal</label>
            <select
              disabled={item.sinMenu}
              value={item.principal}
              onChange={(e) => manejarCambio(index, 'principal', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar...</option>
              {nombresRecetasAlmuerzo.map((nombre) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
            </select>
          </div>

          <div className="mt-2 w-full max-w-md">
            <label className="block mb-1 text-sm text-gray-600">Acompañamiento</label>
            <select
              disabled={item.sinMenu}
              value={item.acompanamiento}
              onChange={(e) => manejarCambio(index, 'acompanamiento', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar...</option>
              {nombresAcompanamientos.map((nombre) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
            </select>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2 max-w-md">
            {(['chica', 'mediana', 'grande'] as TipoComensal[]).map((tipo) => (
              <div key={tipo}>
                <label className="block text-sm text-gray-600">Porciones {tipo}</label>
                <input
                  type="number"
                  disabled={item.sinMenu}
                  value={item.porciones[tipo]}
                  onChange={(e) => manejarCambioPorciones(index, tipo, e.target.value)}
                  className="w-full p-2 border rounded"
                  min={0}
                />
              </div>
            ))}
          </div>

          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={item.sinMenu}
                onChange={(e) => manejarSinMenu(index, e.target.checked)}
                className="mr-2"
              />
              No se cocina este día
            </label>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => exportMenuToPDF(menu)}
          className="flex items-center gap-2 bg-logoGreen hover:bg-logoGreenHover text-white font-bold py-2 px-4 rounded"
        >
          <FaFilePdf className="text-white" />
          Exportar menú semanal
        </button>
      </div>
    </div>
  );
};

export default MenuSemanal;
