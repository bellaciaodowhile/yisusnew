import { useState } from 'react'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import Dashboard from './Dashboard'
import { supabase } from './supabaseClient'
import Loader from './Loader'
import './App.css'

function App({ navigate }) {
  const [rut, setRut] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPasswordHint, setShowPasswordHint] = useState(false)
  const [touched, setTouched] = useState({ rut: false, password: false })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [clientData, setClientData] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Marcar todos los campos como tocados al intentar enviar
    setTouched({ rut: true, password: true })
    
    // Validar campos
    if (!rut.trim() || !password.trim()) {
      setError('Por favor complete todos los campos')
      if (!password.trim()) {
        setShowPasswordHint(true)
      }
      return
    }

    setLoading(true)
    setError('')
    setShowPasswordHint(false)

    try {
      // Buscar cliente en Supabase
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('rut', rut.trim())
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No se encontró el cliente
          setError('RUT no encontrado en el sistema')
        } else {
          // Otro tipo de error
          console.error('Supabase error:', error)
          setError('Error al conectar con el servidor: ' + error.message)
        }
      } else {
        // Cliente encontrado en Supabase
        setClientData(data)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('Error during login:', error)
      setError('Error inesperado: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setClientData(null)
    setRut('')
    setPassword('')
    setTouched({ rut: false, password: false })
  }

  if (isLoggedIn && clientData) {
    return <Dashboard clientData={clientData} onLogout={handleLogout} />
  }

  const handleRutChange = (e) => {
    setRut(e.target.value)
    if (e.target.value.trim() !== '' && touched.rut) {
      setError('')
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (e.target.value.trim() !== '') {
      setShowPasswordHint(false)
      if (touched.password) {
        setError('')
      }
    }
  }

  const handleRutBlur = () => {
    setTouched({ ...touched, rut: true })
  }

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true })
    if (!password.trim()) {
      setShowPasswordHint(true)
    }
  }

  const isRutValid = rut.trim() !== ''
  const isPasswordValid = password.trim() !== ''
  
  const showRutError = touched.rut && !isRutValid
  const showPasswordError = touched.password && !isPasswordValid

  return (
    <>
      {loading && <Loader message="Verificando credenciales..." />}
      <div className="app">
      <header className="header">
        <img src="/logo.svg" alt="COMPIN" className="logo" />
      </header>

      <main className="main">
        <h1 className="title">Acceso al sistema</h1>
        <h2 className="card-title">INGRESE SUS CREDENCIALES</h2>
        <div className="login-card">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <div className={`input-wrapper ${showRutError ? 'invalid' : (touched.rut && isRutValid ? 'valid' : '')}`}>
                <span className="input-icon user-icon">
                  <User size={20} />
                </span>
                <input
                  type="text"
                  className="input-field"
                  placeholder="20269910-3"
                  value={rut}
                  onChange={handleRutChange}
                  onBlur={handleRutBlur}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className={`input-wrapper ${showPasswordError ? 'invalid' : (touched.password && isPasswordValid ? 'valid' : '')}`}>
                <span className="input-icon lock-icon">
                  <Lock size={20} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {showPasswordHint && <p className="input-hint">Ingrese una clave</p>}
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              <User size={18} />
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>

            <a href="#" className="forgot-password">
              ¿OLVIDÓ SU CONTRASEÑA?
            </a>
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <p className="footer-text">Esta plataforma es administrada por:</p>
            <img src="/logo.svg" alt="COMPIN" className="footer-logo" />
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
