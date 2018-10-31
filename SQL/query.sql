drop table time_sheets;
drop table employee;

CREATE TABLE time_sheets(
     id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     status tinyint(1) NOT NULL,
     username VARCHAR(50),
     password VARCHAR(255),
     admin tinyint(1) NOT NULL
);

INSERT INTO time_sheets
(first_name, last_name, status, admin)
VALUES
('Dmitry', 'Yushchev', 1, 1),
('Benjamin', 'Stevens', 0, 0),
('James', 'Way', 0, 0);

INSERT INTO time_sheets
(first_name, last_name, username, password, admin)
VALUES
('admin', 'admin', 'admin', 'admin1',1);

CREATE TABLE employee(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      day DATE NOT NULL,
      check_in DATETIME,
      check_out DATETIME,
      comment text,
      employee_id INT, FOREIGN KEY (employee_id) REFERENCES time_sheets(id)
);

INSERT INTO employee
(check_in, check_out, comment, employee_id)
VALUES
(0, 0, 'comment', 1);