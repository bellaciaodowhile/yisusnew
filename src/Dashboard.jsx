import { useState, useEffect } from 'react'
import { LogOut, CheckCircle, Search, Menu, X, Download } from 'lucide-react'
import './Dashboard.css'

function Dashboard({ clientData, onLogout }) {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setLastUpdate(new Date())
  }, [clientData])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.menu-container')) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatDateTime = (date) => {
    return date.toLocaleString('es-CL', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const etapas = [
    {
      titulo: 'Licencia Médica Recibida en la COMPIN',
      fecha: clientData.fecha1,
      estado: clientData.estado1 || 'gris'
    },
    {
      titulo: 'Licencia Autorizada por Contraloría Médica',
      fecha: clientData.fecha2,
      estado: clientData.estado2 || 'gris'
    },
    {
      titulo: 'Licencia en Evaluación de Subsidio',
      fecha: clientData.fecha3,
      estado: clientData.estado3 || 'gris'
    },
    {
      titulo: 'Envío de la Licencia Médica a Pago',
      fecha: clientData.fecha4,
      estado: clientData.estado4 || 'gris'
    }
  ]

  const getStepIcon = (estado) => {
    if (estado === 'verde') {
      return <CheckCircle size={40} strokeWidth={3} />
    } else if (estado === 'azul') {
      return <Search size={40} strokeWidth={3} />
    }
    return <div className="step-circle-empty"></div>
  }

  const calcularDiasTranscurridos = () => {
    const primeraFecha = etapas.find(e => e.fecha)?.fecha
    if (!primeraFecha) return 0
    
    const inicio = new Date(primeraFecha)
    const hoy = new Date()
    const diferencia = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24))
    return diferencia
  }

  const handleDownloadLicencia = () => {
    if (clientData.urlLicencia) {
      // Abrir el enlace en una nueva pestaña
      window.open(clientData.urlLicencia, '_blank')
      setMenuOpen(false)
    } else {
      alert('No hay una licencia médica disponible para descargar. Por favor contacte al administrador.')
      setMenuOpen(false)
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <img src="/logo.svg" alt="COMPIN" className="dashboard-logo" />
        <div className="menu-container">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="btn-menu-burger"
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={handleDownloadLicencia} className="menu-item">
                <Download size={18} />
                Descargar Licencia
              </button>
              <button onClick={onLogout} className="menu-item menu-item-logout">
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Etapas de la licencia médica</h1>

        <div className="timeline-container">
          {etapas.map((etapa, index) => (
            <div key={index} className="timeline-step">
              <div className="step-header">
                <span className="step-date">{formatDate(etapa.fecha)}</span>
              </div>
              <div className={`step-icon step-${etapa.estado}`}>
                {getStepIcon(etapa.estado)}
              </div>
              {index < etapas.length - 1 && (
                <div className={`step-connector connector-${etapa.estado}`}></div>
              )}
              <div className="step-content">
                <h3 className="step-title">{etapa.titulo}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '33%' }}>
              <span className="progress-text">{calcularDiasTranscurridos()} días</span>
            </div>
          </div>
        </div>

        <div className="last-update">
          Fecha de la última actualización: {formatDateTime(lastUpdate)}
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="dashboard-footer-content">
          <div>
            <p className="dashboard-footer-text">Esta plataforma es administrada por:</p>
            <img src="/logo.svg" alt="COMPIN" className="dashboard-footer-logo" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
