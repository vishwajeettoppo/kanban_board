import React from "react";
import "./Card.css";
import { userImages } from "./Board";

const Card = ({ ticket}) => {
  return (
    <div className="card">
      <div className="card-head">
        <p>{ticket.id}</p>
        {ticket.userId && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={userImages[ticket.userId]}
              alt={ticket.user}
              style={{ width: '24px', height: '24px', borderRadius: '50%' }}
            />
            {/* {ticket.user} */}
          </span>
        )}
      </div>
      <div className="title-box">{ticket.title}</div>
      <p className="tag">{ticket.tag}</p>
    </div>
  );
};

export default Card;
