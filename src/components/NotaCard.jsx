import { useState, useEffect } from 'react';


function NotaCard({ nota, onEditar, onEliminar, onToggleEstado }) {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const colores = [
    'bg-amber-200 border-amber-400 hover:bg-amber-100',
    'bg-rose-200 border-rose-400 hover:bg-rose-100',
    'bg-sky-200 border-sky-400 hover:bg-sky-100',
    'bg-emerald-200 border-emerald-400 hover:bg-emerald-100',
    'bg-violet-200 border-violet-400 hover:bg-violet-100',
  ];
  
  const colorAleatorio = colores[nota.id % colores.length];

  return (
    <div className={`${colorAleatorio} rounded-xl border-2 p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative`}
         style={{ fontFamily: "'Quicksand', sans-serif" }}>
      
      {/* Chincheta decorativa */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full shadow-md border-2 border-white"></div>
      
      <div className="mb-3 flex items-start justify-between">
        <button
          onClick={() => onToggleEstado(nota)}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            nota.estado
              ? 'bg-emerald-600 border-emerald-700'
              : 'border-gray-500 bg-white hover:bg-gray-50'
          }`}
        >
          {nota.estado && (
            <svg className="w-4 h-4 text-white font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        <span className="text-xs text-gray-700 font-medium">
          {formatearFecha(nota.fecha)}
        </span>
      </div>

      <h3 className={`text-xl font-bold mb-2 ${nota.estado ? 'line-through opacity-60' : 'text-gray-800'}`}>
        {nota.titulo}
      </h3>

      <p className={`text-base mb-4 whitespace-pre-wrap leading-relaxed ${nota.estado ? 'line-through opacity-60' : 'text-gray-700'}`}>
        {nota.contenido}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEditar(nota)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>
        <button
          onClick={() => onEliminar(nota.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );
}