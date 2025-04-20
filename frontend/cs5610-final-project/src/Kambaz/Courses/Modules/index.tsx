import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import FacultyFeatures from "../../Account/FacultyFeatures";

export default function Modules() {
    const { cid } = useParams();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [moduleName, setModuleName] = useState("");
    return (
      <div>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");}} />
          <br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <FacultyFeatures><BsGripVertical className="me-2 fs-3" /></FacultyFeatures>
              {currentUser.role === "STUDENT" && (<IoMdArrowDropdown className="me-2 fs-3"/>)}
              { !module.editing && module.name}
              {
              module.editing && (
                <input className="form-control w-50 d-inline-block"
                      onChange={(e) => dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}/>
              )}
              <FacultyFeatures><ModuleControlButtons moduleId={module._id} deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));}} editModule={(moduleId) => dispatch(editModule(moduleId))}/>
              </FacultyFeatures>
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <LessonControl lessonName={lesson.name}/>
                  </li>
                ))}
              </ul>)}
          </li>))}
        </ul>
      </div>

  );}

const LessonControl = ({ lessonName }: { lessonName: string }) => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === "FACULTY"){
    return (
      <div className="wd-modules-lesson-control-buttons">
          <BsGripVertical className="me-2 fs-3" /> 
          {lessonName} 
          <LessonControlButtons />
      </div>
    );
  } else {
    return (
      <div className="wd-modules-lesson-title ps-3">{lessonName}</div>
    );
  }
}