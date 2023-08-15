import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb3.db');

const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, age INTEGER, mobile TEXT, address TEXT, morningAttendance INTEGER, afternoonAttendance INTEGER, nightAttendance INTEGER, attendanceDate TEXT);'
      );
  
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS money (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, amount INTEGER, date TEXT);'
      );
    });
  };
  
  
export const initDatabase = () => {
  createTable();
};

export const insertUser = (name, dob, age, mobile, address) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (name, dob, age, mobile, address) VALUES (?, ?, ?, ?, ?);',
        [name, dob, age, mobile, address],
        (_, { rows }) => {
          console.log('User inserted:', rows._array);
        },
        (_, error) => {
          console.error('Error inserting user:', error);
        }
      );
    });
  };
  

export const getAllUsers = (callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users;',
        [],
        (_, { rows }) => {
          callback(rows._array);
        },
        (_, error) => {
          console.error('Error fetching users:', error);
        }
      );
    });
  };
  
  export const deleteUser = (id, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?;',
        [id],
        (_, { rowsAffected }) => {
          callback(rowsAffected);
        },
        (_, error) => {
          console.error('Error deleting user:', error);
        }
      );
    });
  };
  
// Modify your markAttendance function to store attendance date and time
export const markAttendance = (id, timeOfDay, attendanceDate, callback) => {
    db.transaction((tx) => {
      const columnToUpdate = `${timeOfDay}Attendance`;
      tx.executeSql(
        `UPDATE users SET ${columnToUpdate} = 1, attendanceDate = ? WHERE id = ?;`,
        [attendanceDate, id],
        (_, { rowsAffected }) => {
          callback(rowsAffected);
        },
        (_, error) => {
          console.error('Error marking attendance:', error);
        }
      );
    });
  };
  
  // Add a function to check if attendance is marked for a specific date and time of day
  export const isAttendanceMarked = (id, timeOfDay, attendanceDate, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${timeOfDay}Attendance FROM users WHERE id = ? AND attendanceDate = ?;`,
        [id, attendanceDate],
        (_, { rows }) => {
          callback(rows.length > 0 && rows.item(0)[`${timeOfDay}Attendance`] === 1);
        },
        (_, error) => {
          console.error('Error checking attendance:', error);
          callback(false);
        }
      );
    });
  };
  


  export const deleteUserByNameAndMobile = (name, mobile, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE name = ? AND mobile = ?;',
        [name, mobile],
        (_, { rowsAffected }) => {
          callback(rowsAffected);
        },
        (_, error) => {
          console.error('Error deleting user:', error);
        }
      );
    });
  };
  export const getMoneyDetails = (name, mobile, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM money WHERE name = ? AND mobile = ?;',
        [name, mobile],
        (_, { rows }) => {
          callback(rows._array);
        },
        (_, error) => {
          console.error('Error fetching money data:', error);
          callback([]);
        }
      );
    });
  };
  
  export const insertMoney = (name, mobile, amount, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO money (name, mobile, amount, date) VALUES (?, ?, ?, ?);',
        [name, mobile, amount, new Date().toLocaleDateString()],
        (_, { rows }) => {
          console.log('Money data inserted:', rows._array);
          getMoneyDetails(name, mobile, callback); // Call getMoneyDetails after insertion
        },
        (_, error) => {
          console.error('Error inserting money data:', error);
          callback([]); // Pass an empty array to the callback in case of an error
        }
      );
    });
  };
  