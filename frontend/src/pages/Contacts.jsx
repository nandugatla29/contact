import { useEffect, useState } from 'react';
import { getContacts, addContact, deleteContact } from '../services/contactService';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phonenumber: ''
});

  async function load() {
    const res = await getContacts();
    if (res && res.success) setContacts(res.contacts || []);
    else alert(res.message || 'Could not load contacts');
  }

  useEffect(()=>{ load(); }, []);

  async function handleAdd(e){
    e.preventDefault();
    const res = await addContact(form);
    if(res && res.success){
      setForm({ name:'', email:'', phonenumber:'' });
      load();
    } else alert(res.message || 'Add failed');
  }

  async function handleDelete(id){
    if(!confirm('Delete contact?')) return;
    const res = await deleteContact(id);
    if(res && res.success) load();
    else alert(res.message || 'Delete failed');
  }

  return (
    <div className="contacts-page">
      <h2>Your Contacts</h2>
      <form onSubmit={handleAdd} className="add-form">
        <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input placeholder="Phone" value={form.phonenumber} onChange={(e)=>setForm({...form,phonenumber:e.target.value})} required />
        <button type="submit">Add</button>
      </form>

      <ul className="contacts-list">
        {contacts.map(c=> (
          <li key={c._id}>
            <div>{c.name} — {c.email} — {c.phonenumber}</div>
            <button onClick={()=>handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
