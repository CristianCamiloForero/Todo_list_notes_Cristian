import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function NotaForm({ nota, onSubmit, onCancelar }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    if (nota) {
      setTitulo(nota.titulo);
      setContenido(nota.contenido);
      setEstado(nota.estado);
    } else {
      setTitulo('');
      setContenido('');
      setEstado(false);
    }
  }, [nota]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!titulo.trim() || !contenido.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const notaData = {
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      fecha: new Date().toISOString(),
      estado,
    };

    if (nota) {
      onSubmit(nota.id, notaData);
    } else {
      onSubmit(notaData);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onCancelar}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-800 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {nota ? (
                <>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Nota
                </>
              ) : (
                <>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nueva Nota
                </>
              )}
            </h2>
            <button
              onClick={onCancelar}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Título */}
          <div className="mb-5">
            <label htmlFor="titulo" className="block text-sm font-semibold text-slate-700 mb-2">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-800 focus:ring-4 focus:ring-slate-100 outline-none transition-all text-slate-800 font-medium"
              placeholder="Ej: Comprar víveres, Reunión importante..."
              maxLength={100}
              autoFocus
            />
          </div>

          {/* Contenido */}
          <div className="mb-5">
            <label htmlFor="contenido" className="block text-sm font-semibold text-slate-700 mb-2">
              Contenido
            </label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-800 focus:ring-4 focus:ring-slate-100 outline-none transition-all resize-none text-slate-700 leading-relaxed"
              placeholder="Escribe los detalles de tu nota..."
              rows="8"
            />
          </div>

          {/* Estado */}
          <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={estado}
                  onChange={(e) => setEstado(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:ring-4 peer-focus:ring-slate-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 shadow-inner"></div>
              </div>
              <span className="ml-4 text-sm font-semibold text-slate-700 group-hover:text-slate-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Marcar como completada
              </span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3.5 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {nota ? 'Guardar Cambios' : 'Crear Nota'}
            </button>
            <button
              type="button"
              onClick={onCancelar}
              className="px-8 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3.5 rounded-xl font-semibold transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NotaForm.propTypes = {
  nota: PropTypes.shape({
    id: PropTypes.number,
    titulo: PropTypes.string,
    contenido: PropTypes.string,
    fecha: PropTypes.string,
    estado: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default NotaForm;
