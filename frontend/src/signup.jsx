import "./app.css";
import Card from "./components/card";
import { Input, Loader, showToast } from "./components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
       localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      showToast("Signup successful!", "success");

      await new Promise((r) => setTimeout(r, 1000));

       navigate("/dashboard");
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
    
    <div className="justify-center items-center flex m-2 p-2 rounded-2xl  bg-[url(/content/flowers3.jpg)] bg-cover brightness-90  dark:brightness-50">
      <div className=" bg-linear-to-r from-green-600/80 to-green-800/80 w-4xl rounded-2xl flex gap-2" >
      <Card
        title={
          <div className="flex items-center gap-2">
            Create an Account
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
         <div className="flex justify-center items-center gap-2 mb-4 text-gray-500">
          <hr className="w-full"/>OR<hr className="w-full"/>
        </div>
       
               <button
          onClick={() => {
            window.location.href =
              "http://localhost:5000/api/auth/google";
          }}
          className="w-full border-2 border-green-300 p-2 font-prompt hover:text-gray-700 text-white rounded-2xl flex gap-4 justify-center items-center bg-green-600 hover:bg-white"
        >
          Continue with Google
          <FaGoogle size={22} className="max-md:text-[16px] text-green-400" />
        </button>
               
      </Card>
      
      <div className="w-2xl pt-10 pr-5">
       <div className="max-w-md text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-pink-400" style={{ fontSize: window.innerWidth < 768 ? "24px" : "50px" }}>
              local_florist
            </span>

            <h1 className="text-5xl font-bold tracking-wide font-prompt">
              HerbalTrace
            </h1>
          </div>
          <h2 className="text-3xl font-semibold leading-snug mb-4">
            Simplify Essential Oil Production Management
          </h2>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span>Centralized Batch Management</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span>Complete Production Traceability</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span>Linked Laboratory Certificates</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <span>Production Analytics & Insights</span>
            </div>
          </div>
        </div>
        <br/>
        <br/>
         <p className="text-sm text-center mt-3 text-white/90">
          Already have an account?
          <br/>
          <Link to="/login"><button className="text-pink-300 cursor-pointer border-2 m-2 rounded-xl border-pink-300 bg-none p-2">Log in</button></Link>
          
        </p>
        </div>
      
      </div>
    </div>
  );
}