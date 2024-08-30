CREATE TABLE buses (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    details TEXT NOT NULL,
    total_seats INTEGER NOT NULL,
    stoppages TEXT[] NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL,
    speed INTEGER NOT NULL,
    service VARCHAR(50) NOT NULL,
    routes VARCHAR
);

CREATE TABLE journey (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    origin VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    doj VARCHAR NOT NULL,
    passenger_name VARCHAR NOT NULL,
    seat_no VARCHAR NOT NULL,
    mobile_no VARCHAR NOT NULL,
    email VARCHAR,
    stoppages TEXT[] NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL, 
    paymentID VARCHAR,
    payment_status BOOLEAN
);

  
CREATE TYPE stop AS (
    name VARCHAR(100),
    distance_from_last INTEGER
);

CREATE TABLE bus_routes (
    id SERIAL PRIMARY KEY,
    route_name VARCHAR(255) NOT NULL,
    distance stop[]
);

ALTER TABLE buses
ADD COLUMN routes VARCHAR;


INSERT INTO bus_routes (route_name, distance) VALUES ('NH37_G2T',  ARRAY[
    ROW('Guwahati', 0)::stop,
    ROW('Nagaon', 120)::stop,
    ROW('Bokakhat', 120)::stop,
    ROW('Jorhat', 68)::stop,
    ROW('Sivsagar', 57)::stop,
    ROW('Moran', 42)::stop,
    ROW('Dibrugarh', 38)::stop,
    ROW('Tinsukia', 47)::stop
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('NH37_T2G',  ARRAY[
    ROW('Tinsukia', 0)::stop,
    ROW('Dibrugarh', 47)::stop,
    ROW('Moran', 38)::stop,
    ROW('Sivsagar', 42)::stop,
    ROW('Jorhat', 57)::stop,
    ROW('Bokakhat', 68)::stop,
    ROW('Nagaon', 120)::stop,
    ROW('Guwahati', 120)::stop
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('NH15_52_G2D',  ARRAY[
    ROW('Guwahati', 0)::stop,
    ROW('Mangaldoi', 72)::stop,
    ROW('Tezpur', 95)::stop,
    ROW('North Lakhimpur', 180)::stop,
    ROW('Dhemaji', 66)::stop
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('NH15_52_D2G',  ARRAY[
    ROW('Dhemaji', 0)::stop,
    ROW('North Lakhimpur', 66)::stop,
    ROW('Tezpur', 180)::stop,
    ROW('Mangaldoi', 95)::stop,
    ROW('Guwahati', 72)::stop
]);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Network Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Guwahati', 'Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh', 'Tinsukia'],
    1.44,
    '20:00',
    41,
    'night',
    'NH37_G2T'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Chartered ASTC',
    'Volvo A/C Pushback 2+2',
    48,
    ARRAY['Guwahati', 'Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh'],
    2.16,
    '08:30',
    50,
    'day',
    'NH37_G2T'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Rayan',
    'Bharat Benz A/C 2+1 Seater',
    36,
    ARRAY['Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh', 'Tinsukia'],
    1.66,
    '07:30',
    42,
    'day',
    'NH37_G2T'
);


-- DOWN
INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Network Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Tinsukia','Dibrugarh', 'Moran', 'Sivsagar', 'Jorhat', 'Bokakhat', 'Nagaon', 'Guwahati'],
    1.44,
    '20:00',
    41,
    'night',
    'NH37_T2G'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Chartered ASTC',
    'Volvo A/C Pushback 2+2',
    48,
    ARRAY['Dibrugarh', 'Moran', 'Sivsagar', 'Jorhat', 'Bokakhat', 'Nagaon', 'Guwahati'],
    2.16,
    '08:30',
    50,
    'day',
    'NH37_T2G'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Rayan',
    'Bharat Benz A/C 2+1 Seater',
    36,
    ARRAY['Tinsukia','Dibrugarh', 'Moran', 'Sivsagar', 'Jorhat', 'Bokakhat', 'Nagaon'],
    1.66,
    '07:30',
    42,
    'day',
    'NH37_T2G'
);
