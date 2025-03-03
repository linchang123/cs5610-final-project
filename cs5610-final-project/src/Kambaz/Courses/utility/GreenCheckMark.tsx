import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function GreenCheckmark() {
    return (
      <span className="me-1">
        <FaCheckCircle
          className="text-success me-3 position-absolute fs-2" />
        <FaCircle className="text-white me-3 fs-6" />
      </span>
  );}