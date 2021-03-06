drop table time_sheets;
drop table employee_status;

CREATE TABLE time_sheets(
     id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     status tinyint(1) NOT NULL,
     status_datetime INT(11) NOT NULL,
     comments TEXT NOT NULL,
     username VARCHAR(50),
     password VARCHAR(255),
     pin INT(4),
     admin tinyint(1) NOT NULL
);

INSERT INTO time_sheets
(first_name, last_name, comments, username, password, admin, pin)
VALUES
('Dmitry', 'Yushchev', '', '', '', 0, 1111),
('Benjamin', 'Stevens', '', '', '', 0, 1111),
('James', 'Way', '', '', '', 0, 1111);


INSERT INTO time_sheets
(first_name, last_name, comments, username, password, admin, pin)
VALUES
('admin', 'admin', '','admin', 'admin1',1, 2222);

INSERT INTO time_sheets
(first_name, last_name, comments, username, password, admin, pin)
VALUES
('rec1', 'rec2', '','rec', 'rec',2, 2222);

CREATE TABLE employee_status(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    status_datetime INT(11) NOT NULL,
    status tinyint(1) NOT NULL,
    comment_text text NOT NULL,
    employee_id INT, FOREIGN KEY (employee_id) REFERENCES time_sheets(id)
);