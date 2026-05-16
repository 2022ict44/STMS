import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "/api/task";

const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f0ff 100%)",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    padding: "2rem 1rem",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    margin: 0,
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#1e293b",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: "0.5rem 0 0",
    color: "#64748b",
    fontSize: "0.95rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08)",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    border: "1px solid #e2e8f0",
  },
  cardTitle: {
    margin: "0 0 1.25rem",
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#334155",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    alignItems: "end",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  input: {
    padding: "0.6rem 0.75rem",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  select: {
    padding: "0.6rem 0.75rem",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "0.95rem",
    background: "#fff",
    cursor: "pointer",
  },
  submitBtn: {
    padding: "0.65rem 1.25rem",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.35)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  alert: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  alertError: {
    background: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
  },
  alertSuccess: {
    background: "#f0fdf4",
    color: "#15803d",
    border: "1px solid #bbf7d0",
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem 1rem",
    background: "#f8fafc",
    color: "#475569",
    fontWeight: 600,
    borderBottom: "2px solid #e2e8f0",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "0.85rem 1rem",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
    verticalAlign: "middle",
  },
  rowCompleted: {
    opacity: 0.65,
    background: "#f8fafc",
  },
  priorityBadge: (priority) => ({
    display: "inline-block",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    background:
      priority === "High"
        ? "#fef2f2"
        : priority === "Medium"
          ? "#fffbeb"
          : "#f0fdf4",
    color:
      priority === "High"
        ? "#b91c1c"
        : priority === "Medium"
          ? "#b45309"
          : "#15803d",
  }),
  deleteBtn: {
    padding: "0.4rem 0.85rem",
    background: "#fff",
    color: "#dc2626",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  emptyState: {
    textAlign: "center",
    padding: "2.5rem 1rem",
    color: "#94a3b8",
    fontSize: "0.95rem",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#2563eb",
  },
};

const emptyForm = {
  title: "",
  subject: "",
  deadline: "",
  priority: "Medium",
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getalltasks`);
      if (!res.ok) throw new Error("Failed to load tasks.");
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      showMessage("error", "Could not connect to the server. Is the backend running?");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.subject.trim() || !form.deadline) {
      showMessage("error", "Please fill in title, subject, and deadline.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          subject: form.subject.trim(),
          deadline: form.deadline,
          priority: form.priority,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage("error", data.message || "Failed to add task.");
        return;
      }

      setForm(emptyForm);
      showMessage("success", "Task added successfully.");
      await fetchTasks();
    } catch {
      showMessage("error", "Network error while adding task.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`${API_BASE}/update/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });

      if (!res.ok) throw new Error();
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } catch {
      showMessage("error", "Failed to update task status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task permanently?")) return;

    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showMessage("success", "Task deleted.");
    } catch {
      showMessage("error", "Failed to delete task.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Student Task Management System</h1>
          <p style={styles.subtitle}>
            Track assignments, deadlines, and priorities in one place
          </p>
        </header>

        {message.text ? (
          <div
            style={{
              ...styles.alert,
              ...(message.type === "error" ? styles.alertError : styles.alertSuccess),
            }}
          >
            {message.text}
          </div>
        ) : null}

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Add New Task</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Chapter 5 homework"
                value={form.title}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="e.g. Mathematics"
                value={form.subject}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="deadline">
                Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                style={styles.select}
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                ...styles.submitBtn,
                opacity: submitting ? 0.7 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Adding…" : "Add Task"}
            </button>
          </form>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Your Tasks</h2>
          <div style={styles.tableWrap}>
            {loading ? (
              <p style={styles.emptyState}>Loading tasks…</p>
            ) : tasks.length === 0 ? (
              <p style={styles.emptyState}>
                No tasks yet. Add your first assignment above.
              </p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Done</th>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>Subject</th>
                    <th style={styles.th}>Deadline</th>
                    <th style={styles.th}>Priority</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task._id}
                      style={task.isCompleted ? styles.rowCompleted : undefined}
                    >
                      <td style={styles.td}>
                        <input
                          type="checkbox"
                          checked={!!task.isCompleted}
                          onChange={() => toggleComplete(task)}
                          style={styles.checkbox}
                          aria-label={`Mark "${task.title}" as complete`}
                        />
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          textDecoration: task.isCompleted ? "line-through" : "none",
                        }}
                      >
                        {task.title}
                      </td>
                      <td style={styles.td}>{task.subject}</td>
                      <td style={styles.td}>{formatDate(task.deadline)}</td>
                      <td style={styles.td}>
                        <span style={styles.priorityBadge(task.priority)}>
                          {task.priority}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          type="button"
                          onClick={() => handleDelete(task._id)}
                          style={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
