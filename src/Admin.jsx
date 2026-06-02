import { useState, useEffect } from 'react'
import { LogOut, Plus, Edit2, Trash2, X } from 'lucide-react'
import './Admin.css'

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [clients, setClients] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [formData, setFormData] = useState({
    rut: '',
    fecha1: '',
    fecha2: '',
    fecha3: '',
    fecha4: '',
    estado1: 'gris',
    estado2: 'gris',
    estado3: 'gris',
    estado4: 'gris',
    urlLicencia: ''
  })

  useEffect(() => {
    const savedClients = localStorage.getItem('clients')
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  const saveClients = (newClients) => {
    localStorage.setItem('clients', JSON.stringify(newClients))
    setClients(newClients)
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true)
    } else {
      alert('Credenciales incorrectas')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  const openModal = (client = null) => {
    if (client) {
      setEditingClient(client)
      setFormData(client)
    } else {
      setEditingClient(null)
      setFormData({
        rut: '',
        fecha1: '',
        fecha2: '',
        fecha3: '',
        fecha4: '',
        estado1: 'gris',
        estado2: 'gris',
        estado3: 'gris',
        estado4: 'gris',
        urlLicencia: ''
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingClient(null)
    setFormData({
      rut: '',
      fecha1: '',
      fecha2: '',
      fecha3: '',
      fecha4: '',
      estado1: 'gris',
      estado2: 'gris',
      estado3: 'gris',
      estado4: 'gris',
      urlLicencia: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingClient) {
      const updatedClients = clients.map(c => 
        c.id === editingClient.id ? { ...formData, id: editingClient.id } : c
      )
      saveClients(updatedClients)
    } else {
      const newClient = {
        ...formData,
        id: Date.now()
      }
      saveClients([...clients, newClient])
    }
    
    closeModal()
  }

  const handleDelete = (id) => {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      const updatedClients = clients.filter(c => c.id !== id)
      saveClients(updatedClients)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }

    // Si se cambia un estado a algo diferente de 'verde', resetear los estados siguientes
    if (name.startsWith('estado')) {
      const etapaNumber = parseInt(name.replace('estado', ''))
      
      if (value !== 'verde') {
        // Resetear todas las etapas siguientes a 'gris'
        for (let i = etapaNumber + 1; i <= 4; i++) {
          newFormData[`estado${i}`] = 'gris'
        }
      }
    }

    setFormData(newFormData)
  }

  const getAvailableStates = (etapaNumber) => {
    // Etapa 1 siempre puede tener cualquier estado
    if (etapaNumber === 1) {
      return ['gris', 'azul', 'verde']
    }

    // Para las demás etapas, verificar el estado de la anterior
    const prevEstado = formData[`estado${etapaNumber - 1}`]
    
    // Si la etapa anterior no está completada (verde), solo puede ser gris
    if (prevEstado !== 'verde') {
      return ['gris']
    }

    // Si la etapa anterior está completada, puede ser cualquier estado
    return ['gris', 'azul', 'verde']
  }

  const isEstadoDisabled = (etapaNumber, estado) => {
    const availableStates = getAvailableStates(etapaNumber)
    return !availableStates.includes(estado)
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <img src="/logo.svg" alt="COMPIN" className="admin-logo" />
          <h1>Panel de Administración</h1>
          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label>Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <button type="submit" className="btn-primary">Ingresar</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <img src="/logo.svg" alt="COMPIN" className="admin-logo-small" />
        <h1>Panel de Administración</h1>
        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </header>

      <div className="admin-content">
        <div className="admin-toolbar">
          <h2>Gestión de Clientes</h2>
          <button onClick={() => openModal()} className="btn-add">
            <Plus size={20} />
            Agregar Cliente
          </button>
        </div>

        <div className="clients-grid">
          {clients.length === 0 ? (
            <div className="no-data">No hay clientes registrados</div>
          ) : (
            clients.map(client => (
              <div key={client.id} className="client-card">
                <div className="card-header">
                  <h3 className="card-rut">{client.rut}</h3>
                  <div className="card-actions">
                    <button onClick={() => openModal(client)} className="btn-edit" title="Editar">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(client.id)} className="btn-delete" title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-field">
                    <span className="field-label">Etapa 1:</span>
                    <div className="field-status">
                      <span className="field-value">{client.fecha1 || '-'}</span>
                      <span className={`status-badge status-${client.estado1 || 'gris'}`}>
                        {client.estado1 === 'verde' ? 'Completado' : client.estado1 === 'azul' ? 'En proceso' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                  <div className="card-field">
                    <span className="field-label">Etapa 2:</span>
                    <div className="field-status">
                      <span className="field-value">{client.fecha2 || '-'}</span>
                      <span className={`status-badge status-${client.estado2 || 'gris'}`}>
                        {client.estado2 === 'verde' ? 'Completado' : client.estado2 === 'azul' ? 'En proceso' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                  <div className="card-field">
                    <span className="field-label">Etapa 3:</span>
                    <div className="field-status">
                      <span className="field-value">{client.fecha3 || '-'}</span>
                      <span className={`status-badge status-${client.estado3 || 'gris'}`}>
                        {client.estado3 === 'verde' ? 'Completado' : client.estado3 === 'azul' ? 'En proceso' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                  <div className="card-field">
                    <span className="field-label">Etapa 4:</span>
                    <div className="field-status">
                      <span className="field-value">{client.fecha4 || '-'}</span>
                      <span className={`status-badge status-${client.estado4 || 'gris'}`}>
                        {client.estado4 === 'verde' ? 'Completado' : client.estado4 === 'azul' ? 'En proceso' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                  {client.urlLicencia && (
                    <div className="card-field">
                      <span className="field-label">Licencia:</span>
                      <span className="field-value">
                        <a href={client.urlLicencia} target="_blank" rel="noopener noreferrer" className="link-licencia">
                          Ver documento
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingClient ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
              <button onClick={closeModal} className="btn-close">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>RUT *</label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleInputChange}
                  placeholder="12345678-9"
                  required
                />
              </div>

              <div className="form-info">
                <p>ℹ️ Las etapas deben completarse en orden. Solo puedes marcar una etapa como "En proceso" o "Completado" si la anterior está en "Completado".</p>
              </div>
              
              <div className="etapa-box">
                <div className="etapa-header">
                  <span className="etapa-number">1</span>
                  <h3 className="etapa-title">Etapa 1</h3>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input
                      type="date"
                      name="fecha1"
                      value={formData.fecha1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <div className="estado-tags">
                      <button
                        type="button"
                        className={`estado-tag tag-gris ${formData.estado1 === 'gris' ? 'active' : ''}`}
                        onClick={() => handleInputChange({ target: { name: 'estado1', value: 'gris' } })}
                      >
                        Pendiente
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-azul ${formData.estado1 === 'azul' ? 'active' : ''}`}
                        onClick={() => handleInputChange({ target: { name: 'estado1', value: 'azul' } })}
                      >
                        En proceso
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-verde ${formData.estado1 === 'verde' ? 'active' : ''}`}
                        onClick={() => handleInputChange({ target: { name: 'estado1', value: 'verde' } })}
                      >
                        Completado
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="etapa-box">
                <div className="etapa-header">
                  <span className="etapa-number">2</span>
                  <h3 className="etapa-title">Etapa 2</h3>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input
                      type="date"
                      name="fecha2"
                      value={formData.fecha2}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <div className="estado-tags">
                      <button
                        type="button"
                        className={`estado-tag tag-gris ${formData.estado2 === 'gris' ? 'active' : ''}`}
                        onClick={() => handleInputChange({ target: { name: 'estado2', value: 'gris' } })}
                      >
                        Pendiente
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-azul ${formData.estado2 === 'azul' ? 'active' : ''} ${isEstadoDisabled(2, 'azul') ? 'disabled' : ''}`}
                        onClick={() => !isEstadoDisabled(2, 'azul') && handleInputChange({ target: { name: 'estado2', value: 'azul' } })}
                        disabled={isEstadoDisabled(2, 'azul')}
                      >
                        En proceso
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-verde ${formData.estado2 === 'verde' ? 'active' : ''} ${isEstadoDisabled(2, 'verde') ? 'disabled' : ''}`}
                        onClick={() => !isEstadoDisabled(2, 'verde') && handleInputChange({ target: { name: 'estado2', value: 'verde' } })}
                        disabled={isEstadoDisabled(2, 'verde')}
                      >
                        Completado
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="etapa-box">
                <div className="etapa-header">
                  <span className="etapa-number">3</span>
                  <h3 className="etapa-title">Etapa 3</h3>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input
                      type="date"
                      name="fecha3"
                      value={formData.fecha3}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <div className="estado-tags">
                      <button
                        type="button"
                        className={`estado-tag tag-gris ${formData.estado3 === 'gris' ? 'active' : ''}`}
                        onClick={() => handleInputChange({ target: { name: 'estado3', value: 'gris' } })}
                      >
                        Pendiente
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-azul ${formData.estado3 === 'azul' ? 'active' : ''} ${isEstadoDisabled(3, 'azul') ? 'disabled' : ''}`}
                        onClick={() => !isEstadoDisabled(3, 'azul') && handleInputChange({ target: { name: 'estado3', value: 'azul' } })}
                        disabled={isEstadoDisabled(3, 'azul')}
                      >
                        En proceso
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-verde ${formData.estado3 === 'verde' ? 'active' : ''} ${isEstadoDisabled(3, 'verde') ? 'disabled' : ''}`}
                        onClick={() => !isEstadoDisabled(3, 'verde') && handleInputChange({ target: { name: 'estado3', value: 'verde' } })}
                        disabled={isEstadoDisabled(3, 'verde')}
                      >
                        Completado
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="etapa-box">
                <div className="etapa-header">
                  <span className="etapa-number">4</span>
                  <h3 className="etapa-title">Etapa 4</h3>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input
                      type="date"
                      name="fecha4"
                      value={formData.fecha4}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <div className="estado-tags">
                      <button
                        type="button"
                        className={`estado-tag tag-gris ${formData.estado4 === 'gris' ? 'active' : ''}`}
                        onClick={() => handleInputChange({ target: { name: 'estado4', value: 'gris' } })}
                      >
                        Pendiente
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-azul ${formData.estado4 === 'azul' ? 'active' : ''} ${isEstadoDisabled(4, 'azul') ? 'disabled' : ''}`}
                        onClick={() => !isEstadoDisabled(4, 'azul') && handleInputChange({ target: { name: 'estado4', value: 'azul' } })}
                        disabled={isEstadoDisabled(4, 'azul')}
                      >
                        En proceso
                      </button>
                      <button
                        type="button"
                        className={`estado-tag tag-verde ${formData.estado4 === 'verde' ? 'active' : ''} ${isEstadoDisabled(4, 'verde') ? 'disabled' : ''}`}
                        onClick={() => !isEstadoDisabled(4, 'verde') && handleInputChange({ target: { name: 'estado4', value: 'verde' } })}
                        disabled={isEstadoDisabled(4, 'verde')}
                      >
                        Completado
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>URL de la Licencia Médica</label>
                <input
                  type="url"
                  name="urlLicencia"
                  value={formData.urlLicencia}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/licencia.pdf"
                />
                <small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  Ingresa el enlace del documento de licencia médica para que el cliente pueda descargarlo
                </small>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn-cancel">
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  {editingClient ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
