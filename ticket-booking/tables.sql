CREATE TABLE buses (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    details TEXT NOT NULL,
    total_seats INTEGER NOT NULL,
    stoppages TEXT[] NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL,
    speed INTEGER NOT NULL,
    service VARCHAR(50) NOT NULL
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service
) VALUES (
    'Network Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Guwahati', 'Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh', 'Tinsukia'],
    1.44,
    '20:00',
    41,
    'night'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service
) VALUES (
    'Chartered ASTC',
    'Volvo A/C Pushback 2+2',
    48,
    ARRAY['Guwahati', 'Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh'],
    2.16,
    '08:30',
    50,
    'day'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service
) VALUES (
    'Rayan',
    'Bharat Benz A/C 2+1 Seater',
    36,
    ARRAY['Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh', 'Tinsukia'],
    1.66,
    '07:30',
    42,
    'day'
);
