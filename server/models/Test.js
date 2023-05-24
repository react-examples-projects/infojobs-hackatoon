const { Schema, model } = require("mongoose");
const TestSchema = new Schema(
  {
    questions: [
      {
        question: {
          type: String,
          required: [true, "La pregunta es obligatoria"],
          trim: true,
        },
        options: {
          type: [String],
          required: [true, "Las opciones son obligatorias"],
        },
        validOptionIndex: {
          type: [Number],
          required: [true, "La opcion correcta es obligatoria"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Test", TestSchema);
