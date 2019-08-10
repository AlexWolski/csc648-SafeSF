const db = require('../auth/db_config.js')
const db_query = require('../database/db_query.js')

exports.getCategories = function (callback) {
  db.query('SELECT * FROM categories', function (err, result) {
    if (err) {
      console.log('Error querying database : ' + err)
      callback(err, null)
    } else {
      console.log('Results succesfully retrieved')
      callback(null, result)
    }
  })
}

// Queries the DB and gets the number of categories in the database.
exports.getNumberOfCategories = function () {
  return new Promise(function(resolve, reject) {
    var result = db.query('SELECT COUNT(*) AS numCategories FROM categories', function (err, result) {
      if (err) {
        reject(null)
      } else {
        resolve(result[0].numCategories)
      }
    })
  })
}
