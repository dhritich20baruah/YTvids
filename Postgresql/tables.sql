CREATE TABLE books (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    metadata JSONB
);

INSERT INTO books (title, author, metadata) VALUES
('Web Design with HTML, CSS, JavaScript and jQuery Set', 'Jon Duckett', '{"year": 2014, "genre": "Computer Science", "pages": 1152}'),
('Data Structures and Algorithms Made Easy', 'Narasimha Karumanchi', '{"year": 2011, "genre": "Computer Science", "pages": 470}'),
('Million Dollar Weekend: The Surprisingly Simple Way to Launch a 7-Figure Business in 48 Hours', 'Noah Kagan', '{"year": 2024, "genre": "Business", "pages": 240}');
