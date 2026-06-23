import { FiCheckCircle, FiX } from "react-icons/fi";
import "./ToastContainer.css";

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-message">
          <FiCheckCircle className="toast-icon" />
          <span className="toast-text">{toast.message}</span>
          <button className="toast-close" onClick={() => onRemove(toast.id)}>
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
