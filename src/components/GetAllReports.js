import "../App.css";
import Marquee from "react-fast-marquee";
import react, {useState}from "react"
function Reports({
 
  image,
  title,
  name,
  category,
description,
  coordinates,
  createdAt,
  status,

  ...rest
}) 

{
  if(!status){
    status="Pending"
  }else{
    status="Fixed"
  }
  return (
    <Marquee className="marquee-container">
      <div className="report">
        <div>
          <img style={{width:"50px"}} src={image} alt={title} />
        </div>
        <h2>{title}</h2>
        <p>{category}</p>
       <p>{description}</p> 
        <p>Reported by: {name}</p>
        <p>Created at: {createdAt}</p>
        <p>status:{status} </p>
      </div>
    </Marquee>
  );
}
export default Reports;
