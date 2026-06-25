import "./app.css";
import Card from "./components/card";
import { Input, Loader, showToast } from "./components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      console.log("SUBMIT DATA:", data);
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      await new Promise((r) => setTimeout(r, 800));

      if (!response.ok) {
        showToast(result.message || "Signup failed", "error");
        return;
      }

      showToast("Signup successful!", "success");

      await new Promise((r) => setTimeout(r, 1000));

      // navigate("/dashboard");
    } catch (err) {
        await new Promise((r) => setTimeout(r, 800));
      console.log(err);
      showToast("Server error", "error");
    }
  };

  const onError = (errors) => {
    console.log("BLOCKED ERRORS:", errors);
  };

  return (
    <div className="justify-center items-center flex m-10 p-4 rounded-2xl  bg-black/30  dark:bg-gray-900/30">
      <Card
        title={
          <div className="flex items-center gap-2">
            Sign Up
            <span className="material-symbols-outlined bg-green-300 text-white rounded-full p-2 text-[40px]">
              how_to_reg
            </span>
          </div>
        }
      >
        {/* LOADER (does NOT destroy form) */}
        {isSubmitting && (
          <div className="flex justify-center my-4">
            <Loader size={80} />
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="p-6 w-full grid gap-4"
        >
          <Input
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 letters",
              },
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "Only letters allowed",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <Input
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <div className="relative">
            <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min 6 characters required",
              },
              maxLength: {
                value: 10,
                message: "Max 10 characters allowed",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-2 text-gray-600"
            >
            <span className="material-symbols-outlined">
                {showPassword ? "visibility_off" : "visibility"}
            </span>
            </button>
          </div>
          
          
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <select
            defaultValue=""
            {...register("role", {
              required: "Please select a role",
            })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-black/40"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}

          <Input
            placeholder = "Enter your organization name"
            {...register("orgName", {
              required: "Organization Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 letters",
              },
            })}
          />
          {errors.orgName && (
            <p className="text-red-500 text-sm">{errors.orgName.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
      </Card>
    </div>
  );
}