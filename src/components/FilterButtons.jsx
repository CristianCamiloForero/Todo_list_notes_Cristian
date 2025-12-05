import PropTypes from 'prop-types';

function FilterButtons({ filtro, setFiltro }) {
  const botones = [
    { 
      id: 'todas', 
      label: 'Todas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'pendientes', 
      label: 'Pendientes',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'completadas', 
      label: 'Completadas',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {botones.map((boton) => (
        <button
          key={boton.id}
          onClick={() => setFiltro(boton.id)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
            filtro === boton.id
              ? 'bg-slate-800 text-white shadow-lg scale-105'
              : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg hover:scale-105 border border-slate-200'
          }`}
        >
          {boton.icon}
          {boton.label}
        </button>
      ))}
    </div>
  );
}

FilterButtons.propTypes = {
  filtro: PropTypes.string.isRequired,
  setFiltro: PropTypes.func.isRequired,
};

export default FilterButtons;
