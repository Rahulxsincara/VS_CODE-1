/**
 * Database Demo and Usage Examples
 * Shows how to use the SQL-like database in your application
 */

// Demo function to show database usage
function demoDatabaseUsage() {
  console.log('=== Database Demo ===');
  
  // Initialize the database
  CourseDatabase.init();
  
  // Get all courses
  console.log('All courses:', CourseDatabase.getAllCourses());
  
  // Get first year, first semester courses
  console.log('First Year, First Semester:', 
    CourseDatabase.getCoursesByYearAndSemester(1, 1));
  
  // Get second year, second semester courses
  console.log('Second Year, Second Semester:', 
    CourseDatabase.getCoursesByYearAndSemester(2, 2));
  
  // Add a student
  const student = CourseDatabase.addStudent({
    studentId: 'STU001',
    name: 'John Doe',
    academicYear: 2
  });
  console.log('Added student:', student);
  
  // Retrieve the student
  const retrievedStudent = CourseDatabase.getStudentByStudentId('STU001');
  console.log('Retrieved student:', retrievedStudent);
  
  console.log('=== End Demo ===');
}

// Run demo when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Only run demo in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    demoDatabaseUsage();
  }
});

// Example functions that would be used in your application:

/**
 * Load courses for a specific year and semester into the UI
 * @param {number} year - Academic year (1-4)
 * @param {number} semester - Semester (1-2)
 */
function loadCoursesToUI(year, semester) {
  try {
    const courses = CourseDatabase.getCoursesByYearAndSemester(year, semester);
    
    // Example of how you might use this data in your UI
    console.log(`Loading ${courses.length} courses for Year ${year}, Semester ${semester}`);
    
    // Here you would typically update your HTML with the course data
    // For example:
    // const container = document.getElementById('courses-container');
    // container.innerHTML = courses.map(course => `
    //   <div class="course-card">
    //     <h3>${course.name}</h3>
    //     <p>${course.description}</p>
    //   </div>
    // `).join('');
    
    return courses;
  } catch (error) {
    console.error('Error loading courses:', error);
    return [];
  }
}

/**
 * Search courses by name or code
 * @param {string} searchTerm - Term to search for
 */
function searchCourses(searchTerm) {
  try {
    const allCourses = CourseDatabase.getAllCourses();
    const term = searchTerm.toLowerCase();
    
    const results = allCourses.filter(course => 
      course.name.toLowerCase().includes(term) || 
      course.code.toLowerCase().includes(term)
    );
    
    return results;
  } catch (error) {
    console.error('Error searching courses:', error);
    return [];
  }
}

// Export functions for use in other modules
window.DatabaseDemo = {
  loadCoursesToUI,
  searchCourses
};