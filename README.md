# Sistema de Seguimiento de Licencias Médicas

Sistema web para el seguimiento del estado de licencias médicas con panel de administración y vista para clientes.

## 🔒 Seguridad

**IMPORTANTE:** Este proyecto usa variables de entorno para datos sensibles. Nunca subas el archivo `.env` al repositorio.

### Configuración Inicial de Seguridad

1. Copia el archivo de ejemplo:
   ```bash
   copy .env.example .env
   ```

2. Edita `.env` y añade tus credenciales reales de Supabase
3. El archivo `.env` está protegido por `.gitignore` y NO se subirá a GitHub

## 🚀 Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Previsualizar build
pnpm preview
```

## 📋 Características

- 🔐 Panel de administración protegido
- 📊 Gestión de clientes con sistema de cards responsivo
- 🎯 4 etapas con estados interactivos: Pendiente (gris), En proceso (azul), Completado (verde)
- ✅ Validación secuencial de etapas (solo se avanza si la anterior está completada)
- 📥 Sistema de descarga de licencias médicas mediante URL
- 📱 Diseño responsive para móviles y tablets
- 🌐 Integración con Supabase (opcional)
- 💾 Almacenamiento local con localStorage como respaldo

## 🗄️ Base de Datos

Para configurar la base de datos en Supabase:
1. Consulta `SUPABASE-SETUP.md` para instrucciones detalladas
2. Ejecuta el script SQL de `supabase-table-simple.sql` en el SQL Editor de Supabase
3. Configura las variables de entorno en `.env`

## 📖 Documentación

- `SUPABASE-SETUP.md` - Configuración de la base de datos
- `INSTRUCCIONES-USO.md` - Guía completa de uso del sistema
- `supabase-table.sql` - Script SQL completo
- `supabase-table-simple.sql` - Script SQL simplificado

## 👤 Credenciales de Prueba

**Panel de Administración:**
- URL: `/admin`
- Usuario: `admin`
- Contraseña: `admin`

⚠️ **IMPORTANTE: Cambiar estas credenciales en producción**

## 🛡️ Variables de Entorno

El proyecto requiere las siguientes variables en el archivo `.env`:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
```

### Obtener credenciales de Supabase:
1. Ve a [supabase.com](https://supabase.com)
2. Crea un proyecto
3. Ve a Settings > API
4. Copia la **Project URL** y **anon/public key**

## 🎨 Componentes Principales

- **Login (App.jsx)** - Pantalla de inicio de sesión para clientes
- **Dashboard (Dashboard.jsx)** - Vista del cliente con timeline de etapas
- **Admin (Admin.jsx)** - Panel de administración con gestión de clientes

## 📱 Funcionalidades por Rol

### Cliente:
- Iniciar sesión con RUT
- Ver timeline de 4 etapas de su licencia médica
- Descargar documento de licencia (si está disponible)
- Ver progreso en días transcurridos

### Administrador:
- Gestión completa de clientes (Crear, Editar, Eliminar)
- Asignar fechas a cada etapa
- Cambiar estados de etapas (con validación secuencial)
- Subir URL de documento de licencia
- Vista de cards responsivas

## 🔐 Seguridad Implementada

- ✅ Variables de entorno protegidas con `.gitignore`
- ✅ Archivo `.env.example` para referencia
- ✅ Sin credenciales hardcodeadas en el código
- ✅ URLs de licencias externas (no almacenamiento de archivos sensibles)

## 🚀 Despliegue en Vercel

Para desplegar en Vercel, consulta la guía completa en `DEPLOY-VERCEL.md`

**Resumen rápido:**
1. Push tu código a GitHub
2. Importa el proyecto en Vercel
3. Configura las variables de entorno
4. Deploy automático

El archivo `vercel.json` ya está configurado para:
- ✅ Rutas SPA funcionando correctamente
- ✅ Headers de seguridad
- ✅ Cache optimizado
- ✅ Variables de entorno

## 📝 Notas Importantes

- Los datos se guardan en localStorage por defecto
- Para usar Supabase, configura las variables de entorno
- El sistema valida que las etapas se completen en orden
- Si una etapa retrocede, las siguientes se resetean automáticamente

## 📄 Licencia

Este proyecto es privado y confidencial.

---

Sistema de gestión de licencias médicas
