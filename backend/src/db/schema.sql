CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(65) NOT NULL,
    role ENUM('PROFESSOR', 'ADMIN') DEFAULT 'PROFESSOR'
);

CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    available BOOLEAN NOT NULL,
    lesson INT(1) NOT NULL,
    day_of_week INT(1) NOT NULL,
    user_id INT NOT NULL,
    created_at DATE DEFAULT (NOW()),

    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY schedules_uniqueness (lesson, day_of_week, user_id, created_at)
);

CREATE TABLE deadlines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL
);

