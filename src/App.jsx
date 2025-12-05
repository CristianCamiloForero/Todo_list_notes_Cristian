import { useState, useEffect } from 'react';
import { notasAPI } from './services/api';
import NotaCard from './components/NotaCard';
import NotaForm from './components/NotaForm';
import FilterButtons from './components/FilterButtons';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const [notas, setNotas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [notaEditando, setNotaEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalEliminar, setModalEliminar] = useState({ isOpen: false, notaId: null });

  useEffect(() => {
    cargarNotas();
  }, [filtro]);

  const cargarNotas = async () => {
    setLoading(true);
    try {
      let data;
      if (filtro === 'todas') {
        data = await notasAPI.listarNotas();
      } else {
        const estado = filtro === 'completadas';
        data = await notasAPI.filtrarPorEstado(estado);
      }
      setNotas(data);
    } catch (error) {
      console.error('Error al cargar notas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearNota = async (nota) => {
    try {
      await notasAPI.crearNota(nota);
      await cargarNotas();
      setMostrarForm(false);
    } catch (error) {
      console.error('Error al crear nota:', error);
    }
  };

  const handleActualizarNota = async (id, nota) => {
    try {
      await notasAPI.actualizarNota(id, nota);
      await cargarNotas();
      setNotaEditando(null);
      setMostrarForm(false);
    } catch (error) {
      console.error('Error al actualizar nota:', error);
    }
  };

  const handleEliminarNota = (id) => {
    setModalEliminar({ isOpen: true, notaId: id });
  };

  const confirmarEliminar = async () => {
    try {
      await notasAPI.eliminarNota(modalEliminar.notaId);
      await cargarNotas();
      setModalEliminar({ isOpen: false, notaId: null });
    } catch (error) {
      console.error('Error al eliminar nota:', error);
    }
  };

  const cancelarEliminar = () => {
    setModalEliminar({ isOpen: false, notaId: null });
  };

  const handleToggleEstado = async (nota) => {
    try {
      await notasAPI.actualizarNota(nota.id, {
        titulo: nota.titulo,
        contenido: nota.contenido,
        fecha: nota.fecha,
        estado: !nota.estado,
      });
      await cargarNotas();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const handleEditar = (nota) => {
    setNotaEditando(nota);
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setNotaEditando(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-5xl font-extrabold text-slate-800 mb-3 flex items-center gap-3">
                <span className="text-6xl">📝</span>
                Mis Notas
              </h1>
              <p className="text-slate-600 text-lg">
                Organiza tus ideas de forma simple y elegante
              </p>
            </div>
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Nota
            </button>
          </div>

          <FilterButtons filtro={filtro} setFiltro={setFiltro} />
        </header>

        {/* Formulario Modal */}
        {mostrarForm && (
          <NotaForm
            nota={notaEditando}
            onSubmit={notaEditando ? handleActualizarNota : handleCrearNota}
            onCancelar={handleCancelar}
          />
        )}

        {/* Lista de Notas */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-slate-600 font-medium">Cargando notas...</p>
          </div>
        ) : notas.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="mb-6 relative inline-block">
              <div className="text-8xl">📝</div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              {filtro === 'completadas' ? 'No hay notas completadas' : 
               filtro === 'pendientes' ? 'No hay notas pendientes' : 
               'No hay notas todavía'}
            </h3>
            <p className="text-slate-500 mb-6 text-lg">
              {filtro === 'todas' ? 'Crea tu primera nota para comenzar' : 'Intenta con otro filtro'}
            </p>
            {filtro === 'todas' && (
              <button
                onClick={() => setMostrarForm(true)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear primera nota
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notas.map((nota, index) => (
              <NotaCard
                key={nota.id}
                nota={nota}
                onEditar={handleEditar}
                onEliminar={handleEliminarNota}
                onToggleEstado={handleToggleEstado}
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalEliminar.isOpen}
        onConfirm={confirmarEliminar}
        onCancel={cancelarEliminar}
        title="¿Eliminar nota?"
        message="Esta acción no se puede deshacer. La nota será eliminada permanentemente."
      />
    </div>
  );
}

export default App;
