import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState({});
  const enrolledCourses = useSelector((state) => state.enrolledCourses);

  const removeCourseHandler = (courseId) => {
    dispatch({ type: "ENROLL_OUT", payload: courseId });
  };

  const courseCompletedHandler = (courseId) => {
    dispatch({ type: "MARK_COMPLETED", payload: courseId });
    setIsClicked((prevStatus) => ({
      ...prevStatus,
      [courseId]: true,
    }));
  };

  return (
    <main className="container">
      <header className="page-title">
        <h2>Student Dashboard</h2>
        <Link to={"/"} className="close-button">
          &#x274C;
        </Link>
      </header>
      <section className="wrapper">
        {enrolledCourses.length > 0 ? (
          <section>
            <span className="sub-heading">Enrolled Courses : </span>
            <div>
              {enrolledCourses.map((course, index) => (
                <div key={index} className="courses-list">
                  <div className="courses">
                    <div className="course-detail">
                      <h4>{course.name}</h4>
                      <h4>- {course.instructor}</h4>
                    </div>
                    <span
                      onClick={() => removeCourseHandler(course)}
                      className="cursor-pointer"
                    >
                      &#x274C;
                    </span>
                  </div>
                  <div className="sub-container">
                    <div className="date-progress-container">
                      <h4>Due Date : 20 Dec 2023</h4>
                      <progress
                        id="progress"
                        value={isClicked[course.id] ? "100" : "0"}
                        max="100"
                      ></progress>
                    </div>
                    <img
                      src={course.thumbnail}
                      alt="course.name"
                      className="thumbnail"
                    />
                  </div>
                  {!isClicked[course.id] && (
                    <button
                      className="enroll-button"
                      onClick={() => courseCompletedHandler(course.id)}
                    >
                      Mark as Complete
                    </button>
                  )}
                  {isClicked[course.id] && (
                    <h3 className="completed">Completed!!</h3>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="no-courses">No enrolled courses yet.</p>
        )}
      </section>
    </main>
  );
};

export default StudentDashboard;
