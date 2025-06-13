import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();

        if(email.trim() !== ""){
            navigate("/news") // Login Success --> News List
        }else{
            alert("Enter your email: ")
        }
    }

    return (
    <div style={{ padding: 40 }}>
      <h2>Welcome to News!</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, width: "100%", marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10 }}>
          Login
        </button>
      </form>
    </div>
  );
}

  