const express = require('express');
const router = express.Router();

const studentsController = require('../controller/studentController');


/**
 * Load Student Details API - Retrieve student details in a paginated manner
 * example:
 *  /api/students?page=1&pageSize=15
 */

router.get('/students', studentsController.getStudents);

/**
 * Server-side Filtering API - Filter student details based on filter value (string) and column (it could be name, id, degreeName)
 * example:
 *  /api/students/filter/?filter="john"&column="name"
 * 
 */
router.get('/students/filter', studentsController.filterStudents);

module.exports = router;