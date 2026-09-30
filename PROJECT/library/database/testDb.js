/**
 * Database Test Script
 * Simple test to verify database functionality
 */

// Test the database implementation
function testDatabase() {
  console.log('=== Database Test Started ===');
  
  try {
    // Create a new database manager
    const db = new DatabaseManager('testDb');
    
    // Create a test table
    db.createTable('testTable', [
      { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'TEXT', notNull: true },
      { name: 'value', type: 'TEXT' }
    ]);
    
    console.log('✓ Table created successfully');
    
    // Insert test data
    const record1 = db.insert('testTable', { name: 'Test Record 1', value: 'Value 1' });
    const record2 = db.insert('testTable', { name: 'Test Record 2', value: 'Value 2' });
    const record3 = db.insert('testTable', { name: 'Test Record 3', value: 'Value 3' });
    
    console.log('✓ Data inserted successfully');
    console.log('  Inserted records:', record1, record2, record3);
    
    // Select all data
    const allRecords = db.select('testTable');
    console.log('✓ All records retrieved:', allRecords);
    
    // Select with where clause
    const filteredRecords = db.select('testTable', { where: { name: 'Test Record 2' } });
    console.log('✓ Filtered records:', filteredRecords);
    
    // Update records
    const updatedCount = db.update('testTable', { value: 'Updated Value' }, { name: 'Test Record 2' });
    console.log('✓ Records updated:', updatedCount);
    
    // Delete records
    const deletedCount = db.delete('testTable', { name: 'Test Record 3' });
    console.log('✓ Records deleted:', deletedCount);
    
    // Final select to verify changes
    const finalRecords = db.select('testTable');
    console.log('✓ Final records:', finalRecords);
    
    // Test CourseDatabase
    console.log('\n=== Course Database Test ===');
    CourseDatabase.init();
    console.log('✓ Course database initialized');
    
    const allCourses = CourseDatabase.getAllCourses();
    console.log('✓ Total courses:', allCourses.length);
    
    const year1Sem1Courses = CourseDatabase.getCoursesByYearAndSemester(1, 1);
    console.log('✓ Year 1 Sem 1 courses:', year1Sem1Courses.length);
    
    const year2Sem2Courses = CourseDatabase.getCoursesByYearAndSemester(2, 2);
    console.log('✓ Year 2 Sem 2 courses:', year2Sem2Courses.length);
    
    // Test student functionality
    const student = CourseDatabase.addStudent({
      studentId: 'TEST001',
      name: 'Test Student',
      academicYear: 2
    });
    console.log('✓ Student added:', student);
    
    const retrievedStudent = CourseDatabase.getStudentByStudentId('TEST001');
    console.log('✓ Student retrieved:', retrievedStudent);
    
    console.log('\n=== Database Test Completed Successfully ===');
    return true;
  } catch (error) {
    console.error('✗ Database Test Failed:', error);
    return false;
  }
}

// Run the test
document.addEventListener('DOMContentLoaded', () => {
  // Only run test in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    testDatabase();
  }
});