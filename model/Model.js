const mongoose = require("mongoose");

const marksValidator = {
  validator: (value) => {
    return value[0] >= 0 && value[0] <= value[1];
  },
  message:
    "Invalid marks. Marks obtained cannot be negative, and it should be less than or equal to total marks.",
};

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
  },
  marks: {
    physics: {
      type: [Number, Number],
      validate: marksValidator,
    },
    chemistry: {
      type: [Number, Number],
      required: false,
      validate: {
        validator: (value) => {
          return (
            !value || (value.length === 2 && marksValidator.validator(value))
          );
        },
        message: "Invalid marks for chemistry.",
      },
    },
    maths: {
      type: [Number, Number],
      validate: marksValidator,
    },
  },
});

module.exports = mongoose.model("Student", studentSchema);
