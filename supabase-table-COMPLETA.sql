-- ============================================
-- SCRIPT COMPLETO PARA TABLA CLIENTS
-- Ejecuta este script en SQL Editor de Supabase
-- ============================================

-- PASO 1: Eliminar tabla existente si existe (CUIDADO: Esto borra todos los datos)
DROP TABLE IF EXISTS clients CASCADE;

-- PASO 2: Crear la tabla con TODAS las columnas necesarias
CREATE TABLE clients (
  id BIGSERIAL PRIMARY KEY,
  rut VARCHAR(12) NOT NULL UNIQUE,
  fecha1 DATE,
  fecha2 DATE,
  fecha3 DATE,
  fecha4 DATE,
  estado1 VARCHAR(10) DEFAULT 'gris' CHECK (estado1 IN ('verde', 'azul', 'gris')),
  estado2 VARCHAR(10) DEFAULT 'gris' CHECK (estado2 IN ('verde', 'azul', 'gris')),
  estado3 VARCHAR(10) DEFAULT 'gris' CHECK (estado3 IN ('verde', 'azul', 'gris')),
  estado4 VARCHAR(10) DEFAULT 'gris' CHECK (estado4 IN ('verde', 'azul', 'gris')),
  url_licencia TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PASO 3: Crear índice para búsquedas rápidas por RUT
CREATE INDEX idx_clients_rut ON clients(rut);

-- PASO 4: Agregar comentarios para documentación
COMMENT ON TABLE clients IS 'Tabla de clientes con fechas y estados de seguimiento';
COMMENT ON COLUMN clients.id IS 'ID único del cliente';
COMMENT ON COLUMN clients.rut IS 'RUT del cliente (formato: 12345678-9)';
COMMENT ON COLUMN clients.fecha1 IS 'Fecha Etapa 1: Licencia Médica Recibida';
COMMENT ON COLUMN clients.fecha2 IS 'Fecha Etapa 2: Licencia Autorizada por Contraloría';
COMMENT ON COLUMN clients.fecha3 IS 'Fecha Etapa 3: Licencia en Evaluación de Subsidio';
COMMENT ON COLUMN clients.fecha4 IS 'Fecha Etapa 4: Envío de la Licencia Médica a Pago';
COMMENT ON COLUMN clients.estado1 IS 'Estado Etapa 1: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.estado2 IS 'Estado Etapa 2: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.estado3 IS 'Estado Etapa 3: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.estado4 IS 'Estado Etapa 4: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.url_licencia IS 'URL del documento de licencia médica para descarga';

-- PASO 5: Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- PASO 6: Crear trigger para actualizar updated_at
CREATE TRIGGER update_clients_updated_at 
  BEFORE UPDATE ON clients 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- PASO 7: Habilitar Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- PASO 8: Crear política para permitir lectura pública (consulta de RUT)
CREATE POLICY "Permitir lectura pública de clientes"
  ON clients
  FOR SELECT
  USING (true);

-- PASO 9: Crear política para permitir todo a usuarios autenticados
-- NOTA: Como no usas autenticación de Supabase, esta política permite todo
CREATE POLICY "Permitir todo sin autenticación"
  ON clients
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- PASO 10: Verificar que todo se creó correctamente
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'clients'
ORDER BY ordinal_position;

-- ============================================
-- DATOS DE PRUEBA (OPCIONAL)
-- Descomenta las siguientes líneas para insertar datos de prueba
-- ============================================

-- INSERT INTO clients (rut, fecha1, fecha2, estado1, estado2) 
-- VALUES ('12345678-9', '2024-01-15', '2024-01-20', 'verde', 'azul');

-- INSERT INTO clients (rut, fecha1, estado1) 
-- VALUES ('98765432-1', '2024-01-10', 'verde');
