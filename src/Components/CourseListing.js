import { useState } from "react";
import { Link } from "react-router-dom";
import "./CourseListing.css";

const CourseListing = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchResults = courses.filter((course) => {
    const coursesFilteredByCourseName = course.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const coursesFilteredByInstructorName = course.instructor
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    return coursesFilteredByCourseName || coursesFilteredByInstructorName;
  });

  return (
    <main className="container">
      <h1>Course Listing</h1>

      <section className="wrapper">
        <div className="search-bar">
          <input type="text" onChange={searchHandler} placeholder="search..." />
        </div>
        {searchResults.map((course) => (
          <div key={course.id}>
            <Link to={`/course/${course.id}`} className="course-item">
              <div className="course-heading">
                <h3>{course.name}</h3>
                <span>{course.instructor}</span>
              </div>
              <span className="description">{course.description}</span>
            </Link>
          </div>
        ))}
        {!searchResults.length && (
          <div className="no-result">
            <span>No result found!</span>
          </div>
        )}
      </section>
    </main>
  );
};

export default CourseListing;
