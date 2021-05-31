import {useState, useEffect } from 'react';
import { createItem, fetchListItems, updateList, deleteListItem } from './services/shoppingList-service'
import './App.css';

import Header from './components/Header/Header'

export default function App() {
  const [shoppingListState, setShoppingListState] = useState({
    listItems: [{item: 'Coffee', quantity: 1, unit: 'bag'}],
    newListItem: {
      item: '',
      quantity: ' ',
      unit: ' '
    },
    editMode: false
  });

  useEffect(function() {
    async function getAppData() {

      const listItems = await fetchListItems();

      setShoppingListState(prevState => ({
        ...prevState,
        listItems
      }));
    }
    getAppData();

    return function(){

    }
  }, []);


  async function handleSubmit(evt) {
    evt.preventDefault();

    if(shoppingListState.editMode){
      try {
        const listItems = await updateList(shoppingListState.newListItem)
        setShoppingListState(prevState => ({
          ...prevState,
          listItems,
          editMode: false,
          newListItem: {
            item: '',
            quantity: ' ',
            unit: ' '
          }
        }));
      } catch (error) {

      }
    } else {
      try{
        const listItem = await createItem(shoppingListState.newListItem);

        setShoppingListState({
          listItems: [...shoppingListState.listItems, listItem],
          newListItem: {
            item: '',
            quantity: ' ',
            unit: ' '
          }
        });
      } catch (error){
        console.log(error);
      }
    }
  }

  function handleChange(evt) {
    setShoppingListState(prevState => ({
      ...prevState,
      newListItem : {
        ...prevState.newListItem,
        [evt.target.name]: evt.target.value
      }
    }))
  }

  function handleEdit(id) {
    const itemToEdit = shoppingListState.listItems.find(item => item._id === id);
    setShoppingListState(prevState => ({
      ...prevState,
      newListItem: itemToEdit,
      editMode: true
    }));
  }

  async function handleDelete(id) {
    try{
      const listItems = await deleteListItem(id);
      setShoppingListState(prevState => ({
        ...prevState,
        listItems
      })
       
      )
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <>
    < Header  />
    <section>
      {shoppingListState.listItems.map((list, idx) => (
        <article key={idx}>
          <div>{list.item}</div> 
          <div>{list.quantity}</div>
          <div>{list.unit}</div>
          <div 
          className="controls"
          onClick={() => handleEdit(list._id)}
          >{'✏️'}</div>
            <div 
          className="controls"
          onClick={() => handleDelete(list._id)}
          >{'🚮'}</div>
        </article>
      )) 
        }
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          <span>ITEM</span>
          <input name="item" value={shoppingListState.newListItem.item} onChange={handleChange}/>
        </label>
        <label>
          <span>QUANTITY</span>
          <select name="quantity" value={shoppingListState.newListItem.quantity} onChange={handleChange}>
            <option value=" " disabled selected>Choose the Quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          <span>UNIT</span>
          <select name="unit" value={shoppingListState.newListItem.unit} onChange={handleChange}>
            <option value=" " disabled selected>Choose the Unit</option>
            <option value="Box">Box</option>
            <option value="Bag">Bag</option>
            <option value="Pounds">Pounds</option>
            <option value="Ounces">Ounces</option>
            <option value="Number">Number</option>
          </select>
        </label>
        <button>{shoppingListState.editMode ? 'EDIT ITEM' : 'ADD ITEM'} </button>
      </form>
    </section>
    </>
  );


}