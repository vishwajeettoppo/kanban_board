import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Board.css";
import { ReactComponent as Down } from "../assets/icons/down.svg";
import { ReactComponent as Display } from "../assets/icons/Display.svg";
import { ReactComponent as UrgentIcon } from "../assets/icons/priority-urgent.svg";
import { ReactComponent as HighIcon } from "../assets/icons/priority-high.svg";
import { ReactComponent as MediumIcon } from "../assets/icons/priority-medium.svg";
import { ReactComponent as LowIcon } from "../assets/icons/priority-low.svg";
import { ReactComponent as NoIcon } from "../assets/icons/priority-no.svg";
import { ReactComponent as Menu } from "../assets/icons/3 dot menu.svg";
import { ReactComponent as Add } from "../assets/icons/add.svg";
import { ReactComponent as TodoIcon } from "../assets/icons/To-do.svg";
import { ReactComponent as InProgressIcon } from "../assets/icons/in-progress.svg";
import { ReactComponent as BacklogIcon } from "../assets/icons/Backlog.svg";

import user1 from "../assets/users/user-1.jpg";
import user2 from "../assets/users/user-2.jpg";
import user3 from "../assets/users/user-3.jpg";
import user4 from "../assets/users/user-4.jpg";
import user5 from "../assets/users/user-5.jpg";

export const userImages = {
  "usr-1": user1,
  "usr-2": user2,
  "usr-3": user3,
  "usr-4": user4,
  "usr-5": user5,
};

const priorityIcons = {
  0: NoIcon,
  4: UrgentIcon,
  3: HighIcon,
  2: MediumIcon,
  1: LowIcon,
};
const statusIcons = {
  Todo: TodoIcon,
  "In progress": InProgressIcon,
  Backlog: BacklogIcon,
};

const groupTickets = (tickets, groupBy) => {
  if (!Array.isArray(tickets)) return {};
  return tickets.reduce((groups, ticket) => {
    const key = ticket[groupBy] || "Unassigned";
    if (!groups[key]) groups[key] = [];
    groups[key].push(ticket);
    return groups;
  }, {});
};

const sortTickets = (tickets, sortBy) => {
  if (sortBy === "priority") {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  } else if (sortBy === "title") {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

const Board = ({ tickets, users }) => {
  const [sortBy, setSortBy] = useState("priority");
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  );
  const groupedTickets = groupTickets(tickets, groupBy);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
  }, [groupBy]);

  if (!Array.isArray(tickets) || tickets.length === 0) {
    return <p>Loading or no data available...</p>;
  }

  return (
    <div className="board-container">
      <div
        className="header"
        style={{ position: "relative", display: "inline-block" }}
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="topButton"
        >
          <image>
            <Display />
          </image>
          <p>Display</p>
          <image>
            <Down />
          </image>
        </button>

        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "0",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              zIndex: 100,
              width: "200px",
              padding: "10px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Group By
              </label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="board">
        {Object.keys(groupedTickets).map((key) => {
          const GroupIcon =
            groupBy === "priority"
              ? priorityIcons[key]
              : groupBy === "status"
              ? statusIcons[key]
              : null;

          const ticketCount = groupedTickets[key].length;

          const user = users.find((user) => user.id === key);
          const userImage = user ? userImages[user.id] : null;

          return (
            <div className="column" key={key}>
              <div className="column-header">
                <div className="col-header-left">
                  {groupBy === "user" && userImage && (
                    <img
                      src={userImage}
                      alt={user ? user.name : "Unknown User"}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                  )}
                  {GroupIcon && (
                    <GroupIcon
                      style={{
                        width: "20px",
                        marginRight: "8px",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                  {groupBy === "priority"
                    ? key === "Unassigned"
                      ? "No Priority"
                      : ["No Priority", "Low", "Medium", "High", "Urgent"][key]
                    : key}
                  <div className="count">{ticketCount}</div>
                </div>
                <div className="col-header-right">
                  <Menu />
                  <Add />
                </div>
              </div>
              {sortTickets(groupedTickets[key], sortBy).map((ticket) => (
                <Card key={ticket.id} ticket={ticket} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
