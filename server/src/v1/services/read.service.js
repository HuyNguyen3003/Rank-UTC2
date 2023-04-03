const studentModel = require("../models/student.model");

const getStudentInfo = (studentId) => {
  return studentModel
    .aggregate([
      {
        $match: { studentId: studentId + "" },
      },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "classId",
          as: "class",
        },
      },
      { $unwind: "$class" },
      {
        $lookup: {
          from: "scores",
          localField: "studentId",
          foreignField: "studentId",
          as: "scores",
        },
      },
    ])
    .then((result) => result)
    .catch((err) => Fconsole.log(err));
};

module.exports = { getStudentInfo };
