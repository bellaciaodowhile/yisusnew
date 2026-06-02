# Solución de Problemas - Supabase

## 🔍 Verificación de Configuración

### 1. Verificar Variables de Entorno

Asegúrate de que las variables de entorno estén configuradas correctamente:

```bash
# En local (.env)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anon

# Verificar que se cargan correctamente
console.log(import.meta.env.VITE_SUPABASE_URL)
```

**En Vercel:**
- Ve a Settings > Environment Variables
- Verifica que estén configuradas para Production, Preview y Development

### 2. Verificar Conexión a Supabase

Abre la consola del navegador (F12) y verifica:
- ✅ No hay errores de CORS
- ✅ Las peticiones a Supabase se completan
- ❌ Si ves errores 401/403, verifica las políticas RLS

### 3. Verificar Tabla en Supabase

1. Ve a tu proyecto en Supabase
2. Navega a **Table Editor**
3. Verifica que la tabla `clients` existe
4. Verifica los campos:
   - `id` (BIGSERIAL, PRIMARY KEY)
   - `rut` (VARCHAR(12), UNIQUE)
   - `fecha1` a `fecha4` (DATE)
   - `estado1` a `estado4` (VARCHAR(10))
   - `url_licencia` (TEXT)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

## 🛠️ Problemas Comunes

### Error: "Failed to fetch"

**Causa:** Variables de entorno no configuradas o incorrectas

**Solución:**
```bash
# 1. Verifica el archivo .env
cat .env

# 2. Verifica que las variables empiecen con VITE_
# 3. Reinicia el servidor de desarrollo
pnpm dev
```

### Error: "new row violates row-level security policy"

**Causa:** RLS está habilitado pero las políticas no permiten la operación

**Solución en Supabase SQL Editor:**
```sql
-- Ver políticas actuales
SELECT * FROM pg_policies WHERE tablename = 'clients';

-- Recrear políticas si es necesario
DROP POLICY IF EXISTS "public_read" ON clients;
DROP POLICY IF EXISTS "authenticated_all" ON clients;

CREATE POLICY "public_read" 
  ON clients FOR SELECT 
  USING (true);

CREATE POLICY "authenticated_all" 
  ON clients FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

### Error: "relation 'clients' does not exist"

**Causa:** La tabla no ha sido creada

**Solución:**
1. Ve a **SQL Editor** en Supabase
2. Ejecuta el script `supabase-table-simple.sql`
3. Verifica en **Table Editor** que la tabla aparezca

### Error: "column 'url_licencia' does not exist"

**Causa:** La tabla fue creada antes de agregar este campo

**Solución:**
1. Ejecuta el script `supabase-migration.sql` en SQL Editor
2. Verifica que la columna aparezca en Table Editor

### Los datos no aparecen después de guardar

**Causa:** Problema con las políticas RLS o error silencioso

**Solución:**
```sql
-- Verificar que RLS esté habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'clients';

-- Si rowsecurity = false, habilitar RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Verificar datos manualmente
SELECT * FROM clients;
```

### Error al hacer login: "RUT no encontrado"

**Posibles causas:**
1. El cliente no existe en la base de datos
2. El RUT tiene formato diferente (con/sin guión)
3. Error de conexión con Supabase

**Solución:**
1. Verifica en Table Editor que el cliente exista
2. Verifica el formato del RUT (debe coincidir exactamente)
3. Revisa la consola del navegador para errores

## 🔧 Comandos Útiles

### Verificar Datos en Supabase

```sql
-- Ver todos los clientes
SELECT * FROM clients ORDER BY created_at DESC;

-- Contar clientes
SELECT COUNT(*) FROM clients;

-- Buscar por RUT
SELECT * FROM clients WHERE rut = '12345678-9';

-- Ver últimos registros
SELECT * FROM clients 
ORDER BY created_at DESC 
LIMIT 10;
```

### Limpiar Datos de Prueba

```sql
-- ⚠️ CUIDADO: Esto borra TODOS los datos
DELETE FROM clients;

-- Reiniciar el contador de IDs
ALTER SEQUENCE clients_id_seq RESTART WITH 1;
```

### Verificar Políticas RLS

```sql
-- Ver todas las políticas de la tabla clients
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'clients';
```

## 🔍 Debug en el Navegador

### Verificar Peticiones a Supabase

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Filtra por "supabase"
4. Realiza una acción (guardar cliente, login)
5. Verifica:
   - Status Code (debe ser 200 o 201)
   - Response (debe contener los datos)
   - Request Headers (debe incluir apikey)

### Verificar Variables de Entorno

```javascript
// En la consola del navegador
console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)

// Deben mostrar valores, no undefined
```

## 📋 Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Variables de entorno configuradas en `.env`
- [ ] Servidor de desarrollo reiniciado después de cambiar `.env`
- [ ] Tabla `clients` existe en Supabase
- [ ] Todos los campos de la tabla existen
- [ ] RLS está habilitado
- [ ] Políticas RLS están configuradas
- [ ] API Key es correcta (anon/public)
- [ ] URL de Supabase es correcta
- [ ] Sin errores en la consola del navegador
- [ ] Sin errores en la pestaña Network

## 🆘 Último Recurso

Si nada funciona:

1. **Recrear la tabla:**
   ```sql
   DROP TABLE IF EXISTS clients CASCADE;
   -- Luego ejecuta supabase-table-simple.sql
   ```

2. **Verificar en modo incógnito** (para descartar extensiones del navegador)

3. **Revisar logs en Supabase:**
   - Ve a tu proyecto en Supabase
   - Navega a **Logs** > **Postgres Logs**
   - Busca errores relacionados con `clients`

4. **Probar con Postman o cURL:**
   ```bash
   curl 'https://xxx.supabase.co/rest/v1/clients' \
     -H "apikey: tu_clave_anon" \
     -H "Authorization: Bearer tu_clave_anon"
   ```

## 📞 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

Si sigues teniendo problemas después de seguir esta guía, revisa los logs específicos del error.
