import React, { useState, useEffect } from 'react';

function Home() {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

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


    console.log('Attempting to add item:', { name: newItemName, quantity: newItemQuantity });

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

  // Function to handle deleting an item
  const handleDeleteItem = async (itemId) => {
    console.log('Attempting to delete item with ID:', itemId);

    try {
      // Make a DELETE request to the specific item's endpoint
      // JSON Server handles deleting the item by its ID
      const response = await fetch(`http://localhost:5000/shoppinglist/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
         const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
         alert(`Failed to delete item: ${errorData.message || response.statusText}`);
        return;
      }

      // If the DELETE request is successful, update the state
      // Remove the deleted item from the shoppingListItems array
      setShoppingListItems(shoppingListItems.filter(item => item.id !== itemId));

      console.log('Item deleted successfully:', itemId);

    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred while deleting the item.');
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
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              {/* Add the Delete button */}
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your shopping list is empty or could not be loaded.</p>
      )}
    </div>
  );
}

export default Home;