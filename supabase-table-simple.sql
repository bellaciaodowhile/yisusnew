-- Script simplificado para crear la tabla en Supabase Table Editor
-- Opción 1: Usa este script en el SQL Editor

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

-- Índice para búsquedas por RUT
CREATE INDEX idx_clients_rut ON clients(rut);

-- Habilitar RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública
CREATE POLICY "public_read" ON clients FOR SELECT USING (true);

-- Permitir todo a usuarios autenticados
CREATE POLICY "authenticated_all" ON clients 
  FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
