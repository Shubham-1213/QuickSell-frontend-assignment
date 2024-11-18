import "./Card.css";
import { useSelector } from "react-redux";

import InProgress from "../../assets/in-progress.svg";
import Done from "../../assets/Done.svg";
import Todo from "../../assets/To-do.svg";
import Backlog from "../../assets/Backlog.svg";
import HiPriority from "../../assets/Img - High Priority.svg";
import LowPriority from "../../assets/Img - Low Priority.svg";
import MedPriority from "../../assets/Img - Medium Priority.svg";
import NoPriority from "../../assets/No-Priority.svg";
import UrgentGrey from "../../assets/SVG - Urgent Priority grey.svg";
import Profile from "../../assets/p.png";

const Card = ({ id, title, tag, status, priority }) => {
  // Get group value from Redux store
  const group = useSelector((state) => state.data.group);
  console.log(group);

  // Helper functions
  const getStatusIcon = (status) => {
    switch (status) {
      case "Backlog":
        return <img src={Backlog} alt="Backlog" />;
      case "Todo":
        return <img src={Todo} alt="Todo" />;
      case "In progress":
        return <img src={InProgress} alt="In Progress" />;
      case "Done":
        return <img src={Done} alt="Done" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 1:
        return <img src={LowPriority} alt="Low Priority" />;
      case 2:
        return <img src={MedPriority} alt="Medium Priority" />;
      case 3:
        return <img src={HiPriority} alt="High Priority" />;
      case 4:
        return <img src={UrgentGrey} alt="Urgent Priority" />;
      default:
        return <img src={NoPriority} alt="No Priority" />;
    }
  };

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div className="imageContainer relative" style={{ width: "30px", height: "30px" }} >
        {group != "user" && 
          <img
            style={{ width: "95%", height: "95%", borderRadius: "50%", objectFit: "cover" }}
            src={Profile}
            alt="UserImage"
          />}
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        {group !== "status" && getStatusIcon(status)}
        <span >{title}</span>
      </div>
      <div className="cardTags">
        {group !== "priority" && (
          <div className="tags color-grey">{getPriorityIcon(priority)}</div>
        )}
        {tag?.map((element, index) => (
          <div key={index} className="tags color-grey">
            <span >•</span> {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
