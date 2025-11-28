import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const API_URL = "https://playground.4geeks.com/contact";

export const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();

  const crearUsuario = async () => {
    try {
      await fetch(`${API_URL}/users/SantiagoC`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Error creando usuario:", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const resp = await fetch(`${API_URL}/agendas/SantiagoC/contacts`);
      if (resp.status === 404) {
        await fetch(`${API_URL}/agendas/SantiagoC`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contacts: [] }),
        });
        return fetchContacts();
      }
      const data = await resp.json();
      const contactsArray = Array.isArray(data) ? data : data.contacts || [];
      dispatch({ type: "load_contacts", payload: contactsArray });
    } catch (err) {
      console.error("Error cargando contactos:", err);
      dispatch({ type: "load_contacts", payload: [] });
    }
  };

  useEffect(() => {
    crearUsuario().then(fetchContacts);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Lista de contactos</h1>
        <Link to="/add-contact">
          <button className="btn btn-success">Agregar contacto</button>
        </Link>
      </div>

      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((c) => <ContactCard key={c.id} contact={c} />)
      ) : (
        <p>No hay contactos.</p>
      )}
    </div>
  );
};

export default ContactList;
