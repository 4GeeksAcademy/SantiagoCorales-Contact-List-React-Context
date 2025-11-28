import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Single() {
    const { store } = useGlobalReducer();
    const { theId } = useParams();
    const contact = store.contacts.find(c => c.id === parseInt(theId));

    if (!contact) return <p>Contacto no encontrado</p>;

    return (
        <div>
            <h2>{contact.name}</h2>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
        </div>
    );
}

