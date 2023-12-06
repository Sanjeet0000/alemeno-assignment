import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./CourseDetails.css";

const CourseDetails = ({ courses }) => {
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(false);
  const [isEnrolled, setEnrolled] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const courseId = parseInt(id, 10);

  const selectedCourse = courses.find(
    (course) => course.id === courseId.toString()
  );

  const addCoursesHandler = () => {
    dispatch({ type: "ENROLL_IN", payload: selectedCourse });
    setEnrolled(true);
  };

  const toggleSyllabus = () => {
    setIsSyllabusExpanded(!isSyllabusExpanded);
  };

  if (!courses.length) {
    return <div>Loading...</div>;
  }

  if (!selectedCourse) {
    return <div>Course not found</div>;
  }
  //   console.log(courses);

  return (
    <main className="container">
      <header className="page-title">
        <h1>Course Details</h1>
        <Link to={"/"} className="close-button">
          &#x274C;
        </Link>
      </header>

      <section className="wrapper">
        <div className="title-container">
          <div className="course-name-container">
            <h2 className="course-name">{selectedCourse.name}</h2>
            <h3 className="instructor-name">- {selectedCourse.instructor}</h3>
          </div>
          <div>
            <img
              src={selectedCourse.thumbnail}
              alt="thumbnail"
              className="course-thumbnail"
            />
          </div>
        </div>
        <h4 className="description">{selectedCourse.description}</h4>
        <h3 className="schedule">Schedule : {selectedCourse.schedule}</h3>
        <h3 className="prerequisites">
          Prerequisites : {selectedCourse.prerequisites}
        </h3>
        <h3>Enrollment Status : {selectedCourse.enrollmentStatus}</h3>
        <h3>Course Location : {selectedCourse.location}</h3>
        <h3>Course Duration : {selectedCourse.duration}</h3>
        <div className="list-items">
          <h3>Students Enrolled:</h3>
          <br />
          {selectedCourse.students.map((student, index) => (
            <div key={index}>
              <p>Name: {student.name}</p>
              <p>Email: {student.email}</p>
              <br />
            </div>
          ))}
        </div>
        <div className="list-items">
          <h3 onClick={toggleSyllabus} className="cursor-pointer">
            Syllabus {isSyllabusExpanded ? "-" : "+"}
          </h3>
          <br />
          {isSyllabusExpanded &&
            selectedCourse.syllabus.map((syllabus, index) => (
              <div key={index}>
                <p>Week: {syllabus.week}</p>
                <p>Topic: {syllabus.topic}</p>
                <p>Content: {syllabus.content}</p>
                <br />
              </div>
            ))}
        </div>
        <button
          className="enroll-button cursor-pointer"
          onClick={addCoursesHandler}
          disabled={isEnrolled}
        >
          {isEnrolled ? "Enrolled" : "Enroll"}
        </button>
      </section>
    </main>
  );
};

export default CourseDetails;
