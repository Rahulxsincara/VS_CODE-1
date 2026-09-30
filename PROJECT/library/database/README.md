# Database Documentation

This directory contains the SQL-like database implementation for the educational resource library using localStorage.

## Database Structure

The database consists of three main files:

1. **[db.js](file:///c%3A/Users/rahul/OneDrive/VS_CODE/PROJECT/library/database/db.js)** - Core database manager with SQL-like functionality
2. **[courseDb.js](file:///c%3A/Users/rahul/OneDrive/VS_CODE/PROJECT/library/database/courseDb.js)** - Course-specific database implementation
3. **[demo.js](file:///c%3A/Users/rahul/OneDrive/VS_CODE/PROJECT/library/database/demo.js)** - Usage examples and demo functions
4. **[utils.js](file:///c%3A/Users/rahul/OneDrive/VS_CODE/PROJECT/library/database/utils.js)** - Database utilities for management and debugging

## Database Manager Features

The `DatabaseManager` class provides SQL-like operations:

- `createTable(tableName, columns)` - Create a new table with column definitions
- `insert(tableName, data)` - Insert data into a table
- `select(tableName, options)` - Select data with WHERE, ORDER BY, and LIMIT options
- `update(tableName, data, where)` - Update records matching WHERE conditions
- `delete(tableName, where)` - Delete records matching WHERE conditions
- `dropTable(tableName)` - Remove a table
- `describe(tableName)` - Get table information
- `showTables()` - List all tables

## Course Database Structure

### Courses Table
```javascript
{
  id: INTEGER (Primary Key, Auto Increment)
  name: TEXT (Course name)
  code: TEXT (Course code)
  year: INTEGER (Academic year 1-4)
  semester: INTEGER (Semester 1-2)
  description: TEXT (Course description)
  resources: TEXT (JSON string of resources)
}
```

### Students Table
```javascript
{
  id: INTEGER (Primary Key, Auto Increment)
  studentId: TEXT (Student ID)
  name: TEXT (Student name)
  academicYear: INTEGER (Academic year 1-4)
}
```

## Usage Examples

### Initialize the Database
```javascript
CourseDatabase.init();
```

### Get Courses
```javascript
// Get all courses
const allCourses = CourseDatabase.getAllCourses();

// Get courses for specific year and semester
const year1Sem1Courses = CourseDatabase.getCoursesByYearAndSemester(1, 1);

// Get course by ID
const course = CourseDatabase.getCourseById(1);

// Get course by code
const course = CourseDatabase.getCourseByCode('CLANG');
```

### Student Management
```javascript
// Add a student
const student = CourseDatabase.addStudent({
  studentId: 'STU001',
  name: 'John Doe',
  academicYear: 2
});

// Get student by ID
const student = CourseDatabase.getStudentByStudentId('STU001');
```

## Database Utilities

The `utils.js` file provides additional database management functions:

- `DatabaseUtils.clear()` - Clear all database data (with confirmation)
- `DatabaseUtils.export()` - Export database to JSON file
- `DatabaseUtils.import()` - Import database from JSON file
- `DatabaseUtils.stats()` - Show database statistics
- `DatabaseUtils.viewRaw()` - View raw database content

Keyboard shortcut: Press `Ctrl+Shift+D` to display available utility functions in the console.

## Course Structure

The database is pre-populated with the following course structure:

### First Year
- **Semester 1**: 6 courses (C Language, IoT, Communication, Vedic Math, Discrete Math, Human Value)
- **Semester 2**: 7 courses (DDCA, BEEC, Data Structure, Linear Algebra, Communication, Indian Constitution, SIL)

### Second Year
- **Semester 1**: 9 courses (DBMS, CN, FE, OOPS, AIML, DA, PC, MO, JL)
- **Semester 2**: 2 courses (OS, PROB)

## Integration

The database scripts are automatically included in:
- [index.html](file:///c%3A/Users/rahul/OneDrive/VS_CODE/PROJECT/library/index.html)
- [login.html](file:///c%3A/Users/rahul/OneDrive/VS_CODE/PROJECT/library/login.html)
- [register.html](file:///c%3A/Users/rahul/OneDrive/VS_CODE/PROJECT/library/register.html)

To use the database in your JavaScript files, simply reference the global `CourseDatabase` object.