import './Loader.css'

function Loader({ message = 'Cargando...' }) {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  )
}

export default Loader
