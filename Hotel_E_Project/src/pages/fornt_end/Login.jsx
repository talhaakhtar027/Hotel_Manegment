import { useState } from "react";

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister ? "http://localhost:3000/api/users/register" : "http://localhost:3000/api/users/login";
        const body = isRegister ? formData : { email: formData.email, password: formData.password };
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error(isRegister ? "Registration failed" : "Login failed");

            const data = await response.json();
            if (!isRegister) {
                localStorage.setItem("authToken", data.token);
                alert("Login successful! Welcome, " + data.user.name);
                window.location.href = "booking.html";
            } else {
                alert("Registration successful! You can now login.");
                setIsRegister(false);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">{isRegister ? "Register" : "Login"}</h2>
            <div className="w-80 p-4 border rounded-lg">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {isRegister && (
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-2 border mb-2"
                            required
                        />
                    )}
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border mb-2"
                        required
                    />
                    {isRegister && (
                        <input
                            type="text"
                            id="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="p-2 border mb-2"
                            required
                        />
                    )}
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-2 border mb-2"
                        required
                    />
                    <button type="submit" className="p-2 bg-green-600 text-white">{isRegister ? "Register" : "Login"}</button>
                </form>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="mt-2 text-blue-500 hover:underline"
                >
                    {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                </button>
            </div>
        </div>
    );
}