import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    const res = await api.post("/login", { email, password });
    login(res.data.token);
  };

  return (
    <div>
      <input onChange={e => setEmail(e.target.value)} placeholder="email"/>
      <input onChange={e => setPassword(e.target.value)} placeholder="password"/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
