import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import { createItem, fetchListItems, updateList, deleteListItem } from './services/shoppingList-service'
import './App.css';

import Header from './components/Header/Header'

export default function App() {
  const [shoppingListState, setShoppingListState] = useState({
    listItems: [{item: 'Coffee', quantity: 2, unit: 'Bag'}, {item: 'Bananas', quantity: 1, unit: 'Pounds'}],
    newListItem: {
      item: '',
      quantity: '1',
      unit: 'Box'
    },
    editMode: false
  });

  const [ userState, setUserState ] = useState({
    user: null,
  })


  useEffect(function() {
    async function getAppData() {

      if(!userState.user) return;
      
      const listItems = await fetchListItems(userState.user.uid);

      setShoppingListState(prevState => ({
        ...prevState,
        listItems
      }));
    }
    getAppData();

    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    return function(){
      unsubscribe();
    }
  }, [userState.user]);


  async function handleSubmit(evt) {
    if(!userState.user) return;
    evt.preventDefault();

    if(shoppingListState.editMode){
      try {
        const listItems = await updateList(shoppingListState.newListItem, userState.user.uid)
        setShoppingListState(prevState => ({
          ...prevState,
          listItems,
          editMode: false,
          newListItem: {
            item: '',
            quantity: '1',
            unit: 'Box'
          }
        }));
      } catch (error) {

      }
    } else {
      try{
        const listItem = await createItem(shoppingListState.newListItem, userState.user.uid);

        setShoppingListState({
          listItems: [...shoppingListState.listItems, listItem],
          newListItem: {
            item: '',
            quantity: '1',
            unit: 'Box'
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
    if(!userState.user) return;
    const itemToEdit = shoppingListState.listItems.find(item => item._id === id);
    setShoppingListState(prevState => ({
      ...prevState,
      newListItem: itemToEdit,
      editMode: true
    }));
  }

  async function handleDelete(id) {
    if(!userState.user) return;
    try{
      const listItems = await deleteListItem(id, userState.user.uid);
      setShoppingListState(prevState => ({
        ...prevState,
        listItems
      }));
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <>
    < Header user={userState.user} />
    <section>
      {userState.user ? shoppingListState.listItems.map((list, idx) => (
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
      )) :
      <article>No ShoppingList to Show - Login to get Started</article>
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
            <option value=" " disabled>Choose the Quantity</option>
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
            <option value=" " disabled>Choose the Unit</option>
            <option value="Box">Box</option>
            <option value="Bag">Bag</option>
            <option value="Pounds">Pounds</option>
            <option value="Ounces">Ounces</option>
            <option value="Number">Number</option>
          </select>
        </label>
        <button>{shoppingListState.editMode ? 'EDIT ITEM' : 'ADD ITEM'} </button>
      </form>
      <br />
    </section>
    </>
  );
}