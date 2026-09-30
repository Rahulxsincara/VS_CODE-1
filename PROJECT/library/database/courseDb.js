/**
 * Course Database Implementation
 * Specific database structure for the educational resource library
 */

// Initialize the course database
const courseDb = new DatabaseManager('courseLibrary');

// Create tables for courses based on the required structure
function initializeCourseDatabase() {
  // Check if tables already exist
  const tables = courseDb.showTables();
  
  // Create courses table if it doesn't exist
  if (!tables.includes('courses')) {
    courseDb.createTable('courses', [
      { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'TEXT', notNull: true },
      { name: 'code', type: 'TEXT', notNull: true },
      { name: 'year', type: 'INTEGER', notNull: true },
      { name: 'semester', type: 'INTEGER', notNull: true },
      { name: 'description', type: 'TEXT' },
      { name: 'resources', type: 'TEXT' } // JSON string of resources
    ]);
  }
  
  // Create students table for authentication data
  if (!tables.includes('students')) {
    courseDb.createTable('students', [
      { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
      { name: 'studentId', type: 'TEXT', notNull: true },
      { name: 'name', type: 'TEXT', notNull: true },
      { name: 'academicYear', type: 'INTEGER', notNull: true }
    ]);
  }
  
  console.log('Course database initialized');
}

// Populate database with required course structure
function populateCourseData() {
  // Clear existing data to avoid duplicates
  try {
    courseDb.delete('courses', {});
  } catch (e) {
    // Table might not exist yet
    console.log('Creating courses table...');
  }
  
  // First Year Semester 1 (6 courses)
  const firstYearSem1 = [
    { name: 'C Language', code: 'CLANG', year: 1, semester: 1, description: 'Fundamentals of C programming language' },
    { name: 'Internet of Things', code: 'IOT', year: 1, semester: 1, description: 'Introduction to IoT concepts and applications' },
    { name: 'Communication', code: 'COMM1', year: 1, semester: 1, description: 'Basic communication skills' },
    { name: 'Vedic Math', code: 'VMATH', year: 1, semester: 1, description: 'Ancient Indian mathematical techniques' },
    { name: 'Discrete Math', code: 'DMATH', year: 1, semester: 1, description: 'Mathematical structures discrete rather than continuous' },
    { name: 'Human Value', code: 'HVALUE', year: 1, semester: 1, description: 'Ethics and human values education' }
  ];
  
  // First Year Semester 2 (7 courses)
  const firstYearSem2 = [
    { name: 'Digital Design and Computer Architecture', code: 'DDCA', year: 1, semester: 2, description: 'Digital logic and computer architecture fundamentals' },
    { name: 'Basic Electrical and Electronic Circuits', code: 'BEEC', year: 1, semester: 2, description: 'Basic electrical and electronic circuit analysis' },
    { name: 'Data Structure', code: 'DS', year: 1, semester: 2, description: 'Data organization and management techniques' },
    { name: 'Linear Algebra', code: 'LINALG', year: 1, semester: 2, description: 'Vector spaces and linear transformations' },
    { name: 'Communication', code: 'COMM2', year: 1, semester: 2, description: 'Advanced communication skills' },
    { name: 'Indian Constitution', code: 'ICONST', year: 1, semester: 2, description: 'Study of Indian constitutional framework' },
    { name: 'SIL', code: 'SIL', year: 1, semester: 2, description: 'Service and Inclusive Leadership' }
  ];
  
  // Second Year Semester 1 (9 courses)
  const secondYearSem1 = [
    { 
      name: 'Database Management Systems', 
      code: 'DBMS', 
      year: 2, 
      semester: 1, 
      description: 'Database design and management systems',
      resources: JSON.stringify([
        { name: '24AD2103-DBMS-workbook.pdf', path: 'files/2nd Y/1st sem/DBMS/24AD2103-DBMS-workbook.pdf' },
        { name: '24AD2103-HANDOUT.pdf', path: 'files/2nd Y/1st sem/DBMS/24AD2103-HANDOUT.pdf' },
        { name: 'CO-1--01 rar.rar', path: 'files/2nd Y/1st sem/DBMS/CO-1--01 rar.rar' },
        { name: 'CO-1-PPTS-part-2.rar', path: 'files/2nd Y/1st sem/DBMS/CO-1-PPTS-part-2.rar' },
        { name: 'CO-2-part-2.rar', path: 'files/2nd Y/1st sem/DBMS/CO-2-part-2.rar' },
        { name: 'CO-4 all ppt.pptx', path: 'files/2nd Y/1st sem/DBMS/CO-4 all ppt.pptx' },
        { name: 'CO2-Session-10.pptx', path: 'files/2nd Y/1st sem/DBMS/CO2-Session-10.pptx' },
        { name: 'CO2-Session-7.pptx', path: 'files/2nd Y/1st sem/DBMS/CO2-Session-7.pptx' },
        { name: 'CO2-Session-8.pptx', path: 'files/2nd Y/1st sem/DBMS/CO2-Session-8.pptx' },
        { name: 'CO3-Session-01.pptx', path: 'files/2nd Y/1st sem/DBMS/CO3-Session-01.pptx' },
        { name: 'CO3-Session-04.pptx', path: 'files/2nd Y/1st sem/DBMS/CO3-Session-04.pptx' },
        { name: 'CO4-Session-21.pptx', path: 'files/2nd Y/1st sem/DBMS/CO4-Session-21.pptx' },
        { name: 'CO4-Session-25.pptx', path: 'files/2nd Y/1st sem/DBMS/CO4-Session-25.pptx' },
        { name: 'ER Diagram folder', path: 'files/2nd Y/1st sem/DBMS/ER Diagram/' },
        { name: 'SQL_CODES folder', path: 'files/2nd Y/1st sem/DBMS/SQL_CODES/' }
      ])
    },
    { 
      name: 'Computer Network', 
      code: 'CN', 
      year: 2, 
      semester: 1, 
      description: 'Computer networking fundamentals',
      resources: JSON.stringify([
        { name: '10_Error Dectection   Correction.pptx', path: 'files/2nd Y/1st sem/CN/10_Error Dectection   Correction.pptx' },
        { name: '11,12  13_DLL Protocols.pptx', path: 'files/2nd Y/1st sem/CN/11,12  13_DLL Protocols.pptx' },
        { name: '13.pptx', path: 'files/2nd Y/1st sem/CN/13.pptx' },
        { name: '14.pptx', path: 'files/2nd Y/1st sem/CN/14.pptx' },
        { name: '15.pptx', path: 'files/2nd Y/1st sem/CN/15.pptx' },
        { name: '16.pptx', path: 'files/2nd Y/1st sem/CN/16.pptx' },
        { name: '17.pptx', path: 'files/2nd Y/1st sem/CN/17.pptx' },
        { name: '18.pptx', path: 'files/2nd Y/1st sem/CN/18.pptx' },
        { name: '19.pptx', path: 'files/2nd Y/1st sem/CN/19.pptx' },
        { name: '3_Network Hardware (1).pptx', path: 'files/2nd Y/1st sem/CN/3_Network Hardware (1).pptx' },
        { name: '3_Network Hardware.pptx', path: 'files/2nd Y/1st sem/CN/3_Network Hardware.pptx' },
        { name: '4.pptx', path: 'files/2nd Y/1st sem/CN/4.pptx' },
        { name: '5.pptx', path: 'files/2nd Y/1st sem/CN/5.pptx' },
        { name: '6.pptx', path: 'files/2nd Y/1st sem/CN/6.pptx' },
        { name: '7_Encoding Techniques.pptx', path: 'files/2nd Y/1st sem/CN/7_Encoding Techniques.pptx' },
        { name: '8.pptx', path: 'files/2nd Y/1st sem/CN/8.pptx' },
        { name: '9_Error Dectection   Correction.pptx', path: 'files/2nd Y/1st sem/CN/9_Error Dectection   Correction.pptx' },
        { name: 'WORK BOOK 24CS2202_Final (1).pdf', path: 'files/2nd Y/1st sem/CN/WORK BOOK 24CS2202_Final (1).pdf' },
        { name: 'download.pdf', path: 'files/2nd Y/1st sem/CN/download.pdf' },
        { name: '~$13.pptx', path: 'files/2nd Y/1st sem/CN/~$13.pptx' }
      ])
    },
    { 
      name: 'Front End', 
      code: 'FE', 
      year: 2, 
      semester: 1, 
      description: 'Front-end web development technologies'
      // No resources added yet
    },
    { 
      name: 'Object Oriented Programming using Java', 
      code: 'OOPS', 
      year: 2, 
      semester: 1, 
      description: 'Object-oriented programming concepts with Java',
      resources: JSON.stringify([
        { name: 'download.pdf', path: 'files/2nd Y/1st sem/OOPS/download.pdf' }
      ])
    },
    { 
      name: 'Artificial Intelligence and Machine Learning', 
      code: 'AIML', 
      year: 2, 
      semester: 1, 
      description: 'Introduction to AI and ML algorithms',
      resources: JSON.stringify([
        { name: 'AI-ML.pptx', path: 'files/2nd Y/1st sem/AIML/AI-ML.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S- 3.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S- 3.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-1.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-1.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-11.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-11.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-12.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-12.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-5.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-5.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-6.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-6.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-7.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-7.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-8.pdf', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-8.pdf' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/S-9,10 CSP.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/S-9,10 CSP.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/s-2.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/s-2.pptx' },
        { name: 'CO-1 PPTs-20250913/CO-1 PPTs/s-4.pptx', path: 'files/2nd Y/1st sem/AIML/CO-1 PPTs-20250913/CO-1 PPTs/s-4.pptx' },
        { name: 'CO-2 PPTs-20250927/S-13.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-13.pptx' },
        { name: 'CO-2 PPTs-20250927/S-14.PPTX', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-14.PPTX' },
        { name: 'CO-2 PPTs-20250927/S-15.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-15.pptx' },
        { name: 'CO-2 PPTs-20250927/S-16.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-16.pptx' },
        { name: 'CO-2 PPTs-20250927/S-17.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-17.pptx' },
        { name: 'CO-2 PPTs-20250927/S-18.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-18.pptx' },
        { name: 'CO-2 PPTs-20250927/S-19.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-19.pptx' },
        { name: 'CO-2 PPTs-20250927/S-20.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-20.pptx' },
        { name: 'CO-2 PPTs-20250927/S-21.pptx', path: 'files/2nd Y/1st sem/AIML/CO-2 PPTs-20250927/S-21.pptx' },
        { name: 'CO3 PPTS/AIML S-25.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/AIML S-25.pptx' },
        { name: 'CO3 PPTS/AIML S-31.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/AIML S-31.pptx' },
        { name: 'CO3 PPTS/AIML SESSION 26.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/AIML SESSION 26.pptx' },
        { name: 'CO3 PPTS/AIML Session 22.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/AIML Session 22.pptx' },
        { name: 'CO3 PPTS/AIML Session 23.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/AIML Session 23.pptx' },
        { name: 'CO3 PPTS/AIML_Session33_PPT.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/AIML_Session33_PPT.pptx' },
        { name: 'CO3 PPTS/S 27& 28.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/S 27& 28.pptx' },
        { name: 'CO3 PPTS/S-29,30.pptx', path: 'files/2nd Y/1st sem/AIML/CO3 PPTS/S-29,30.pptx' },
        { name: 'download.pdf', path: 'files/2nd Y/1st sem/AIML/download.pdf' }
      ])
    },
    { 
      name: 'Data Analytics', 
      code: 'DA', 
      year: 2, 
      semester: 1, 
      description: 'Data analysis and visualization techniques'
      // No resources added yet
    },
    { 
      name: 'Processor and Controller', 
      code: 'PC', 
      year: 2, 
      semester: 1, 
      description: 'Microprocessors and microcontrollers'
      // No resources added yet
    },
    { 
      name: 'Mathematical Optimization', 
      code: 'MO', 
      year: 2, 
      semester: 1, 
      description: 'Optimization techniques in mathematics',
      resources: JSON.stringify([
        { name: 'Co1-Co2-ppt\'s folder', path: 'files/2nd Y/1st sem/M_O/Co1-Co2-ppt\'s/' },
        { name: 'HANDOUT.pdf', path: 'files/2nd Y/1st sem/M_O/HANDOUT.pdf' },
        { name: 'MO_Home Assignment-13-08-2025.doc', path: 'files/2nd Y/1st sem/M_O/MO_Home Assignment-13-08-2025.doc' },
        { name: 'co3.zip', path: 'files/2nd Y/1st sem/M_O/co3.zip' },
        { name: 'download.pdf', path: 'files/2nd Y/1st sem/M_O/download.pdf' }
      ])
    },
    { 
      name: 'Japanese Language', 
      code: 'JL', 
      year: 2, 
      semester: 1, 
      description: 'Japanese language basics'
      // No resources added yet
    }
  ];
  
  // Second Year Semester 2 (2 courses)
  const secondYearSem2 = [
    { name: 'Operating System', code: 'OS', year: 2, semester: 2, description: 'Operating system concepts and design' },
    { name: 'Probability', code: 'PROB', year: 2, semester: 2, description: 'Probability theory and applications' }
  ];
  
  // Insert all courses
  [...firstYearSem1, ...firstYearSem2, ...secondYearSem1, ...secondYearSem2].forEach(course => {
    try {
      courseDb.insert('courses', course);
    } catch (e) {
      console.log(`Error inserting course ${course.name}:`, e.message);
    }
  });
  
  console.log('Course data populated successfully');
}

// Course database utility functions
const CourseDatabase = {
  // Get all courses
  getAllCourses: () => {
    return courseDb.select('courses');
  },
  
  // Get courses by year and semester
  getCoursesByYearAndSemester: (year, semester) => {
    return courseDb.select('courses', {
      where: { year: year, semester: semester }
    });
  },
  
  // Get course by ID
  getCourseById: (id) => {
    const results = courseDb.select('courses', {
      where: { id: id }
    });
    return results.length > 0 ? results[0] : null;
  },
  
  // Get course by code
  getCourseByCode: (code) => {
    const results = courseDb.select('courses', {
      where: { code: code }
    });
    return results.length > 0 ? results[0] : null;
  },
  
  // Get resources for a course by course code
  getCourseResources: (courseCode) => {
    const course = CourseDatabase.getCourseByCode(courseCode);
    if (course && course.resources) {
      try {
        return JSON.parse(course.resources);
      } catch (e) {
        console.error('Error parsing course resources:', e);
        return [];
      }
    }
    return [];
  },
  
  // Add a student
  addStudent: (studentData) => {
    return courseDb.insert('students', studentData);
  },
  
  // Get student by studentId
  getStudentByStudentId: (studentId) => {
    const results = courseDb.select('students', {
      where: { studentId: studentId }
    });
    return results.length > 0 ? results[0] : null;
  },
  
  // Initialize the database
  init: () => {
    initializeCourseDatabase();
    populateCourseData();
  }
};

// Initialize when the script loads
document.addEventListener('DOMContentLoaded', () => {
  CourseDatabase.init();
});

// Export for use in other modules
window.CourseDatabase = CourseDatabase;