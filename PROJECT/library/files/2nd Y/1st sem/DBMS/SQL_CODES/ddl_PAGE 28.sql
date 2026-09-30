-- CUSTOMER table
CREATE TABLE CUSTOMER(
    CID INTEGER PRIMARY KEY,
    PID INTEGER,
	RENTAL_DATE DATE,
	RENTAL_PERIOD INTEGER
);

-- ARTIST table
CREATE TABLE ARTIST(
    AID INTEGER PRIMARY KEY,
    NAME VARCHAR(50),
    ADDRESS VARCHAR(50),
    PHONE BIGINT
);

-- PAINTING table
CREATE TABLE PAINTING(
	CID INTEGER,
    CNAME   VARCHAR(20) PRIMARY KEY,
	ADDRESS VARCHAR(20),
	PHONE BIGINT,
    CATEGORY VARCHAR(20) 
);

-- OWNER table
	CREATE TABLE OWNER(
    PID INT PRIMARY KEY,      -- Primary Key
    OID INT,                  -- Owner ID
    NAME VARCHAR(50),         -- Owner Name
    ADDRESS VARCHAR(50),
    PHONE VARCHAR(15)
	);
 

-- RENT table
	CREATE TABLE RENT(
    PID INTEGER PRIMARY KEY, 
    AID INTEGER,
    RENTAL_COST VARCHAR(20),
    TYPE VARCHAR(20),
    FOREIGN KEY (AID) REFERENCES ARTIST(AID)
);
	


SELECT *FROM  CUSTOMER;
SELECT *FROM  ARTIST;
SELECT *FROM  PAINTING;
SELECT *FROM  OWNER;
SELECT *FROM  RENT;

INSERT INTO CUSTOMER(CID ,PID,RENTAL_DATE,RENTAL_PERIOD) VALUES
(104, 300, '2020-06-10', 6),
(105, 302, '2020-07-05', 10),
(108, 304, '2020-07-15', 3),
(109, 305, '2020-06-25', 6);

INSERT INTO ARTIST ( AID,
 NAME,
ADDRESS,
 PHONE
)VALUES
(200, 'John', 'Delhi', '7786549803'),
(201, 'Samuel', 'Mumbai', '7123458790'),
(202, 'Samson', 'Lucknow', '9460367777'),
(203, 'David', 'Hyderabad', '9797276764'),
(204, 'Raghu', 'Hyderabad', '8134185751'),
(205, 'Ravi', 'Mumbai', '7471094738'),
(206, 'Kiran', 'Delhi', '9808003725');

INSERT INTO PAINTING( CID,
CNAME,
ADDRESS,
PHONE,
CATEGORY
)VALUES
(100, 'Raju', 'Hyderabad', '9876045789', 'Bronze'),
(101, 'Hari', 'Vijayawada', '8877678956', 'Gold'),
(102, 'Devi', 'Guntur', '7879312123', 'Silver'),
(103, 'Rani', 'Delhi', '8780945290', 'Platinum'),
(104, 'Jaya', 'Mumbai', '9612578457', 'Gold'),
(105, 'Haritha', 'Kolkata', '9611665513', 'Silver'),
(106, 'Kalyan', 'Vijayawada', '9610752569', 'Bronze'),
(107, 'Roja', 'Hyderabad', '9609839625', 'Platinum'),
(108, 'Amar', 'Vijayawada', '9608926681', 'Gold'),
(109, 'Padma', 'Vijayawada', '9608013737', 'Bronze');


 INSERT INTO OWNER( PID,
 OID,
NAME,
ADDRESS,
PHONE
)VALUES
(300, 500, 'Raju', 'Hyderabad', '9460367777'),
(301, 500, 'Hari', 'Vijayawada', '8134185751'),
(302, 501, 'Giri', 'Hyderabad', '7808003725'),
(303, 501, 'Gopi', 'Delhi', '9481821699'),
(304, 503, 'Krishna', 'Mumbai', '7155639673'),
(305, 502, 'Verma', 'Delhi', '8829457647'),
(306, 502, 'Guna', 'Delhi', '7503275621');

INSERT INTO Rent (Pid, Aid, Rental_Cost, Type) VALUES
(300, 201, 4500.00, 'Hired'),
(301, 202, 3500.00, 'Not Hired'),
(302, 203, 7500.00, 'Hired'),
(303, 205, 2500.00, 'Not Hired'),
(304, 202, 10000.00, 'Not Hired'),
(305, 201, 8000.00, 'Not Hired'),
(306, 203, 6500.00, 'Not Hired');


