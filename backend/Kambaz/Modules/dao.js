/**
 * DAO for Modules to implement module data access
 * from the database
 */
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
// import Database from "../Database/index.js";

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
  // const { modules } = Database;
  // return modules.filter((module) => module.course === courseId);
}
export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    // Database.modules = [...Database.modules, newModule];
    // return newModule;
    return model.create(newModule);
  }
export function deleteModule(moduleId) {
    // const { modules } = Database;
    // Database.modules = modules.filter((module) => module._id !== moduleId);
    return model.deleteOne({ _id: moduleId });
}
export function updateModule(moduleId, moduleUpdates) {
    if (!moduleUpdates) {
      return;
    }
    return model.updateOne({ _id: moduleId }, moduleUpdates);
    // const { modules } = Database;
    // const module = modules.find((module) => module._id === moduleId);
    // Object.assign(module, moduleUpdates);
    // return module;
}