import React, { useEffect, useState } from "react";
import { fetchTickets } from "./services/api";
import Board from "./components/Board";
import "./App.css";
import { userImages } from "./components/Board";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets || []); // Extract tickets
      setUsers(data.users || []); // Extract users
    };
    loadData();
  }, []);

  // map userId to user names in the tickets
  const enrichedTickets = tickets.map((ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    return {
      ...ticket,
      user: user ? user.name : "Unknown User",
      userImage: userImages[ticket.userId] || null,
    };
  });

  return (
    <div className="app">
      <Board tickets={enrichedTickets} users={users} />
    </div>
  );
};

export default App;
