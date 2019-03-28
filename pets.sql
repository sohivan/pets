DROP TABLE if exists users cascade;
DROP TABLE if exists PetOwners cascade;
DROP TABLE if exists Pets cascade;
DROP TABLE if exists Homes cascade;
DROP TABLE if exists Bid cascade;
DROP TABLE if exists History cascade;
DROP TABLE if exists CareTaker cascade;
DROP TABLE if exists Services cascade;


CREATE TABLE users (
	id 				SERIAL primary key,
	name 			text not null,
	email			VARCHAR(100) not null unique,
	password 		text not null,
	unique(id,name)
);


INSERT INTO users (id, name, email, password) VALUES
(255,'Renee','tempor.bibendum@vel.com','BUZ77LFA2JY'),
(810,'Paki','vehicula.aliquet@Aeneaneuismod.ca','BVJ15SCT9SU'),
(525,'Minerva','tincidunt@facilisismagnatellus.net','CFE88RYX6BJ'),
(332,'Patrick','ipsum.leo.elementum@dignissimMaecenas.co.uk','RKS50SHP9GG'),
(548,'Iona','venenatis.vel@Aeneaneuismod.org','WSU52DBI7QE'),
(489,'Karyn','erat.vitae@disparturientmontes.ca','MHK80XPP7CK'),
(932,'Solomon','quam.quis.diam@molestie.co.uk','QGT17PZZ2IJ'),
(508,'Octavius','Phasellus@Aliquamadipiscing.ca','LIO34VZC2UV'),
(673,'Violet','Quisque.tincidunt.pede@vitaenibh.com','UFK59FOD0YT'),
(640,'Jolie','sem.ut@faucibusorci.ca','ZZT15HBV5XT'),
(725,'Heather','nunc.risus@acturpis.com','JBK85ODN5PL'),
(941,'Yoshio','Nulla.eget.metus@magnis.net','BTD17WGQ1UB'),
(950,'Keane','dignissim.Maecenas@interdumenimnon.org','STX76YFI9BG');


CREATE TABLE PetOwners (
	oid				serial primary key,
	owner_name		text not null,
	description 	text not null,
	numofpets		smallint  not null,
	foreign key (oid, owner_name) references users(id,name)
);

INSERT INTO PetOwners (oid, owner_name, description, numofpets) VALUES
(255,'Renee','aaaaaa',5),
(810,'Paki','aaaaaaa',3),
(525,'Minerva','aaaaaaa',2),
(332,'Patrick','aaaaaaaa',1),
(548,'Iona','aaaaaaaa',2),
(489,'Karyn','aaaaaaaa',1);


CREATE TABLE Pets (
	PetID			SERIAL primary key,
	name			VARCHAR(100) not null,
	weight			smallint not null,
	age				smallint not null,
	breed			VARCHAR(100) not null,
	typeofpet		VARCHAR(100) not null,
	gender			VARCHAR (100) not null, 
	descrip			text,
	med				text,
	oid				SERIAL not null REFERENCES PetOwners(oid)
);

INSERT INTO Pets (PetID, name, weight, age, breed, typeofpet, gender, descrip, med, oid) VALUES
(1166,'Hop',2,3,'Poodle','dog', 'male', 'hop likes to chew things', 'teething', 255),
(1177,'Rebecca',3,4,'Husky','dog', 'female', 'bec is socialable dog and loves hanging out with other animals', 'none', 255),
(1379,'Xandra',1,5,'Shitzu','dog', 'female', 'xandra loves sports!', null, 255),
(3590,'Lana',2,7,'Corgi','dog','female', 'lana loves humans', null, 255),
(9176,'Zeph',3,2,'Husky','dog','male', 'zeph is afraid of thunder', null, 255),
(5664,'Leilani',2,5,'Poodle','dog','female', 'leilani love children. she is very child-friendly and does not bite', 'NA', 810),
(9056,'Kaye',1,8,'Terrier','dog','female', null, null,  810),
(5014,'Sydney',2,10,'Corgi','dog', 'male', 'syd loves walks in the park', 'do not feed him chocolate', 810),
(8600,'Jack',3,12,'Husky','dog','male', null, 'jack does not eat human food',525),
(2594,'Constance',3,5,'Poodle','dog','female',null, null, 525),
(9108,'Dalton',3,6,'Husky','dog','male', null, 'keep him cool', 332),
(4152,'Maxine',1,9,'Corgi','dog','female', 'maxine is very friendly but she is afraid of cats', null, 548),
(6373,'Walter',1,3,'Shitzu','dog','male', 'walter loves playing by the beach!', 'walter is scared of seagulls',  548),
(8627,'Joel',2,6,'Corgi','dog','male', 'joel loves to swim', null,  489);



CREATE TABLE Homes (
	address			text not null,
	area			integer not null,
	type 			text not null,
	home_owner		SERIAL not null REFERENCES users(id),
	primary key (address, home_owner)
);




CREATE TABLE CareTaker (
	cid				SERIAL unique not null,
	name 			text not null,
	PetType			text not null,
	PetSize			text not null,
	houseOptions	text not null,
	miscOptions		text,
	Description 	text not null,
	-- address			text not null REFERENCES Homes(address)
	foreign key (cid, name) references users(id, name)
);

INSERT INTO CareTaker (cid, name, PetType, PetSize, houseOptions, miscOptions, Description) VALUES
(932,'Solomon','dog', "Small: 0 - 5kg",'Allow pets to stay in sitter\'s house','Takes care of one client at a time','likes to eat'),
(508,'Octavius','dog', "Small: 0 - 5kg",'Allow pets to stay in sitter\'s house',null,;'likes to sleep'),
(673,'Violet','dog', "Small: 0 - 5kg",'Allow pets to stay in sitter\'s house','Takes care of one client at a time','vegetarian'),
(640,'Jolie','dog',"Medium: 6 - 15kg",'Allow pets to stay in sitter\'s house',null,'likes to sing'),
(725,'Heather','dog',"Medium: 6 - 15kg",'Allow pets to stay in sitter\'s house','Takes care of one client at a time','i am writing a book'),
(941,'Yoshio','dog',"Large: 16 - 45kg",'Allow pets to stay in sitter\'s house','Takes care of one client at a time','i love shows'),
(950,'Keane','dog',"Large: 16 - 45kg",'Allow pets to stay in sitter\'s house',null,'I like monkeys');


CREATE TABLE Services (
	Service 		VARCHAR(100) not null,
	StartDate 		DATE not null,
	EndDate 		DATE not null,
	Rate			smallint not null,
	cid				SERIAL not null REFERENCES CareTaker(cid),
	serviceid		serial primary key,
	unique(cid, serviceid)
);

set datestyle = 'DMY';

INSERT INTO Services (Service, StartDate, EndDate, Rate, cid, serviceid) VALUES
('Pet Boarding','24-01-2019','25-01-2019',50,508,1),
('Washing','23-01-2019','20-02-2019',92,932,2),
('Walking','25-01-2019','20-02-2019',87,932,3),
('Walking','30-01-2019','25-01-2019',90,508,4),
('Overnight','30-01-2019','23-02-2019',93,950,5),
('Walking','22-01-2019','20-02-2019',87,950,6),
('Feeding','23-01-2019','20-02-2019',88,508,7),
('Overnight','22-01-2019','23-02-2019',61,941,8),
('Walking','30-01-2019','27-02-2019',71,941,9),
('Vet Visitation','22-01-2019','10-02-2019',67,950,10),
('Vet Visitation','27-01-2019','20-02-2019',98,950,11),
('Feeding','10-01-2019','27-02-2019',57,725,12),
('Washing','20-01-2019','26-01-2019',99,725,13),
('Vet Visitation','10-01-2019','23-02-2019',96,725,14),
('Feeding','24-01-2019','24-02-2019',81,640,15),
('Overnight','20-01-2019','24-02-2019',51,640,16),
('Walking','25-01-2019','26-01-2019',53,640,17);

DROP TABLE if exists Payment;
CREATE TABLE Payment (
	PaymentID		SERIAL primary key,
	PaymentMode		VARCHAR(500) not null,
	Amount 			smallint not null,
	Status			VARCHAR(50) not null,
	PaymentTo		SERIAL not null REFERENCES CareTaker(cid),
	PaymentFrom		SERIAL not null REFERENCES PetOwners(oid)
);

DROP TABLE if exists ChatHistory;
CREATE TABLE ChatHistory (
	MessageID		SERIAL primary key,
	Text 			text,
	User1			SERIAL not null REFERENCES users(id),
	User2			SERIAL not null REFERENCES users(id),
	Attachments		text,
	MessageTimestamp	timestamp not null		
);

CREATE TABLE Bid (
	ServiceStartDate	date not null,
	ServiceEndDate		date not null,
	BidID			SERIAL primary key,
	BidTimestamp	timestamp not null,
	BidAmount		smallint not null,
	PetID 			SERIAL not null REFERENCES Pets(PetID),
	PetOwnerID		SERIAL not null REFERENCES PetOwners(oid),
	CareTakerID		SERIAL not null REFERENCES CareTaker(cid),
	ServiceID		serial not null REFERENCES Services(serviceid),
	bidrequest		text
);

INSERT INTO Bid (Service, ServiceStartDate, ServiceEndDate, BidID, BidTimestamp, BidAmount,PetID,PetOwnerID,CareTakerID,ServiceID,bidrequest) VALUES 
('2019-03-09', '2019-04-17', 479, '2019-02-07 17:10:13', 95, 3699, 640, 204, 26, 'Model line will cell.'),
('2019-03-14', '2019-04-02', 959, '2019-01-30 08:44:56', 38, 2144, 517, 137, 24, 'Attack century sure people.'),
('2019-03-05', '2019-04-13', 462, '2019-01-29 07:12:28', 77, 8142, 843, 203, 39, 'Information consumer memory question.'),
('2019-03-19', '2019-04-26', 531, '2019-02-12 00:31:36', 73, 6824, 105, 320, 5, 'Worker ball near sound today consumer old.'),
('2019-03-09', '2019-04-06', 220, '2019-02-15 17:28:12', 100, 8759, 944, 174, 74, 'War page voice them example visit show anyone.'),
('2019-03-27', '2019-04-16', 793, '2019-02-12 09:34:51', 32, 7092, 502, 668, 73, 'Fund billion skill wonder finally.'),
('2019-03-17', '2019-03-30', 160, '2019-02-08 13:50:17', 25, 8786, 693, 963, 77, 'Game personal soldier attention report yard hot.'),
('2019-03-04', '2019-03-29', 198, '2019-02-06 09:57:35', 8, 7877, 306, 650, 69, 'Democrat protect possible.'),
('2019-03-08', '2019-04-10', 570, '2019-01-29 21:50:55', 17, 1563, 248, 948, 51, 'House increase model central upon light song.'),
('2019-03-27', '2019-04-11', 403, '2019-02-13 21:23:39', 84, 4683, 461, 244, 64, 'Child media return either I.'),
('2019-03-17', '2019-04-01', 419, '2019-02-22 02:34:25', 58, 9240, 240, 230, 14, 'Ground speech wrong event what gas consumer.'),
('2019-03-05', '2019-04-23', 747, '2019-02-14 14:46:15', 44, 3379, 146, 660, 71, 'Edge consider political become few environment conference gas.'),
('2019-03-15', '2019-04-17', 846, '2019-01-31 23:57:43', 45, 1916, 175, 528, 4, 'Discussion claim present citizen left.'),
('2019-02-28', '2019-04-01', 9696, '2019-02-17 16:04:04', 85, 6356, 565, 528, 90, 'But plan unit mention.'),
('2019-03-13', '2019-04-13', 649, '2019-01-28 17:07:05', 69, 5283, 205, 678, 37, 'Tv claim behavior its bad discuss upon.'),
('2019-03-23', '2019-03-31', 183, '2019-02-08 16:10:55', 17, 1793, 583, 786, 44, 'Sport social bring sell avoid series.'),
('2019-02-28', '2019-04-01', 926, '2019-02-26 02:16:24', 67, 7242, 791, 801, 18, 'On increase candidate.'),
('2019-03-09', '2019-03-29', 3629, '2019-02-09 02:12:15', 74, 7943, 368, 993, 3, 'From force moment hit.'),
('2019-03-09', '2019-04-03', 954, '2019-02-21 04:21:45', 28, 7345, 597, 782, 71, 'Phone thing color bill.'),
('2019-03-23', '2019-04-01', 913, '2019-02-16 05:51:03', 67, 6145, 505, 711, 29, 'American community agent first notice politics everything.'),
('2019-03-02', '2019-04-17', 201, '2019-02-11 08:15:28', 58, 5638, 571, 305, 50, 'Game require run off begin reality toward.'),
('2019-03-02', '2019-03-28', 125, '2019-02-07 09:59:17', 2, 2083, 640, 335, 99, 'Whole own beautiful say international provide.'),
('2019-03-26', '2019-04-10', 995, '2019-02-11 17:54:22', 65, 9968, 312, 618, 48, 'Deal garden television that four specific.'),
('2019-03-03', '2019-04-08', 421, '2019-02-08 08:59:26', 2, 1674, 674, 868, 60, 'Hundred agency trouble work.'),
('2019-03-10', '2019-04-25', 3600, '2019-02-23 20:47:03', 81, 3145, 382, 144, 67, 'Tend voice production join discussion class green.'),
('2019-03-14', '2019-04-01', 281, '2019-02-15 19:29:12', 26, 9220, 869, 694, 54, 'Down involve behavior bad gas.'),
('2019-03-19', '2019-04-19', 3602, '2019-02-24 16:58:08', 83, 6439, 917, 101, 50, 'Program assume old outside report.'),
('2019-02-28', '2019-04-03', 674, '2019-02-21 10:07:38', 79, 5172, 971, 814, 44, 'For second consumer game husband go require buy.'),
('2019-03-23', '2019-04-15', 547, '2019-02-15 15:12:50', 58, 9932, 621, 297, 45, 'Pressure shake coach risk teach.'),
('2019-03-25', '2019-04-19', 000, '2019-02-10 07:02:50', 37, 9703, 909, 923, 90, 'Movie movie policy everything.'),
('2019-03-21', '2019-04-21', 478, '2019-01-28 18:57:37', 49, 2590, 358, 235, 40, 'Dream but performance type.'),
('2019-03-12', '2019-04-03', 746, '2019-02-12 09:01:52', 24, 5110, 255, 355, 11, 'Position nor exactly carry but interesting indicate.'),
('2019-03-01', '2019-04-23', 921, '2019-02-10 07:19:01', 58, 3523, 938, 329, 84, 'Win you through speech.'),
('2019-03-08', '2019-04-01', 593, '2019-01-29 11:48:57', 52, 5438, 578, 671, 96, 'Maintain summer cause oil site help soon.'),
('2019-03-12', '2019-03-28', 854, '2019-02-22 23:55:08', 38, 8831, 967, 595, 78, 'Vote onto policy out far.'),
('2019-02-28', '2019-03-31', 494, '2019-02-12 05:08:17', 39, 5011, 944, 808, 58, 'Current magazine deal owner.'),
('2019-03-19', '2019-04-18', 881, '2019-02-05 18:17:35', 37, 6661, 835, 578, 53, 'And cut what top.'),
('2019-03-07', '2019-04-24', 654, '2019-01-30 19:33:15', 93, 5531, 256, 907, 34, 'Travel body evening.'),
('2019-03-25', '2019-04-17', 328, '2019-01-29 11:55:50', 52, 3202, 846, 677, 9, 'Prevent forward who matter play.'),
('2019-03-05', '2019-04-19', 824, '2019-02-23 02:40:00', 30, 3137, 200, 298, 81, 'Tax center large decade within.'),
('2019-03-27', '2019-04-13', 955, '2019-02-24 03:32:38', 57, 1115, 205, 286, 32, 'Him capital agent interesting risk fish heavy him.'),
('2019-03-25', '2019-04-22', 233, '2019-02-17 16:24:38', 83, 7837, 798, 666, 1, 'Always while similar important why fish according figure.'),
('2019-03-21', '2019-04-24', 527, '2019-01-29 17:17:27', 91, 6318, 694, 108, 84, 'Vote travel size example move shoulder.'),
('2019-03-14', '2019-04-05', 833, '2019-02-23 21:39:30', 22, 1668, 297, 317, 37, 'Star edge education perhaps.'),
('2019-02-27', '2019-04-05', 379, '2019-01-31 01:38:29', 68, 1764, 264, 282, 92, 'Production once oil news born.'),
('2019-03-21', '2019-04-13', 635, '2019-02-13 15:27:34', 29, 8225, 274, 759, 4, 'If wall wide ok alone money.'),
('2019-03-10', '2019-04-14', 734, '2019-02-24 23:23:39', 31, 6268, 831, 363, 70, 'Measure behind behavior customer.'),
('2019-03-09', '2019-04-04', 370, '2019-02-14 04:27:36', 71, 8270, 798, 828, 36, 'Special major during.'),
('2019-03-05', '2019-04-16', 920, '2019-02-20 15:33:04', 44, 6191, 190, 908, 51, 'Other federal room per.'),
('2019-03-18', '2019-04-06', 468, '2019-02-09 02:51:08', 12, 1680, 185, 537, 81, 'Another produce leg professor discussion.');

CREATE Table History (
	BookingID		SERIAL primary key,
	BidderID		SERIAL not null REFERENCES CareTaker(cid),
	PetOnwner 		SERIAL not null REFERENCES PetOwners(oid),
	PetID 			SERIAL not null REFERENCES Pets(PetID),
	BookingTimestamp	timestamp not null,
	PaymentID		SERIAL not null REFERENCES Payment(PaymentID),
	serviceid 		serial not null REFERENCES Services(serviceid)
);

DROP TABLE if exists Review;
CREATE TABLE Review (
	ReviewID		SERIAL primary key,
	RevieweeID		SERIAL not null REFERENCES users(id),
	ReviewerID		SERIAL not null REFERENCES users(id),
	BookingID		SERIAL not null REFERENCES History(BookingID),
	Overall			smallint,
	Convenience		smallint,
	Friendliness	smallint
);
