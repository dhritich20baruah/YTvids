CREATE TABLE buses (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    details TEXT NOT NULL,
    total_seats INTEGER NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL,
    speed INTEGER NOT NULL,
    service VARCHAR(50) NOT NULL
);
