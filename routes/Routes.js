const express = require("express");
const bodyParser = require("body-parser");
const connectToMongo = require("../config/db.js");
const Student = require("../model/Model.js");
const Student1 = require("../model/Model1.js");
const calculatePercentage = require("../utils/percentage.js");
const calculateOverallPercentage = require("../utils/overallPercentage.js");

connectToMongo();

const app = express();
app.use(bodyParser.json());

const router = express.Router();
router.post("/addStudent", async (req, res) => {
  try {
    const { name, age, gender, marks, rollno } = req.body;
    if (!name || !age || !gender || !marks || !rollno) {
      return res.status(400).json({
        error: "Incomplete data. Please provide all required fields.",
      });
    }
    const newStudent = new Student({
      name,
      rollno,
      age,
      gender,
      marks,
    });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully." });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/addStudent1", async (req, res) => {
  try {
    const { first_name, rollno, last_name, years_old, scores } = req.body;
    if (
      !first_name ||
      !rollno ||
      !last_name ||
      !years_old ||
      !scores ||
      !scores.subjects ||
      !scores.marks_obtained ||
      !scores.total_marks
    ) {
      return res.status(400).json({
        error: "Incomplete data. Please provide all required fields.",
      });
    }
    const newStudent1 = new Student1({
      first_name,
      rollno,
      last_name,
      years_old,
      scores,
    });
    await newStudent1.save();

    res.status(201).json({ message: "Student added successfully." });
  } catch (error) {
    console.error("Error processing request:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getStudents", async (req, res) => {
  try {
    const students = await Student.find();
    const students2 = await Student1.find();
    const formattedStudents = students.map((student) => ({
      name: student.name,
      age: student.age,
      gender: student.gender,
      physics_percentage: calculatePercentage(student.marks.physics),
      chemistry_percentage: calculatePercentage(student.marks.chemistry),
      maths_percentage: calculatePercentage(student.marks.maths),
      overall_percentage: calculateOverallPercentage(student.marks),
    }));

    const formattedStudents2 = students2.map((Student1) => {
      const physicsPercentage =
        (Student1.scores.marks_obtained[
          Student1.scores.subjects.indexOf("physics")
        ] /
          Student1.scores.total_marks[
            Student1.scores.subjects.indexOf("physics")
          ]) *
        100;
      const chemistryPercentage =
        (Student1.scores.marks_obtained[
          Student1.scores.subjects.indexOf("chemistry")
        ] /
          Student1.scores.total_marks[
            Student1.scores.subjects.indexOf("chemistry")
          ]) *
        100;
      const mathsPercentage =
        (Student1.scores.marks_obtained[
          Student1.scores.subjects.indexOf("maths")
        ] /
          Student1.scores.total_marks[
            Student1.scores.subjects.indexOf("maths")
          ]) *
        100;
      const overallPercentage = (
        (physicsPercentage + chemistryPercentage + mathsPercentage) /
        3
      ).toFixed(2);

      return {
        name: `${Student1.first_name} ${Student1.last_name}`,
        age: Student1.years_old,
        gender: "",
        physics_percentage: physicsPercentage.toFixed(2),
        chemistry_percentage: chemistryPercentage.toFixed(2),
        maths_percentage: mathsPercentage.toFixed(2),
        overall_percentage: overallPercentage,
      };
    });

    res.status(200).json(formattedStudents.concat(formattedStudents2));
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
