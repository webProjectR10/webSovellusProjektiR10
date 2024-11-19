DROP TABLE IF EXISTS users, groups, members, favorites, review;

CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(50),
    email VARCHAR(80) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE groups (
    groupID SERIAL PRIMARY KEY,
    name VARCHAR(100),
    ownerID INT REFERENCES users(userID) ON DELETE SET NULL
);

CREATE TABLE members (
    memberID SERIAL PRIMARY KEY,
    userID INT REFERENCES users(userID) ON DELETE CASCADE,
    groupID INT REFERENCES groups(groupID) ON DELETE CASCADE,
    memberscol VARCHAR(45)
);

CREATE TABLE favorites (
    favoriteID SERIAL PRIMARY KEY,
    userID INT REFERENCES users(userID) ON DELETE CASCADE,
    movieID INT
);

CREATE TABLE review (
    reviewID SERIAL PRIMARY KEY,
    userID INT REFERENCES users(userID) ON DELETE CASCADE,
    movieID INT,
    text VARCHAR(255),
    stars INT,
    date_given TIMESTAMP DEFAULT NOW()
);