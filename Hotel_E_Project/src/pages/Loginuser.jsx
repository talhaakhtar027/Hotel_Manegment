import { useState } from "react";

export default function Loginuser() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const formData = await response.json();
      const { token, user } = formData;

      localStorage.setItem("authToken", token);
      alert(`Login successful! Welcome, ${user.name}`);
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = formData;

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful! You can now login.");
      setIsRegistering(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegistering ? "Register" : "Login"}
        </h2>

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {isRegistering && (
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}

          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          {isRegistering && (
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <button
          onClick={() => setIsRegistering((prev) => !prev)}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}
