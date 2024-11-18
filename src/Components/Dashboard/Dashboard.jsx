import  { useEffect } from "react";
import { useSelector } from "react-redux";
import Done from "../../assets/Done.svg";
import Cancelled from "../../assets/Cancelled.svg";
import { useDispatch } from "react-redux";
import { fetchAllData } from "../../store/dataSlice";
import profile from "../../assets/p.png";
import Add from "../../assets/add.svg";
import InProgress from "../../assets/in-progress.svg";
import Todo from "../../assets/To-do.svg";
import Backlog from "../../assets/Backlog.svg";
import "./Dashboard.css";
import HiPriority from "../../assets/Img - High Priority.svg";
import LowPriority from "../../assets/Img - Low Priority.svg";
import MedPriority from "../../assets/Img - Medium Priority.svg";
import NoPriority from "../../assets/No-Priority.svg";
import Urgent from "../../assets/SVG - Urgent Priority colour.svg";
import Card from "../Card/Card";

const DashBoard = () => {
  // Get group and order values from Redux store
  const dispatch = useDispatch();
  const { selectedData, user } = useSelector((state) => state.selectData);
  const { group } = useSelector((state) => state.data);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0: 
        return <img src={NoPriority} alt="No Priority" />;  
      case 1:
        return <img src={Urgent} alt="Urgent Priority" />;
      case 2:
        return <img src={HiPriority} alt="High Priority" />;
      case 3:
        return <img src={MedPriority} alt="Med Priority" />;
      case 4:
        return <img src={LowPriority} alt="Low Priority" />;
    }
  };

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

  useEffect(() => {
    dispatch(fetchAllData());  // This will trigger the data fetching
  }, [dispatch]);

 

  return (
    selectedData && (
      <div className="dashContainer">
        {selectedData.map((element, index) => {
          // Determine the title and value for each group in selectedData
          const { title, value, priority } = element[index];

          return (
            <div key={index} className="dashCardContainer" >
              <div className="dashCardHeading ">
                <div className="leftView">
                  {user ? (
                    <div className="imageContainer relative" >
                      <img src ={profile}  style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} />
                    </div>
                  ) : group === 'status' ? (
                    <>
                    {getStatusIcon(title)}
                    </>
                  ) : (
                    <>
                    {getPriorityIcon(priority)}
                    </>
)}
                  <span>
                    {title} {value?.length}
                  </span>
                </div>
                <div className="rightView">
                  <img src={Add} /> <span style={{ letterSpacing: "2px" }}>...</span>
                </div>
              </div>
              <div className="dashList ">
                {value?.map((ticket, ind) => (
                  <Card
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    tag={ticket.tag}
                    status={ticket.status}
                    priority={ticket.priority}
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Conditionally render Done and Canceled sections only when grouping is by status */}
        {group === 'status'  && (
          <>
          <div className="dashCardContainer">
          <div className="dashCardHeading ">
              <div className="leftView" >
                <div className="cardTitleDash" >
                  <img src={Done} />
                </div>
                <span style={{fontWeight: "lighter" }}>Done</span> <span style={{color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                  <img src={Add} />
                   <span>...</span>
                </div>
            </div>
          </div>
          <div className="dashCardContainer">
          <div className="dashCardHeading flex-sb">
              <div className="leftView" >
                <div className="cardTitle" >
                  <img src={Cancelled} />
                </div>
                <span style={{ fontWeight: "lighter" }}>Canceled</span> <span style={{  color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                  <img src={Add} />
                   <span>...</span>
                </div>
            </div>
          </div>
           
           
          </>
        )}
      </div>
    )
  );
};

export default DashBoard;