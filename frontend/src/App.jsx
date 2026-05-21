import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async (
    searchText = "",
    statusFilter = ""
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets?search=${searchText}&status=${statusFilter}`
      );

      setTickets(response.data);
    } catch (error) {
      console.log("Error fetching tickets:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tickets",
        formData
      );

      alert("Ticket created successfully!");

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

      setShowForm(false);

      fetchTickets(search, status);

    } catch (error) {
      console.log(error);
      alert("Failed to create ticket");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Support CRM
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Ticket
        </button>
      </div>

      {/* Search + Filter */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchTickets(e.target.value, status);
          }}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            fetchTickets(search, e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

      </div>


      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Create Ticket
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Customer Name"
              value={formData.customer_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer_name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />

            <input
              type="email"
              placeholder="Customer Email"
              value={formData.customer_email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer_email: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />

            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows="4"
              required
            />

            <div className="flex gap-4">

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Submit Ticket
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Ticket Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-4">Ticket ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Subject</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>

            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket.ticket_id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="p-4">
                    {ticket.ticket_id}
                  </td>

                  <td className="p-4">
                    {ticket.customer_name}
                  </td>

                  <td className="p-4">
                    {ticket.subject}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
            ${ticket.status === "Open"
                          ? "bg-yellow-100 text-yellow-700"
                          : ticket.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;