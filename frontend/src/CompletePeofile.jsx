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
    <div className="flex justify-center items-center h-screen w-full bg-black/60 p-10">
      <div className="m-5 wd-md space-y-2 bg-linear-to-r from-green-800/80 to-green-950 text-white font-prompt shadow-[0px_0px_24px_5px_rgba(255,255,255,1)] p-5 rounded-2xl text-2xl">
      <h2 >Complete Your Profile</h2>

      <p >
        Welcome! Please tell us which organization you belong to before
        continuing.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Organization Name</label>
          <br />
          <input
          className=" focus:shadow-[0px_0px_17px_0px_rgba(255,255,255,1)]
          focus:ring-2 focus:ring-green-200 p-2 mt-2 border-white border-2 rounded-2xl"
            type="text"
            placeholder="e.g. PRG Oils"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Role</label>
          <br />
          <select
           className=" focus:shadow-[0px_0px_17px_0px_rgba(255,255,255,1)]
          focus:ring-2 focus:ring-green-200 border-white border-2 rounded-2xl p-2 mt-2 text-gray-900"
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

        <button type="submit" disabled={loading}
        className="text-green-800 bg-white border-2 border-green-800 p-2 rounded-2xl font-prompt hover:shadow-[0px_0px_17px_0px_rgba(255,255,255,1)]"
        >
          {loading ? "Creating Account..." : "Finish Registration"}
        </button>
      </form>
    </div>
    </div>
  );
}

export default CompleteProfile;