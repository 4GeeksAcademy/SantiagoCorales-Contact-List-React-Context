import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact";

export default function EditContact() {
    const { theId } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const contact = store.contacts.find(c => c.id === parseInt(theId));
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (contact) setForm(contact);
    }, [contact]);

    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
        if (!form.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
        else if (!/^\+?[0-9 ]+$/.test(form.phone))
    newErrors.phone = "Solo se permiten números.";

        if (!form.email.trim()) newErrors.email = "El email es obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Formato de email inválido.";

        if (!form.address.trim()) newErrors.address = "La dirección es obligatoria.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!validate()) return;

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

    if (!contact) return <p>Contacto no encontrado</p>;

    return (
        <form onSubmit={handleSubmit} className="card p-4">
            <h2>Editar contacto</h2>

            <input 
                className="form-control mb-1" 
                name="name" 
                placeholder="Nombre" 
                value={form.name} 
                onChange={handleChange} 
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
            <br />

            <input 
                className="form-control mb-1" 
                name="phone" 
                placeholder="Teléfono" 
                value={form.phone} 
                onChange={handleChange} 
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
            <br />

            <input 
                className="form-control mb-1" 
                name="email" 
                placeholder="Email" 
                value={form.email} 
                onChange={handleChange} 
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
            <br />

            <input 
                className="form-control mb-1" 
                name="address" 
                placeholder="Dirección" 
                value={form.address} 
                onChange={handleChange} 
            />
            {errors.address && <small className="text-danger">{errors.address}</small>}
            <br />

            <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary">Guardar cambios</button>

                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => navigate("/contacts")}
                >
                    Volver atrás
                </button>
            </div>
        </form>
    );
}
