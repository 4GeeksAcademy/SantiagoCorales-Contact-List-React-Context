import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact";

export default function EditContact() {
    const { theId } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const contact = store.contacts.find(c => c.id === parseInt(theId));
    const [form, setForm] = useState({ name: "", phone: "", email: "" });

    useEffect(() => {
        if (contact) setForm(contact);
    }, [contact]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetch(`${API_URL}/agendas/SantiagoC/contacts/${theId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({ type: "update_contact", payload: data });
            navigate("/contacts");
        })
        .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4">
            <h2>Editar contacto</h2>
            <input className="form-control mb-3" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
            <input className="form-control mb-3" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} />
            <input className="form-control mb-3" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input className="form-control mb-3" name="address" placeholder="Address" value={contact.address} onChange={handleChange} />

            <button className="btn btn-primary">Guardar cambios</button>
        </form>
    );
}
