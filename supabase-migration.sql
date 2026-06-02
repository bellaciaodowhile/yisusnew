-- Script de migración para agregar el campo url_licencia
-- Ejecuta esto solo si ya tienes la tabla clients creada sin este campo

-- Agregar columna url_licencia si no existe
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS url_licencia TEXT;

-- Agregar comentario
COMMENT ON COLUMN clients.url_licencia IS 'URL del documento de licencia médica para descarga';

-- Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'clients'
ORDER BY ordinal_position;
