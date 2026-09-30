/**
 * Database Utilities
 * Helper functions for database management and debugging
 */

/**
 * Clear all data from the course library database
 */
function clearCourseDatabase() {
  if (confirm('Are you sure you want to clear all database data? This cannot be undone.')) {
    localStorage.removeItem('courseLibrary');
    console.log('Course database cleared');
    return true;
  }
  return false;
}

/**
 * Export database to JSON
 */
function exportCourseDatabase() {
  const db = localStorage.getItem('courseLibrary');
  if (db) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(db);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "course_library_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    console.log('Database exported');
  } else {
    console.log('No database found to export');
  }
}

/**
 * Import database from JSON file
 */
function importCourseDatabase() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    
    reader.onload = readerEvent => {
      const content = readerEvent.target.result;
      try {
        localStorage.setItem('courseLibrary', content);
        console.log('Database imported successfully');
        alert('Database imported successfully. Please refresh the page.');
      } catch (error) {
        console.error('Error importing database:', error);
        alert('Error importing database: ' + error.message);
      }
    };
  };
  
  input.click();
}

/**
 * Display database statistics
 */
function showDatabaseStats() {
  const db = localStorage.getItem('courseLibrary');
  if (db) {
    const parsedDb = JSON.parse(db);
    const stats = {
      tables: Object.keys(parsedDb.tables || {}).length,
      dataSize: db.length,
      courses: parsedDb.data?.courses?.length || 0,
      students: parsedDb.data?.students?.length || 0
    };
    
    console.table(stats);
    return stats;
  }
  return null;
}

/**
 * Debug function to view raw database content
 */
function viewRawDatabase() {
  const db = localStorage.getItem('courseLibrary');
  if (db) {
    console.log('Raw database content:', db);
    return JSON.parse(db);
  }
  console.log('No database found');
  return null;
}

// Export utilities
window.DatabaseUtils = {
  clear: clearCourseDatabase,
  export: exportCourseDatabase,
  import: importCourseDatabase,
  stats: showDatabaseStats,
  viewRaw: viewRawDatabase
};

// Add keyboard shortcut for database utilities (Ctrl+Shift+D)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'D') {
    e.preventDefault();
    console.log('=== Database Utilities ===');
    console.log('DatabaseUtils.clear() - Clear database');
    console.log('DatabaseUtils.export() - Export database');
    console.log('DatabaseUtils.import() - Import database');
    console.log('DatabaseUtils.stats() - Show database stats');
    console.log('DatabaseUtils.viewRaw() - View raw database');
    console.log('==========================');
  }
});