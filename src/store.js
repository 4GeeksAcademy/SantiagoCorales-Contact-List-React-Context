export const initialStore = () => ({
    contacts: []
});

export default function storeReducer(state, action) {
    switch (action.type) {
        case "load_contacts":
            return { ...state, contacts: action.payload };
        case "add_contact":
            return { ...state, contacts: [...state.contacts, action.payload] };
        case "delete_contact":
            return {
                ...state,
                contacts: state.contacts.filter(c => c.id !== action.payload)
            };
        case "update_contact":
            return {
                ...state,
                contacts: state.contacts.map(c =>
                    c.id === action.payload.id ? action.payload : c
                )
            };
        default:
            return state;
    }
}
