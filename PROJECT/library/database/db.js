/**
 * SQL-like Database Manager for localStorage
 * Provides SQL-like interface for client-side data storage
 */

class DatabaseManager {
  constructor(dbName) {
    this.dbName = dbName;
    this.tables = {};
    this.init();
  }

  /**
   * Initialize the database
   */
  init() {
    const db = this.getDatabase();
    if (!db) {
      this.saveDatabase({ tables: {}, data: {} });
    }
  }

  /**
   * Get database from localStorage
   */
  getDatabase() {
    const db = localStorage.getItem(this.dbName);
    return db ? JSON.parse(db) : null;
  }

  /**
   * Save database to localStorage
   */
  saveDatabase(db) {
    localStorage.setItem(this.dbName, JSON.stringify(db));
  }

  /**
   * Create a new table
   * @param {string} tableName - Name of the table
   * @param {Array} columns - Array of column definitions
   */
  createTable(tableName, columns) {
    const db = this.getDatabase();
    
    if (!db.tables) {
      db.tables = {};
    }
    
    if (!db.data) {
      db.data = {};
    }
    
    // Define table structure
    db.tables[tableName] = {
      columns: columns,
      primaryKey: columns.find(col => col.primaryKey)?.name || 'id',
      autoIncrement: columns.find(col => col.autoIncrement) ? true : false
    };
    
    // Initialize empty data array for the table
    db.data[tableName] = [];
    
    this.saveDatabase(db);
    this.tables[tableName] = db.tables[tableName];
    
    console.log(`Table '${tableName}' created successfully`);
  }

  /**
   * Insert data into a table
   * @param {string} tableName - Name of the table
   * @param {Object} data - Data to insert
   */
  insert(tableName, data) {
    const db = this.getDatabase();
    
    if (!db.data[tableName]) {
      throw new Error(`Table '${tableName}' does not exist`);
    }
    
    const table = db.tables[tableName];
    const rowData = { ...data };
    
    // Handle auto-increment primary key
    if (table.autoIncrement) {
      const primaryKey = table.primaryKey;
      const maxId = db.data[tableName].reduce((max, row) => 
        row[primaryKey] > max ? row[primaryKey] : max, 0);
      rowData[primaryKey] = maxId + 1;
    }
    
    // Validate required fields
    for (const column of table.columns) {
      if (column.notNull && (rowData[column.name] === undefined || rowData[column.name] === null)) {
        throw new Error(`Column '${column.name}' cannot be null`);
      }
    }
    
    db.data[tableName].push(rowData);
    this.saveDatabase(db);
    
    console.log(`Data inserted into '${tableName}' successfully`);
    return rowData;
  }

  /**
   * Select data from a table
   * @param {string} tableName - Name of the table
   * @param {Object} options - Query options (where, limit, orderBy)
   */
  select(tableName, options = {}) {
    const db = this.getDatabase();
    
    if (!db.data[tableName]) {
      throw new Error(`Table '${tableName}' does not exist`);
    }
    
    let results = [...db.data[tableName]];
    
    // Apply WHERE filter
    if (options.where) {
      results = results.filter(row => {
        for (const key in options.where) {
          if (row[key] !== options.where[key]) {
            return false;
          }
        }
        return true;
      });
    }
    
    // Apply ORDER BY
    if (options.orderBy) {
      const { column, direction = 'ASC' } = options.orderBy;
      results.sort((a, b) => {
        if (direction.toUpperCase() === 'DESC') {
          return b[column] > a[column] ? 1 : -1;
        }
        return a[column] > b[column] ? 1 : -1;
      });
    }
    
    // Apply LIMIT
    if (options.limit) {
      results = results.slice(0, options.limit);
    }
    
    return results;
  }

  /**
   * Update data in a table
   * @param {string} tableName - Name of the table
   * @param {Object} data - Data to update
   * @param {Object} where - Conditions for which rows to update
   */
  update(tableName, data, where = {}) {
    const db = this.getDatabase();
    
    if (!db.data[tableName]) {
      throw new Error(`Table '${tableName}' does not exist`);
    }
    
    let updatedCount = 0;
    
    db.data[tableName] = db.data[tableName].map(row => {
      // Check if row matches WHERE conditions
      let match = true;
      for (const key in where) {
        if (row[key] !== where[key]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        updatedCount++;
        return { ...row, ...data };
      }
      
      return row;
    });
    
    this.saveDatabase(db);
    
    console.log(`${updatedCount} rows updated in '${tableName}'`);
    return updatedCount;
  }

  /**
   * Delete data from a table
   * @param {string} tableName - Name of the table
   * @param {Object} where - Conditions for which rows to delete
   */
  delete(tableName, where = {}) {
    const db = this.getDatabase();
    
    if (!db.data[tableName]) {
      throw new Error(`Table '${tableName}' does not exist`);
    }
    
    let deletedCount = 0;
    
    if (Object.keys(where).length === 0) {
      // Delete all rows
      deletedCount = db.data[tableName].length;
      db.data[tableName] = [];
    } else {
      // Delete specific rows
      const newData = [];
      for (const row of db.data[tableName]) {
        let match = true;
        for (const key in where) {
          if (row[key] !== where[key]) {
            match = false;
            break;
          }
        }
        
        if (!match) {
          newData.push(row);
        } else {
          deletedCount++;
        }
      }
      db.data[tableName] = newData;
    }
    
    this.saveDatabase(db);
    
    console.log(`${deletedCount} rows deleted from '${tableName}'`);
    return deletedCount;
  }

  /**
   * Drop a table
   * @param {string} tableName - Name of the table to drop
   */
  dropTable(tableName) {
    const db = this.getDatabase();
    
    if (db.tables[tableName]) {
      delete db.tables[tableName];
    }
    
    if (db.data[tableName]) {
      delete db.data[tableName];
    }
    
    this.saveDatabase(db);
    console.log(`Table '${tableName}' dropped successfully`);
  }

  /**
   * Get table information
   * @param {string} tableName - Name of the table
   */
  describe(tableName) {
    const db = this.getDatabase();
    
    if (!db.tables[tableName]) {
      throw new Error(`Table '${tableName}' does not exist`);
    }
    
    return db.tables[tableName];
  }

  /**
   * List all tables
   */
  showTables() {
    const db = this.getDatabase();
    return Object.keys(db.tables || {});
  }
}

// Export for use in other modules
window.DatabaseManager = DatabaseManager;