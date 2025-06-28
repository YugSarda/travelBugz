import React, { useState } from "react";
import GroupPlanner from "../components/GroupPlanner";
import GroupChat from "../components/GroupChat";

const GroupTripPage = ({ userId }) => {
  const [currentGroup, setCurrentGroup] = useState(null);

  const joinGroup = async (groupId) => {
    await fetch(`http://localhost:5001/api/group/join/${groupId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    setCurrentGroup(groupId);
  };

  return (
    <div className="min-h-screen p-6 bg-[#002b6b] flex items-center justify-center">
      {!currentGroup ? (
        <GroupPlanner userId={userId} joinGroup={joinGroup} />
      ) : (
        <GroupChat groupId={currentGroup} userId={userId} />
      )}
    </div>
  );
};

export default GroupTripPage;
