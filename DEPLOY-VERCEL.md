# Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu aplicación en Vercel con todas las configuraciones necesarias.

## 📋 Prerequisitos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Supabase](https://supabase.com) (si usas base de datos)
- Repositorio en GitHub con tu proyecto

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio

```bash
# Asegúrate de que todo esté commiteado
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Importar Proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"New Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Vite

### 3. Configurar Variables de Entorno

En la sección **"Environment Variables"** de Vercel, agrega:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | Tu URL de Supabase (ej: `https://xxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Tu clave anon de Supabase |

**Importante:** Estas variables deben estar disponibles en los siguientes entornos:
- ✅ Production
- ✅ Preview
- ✅ Development

### 4. Configuración del Build

Vercel detectará automáticamente:
- **Framework Preset:** Vite
- **Build Command:** `pnpm build` (o `npm run build`)
- **Output Directory:** `dist`
- **Install Command:** `pnpm install` (o `npm install`)

Si necesitas cambiarlos manualmente:
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

### 5. Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (1-3 minutos)
3. Tu aplicación estará disponible en `https://tu-proyecto.vercel.app`

## ⚙️ Configuración del vercel.json

El archivo `vercel.json` incluido en el proyecto configura:

### Rewrites (Rutas SPA)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Esto asegura que todas las rutas (`/`, `/admin`, etc.) funcionen correctamente como SPA.

### Headers de Seguridad
- `X-Content-Type-Options`: Previene MIME sniffing
- `X-Frame-Options`: Previene clickjacking
- `X-XSS-Protection`: Protección contra XSS
- `Referrer-Policy`: Control de información de referencia

### Cache
- Assets estáticos cacheados por 1 año (max-age=31536000)

## 🔒 Variables de Entorno con Vercel CLI (Opcional)

Si prefieres usar la CLI de Vercel:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Agregar variables de entorno
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Desplegar
vercel --prod
```

## 🌐 Dominios Personalizados

Para agregar un dominio personalizado:

1. Ve a tu proyecto en Vercel
2. Navega a **Settings > Domains**
3. Agrega tu dominio (ej: `compin.tuempresa.cl`)
4. Sigue las instrucciones para configurar DNS

### Configuración DNS
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

## 🔄 Despliegues Automáticos

Vercel despliega automáticamente cuando:
- ✅ Haces push a la rama `main` (producción)
- ✅ Haces push a otras ramas (preview)
- ✅ Creas un Pull Request (preview)

## 📊 Monitoreo

### Ver Logs
1. Ve a tu proyecto en Vercel
2. Navega a **Deployments**
3. Haz clic en cualquier deployment
4. Revisa **Build Logs** y **Function Logs**

### Analytics
Vercel ofrece analytics gratis:
1. Ve a **Analytics** en tu proyecto
2. Ver estadísticas de visitantes, performance, etc.

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Asegúrate de que todas las dependencias estén en package.json
pnpm install
pnpm build
```

### Error: Variables de entorno no definidas
- Verifica que las variables estén en Vercel Dashboard
- Asegúrate de que empiecen con `VITE_`
- Redeploy después de agregar variables

### Error 404 en rutas
- Verifica que `vercel.json` esté en la raíz del proyecto
- Revisa que el rewrite esté configurado correctamente

### Error: Build falla
```bash
# Prueba el build localmente
pnpm build

# Si funciona local, verifica logs en Vercel
```

## 🔐 Seguridad en Producción

### Cambiar Credenciales de Admin
El proyecto usa credenciales hardcodeadas (`admin/admin`). Para producción:

1. Implementa autenticación real con Supabase Auth
2. O cambia las credenciales en el código

### Row Level Security (RLS) en Supabase
Asegúrate de tener RLS habilitado:
```sql
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
```

### HTTPS
Vercel proporciona HTTPS automáticamente con certificados SSL gratuitos.

## 📝 Checklist Pre-Deploy

- [ ] `.env` no está en el repositorio (verificar `.gitignore`)
- [ ] Variables de entorno configuradas en Vercel
- [ ] `vercel.json` en la raíz del proyecto
- [ ] Build funciona localmente (`pnpm build`)
- [ ] Supabase configurado (si se usa)
- [ ] Credenciales de admin cambiadas (para producción)
- [ ] Dominio configurado (opcional)

## 🎉 Post-Deploy

Después del despliegue:
1. Prueba todas las rutas (`/`, `/admin`)
2. Verifica el login de clientes
3. Prueba el panel de administración
4. Verifica la descarga de licencias
5. Prueba en móviles

## 🔗 Enlaces Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Vite en Vercel](https://vercel.com/docs/frameworks/vite)
- [Variables de Entorno en Vercel](https://vercel.com/docs/environment-variables)
- [Dominios en Vercel](https://vercel.com/docs/custom-domains)

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Consulta la documentación de Vercel
3. Verifica la configuración de Supabase

---

**¡Tu aplicación está lista para producción!** 🚀
