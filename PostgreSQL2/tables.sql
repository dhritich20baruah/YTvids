CREATE TABLE book_list(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    other_details JSONB
);

INSERT INTO book_list (title, author, other_details) VALUES ('Web Design with HTML, CSS, JavaScript and jQuery Set', 'Jon Duckett', '{"year": 2014, "genre": "Computer Science", "Pages": 1152}');