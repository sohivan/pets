
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id 				SERIAL primary key,
	name 			text not null,
	email			VARCHAR(50) not null unique,
	password 		text not null
);

