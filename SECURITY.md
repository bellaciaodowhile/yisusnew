# Guía de Seguridad

## 🔒 Datos Sensibles Protegidos

Este proyecto usa `.gitignore` para proteger los siguientes archivos sensibles:

### Archivos Protegidos

✅ **Variables de Entorno**
- `.env` - Contiene credenciales de Supabase
- `.env.local`
- `.env.*.local`

✅ **Credenciales y Certificados**
- `credentials.json`
- `secrets.json`
- `*.key`
- `*.pem`
- `*.cert`

✅ **Base de Datos Local**
- `*.db`
- `*.sqlite`
- `*.sqlite3`

✅ **Archivos de Respaldo**
- `*.backup`
- `*.bak`
- `*.old`

## 🚨 Nunca Subir a GitHub

**NUNCA subas estos archivos al repositorio:**

1. Archivo `.env` con credenciales reales
2. Claves privadas o certificados
3. Archivos de configuración con contraseñas
4. Backups de base de datos
5. Tokens de acceso o API keys

## ✅ Buenas Prácticas

### 1. Usar Variables de Entorno

```env
# ✅ CORRECTO - En archivo .env (protegido)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_secreta

# ❌ INCORRECTO - No hardcodear en el código
const supabaseUrl = "https://tu-proyecto.supabase.co"
```

### 2. Proporcionar Ejemplo sin Datos Reales

```env
# Archivo: .env.example (se puede subir a GitHub)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Verificar antes de Commit

Antes de hacer `git commit`, verifica que no haya datos sensibles:

```bash
# Ver qué archivos se van a subir
git status

# Verificar que .env NO aparezca en la lista
# Si aparece, asegúrate de que esté en .gitignore
```

### 4. Revisar el .gitignore

Asegúrate de que `.gitignore` incluya:

```
# Variables de entorno
.env
.env.local
.env.*.local

# Credenciales
credentials.json
secrets.json
*.key
*.pem
```

## 🔐 Cambiar Credenciales por Defecto

Las credenciales de prueba del panel de administración deben cambiarse en producción:

```javascript
// ❌ INSEGURO - Solo para desarrollo
if (username === 'admin' && password === 'admin') {
  setIsLoggedIn(true)
}

// ✅ RECOMENDADO - Implementar autenticación real con Supabase Auth
```

## 🛡️ Recomendaciones de Producción

1. **Autenticación Real**: Reemplazar el login hardcodeado por Supabase Auth
2. **Contraseñas Fuertes**: Implementar políticas de contraseñas robustas
3. **HTTPS**: Usar siempre HTTPS en producción
4. **Rate Limiting**: Limitar intentos de login
5. **Logs de Seguridad**: Registrar accesos al panel de administración
6. **Validación Server-Side**: Validar permisos en el backend

## 📧 Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor NO la publiques en issues.
Contacta directamente al equipo de desarrollo.

## ✅ Checklist antes de Deploy

- [ ] Archivo `.env` no está en el repositorio
- [ ] Credenciales de admin cambiadas
- [ ] Variables de entorno configuradas en el servidor
- [ ] HTTPS habilitado
- [ ] Supabase RLS (Row Level Security) configurado
- [ ] Backups automáticos configurados
- [ ] Monitoreo de logs activado

## 🔄 Rotar Credenciales

Si accidentalmente subes credenciales a GitHub:

1. **Inmediatamente**: Revocar las credenciales expuestas
2. Generar nuevas credenciales en Supabase
3. Actualizar el archivo `.env` local
4. Actualizar las variables en el servidor de producción
5. Eliminar el archivo del historial de Git (si es necesario)

```bash
# Eliminar archivo del historial de Git
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

## 📚 Recursos

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

---

**Recuerda:** La seguridad es responsabilidad de todos. Siempre verifica antes de hacer commit.
