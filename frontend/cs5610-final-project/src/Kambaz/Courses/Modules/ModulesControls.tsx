import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === "FACULTY") {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" onClick={handleShow}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module</button>
        <Dropdown className="float-end me-2">
          <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
            <GreenCheckmark /> Publish All
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="wd-publish-all">
              <GreenCheckmark /> Publish All
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-all-modules-and-items">
              <GreenCheckmark /> Publish all modules and items
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-modules-only">
              <GreenCheckmark /> Publish modules only
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-modules-only">
              <GreenCheckmark /> Publish modules only
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-modules-only">
              <GreenCheckmark /> Publish modules only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">View Progress</button>
      <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">Collapse All</button>
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />

    </div>
);}
return(<button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">Collapse All</button>);
}