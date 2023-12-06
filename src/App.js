import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseListing from "./Components/CourseListing";
import CourseDetails from "./Components/CourseDetails";
import StudentDashboard from "./Components/StudentDashboard";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://alemeno-courses-default-rtdb.asia-southeast1.firebasedatabase.app/courses.json/"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }

        const responseData = await response.json();
        const loadedCourses = [];

        for (const key in responseData) {
          const studentsData = responseData[key].students;
          const studentsArray = Object.keys(studentsData).map((studentKey) => ({
            name: studentsData[studentKey].name,
            email: studentsData[studentKey].email,
          }));
          const syllabusData = responseData[key].syllabus;
          const syllabusArray = Object.keys(syllabusData).map(
            (syllabusKey) => ({
              week: syllabusData[syllabusKey].week,
              topic: syllabusData[syllabusKey].topic,
              content: syllabusData[syllabusKey].content,
            })
          );

          loadedCourses.push({
            id: key,
            name: responseData[key].name,
            instructor: responseData[key].instructor,
            description: responseData[key].description,
            prerequisites: responseData[key].prerequisites,
            schedule: responseData[key].schedule,
            duration: responseData[key].duration,
            enrollmentStatus: responseData[key].enrollmentStatus,
            location: responseData[key].location,
            thumbnail: responseData[key].thumbnail,
            students: studentsArray,
            syllabus: syllabusArray,
          });
        }

        setCourses(loadedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CourseListing courses={courses} />} />
        <Route path="*" element={<CourseListing courses={courses} />} />
        <Route
          path="/course/:id"
          element={<CourseDetails courses={courses} />}
        />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
