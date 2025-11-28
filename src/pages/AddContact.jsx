import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact";

export default function AddContact() {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(`${API_URL}/agendas/SantiagoC/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (resp.status === 404) {
        await fetch(`${API_URL}/agendas/SantiagoC`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contacts: [] }),
        });
        return handleSubmit(e); 
      }

      const data = await resp.json();
      dispatch({ type: "add_contact", payload: data });
      navigate("/contacts");
    } catch (err) {
      console.error("Error agregando contacto:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h2>Agregar contacto</h2>
      <input
        className="form-control mb-3"
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
      />
      <input
        className="form-control mb-3"
        name="phone"
        placeholder="Teléfono"
        onChange={handleChange}
      />
      <input
        className="form-control mb-3"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        className="form-control mb-3"
        name="address"
        placeholder="Dirección"
        onChange={handleChange}
      />
      <button className="btn btn-primary">Guardar</button>
    </form>
  );
}
