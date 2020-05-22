CREATE DATABASE HotelDB;

CREATE TABLE Users (
    Id int IDENTITY NOT NULL,
    Username varchar(50) NOT NULL,
    Password varchar(50) NOT NULL,
    Name varchar(150),

    CONSTRAINT PK_user PRIMARY KEY(Id),
    CONSTRAINT AK_username_user UNIQUE(username)
);

CREATE TABLE Hotels (
    Id int IDENTITY NOT NULL,
    Name varchar(50) NOT NULL,
    Address varchar(150),
    Phone varchar(50),
    Mail varchar(150),
    UserId int NOT NULL,

    CONSTRAINT PK_hotel PRIMARY KEY(Id),
    CONSTRAINT FK_userId FOREIGN KEY (UserId) REFERENCES Users(Id),
    CONSTRAINT AK_name_hotel UNIQUE(name)
);