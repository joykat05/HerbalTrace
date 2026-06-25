import "./app.css";
import Card from "./components/card";
import { Input, Loader, showToast } from "./components/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });

  

  const onSubmit = async (data) => {
    try {
      console.log("LOGIN DATA:", data);

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      await new Promise((r) => setTimeout(r, 800));

      if (!response.ok) {
        showToast(result.message || "Invalid Credentials", "error");
        return;
      }

      showToast("Login Successful!", "success");

      // small delay so loader is visible (optional UX polish)
      await new Promise((r) => setTimeout(r, 800));

      // navigate("/dashboard");
    } catch (error) {
        await new Promise((r) => setTimeout(r, 800));
      console.error(error);
      showToast("Server error. Please try again.", "error");
    }
  };

  const onError = (errors) => {
    console.log("BLOCKED ERRORS:", errors);
  };

  return (
    <div className="justify-center items-center flex m-10 p-4  rounded-2xl  bg-black/30  dark:bg-gray-900/30">
      <Card
        title={
          <div className="flex items-center gap-2">
            Log In
            <span className="material-symbols-outlined bg-green-300 text-white rounded-full p-2 text-[40px]">
              login
            </span>
          </div>
        }
      >
        {/* loader without destroying form */}
        {isSubmitting && (
          <div className="flex justify-center my-4">
            <Loader size={80} />
          </div>
        )}

        <form
          className="p-6 w-full grid gap-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Input
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
              maxLength: {
                value: 10,
                message: "Maximum 10 characters allowed",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        <br />

        <p className="text-sm text-center mt-3 text-gray-500">
          Don’t have an account?{" "}
          <span className="text-green-600 cursor-pointer">Sign up</span>
        </p>
      </Card>
    </div>
  );
}