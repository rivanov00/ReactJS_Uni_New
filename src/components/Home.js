import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');
  const [editingItemQuantity, setEditingItemQuantity] = useState(1);

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchShoppingList = async () => {
      if (isLoggedIn && user && user.id) {
        const fetchUrl = `http://localhost:5000/shoppinglist?userId=${user.id}`;
        try {
          const response = await fetch(fetchUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setShoppingListItems(data);
        } catch (error) {
        }
      } else {
        setShoppingListItems([]);
      }
    };

    fetchShoppingList();
  }, [isLoggedIn, user]);

  const handleAddItem = async (event) => {
    event.preventDefault();

    if (!isLoggedIn || !user || !user.id) {
        alert('Please log in to add items.');
        return;
    }

    if (!newItemName.trim()) {
      alert('Item name cannot be empty.');
      return;
    }

    if (newItemQuantity <= 0) {
      alert('Quantity must be at least 1.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/shoppinglist?userId=${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const currentList = await response.json();

      const itemExists = currentList.some(item =>
        item.name.trim().toLowerCase() === newItemName.trim().toLowerCase()
      );

      if (itemExists) {
        alert(`Item "${newItemName.trim()}" is already in your shopping list.`);
        setNewItemName('');
        setNewItemQuantity(1);
        return;
      }

    } catch (error) {
       alert('An error occurred while checking for existing items.');
       return;
    }


    try {
      const newItem = {
        name: newItemName.trim(),
        quantity: parseInt(newItemQuantity, 10),
        userId: user.id,
      };

      const response = await fetch('http://localhost:5000/shoppinglist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Failed to add item: ${errorData.message || response.statusText}`);
        return;
      }

      const addedItem = await response.json();
      setShoppingListItems([...shoppingListItems, addedItem]);
      setNewItemName('');
      setNewItemQuantity(1);

    } catch (error) {
      alert('An error occurred while adding the item.');
    }
  };

  const handleDeleteItem = async (itemId) => {
      if (!isLoggedIn || !user || !user.id) {
        alert('Please log in to delete items.');
        return;
    }
    try {
      const response = await fetch(`http://localhost:5000/shoppinglist/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Failed to delete item: ${errorData.message || response.statusText}`);
        return;
      }

      setShoppingListItems(shoppingListItems.filter(item => item.id !== itemId));

    } catch (error) {
      alert('An error occurred while deleting the item.');
    }
  };

  const handleEditClick = (item) => {
      if (!isLoggedIn || !user || !user.id) {
        alert('Please log in to edit items.');
        return;
    }
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

      if (!isLoggedIn || !user || !user.id) {
        alert('Please log in to save edits.');
        return;
    }

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
        userId: user.id,
      };

      const response = await fetch(`http://localhost:5000/shoppinglist/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
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
      alert('An error occurred while updating the item.');
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-title">{isLoggedIn && user && user.username ? `${user.username}'s Shopping List` : 'Shopping List'}</h2>

      {isLoggedIn ? (
        <form onSubmit={handleAddItem} className="add-item-form">
          <input
            type="text"
            placeholder="Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="home-input"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            className="home-input"
            min="1"
            required
          />
          <button type="submit" className="add-button">Add Item</button>
        </form>
      ) : (
           <p className="empty-list-message">Please log in to view and manage your shopping list.</p>
      )}

      {isLoggedIn && shoppingListItems.length > 0 ? (
        <ul className="shopping-list">
          {shoppingListItems.map(item => (
            <li key={item.id} className="list-item">
              {editingItemId === item.id ? (
                <form onSubmit={handleEditSubmit} className="edit-item-form">
                   <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                    className="home-input"
                    required
                  />
                   <input
                    type="number"
                    value={editingItemQuantity}
                    onChange={(e) => setEditingItemQuantity(e.target.value)}
                    className="home-input"
                    min="1"
                    required
                  />
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel</button>
                </form>
              ) : (
                <>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEditClick(item)} className="edit-button">Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)} className="delete-button">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : isLoggedIn && shoppingListItems.length === 0 ? (
        <p className="empty-list-message">{user && user.username ? `${user.username}, your shopping list is empty.` : 'Your shopping list is empty.'}</p>
      ) : null
      }
    </div>
  );
}

export default Home;
