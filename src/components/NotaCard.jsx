import PropTypes from 'prop-types';

function NotaCard({ nota, onEditar, onEliminar, onToggleEstado }) {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-slate-100 hover:border-slate-300 transform hover:-translate-y-2 animate-slide-up ${
      nota.estado ? 'task-completed' : ''
    }`}>
      {/* Efecto de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-gray-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Header con estado y checkbox */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Checkbox para marcar como completada */}
            <button
              onClick={() => onToggleEstado(nota)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                nota.estado
                  ? 'bg-green-500 border-green-600 shadow-lg shadow-green-200'
                  : 'border-slate-300 hover:border-slate-500 hover:bg-slate-50'
              }`}
            >
              {nota.estado && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                nota.estado
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                  : 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700'
              }`}
            >
              {nota.estado ? '✓ Completada' : '⏱ Pendiente'}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">{formatearFecha(nota.fecha)}</span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-slate-900 transition-colors">
          {nota.titulo}
        </h3>

        {/* Contenido */}
        <p className="text-slate-600 mb-6 line-clamp-3 whitespace-pre-wrap leading-relaxed">
          {nota.contenido}
        </p>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={() => onEditar(nota)}
            className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
          <button
            onClick={() => onEliminar(nota.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

NotaCard.propTypes = {
  nota: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    contenido: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    estado: PropTypes.bool.isRequired,
  }).isRequired,
  onEditar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
  onToggleEstado: PropTypes.func.isRequired,
};

export default NotaCard;
