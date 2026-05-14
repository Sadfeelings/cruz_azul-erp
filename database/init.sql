CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    producto VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL
);