import React, { useState, useEffect } from 'react';

const StudentGrid = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Load student details on component mount
        loadStudents();
    }, [currentPage, pageSize]);

    useEffect(() => {
        // Update filtered students whenever the filter or students change
        applyFilter();
    }, [filter, students]);

    const loadStudents = () => {
        // Make API call to retrieve student details
        // Replace the URL with the actual backend API endpoint for loading students
        fetch(`http://localhost:5000/api/students?page=${currentPage}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                setStudents(data.data);
                setTotalPages(Math.ceil(data.total / pageSize));
            })
            .catch((error) => console.error('Error:', error));
    };

    const applyFilter = () => {

        if (filter === '') {
            setFilteredStudents(students);
            return;
        }
        fetch(`http://localhost:5000/api/students/filter?filter=${filter}&column=${"name"}`)
            .then((response) => response.json())
            .then((data) => {
                setFilteredStudents(data.data);
            }).catch((error) => console.error('Error:', error));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const pageSizeChange = (event) => {
        if (event.target.value < 0) {
            return
        }
        setCurrentPage(1);
        setPageSize(event.target.value);
    }

    const checkDiableButton = (pageNum, labal) => {
        let flag = false;
        switch (labal) {
            case "next":
                if (pageNum > totalPages) {
                    flag = true;
                }
                break;
            case "previous":
                if (pageNum <= 0) {
                    flag = true;
                }
                break;
            default:
                flag = false;
        }
        return flag;
    }
    const checkGlobalDisable = () => {return  filter !== ''};
    
    return (
        <div className="container">
            <h1 className="my-4">Student Grid</h1>
            <div className="mb-3">
                <label htmlFor="filter" className="form-label">Filter by Name:</label>
                <input
                    type="text"
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="form-control"
                />
            </div>
            <div className='w-100 text-start'>
                <button className='btn btn-primary me-3' disabled={checkDiableButton(currentPage - 1, "previous") || checkGlobalDisable()} onClick={() => handlePageChange(currentPage - 1)} >Previous</button>
                <button className='btn btn-primary me-3' disabled={checkDiableButton(currentPage + 1, "next") || checkGlobalDisable()} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                Record Per Page : <input type='number' value={pageSize} disabled={checkGlobalDisable()} onChange={pageSizeChange} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Total Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.totalMarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-100 mt-5 mb-5'>
                <div className='text-center'>
                    {(filteredStudents.length === 0) ? "No record found!" : ''}
                </div>
            </div>
            <div className="pagination">
                {
                    <div className='w-100'>
                        <button className='btn btn-primary me-3' disabled={checkDiableButton(currentPage - 1, "previous") || checkGlobalDisable()} onClick={() => handlePageChange(currentPage - 1)} >Previous</button>
                        <button className='btn btn-primary me-3' disabled={checkDiableButton(currentPage + 1, "next") || checkGlobalDisable()} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default StudentGrid;
