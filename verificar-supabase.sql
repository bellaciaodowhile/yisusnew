-- ============================================
-- SCRIPT DE VERIFICACIÓN DE SUPABASE
-- Ejecuta este script para verificar que todo esté configurado correctamente
-- ============================================

-- 1. Verificar que la tabla existe
SELECT 'Tabla clients existe' as verificacion, 
       EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_name = 'clients'
       ) as resultado;

-- 2. Verificar estructura de la tabla
SELECT 'Columnas de la tabla' as verificacion;
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'clients'
ORDER BY ordinal_position;

-- 3. Verificar que RLS esté habilitado
SELECT 'RLS habilitado' as verificacion,
       rowsecurity as resultado
FROM pg_tables 
WHERE tablename = 'clients';

-- 4. Verificar políticas RLS
SELECT 'Políticas RLS' as verificacion;
SELECT 
  policyname,
  cmd,
  permissive,
  roles
FROM pg_policies 
WHERE tablename = 'clients';

-- 5. Insertar datos de prueba
INSERT INTO clients (rut, fecha1, estado1, estado2) 
VALUES ('11111111-1', CURRENT_DATE, 'verde', 'azul')
ON CONFLICT (rut) DO NOTHING;

-- 6. Verificar que se puede leer
SELECT 'Datos de prueba' as verificacion;
SELECT * FROM clients WHERE rut = '11111111-1';

-- 7. Verificar que se puede actualizar
UPDATE clients 
SET estado3 = 'verde', url_licencia = 'https://ejemplo.com/test.pdf'
WHERE rut = '11111111-1';

-- 8. Verificar la actualización
SELECT 'Verificar actualización' as verificacion;
SELECT rut, estado1, estado2, estado3, url_licencia 
FROM clients 
WHERE rut = '11111111-1';

-- 9. Contar registros totales
SELECT 'Total de clientes' as verificacion, 
       COUNT(*) as resultado 
FROM clients;

-- ============================================
-- RESULTADO ESPERADO:
-- ============================================
-- ✅ Tabla clients existe: true
-- ✅ 12 columnas en la tabla
-- ✅ RLS habilitado: true
-- ✅ Al menos 2 políticas RLS
-- ✅ Datos de prueba insertados y actualizados correctamente
-- ============================================