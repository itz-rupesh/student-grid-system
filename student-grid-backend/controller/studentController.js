const students = require('../helper/students.json'); // Assuming the student details are stored in a JSON file
const { DEFAULT_PAGE_SIZE } = require('../helper/constant');


// Retrieve student details in a paginated manner
const getStudents = (req, res) => {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = pageNumber * limit;

    const paginatedStudents = students.data.slice(startIndex, endIndex);

    res.json({
        total: students.length,
        page: pageNumber,
        pageSize: limit,
        data: paginatedStudents,
        total: students.data.length
    });
};

// Filter student details based on criteria
const filterStudents = (req, res) => {
    const { filter, column} = req.query;
    const filteredStudents = students.data.filter((student) => {
        // Example: Filtering by student name
        return student[column].toLowerCase().includes(filter.toLowerCase());
    });
    res.json({
        data: filteredStudents
    });
    // }

};


module.exports = {
    getStudents,
    filterStudents,
};
