import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const navigate = useNavigate();

  // Get temp token from URL
  const token = new URLSearchParams(window.location.search).get("token");

  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("manager");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!orgName.trim()) {
      setError("Organization name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orgName,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-400 p-10">
      <h2>Complete Your Profile</h2>

      <p>
        Welcome! Please tell us which organization you belong to before
        continuing.
      </p>

      <form onSubmit={handleSubmit} className="m-5 bg-green-800/80 text-white font-promt">
        <div>
          <label>Organization Name</label>

          <input
            type="text"
            placeholder="e.g. PRG Oils"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <br />

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Finish Registration"}
        </button>
      </form>
    </div>
  );
}

export default CompleteProfile;