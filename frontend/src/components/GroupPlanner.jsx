// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const GroupPlanner = ({joinGroup }) => {
// const [userId, setUserId] = useState(localStorage.getItem("userId"));
//   const [groups, setGroups] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     destination: "",
//     date: "",
//     interests: "",
//   });



//   useEffect(() => {
//     const storedId = localStorage.getItem("userId");
//   setUserId(storedId);
//     if (!userId || userId === "null") return;
//     axios
//       .get(`http://localhost:5001/api/group/match/${userId}`)
//       .then((res) => setGroups(res.data));
//   }, [userId]);

//   const handleCreate = async () => {
//     const payload = {
//       ...formData,
//       userId,
//       interests: formData.interests.split(",").map((i) => i.trim()),
//     };
//     const res = await axios.post("http://localhost:5001/api/group/create", payload);
//     setGroups([...groups, res.data]);
//   };

//   return (
//     <div>
//       <h2 className="text-xl text-white font-bold mb-4">Create New Trip Group</h2>
//       <div className="flex flex-col gap-2 mb-4">
//         <input
//           className="p-2 border rounded"
//           placeholder="Group Name"
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />
//         <input
//           className="p-2 border rounded"
//           placeholder="Destination"
//           onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
//         />
//         <input
//           className="p-2 border rounded"
//           type="date"
//           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//         />
//         <input
//           className="p-2 border rounded"
//           placeholder="Interests (comma separated)"
//           onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
//         />
//         <button className="bg-green-600 text-white p-2 rounded" onClick={handleCreate}>
//           Create Group
//         </button>
//       </div>

//       <h2 className="text-xl font-bold mb-3">Matching Groups</h2>
//       {groups.length === 0 ? (
//         <p>No groups found.</p>
//       ) : (
//         groups.map((group) => (
//           <div key={group._id} className="p-4 border rounded mb-2">
//             <p><strong>{group.name}</strong> - {group.destination}</p>
//             <p><strong>Interests:</strong> {group.interests.join(", ")}</p>
//             <button
//               className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
//               onClick={() => joinGroup(group._id)}
//             >
//               Join & Chat
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default GroupPlanner;
import React, { useEffect, useState } from "react";
import axios from "axios";

const GroupPlanner = ({ joinGroup }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    date: "",
    interests: "",
  });

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
    if (!storedId || storedId === "null") return;

    axios
      .get(`http://localhost:5001/api/group/match/${storedId}`)
      .then((res) => setGroups(res.data))
      .catch((err) => console.error("Error fetching groups:", err));
  }, [userId]);

  const handleCreate = async () => {
    const payload = {
      ...formData,
      userId,
      interests: formData.interests.split(",").map((i) => i.trim()),
    };
    try {
      const res = await axios.post("http://localhost:5001/api/group/create", payload);
      setGroups([...groups, res.data]);
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <div className="bg-white text-black p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Create New Trip Group</h2>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4">
          <input
            className="p-3  text-black placeholder-gray-400 border border-gray-500 rounded w-full"
            placeholder="Group Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="p-3 bg-white text-black placeholder-gray-400 border border-gray-500 rounded w-full"
            placeholder="Destination"
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
          <input
            className="p-3 bg-white text-black border border-gray-500 rounded w-full"
            type="date"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            className="p-3 bg-white text-black placeholder-gray-400 border border-gray-500 rounded w-full"
            placeholder="Interests (comma separated)"
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          />
          <button
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded transition"
            onClick={handleCreate}
          >
            Create Group
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Matching Groups</h2>
        {groups.length === 0 ? (
          <p className="text-gray-300">No groups found.</p>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group._id} className="bg-[#002040] p-4 rounded-lg border border-blue-700">
                <p className="text-lg font-bold">{group.name} - {group.destination}</p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Interests:</strong> {group.interests.join(", ")}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => joinGroup(group._id)}
                >
                  Join & Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupPlanner;
