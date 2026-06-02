# Configuración de Supabase

## Paso 1: Crear la tabla en Supabase

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. En el menú lateral, selecciona **Table Editor**
3. Haz clic en **New Table** o usa el **SQL Editor**
4. Copia y pega el contenido del archivo `supabase-table.sql`
5. Ejecuta el script

## Paso 2: Configurar las variables de entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   copy .env.example .env
   ```

2. En Supabase, ve a **Settings** → **API**

3. Copia las siguientes credenciales a tu archivo `.env`:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

Ejemplo de `.env`:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

## Estructura de la tabla `clients`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGSERIAL | ID único (auto-incrementable) |
| `rut` | VARCHAR(12) | RUT del cliente (único) |
| `fecha1` | DATE | Fecha Etapa 1: Licencia Médica Recibida en la COMPIN |
| `fecha2` | DATE | Fecha Etapa 2: Licencia Autorizada por Contraloría Médica |
| `fecha3` | DATE | Fecha Etapa 3: Licencia en Evaluación de Subsidio |
| `fecha4` | DATE | Fecha Etapa 4: Envío de la Licencia Médica a Pago |
| `estado1` | VARCHAR(10) | Estado Etapa 1 (verde/azul/gris) |
| `estado2` | VARCHAR(10) | Estado Etapa 2 (verde/azul/gris) |
| `estado3` | VARCHAR(10) | Estado Etapa 3 (verde/azul/gris) |
| `estado4` | VARCHAR(10) | Estado Etapa 4 (verde/azul/gris) |
| `created_at` | TIMESTAMP | Fecha de creación (automático) |
| `updated_at` | TIMESTAMP | Fecha de actualización (automático) |

## Estados disponibles

- **verde**: Etapa completada ✅
- **azul**: Etapa en proceso 🔍
- **gris**: Etapa pendiente ⏳

## Características de seguridad

- **Row Level Security (RLS)** habilitado
- Lectura pública permitida (para consulta de RUT)
- Escritura, actualización y eliminación solo para usuarios autenticados
- Índice en el campo `rut` para búsquedas rápidas
- Trigger automático para actualizar `updated_at`

## Políticas de acceso

- ✅ **SELECT**: Público (cualquiera puede consultar)
- 🔒 **INSERT**: Solo usuarios autenticados
- 🔒 **UPDATE**: Solo usuarios autenticados
- 🔒 **DELETE**: Solo usuarios autenticados

## Próximos pasos

Después de configurar la tabla, necesitarás actualizar el código de `Admin.jsx` para usar Supabase en lugar de localStorage.
