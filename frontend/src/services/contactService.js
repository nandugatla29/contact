const API_URL = 'http://localhost:5000/contacts';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export async function getContacts() {
  const res = await fetch(API_URL, { headers: authHeaders() });
  return res.json();
}

export async function addContact(contact) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(contact),
  });
  return res.json();
}

export async function deleteContact(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}
