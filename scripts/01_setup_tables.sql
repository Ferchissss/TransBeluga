-- Tabla para guardar todas las cotizaciones
CREATE TABLE IF NOT EXISTS quotations (
    id SERIAL PRIMARY KEY,
    package_type TEXT CHECK(package_type IN ('documento','paquete')) NOT NULL,
    weight NUMERIC(6,2),
    length NUMERIC(6,2),
    width NUMERIC(6,2),
    height NUMERIC(6,2),
    fragile BOOLEAN DEFAULT false,
    estimated_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla principal de envíos pagados
CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    guia_number VARCHAR(20) UNIQUE NOT NULL,
    sender_name VARCHAR(120) NOT NULL,
    sender_ci VARCHAR(30),
    sender_phone VARCHAR(20) NOT NULL,
    cons_name VARCHAR(120) NOT NULL,
    cons_phone VARCHAR(20) NOT NULL,
    cons_city TEXT CHECK(cons_city IN ('Tarija','Bermejo')) NOT NULL,
    content_desc VARCHAR(255),
    price_total NUMERIC(10,2) NOT NULL,
    shipment_status TEXT CHECK(shipment_status IN ('recepcionado','en tránsito','en destino','entregado')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para registrar cada paquete que pertenece a un envío
CREATE TABLE IF NOT EXISTS shipment_packages (
    id SERIAL PRIMARY KEY,
    shipment_id INTEGER REFERENCES shipments(id) ON DELETE CASCADE,
    package_type TEXT CHECK(package_type IN ('documento','paquete')) NOT NULL,
    weight NUMERIC(6,2),
    length NUMERIC(6,2),
    width NUMERIC(6,2),
    height NUMERIC(6,2),
    fragile BOOLEAN DEFAULT false
);

-- Habilitar RLS
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_packages ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (Permitir inserción pública para cotizaciones por ahora)
CREATE POLICY "Enable insert for everyone" ON quotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for everyone" ON quotations FOR SELECT USING (true);
