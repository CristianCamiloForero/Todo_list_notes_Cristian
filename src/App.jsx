function App() {
  const [notas, setNotas] = useState([
    {
      id: 1,
      titulo: "Comprar víveres",
      contenido: "Leche, pan, huevos, queso y frutas para la semana",
      fecha: new Date().toISOString(),
      estado: false
    },
    {
      id: 2,
      titulo: "Llamar al doctor",
      contenido: "Pedir cita para el chequeo anual",
      fecha: new Date().toISOString(),
      estado: true
    },
    {
      id: 3,
      titulo: "Proyecto final",
      contenido: "Terminar presentación para el viernes. Revisar datos y gráficos",
      fecha: new Date().toISOString(),
      estado: false
    }
  ]);
  const [filtro, setFiltro] = useState('todas');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [notaEditando, setNotaEditando] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({ isOpen: false, notaId: null });

  const notasFiltradas = notas.filter(nota => {
    if (filtro === 'todas') return true;
    if (filtro === 'pendientes') return !nota.estado;
    if (filtro === 'completadas') return nota.estado;
    return true;
  });

  const handleCrearNota = (notaData) => {
    const nuevaNota = {
      ...notaData,
      id: Math.max(0, ...notas.map(n => n.id)) + 1,
    };
    setNotas([...notas, nuevaNota]);
    setMostrarForm(false);
  };

  const handleActualizarNota = (id, notaData) => {
    setNotas(notas.map(n => n.id === id ? { ...notaData, id } : n));
    setNotaEditando(null);
    setMostrarForm(false);
  };

  const handleEliminarNota = (id) => {
    setModalEliminar({ isOpen: true, notaId: id });
  };

  const confirmarEliminar = () => {
    setNotas(notas.filter(n => n.id !== modalEliminar.notaId));
    setModalEliminar({ isOpen: false, notaId: null });
  };

  const handleToggleEstado = (nota) => {
    setNotas(notas.map(n => 
      n.id === nota.id ? { ...n, estado: !n.estado } : n
    ));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100" 
         style={{ fontFamily: "'Quicksand', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <span className="text-5xl">📝</span>
                Mi Libreta
              </h1>
              <p className="text-gray-600 text-lg">
                Organiza tus tareas e ideas de forma simple
              </p>
            </div>
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nueva nota
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
        {notasFiltradas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              {filtro === 'completadas' ? 'No hay notas completadas' : 
               filtro === 'pendientes' ? 'No hay notas pendientes' : 
               'No hay notas todavía'}
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              {filtro === 'todas' ? 'Crea tu primera nota para comenzar' : 'Intenta con otro filtro'}
            </p>
            {filtro === 'todas' && (
              <button
                onClick={() => setMostrarForm(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Crear primera nota
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notasFiltradas.map((nota) => (
              <NotaCard
                key={nota.id}
                nota={nota}
                onEditar={handleEditar}
                onEliminar={handleEliminarNota}
                onToggleEstado={handleToggleEstado}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalEliminar.isOpen}
        onConfirm={confirmarEliminar}
        onCancel={() => setModalEliminar({ isOpen: false, notaId: null })}
      />
    </div>
  );
}

export default App;