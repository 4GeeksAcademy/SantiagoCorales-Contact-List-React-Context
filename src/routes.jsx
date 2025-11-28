import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ContactList from "./pages/ContactList";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import Single from "./pages/Single";
import Demo from "./pages/Demo";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<h1>Not found!</h1>}
    >
      <Route path="/" element={<Navigate to="/contacts" />} />

      <Route path="/contacts" element={<ContactList />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/edit-contact/:theId" element={<EditContact />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
    </Route>
  )
);
