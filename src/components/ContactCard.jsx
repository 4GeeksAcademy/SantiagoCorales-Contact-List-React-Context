import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";


const API_URL = "https://playground.4geeks.com/contact";

export default function ContactCard({ contact }) {
    const { dispatch } = useGlobalReducer();

    const handleDelete = async (id) => {
        try {
            const resp = await fetch(`${API_URL}/agendas/SantiagoC/contacts/${id}`, {
                method: "DELETE",
            });

            if (!resp.ok) throw new Error("No se pudo borrar el contacto");

            dispatch({ type: "delete_contact", payload: id });
        } catch (err) {
            console.error("Error al borrar el contacto:", err);
        }
    };

    return (
        <div className="card mb-3 p-3 d-flex flex-row align-items-center">
            <img
                src={`https://i.pravatar.cc/60?u=${contact.id}`}
                alt="contact"
                className="rounded-circle me-3"
                width="60"
                height="60"
            />

            <div className="flex-grow-1">
                <h5 className="mb-0">{contact.name}</h5>
                <p><FontAwesomeIcon icon={faPhone} /> {contact.phone}</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> {contact.email}</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {contact.address}</p>
            </div>

            <div className="d-flex flex-column ms-3">
                <Link to={`/edit-contact/${contact.id}`}>
                    <button className="btn btn-sm btn-primary mb-2">Editar</button>
                </Link>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(contact.id)}
                >
                    Borrar
                </button>
            </div>
        </div>
    );
}
