import React, { useState, useEffect } from 'react';
import './Home.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get user info

function Home() {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');
  const [editingItemQuantity, setEditingItemQuantity] = useState(1);

  // Get the logged-in user from AuthContext
  const { user } = useAuth();

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await fetch('http://localhost:5000/shoppinglist');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setShoppingListItems(data);
      } catch (error) {
        console.error("Could not fetch shopping list:", error);
      }
    };

    fetchShoppingList();
  }, []);

  const handleAddItem = async (event) => {
    event.preventDefault();

    if (!newItemName.trim()) {
      alert('Item name cannot be empty.'); // Consider using state for messages
      return;
    }

    if (newItemQuantity <= 0) {
      alert('Quantity must be at least 1.'); // Consider using state for messages
      return;
    }

    try {
      const newItem = {
        name: newItemName.trim(),
        quantity: parseInt(newItemQuantity, 10),
      };

      const response = await fetch('http://localhost:5000/shoppinglist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Failed to add item: ${errorData.message || response.statusText}`); // Consider using state for messages
        return;
      }

      const addedItem = await response.json();
      setShoppingListItems([...shoppingListItems, addedItem]);
      setNewItemName('');
      setNewItemQuantity(1);

    } catch (error) {
      console.error('Error adding item:', error);
      alert('An error occurred while adding the item.'); // Consider using state for messages
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Failed to delete item: ${errorData.message || response.statusText}`); // Consider using state for messages
        return;
      }

      setShoppingListItems(shoppingListItems.filter(item => item.id !== itemId));

    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred while deleting the item.'); // Consider using state for messages
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
    setEditingItemQuantity(item.quantity);
  };

  const handleCancelClick = () => {
    setEditingItemId(null);
    setEditingItemName('');
    setEditingItemQuantity(1);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingItemName.trim()) {
      alert('Item name cannot be empty.'); // Consider using state for messages
      return;
    }

    if (editingItemQuantity <= 0) {
      alert('Quantity must be at least 1.'); // Consider using state for messages
      return;
    }

    try {
      const updatedItem = {
        id: editingItemId,
        name: editingItemName.trim(),
        quantity: parseInt(editingItemQuantity, 10),
      };

      const response = await fetch(`http://localhost:5000/shoppinglist/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Failed to update item: ${errorData.message || response.statusText}`); // Consider using state for messages
        return;
      }

      const returnedItem = await response.json();

      setShoppingListItems(
        shoppingListItems.map(item =>
          item.id === editingItemId ? returnedItem : item
        )
      );

      setEditingItemId(null);
      setEditingItemName('');
      setEditingItemQuantity(1);

    } catch (error) {
      console.error('Error updating item:', error);
      alert('An error occurred while updating the item.'); // Consider using state for messages
    }
  };


  return (
    <div className="home-container"> {/* Assuming you have a home-container class in Home.css */}
      {/* Display username in the heading */}
      <h2>{user && user.username ? `${user.username}'s Shopping List` : 'Shopping List'}</h2>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="add-item-form"> {/* Assuming add-item-form class */}
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          min="1"
          required
        />
        <button type="submit" className="add-button">Add Item</button> {/* Assuming add-button class */}
      </form>

      {/* Shopping List Display */}
      {shoppingListItems.length > 0 ? (
        <ul className="shopping-list"> {/* Assuming shopping-list class */}
          {shoppingListItems.map(item => (
            <li key={item.id} className="list-item"> {/* Assuming list-item class */}
              {editingItemId === item.id ? (
                // Edit Form
                <form onSubmit={handleEditSubmit} className="edit-item-form"> {/* Assuming edit-item-form class */}
                   <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                    required
                  />
                   <input
                    type="number"
                    value={editingItemQuantity}
                    onChange={(e) => setEditingItemQuantity(e.target.value)}
                    min="1"
                    required
                  />
                  <button type="submit" className="save-button">Save</button> {/* Assuming save-button class */}
                  <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel</button> {/* Assuming cancel-button class */}
                </form>
              ) : (
                // Item Details and Buttons
                <>
                  <div className="item-details"> {/* Assuming item-details class */}
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-actions"> {/* Assuming item-actions class */}
                    <button onClick={() => handleEditClick(item)} className="edit-button">Edit</button> {/* Assuming edit-button class */}
                    <button onClick={() => handleDeleteItem(item.id)} className="delete-button">Delete</button> {/* Assuming delete-button class */}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        // Message when list is empty
        <p>Your shopping list is empty or could not be loaded..</p>
      )}
    </div>
  )
}

export default Home;