-- Tabla de clientes para COMPIN
-- Ejecuta este script en el Table Editor de Supabase

CREATE TABLE IF NOT EXISTS clients (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índice para búsquedas rápidas por RUT
CREATE INDEX IF NOT EXISTS idx_clients_rut ON clients(rut);

-- Comentarios para documentación
COMMENT ON TABLE clients IS 'Tabla de clientes con fechas y estados de seguimiento';
COMMENT ON COLUMN clients.rut IS 'RUT del cliente (formato: 12345678-9)';
COMMENT ON COLUMN clients.fecha1 IS 'Fecha Etapa 1: Licencia Médica Recibida en la COMPIN';
COMMENT ON COLUMN clients.fecha2 IS 'Fecha Etapa 2: Licencia Autorizada por Contraloría Médica';
COMMENT ON COLUMN clients.fecha3 IS 'Fecha Etapa 3: Licencia en Evaluación de Subsidio';
COMMENT ON COLUMN clients.fecha4 IS 'Fecha Etapa 4: Envío de la Licencia Médica a Pago';
COMMENT ON COLUMN clients.estado1 IS 'Estado Etapa 1: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.estado2 IS 'Estado Etapa 2: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.estado3 IS 'Estado Etapa 3: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.estado4 IS 'Estado Etapa 4: verde (completado), azul (en proceso), gris (pendiente)';
COMMENT ON COLUMN clients.url_licencia IS 'URL del documento de licencia médica para descarga';

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_clients_updated_at 
  BEFORE UPDATE ON clients 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (consulta de RUT)
CREATE POLICY "Permitir lectura pública de clientes"
  ON clients
  FOR SELECT
  USING (true);

-- Política para permitir inserción autenticada
CREATE POLICY "Permitir inserción autenticada"
  ON clients
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización autenticada
CREATE POLICY "Permitir actualización autenticada"
  ON clients
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir eliminación autenticada
CREATE POLICY "Permitir eliminación autenticada"
  ON clients
  FOR DELETE
  USING (auth.role() = 'authenticated');
