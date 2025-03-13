import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      required: true,
      default: "pending",
    },
    code: {
      type: String,
      required: true,
      default: "code",
      trim: true,
    },
  },
  { timestamps: true }
);
TaskSchema.pre("save", function (next) {
  this.code = nanoid(10);
  next();
});

const Taskmodel = mongoose.model("Task", TaskSchema);
export default Taskmodel;
