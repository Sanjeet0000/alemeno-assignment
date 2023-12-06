import { legacy_createStore as createStore } from "redux";

const initialState = {
  enrolledCourses: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ENROLL_IN":
      return {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload],
      };

    case "ENROLL_OUT":
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.filter(
          (courseId) => courseId !== action.payload
        ),
      };

    case "MARK_COMPLETED":
      const { courseId } = action.payload;
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.map((course) =>
          course.id === courseId ? { ...course, completed: true } : course
        ),
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
