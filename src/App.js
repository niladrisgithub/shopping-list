import {useState, useEffect } from 'react';
import { createItem, fetchListItems, updateList } from './services/shoppingList-service'
import './App.css';

import Header from './components/Header/Header'

export default function App() {
  const [shoppingListState, setShoppingListState] = useState({
    listItems: [{item: 'Coffee', quantity: 1, unit: 'bag'}],
    newListItem: {
      item: '',
      quantity: '1',
      unit: ''
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
            quantity: '1',
            unit: ''
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
            quantity: '1',
            unit: ''
          }
        });
      } catch (error){
        console.log(error);
      }
    }
  }


  return (
    <>
    < Header  />
    {/* <section>
      {userState.user ? state.listItems.map((list, idx) =>
      <article key={idx}> 
      <div>{list.item}</div>
      <div>{list.quantity}</div>
      <div>{list.unit}</div>
      </article>):
        }
    </section> */}
    </>
  )




}

