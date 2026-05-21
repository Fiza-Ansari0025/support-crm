const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});

const PORT = 5000;

app.post("/api/tickets", (req, res) => {
  const {
    customer_name,
    customer_email,
    subject,
    description,
  } = req.body;

  const ticket_id = `TKT-${Date.now()}`;

  const query = `
    INSERT INTO tickets
    (ticket_id, customer_name, customer_email, subject, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
    ],
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Failed to create ticket",
        });
      }

      res.json({
        success: true,
        ticket_id,
      });
    }
  );
});

app.get("/api/tickets", (req, res) => {
  const { status, search } = req.query;

  let query = `SELECT * FROM tickets WHERE 1=1`;
  let params = [];

  if (status) {
    query += ` AND status = ?`;
    params.push(status);
  }

  if (search) {
    query += `
      AND (
        customer_name LIKE ?
        OR customer_email LIKE ?
        OR subject LIKE ?
        OR description LIKE ?
        OR ticket_id LIKE ?
      )
    `;

    const searchTerm = `%${search}%`;

    params.push(
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm
    );
  }

  query += ` ORDER BY created_at DESC`;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        error: "Failed to fetch tickets",
      });
    }

    res.json(rows);
  });
});

app.put("/api/tickets/:ticket_id", (req, res) => {
  const { ticket_id } = req.params;
  const { status, notes } = req.body;

  const query = `
    UPDATE tickets
    SET status = ?,
        notes = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE ticket_id = ?
  `;

  db.run(query, [status, notes, ticket_id], function (err) {
    if (err) {
      console.log(err);

      return res.status(500).json({
        error: "Failed to update ticket",
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        error: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket updated successfully",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});