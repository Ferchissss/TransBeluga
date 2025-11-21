-- Agregar columna de descripción a la tabla de paquetes
ALTER TABLE shipment_packages ADD COLUMN content_description VARCHAR(255);
