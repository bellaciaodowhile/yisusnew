# 🚀 Instalación Rápida de la Tabla en Supabase

## ⚡ Pasos Rápidos

### 1. Ve a tu proyecto en Supabase
- Abre [supabase.com](https://supabase.com)
- Selecciona tu proyecto

### 2. Abre SQL Editor
- En el menú lateral, haz clic en **"SQL Editor"**
- O usa el ícono **</> **

### 3. Ejecuta el script completo
- Abre el archivo `supabase-table-COMPLETA.sql`
- Copia TODO el contenido
- Pégalo en el SQL Editor
- Haz clic en **"RUN"** o presiona `Ctrl + Enter`

### 4. Verifica la instalación
El script mostrará al final la estructura de la tabla. Deberías ver:

```
column_name  | data_type | is_nullable | column_default
-------------|-----------|-------------|---------------
id           | bigint    | NO          | nextval(...)
rut          | varchar   | NO          | 
fecha1       | date      | YES         |
fecha2       | date      | YES         |
fecha3       | date      | YES         |
fecha4       | date      | YES         |
estado1      | varchar   | YES         | 'gris'::varchar
estado2      | varchar   | YES         | 'gris'::varchar
estado3      | varchar   | YES         | 'gris'::varchar
estado4      | varchar   | YES         | 'gris'::varchar
url_licencia | text      | YES         |
created_at   | timestamp | NO          | now()
updated_at   | timestamp | NO          | now()
```

### 5. Verifica en Table Editor
- Ve a **Table Editor** en el menú lateral
- Deberías ver la tabla **"clients"**
- La tabla debe tener 12 columnas

## ✅ ¡Listo!

Tu aplicación ahora debería funcionar correctamente con Supabase.

## 🧪 Probar la integración

1. **Agregar un cliente desde el admin:**
   - Ve a `/admin` (usuario: admin, contraseña: admin)
   - Agrega un cliente de prueba

2. **Verificar en Supabase:**
   - Ve a Table Editor
   - Revisa que el cliente aparezca en la tabla

3. **Probar el login:**
   - Ve a la página principal
   - Ingresa el RUT del cliente creado
   - Debería mostrar el dashboard

## ❌ Si algo sale mal

- Revisa la consola del navegador (F12)
- Verifica las variables de entorno
- Consulta `SUPABASE-TROUBLESHOOTING.md`

---

**Nota:** El script `supabase-table-COMPLETA.sql` elimina y recrea la tabla completa, así que ejecutar este script borrará todos los datos existentes.