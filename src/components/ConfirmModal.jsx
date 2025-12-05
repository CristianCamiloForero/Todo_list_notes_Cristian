import PropTypes from 'prop-types';

function ConfirmModal({ isOpen, onConfirm, onCancel, title, message }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 rounded-full p-3">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          </div>
          
          <p className="text-slate-600 mb-6 leading-relaxed">{message}</p>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 px-6 rounded-xl font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmModal;
