import {useState, useEffect } from 'react';

import './App.css';

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

    if(state.editMode){
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
          listItems: [...state.listItems, listItem],
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

}

