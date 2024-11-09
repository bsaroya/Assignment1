import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/courses';

export const getAllCourses = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addCourse = async (courseData) => {
  const response = await axios.post(BASE_URL, courseData);
  return response.data;
};

// Update a course
export const updateCourse = async (courseId, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${courseId}`, updatedData);
  return response.data;
};

// Delete a course
export const deleteCourse = async (courseId) => {
  const response = await axios.delete(`${BASE_URL}/${courseId}`);
  return response.status === 204;
};
