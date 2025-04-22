import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');
  const [editingItemQuantity, setEditingItemQuantity] = useState(1);

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
      alert('Item name cannot be empty.');
      return;
    }

     if (newItemQuantity <= 0) {
         alert('Quantity must be at least 1.');
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
         alert(`Failed to add item: ${errorData.message || response.statusText}`);
        return;
      }

      const addedItem = await response.json();
      setShoppingListItems([...shoppingListItems, addedItem]);
      setNewItemName('');
      setNewItemQuantity(1);

    } catch (error) {
      console.error('Error adding item:', error);
      alert('An error occurred while adding the item.');
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
         alert(`Failed to delete item: ${errorData.message || response.statusText}`);
        return;
      }

      setShoppingListItems(shoppingListItems.filter(item => item.id !== itemId));

    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred while deleting the item.');
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
         alert('Item name cannot be empty.');
         return;
     }

     if (editingItemQuantity <= 0) {
         alert('Quantity must be at least 1.');
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
         alert(`Failed to update item: ${errorData.message || response.statusText}`);
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
      alert('An error occurred while updating the item.');
    }
  };


  return (
    <div>
      <h2>My Shopping List</h2>

      <form onSubmit={handleAddItem}>
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
        <button type="submit">Add Item</button>
      </form>

      {shoppingListItems.length > 0 ? (
        <ul>
          {shoppingListItems.map(item => (
            <li key={item.id}>
              {editingItemId === item.id ? (
                <form onSubmit={handleEditSubmit}>
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
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
              ) : (
                <>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your shopping list is empty or could not be loaded..</p>
      )}
    </div>
  );
}

export default Home;