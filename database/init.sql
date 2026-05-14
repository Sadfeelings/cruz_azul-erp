CREATE DATABASE farmaciacruzazul;
\c farmaciacruzazul;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    producto VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL
);