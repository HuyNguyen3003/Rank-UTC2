const fetch = require("node-fetch");
const FormData = require("form-data");
const courseModel = require("../models/course.model");
const classModel = require("../models/class.model");
const studentModel = require("../models/student.model");
const scoreModel = require("../models/score.model");
const { resolveData } = require("../utils");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const updateCourse = () => {
  return fetch("https://utc2ranking.azurewebsites.net/course", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (result) => await result.json())
    .then((result) => {
      courseModel
        .bulkWrite(
          result.map((d) => ({
            updateOne: {
              filter: { courseId: d.ID_KHOAHOC },
              update: { $set: { courseName: d.TEN_KHOAHOC } },
              upsert: true,
            },
          }))
        )
        .then(() => {
          console.log("Update Courses Success.");
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const updateClass = (courseId) => {
  const form = new FormData();
  form.append("CourseID", courseId);
  return fetch("http://utecehai.tk/Student/GetListClass", {
    method: "post",
    body: form,
  })
    .then(async (result) => (await result.json()).data)
    .then((result) => {
      classModel
        .bulkWrite(
          result.map((d) => ({
            updateOne: {
              filter: { classId: d.lophoC_ID },
              update: {
                $set: {
                  className: d.teN_LOP,
                  courseId: courseId,
                },
              },
              upsert: true,
            },
          }))
        )
        .then(() => {
          console.log("Update Classes Success.");
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const updateStudent = (classId) => {
  const form = new FormData();
  form.append("ClassID", classId);
  return fetch("http://utecehai.tk/Student/GetListStudent", {
    method: "post",
    body: form,
  })
    .then(async (result) => (await result.json()).data)
    .then((result) => {
      studentModel
        .bulkWrite(
          result.map((d) => ({
            updateOne: {
              filter: { studentId: d.mA_SINHVIEN },
              update: {
                $set: {
                  fullname: d.hoten,
                  classId: classId,
                },
              },
              upsert: true,
            },
          }))
        )
        .then(() => {
          console.log("Update Students Success.");
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const updateScore = (studentId) => {
  return fetch(
    "https://utc2ranking.azurewebsites.net/api/Student?studentID=" + studentId,
    {
      method: "get",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then(async (result) => await result.json())
    .then((result) => {
      scoreModel
        .bulkWrite(
          resolveData(result).map((d) => {
            const { semester, scholastic, coefficientFour, coefficientTen } = d;
            return {
              updateOne: {
                filter: { studentId, semester, scholastic },
                update: {
                  $set: {
                    coefficientFour,
                    coefficientTen,
                  },
                },
                upsert: true,
              },
            };
          })
        )
        .then(() => {
          console.log("Update Score Success.");
        })
        .catch((error) => console.log(error));
    })
    .catch((err) => console.log(err));
};

const updateAllClass = () => {
  courseModel
    .find({})
    .then(async (result) => {
      for (const d of result) {
        await updateClass(d.courseId);
        await delay(3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateAllStudent = () => {
  classModel
    .find({})
    .then(async (result) => {
      for (const d of result) {
        await updateStudent(d.classId);
        await delay(3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateAllScore = () => {
  studentModel
    .find({})
    .then(async (result) => {
      for (const d of result) {
        await updateScore(d.studentId);
        await delay(3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  updateCourse,
  updateClass,
  updateStudent,
  updateScore,
  updateAllClass,
  updateAllStudent,
  updateAllScore,
};
