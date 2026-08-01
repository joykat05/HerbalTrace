import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Loader } from "./components/ui";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
      const navigate = useNavigate();
   const handlelogout  = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
      navigate("/login");
      return;
    }

        const res = await fetch(`${import.meta.env.VITE_API_URL}user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const initials = profile?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  if (loading) {
    return (
      <div class="relative isolate min-h-screen w-full bg-slate-900 before:absolute before:inset-0 before:z-[-1] dark:before:bg-[url('/content/leaves.jpg')] before:bg-cover before:bg-center dark:before:brightness-40 before:brightness-40 before:bg-[url('/content/leaves3.jpg')] flex items-center justify-center">
         <Loader size={60} />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div class="relative isolate min-h-screen w-full bg-slate-900 before:absolute before:inset-0 before:z-[-1] dark:before:bg-[url('/content/leaves.jpg')] before:bg-cover before:bg-center dark:before:brightness-40 before:brightness-40 before:bg-[url('/content/leaves3.jpg')] flex items-center justify-center">
        <p className="text-red-400 font-prompt">{error || "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <div class="relative isolate min-h-screen w-full bg-slate-900 before:absolute before:inset-0 before:z-[-1] dark:before:bg-[url('/content/leaves.jpg')] before:bg-cover before:bg-center dark:before:brightness-40 before:brightness-40 before:bg-[url('/content/leaves3.jpg')]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link to="/dashboard">
          <p className="text-sm text-green-300 dark:text-green-300 hover:text-green-600 dark:hover:text-green-800 transition-colors flex items-center gap-1 w-fit backdrop-blur-xl p-1 rounded-3xl">
            ← Back to Dashboard
          </p>
        </Link>

        {/* Card */}
        <div className="mt-6 bg-gray-200/90 backdrop-blur rounded-2xl shadow-lg shadow-gray-700 dark:shadow-gray-500 border border-green-100 overflow-hidden dark:bg-gray-900/90 dark:border-black">
          {/* Header banner */}
          <div className="bg-linear-to-r from-green-500 to-green-800 h-18 relative">
            <div className="absolute -bottom-8 left-8 rounded-full w-20 h-20 bg-white p-1 dark:bg-white/80">
              <div className="w-full h-full rounded-full bg-green-600 text-white flex justify-center items-center text-2xl font-semibold">
                {initials}
              </div>
            </div>
          </div>

          <div className="pt-12 pb-8 px-8">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">{profile.user.name}</h1>
              <span className="text-xs font-medium uppercase tracking-wide bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                {profile.user.role}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{profile.user.organization}</p>

            {/* Personal Details */}
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Personal Details
              </h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between border-b border-green-50 dark:border-green-50/40 pb-2">
                  <span className="text-green-700">Email</span>
                  <span className="text-gray-700 font-medium dark:text-gray-300">{profile.user.email}</span>
                </div>
                <div className="flex justify-between border-b border-green-50 pb-2 dark:border-green-50/40">
                  <span className="text-green-700">Organization</span>
                  <span className="text-gray-700 font-medium dark:text-gray-300">{profile.user.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Role</span>
                  <span className="text-gray-700 font-medium capitalize dark:text-gray-300">{profile.user.role}</span>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Your Activity
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-200 rounded-xl p-4">
                  <p className="text-xs text-green-700">Total Batches Added</p>
                  <p className="text-lg font-semibold text-green-700 mt-1">{profile.activity.totalBatchesAdded}</p>
                </div>
                <div className="bg-green-200 rounded-xl p-4">
                  <p className="text-xs text-green-700">Total Dispatched</p>
                  <p className="text-lg font-semibold text-green-700 mt-1">{profile.activity.totalDispatchesAdded}</p>
                </div>
              </div>
            </div>

            <button onClick={handlelogout} className="mt-8 w-full sm:w-auto px-6 py-2.5 bg-pink-500/80 hover:bg-pink-600/80 transition-colors text-white text-sm font-medium rounded-full">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}