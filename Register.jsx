import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const register = async (e) => {
        e.preventDefault();
        const res = await fetch("/djangoapp/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email
            }),
        });
        const json = await res.json();
        if (json.status) {
            sessionStorage.setItem('username', json.userName);
            window.location.href = "/djangoapp/";
        } else {
            alert(json.error || "Registration failed");
        }
    };

    return (
        <div className="register_container">
            <h2>SignUp</h2>
            <form onSubmit={register}>
                <div>
                    <label>User Name:</label>
                    <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
