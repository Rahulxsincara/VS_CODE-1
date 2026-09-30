-- Create CUSTOMER table
CREATE TABLE customer (
    cust_id INT PRIMARY KEY,
    cust_name VARCHAR(50),
    dob DATE,
    city VARCHAR(50),
    street VARCHAR(100),
    state VARCHAR(50),
    pincode VARCHAR(10),
    ph_no VARCHAR(15),
    deal_no INT,
    photo_identity CHAR(1),
    v_id INT
);

-- Create VEHICLE table
CREATE TABLE vehicle (
    veh_id INT PRIMARY KEY,
    veh_type VARCHAR(20),
    veh_name VARCHAR(50),
    veh_number VARCHAR(20)
);

-- Create EDU_BUS table
CREATE TABLE edu_bus (
    edu_id INT PRIMARY KEY,
    edu_name VARCHAR(50),
    ph_no VARCHAR(15),
    city VARCHAR(50),
    street VARCHAR(100),
    state VARCHAR(50),
    pincode VARCHAR(10),
    deal_no INT
);

-- Create DEALER table
CREATE TABLE dealer (
    deal_id INT PRIMARY KEY,
    deal_name VARCHAR(50),
    city VARCHAR(50),
    street VARCHAR(100),
    state VARCHAR(50),
    pincode VARCHAR(10),
    d_no VARCHAR(10),
    ph_int VARCHAR(15)
);

-- Create BRANCH table
CREATE TABLE branch (
    branch_id INT PRIMARY KEY,
    b_name VARCHAR(50),
    state VARCHAR(50),
    city VARCHAR(50),
    pincode VARCHAR(10),
    street VARCHAR(100),
    d_no VARCHAR(10),
    phno1 VARCHAR(15),
    phno2 VARCHAR(15),
    c_id INT,
    v_id INT,
    e_id INT
);

-- Create RENEWAL table
CREATE TABLE renewal (
    branch_id INT,
    c_id INT,
    check_license_period INT,
    PRIMARY KEY (branch_id, c_id)
);

-- Create REGISTRATION table
CREATE TABLE registration (
    cust_id INT,
    veh_id INT,
    deal_id INT,
    date DATE,
    PRIMARY KEY (cust_id, veh_id)
);

-- Create CONTRACT_PERMISSION table
CREATE TABLE contract_permission (
    veh_id INT,
    branch_id INT,
    no_of_days INT,
    amount_per_seat DECIMAL(10,2),
    PRIMARY KEY (veh_id, branch_id)
);



-- Insert into CUSTOMER table
INSERT INTO customer VALUES
(41, 'raju', '1996-09-13', 'Gurtur', 'Rangopal', 'Ardhta_gradeeh', '5000213', '9123456789', 10, 'y', 3),
(42, 'hari', '2016-06-19', 'Perambur', 'Mrlapur', 'Tamil Nadu', '500211', '1122334455', 20, 'n', 2),
(43, 'giri', '1995-01-20', 'Hyderabad', 'smagar', 'Telangana', '500079', '8877665544', 30, 'y', 4),
(44, 'ramu', '1996-07-17', 'Vijarawada', 'beru c/cld', 'Ardhta_gradeeh', '512345', '7654564321', 40, 'y', 5),
(45, 'rabul', '1995-12-08', 'gurtur', 'rajunagar', 'Ardhta_gradeeh', '523022', '9999999988', 50, 'y', 7),
(46, 'gopi', '1979-08-13', 'Hyderabad', 'gachbowl', 'Telangana', '567089', '778777775', 10, 'n', 1),
(47, 'karihik', '2004-01-15', 'gurtur', 'chandram', 'Ardhta_gradeeh', '546789', '7788776633', 20, 'n', 6),
(48, 'goppi', '2000-12-06', 'Hyderabad', 'amcerpet', 'Telangana', '500023', '674556345', 30, 'y', 8),
(49, 'dineeh', '2001-12-10', 'Hyderabad', 'kondapur', 'Telangana', '502033', '6794537212', 30, 'n', 10),
(50, 'sureeh', '2025-03-25', 'Vijarawada', 'poranki', '', '512022', '7896543233', 20, 'y', 9);

-- Insert into VEHICLE table
INSERT INTO vehicle VALUES
(1, '2_wheeler', 'royal_enfield', 'AP1234'),
(2, '3_wheeler', 'auto', 'AP3421'),
(3, '2_wheeler', 'royal_enfield', 'TS213'),
(4, '4_wheeler', 'flat', 'AP2346'),
(5, '4_wheeler', 'benz', 'TS1256'),
(6, '3_wheeler', 'auto', 'TNS544'),
(7, '2_wheeler', 'splendor', 'AP3214'),
(8, '2_wheeler', 'bojoj', 'AP7895'),
(9, '2_wheeler', 'royal_enfield', 'AP2134'),
(10, '4_wheeler', 'ambassador', 'TS4507');

-- Insert into EDU_BUS table
INSERT INTO edu_bus VALUES
(31, 'dps', '1122334455', 'Hyderbad', 'santhnagar', 'Telangana', '512345', 444),
(32, 'klu', '44556677', 'guntur', 'vaddeswaram', 'Andhra Pradesh', '567432', 111),
(33, 'dav', '123456789', 'Hyderbad', 'jubilee hills', 'Telangana', '500897', 333),
(34, 'surya', '4356789321', 'Hyderbad', 'bachupally', 'Telangana', '512098', 111),
(35, 'vit', '7788996578', 'Hyderbad', 'kukatpally', 'Telangana', '523087', 222),
(36, 'rvrrjc', '2233445566', 'Guntur', 'guntur', 'Andhra Pradesh', '512087', 222),
(37, 'vrr', '1122334455', 'Hyderbad', 'miyapur', 'Telangana', '512345', 333),
(38, 'kh', '3445996578', 'Hyderbad', 'azimagar', 'Telangana', '512345', 222),
(39, 'bvrit', '112566725', 'Hyderbad', 'nizampet', 'Telangana', '512345', 111),
(40, 'cbit', '1122965785', 'Hyderbad', 'gandipet', 'Telangana', '512345', 111);

-- Insert into DEALER table
INSERT INTO dealer VALUES
(51, 'raju', 'guntur', 'Raju Nagar', 'Andhra Pradesh', '512345', '555', '9988776655'),
(52, 'raghu', 'hyderabad', 'kutatpally', 'Telengana', '578890', '666', '8765489765'),
(53, 'kiran', 'hyderabad', 'bachupally', 'Telengana', '545789', '777', '7654564556'),
(54, 'ganesh', 'hyderabad', 'kondapur', 'Telengana', '455789', '111', '874648545'),
(55, 'hari', 'hyderabad', 'ammerpet', 'Telengana', '534467', '222', '9988776655'),
(56, 'kiran', 'hyderabad', 'santhanagar', 'Telengana', '512334', '333', '9988776655'),
(57, 'kamal', 'hyderabad', 'miyapur', 'Telengana', '504406', '444', '9988776655'),
(58, 'eswar', 'guntur', 'mangalagiri', 'Andhra Pradesh', '553456', '888', '9988776655');

-- Insert into BRANCH table
INSERT INTO branch VALUES
(210, 'gangbpt', 'Telangana', 'Hydertad', '512345', 'mu', '59', '9848022388', '8802233811', 41, 1, 31),
(211, 'madhpur', 'Telangana', 'Hydertad', '512345', 'gachibowi', '52', '9848022444', '8802234433', 43, 2, 32),
(212, 'wadekwaram', 'Andhra gradesh', 'Guntur', '567432', 'kondapur', '51', '8802233311', '8848022311', 41, 1, 31),
(213, 'jubilee hills', 'Telangana', 'Hydertad', '500897', 'amerupta', '53', '8802234433', '9848065722', 43, 2, 32),
(214, 'bachupally', 'Telangana', 'Hydertad', '512098', 'erragada', '55', '9848022311', '8065722322', 41, 1, 31),
(215, 'kutatpally', 'Telangana', 'Hydertad', '522087', 'orbis', '52', '9848065722', '8065722311', 43, 2, 32),
(216, 'guntur', 'Andhra gradesh', 'Guntur', '512087', 'rowers', '54', '8880657722', '9848022338', 41, 1, 31),
(217, 'miyapur', 'Telangana', 'Hydertad', '512345', 'blaskar nagar', '55', '8806572233', '9848022338', 41, 1, 31),
(218, 'anirnagar', 'Telangana', 'Hydertad', '512345', 'njunagar', '56', '8006572232', '9848022344', 43, 2, 32),
(219, 'nirampet', 'Telangana', 'Hydertad', '512345', 'kthip', '52', '8006572231', '9848022338', 41, 1, 31);

-- Insert into RENEWAL table
INSERT INTO renewal VALUES
(210, 41, 4),
(210, 42, 6),
(213, 44, 4),
(211, 45, 9),
(211, 46, 10),
(215, 47, 4),
(216, 48, 6),
(217, 49, 7),
(217, 50, 8);

-- Insert into REGISTRATION table
INSERT INTO registration VALUES
(41, 3, 55, '2014-04-04'),
(42, 2, 54, '2016-09-02'),
(43, 4, 55, '2015-12-03'),
(44, 5, 52, '2016-09-29'),
(45, 7, 55, '2013-11-18'),
(46, 1, 51, '2014-10-06'),
(47, 6, 52, '2011-07-11'),
(48, 8, 52, '2015-06-12'),
(49, 10, 53, '2014-03-02'),
(50, 9, 53, '2015-10-11');

-- Insert into CONTRACT_PERMISSION table
INSERT INTO contract_permission VALUES
(4, 210, 15, 200.00),
(5, 210, 43, 100.00),
(10, 212, 15, 400.00);




-- View all data from each table
SELECT * FROM customer;
SELECT * FROM vehicle;
SELECT * FROM edu_bus;
SELECT * FROM dealer;
SELECT * FROM branch;
SELECT * FROM renewal;
SELECT * FROM registration;
SELECT * FROM contract_permission;

-- Count records in each table
SELECT 'customer' as table_name, COUNT(*) as record_count FROM customer
UNION ALL SELECT 'vehicle', COUNT(*) FROM vehicle
UNION ALL SELECT 'edu_bus', COUNT(*) FROM edu_bus
UNION ALL SELECT 'dealer', COUNT(*) FROM dealer
UNION ALL SELECT 'branch', COUNT(*) FROM branch
UNION ALL SELECT 'renewal', COUNT(*) FROM renewal
UNION ALL SELECT 'registration', COUNT(*) FROM registration
UNION ALL SELECT 'contract_permission', COUNT(*) FROM contract_permission;


SELECT v.veh_id, v.veh_type, v.veh_name, v.veh_number, r.date
FROM registration r
INNER JOIN vehicle v ON r.veh_id = v.veh_id
INNER JOIN dealer d ON r.deal_id = d.deal_id
WHERE d.deal_name = 'raghu';

SELECT DISTINCT c.cust_id, c.cust_name, c.city, c.state
FROM customer c
INNER JOIN registration r ON c.cust_id = r.cust_id
WHERE r.date IS NOT NULL;

SELECT v.veh_id, v.veh_type, v.veh_name, cp.no_of_days, cp.amount_per_seat
FROM vehicle v
INNER JOIN contract_permission cp ON v.veh_id = cp.veh_id
WHERE cp.no_of_days = 30;

SELECT c.cust_id, c.cust_name, r.branch_id, b.b_name, r.check_license_period
FROM renewal r
INNER JOIN customer c ON r.c_id = c.cust_id
INNER JOIN branch b ON r.branch_id = b.branch_id;

SELECT veh_type, COUNT(*) as vehicle_count
FROM vehicle
GROUP BY veh_type
ORDER BY vehicle_count DESC;

SELECT c.cust_id, c.cust_name, c.dob, c.city, c.state, v.veh_name, v.veh_number
FROM customer c
INNER JOIN vehicle v ON c.v_id = v.veh_id
WHERE v.veh_type = '2_wheeler';


SELECT c.cust_id, c.cust_name, r.check_license_period
FROM customer c
INNER JOIN renewal r ON c.cust_id = r.c_id
WHERE r.check_license_period <= 5;

SELECT e.edu_id, e.edu_name, e.city, e.state, b.b_name as branch_name
FROM edu_bus e
INNER JOIN branch b ON e.edu_id = b.e_id;

SELECT b.branch_id, b.b_name, COUNT(DISTINCT r.c_id) as customers_served
FROM branch b
LEFT JOIN renewal r ON b.branch_id = r.branch_id
GROUP BY b.branch_id, b.b_name
ORDER BY customers_served DESC;

SELECT d.deal_id, d.deal_name, COUNT(r.cust_id) as customer_count
FROM dealer d
LEFT JOIN registration r ON d.deal_id = r.deal_id
GROUP BY d.deal_id, d.deal_name
ORDER BY customer_count DESC;