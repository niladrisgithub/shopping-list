import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import { createItem, fetchListItems, updateList, deleteListItem } from './services/shoppingList-service';
import './App.css';
// import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Recipes from './components/Recipes/Recipes';
// import Ingredient from './components/Ingredient/Ingredient'


export default function App() {
  const [shoppingListState, setShoppingListState] = useState({
    listItems: [{item: 'Coffee', quantity: 2, unit: 'Bag'}],
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

  const [ recipeState, setRecipeState ] = useState({
    recipes: [{
      title: '',
      extendedIngredients: [{name: ''}]
    }],
    },

  )
 

  useEffect(function() {
    async function getAppData() {

      if(!userState.user) return;
      
      const listItems = await fetchListItems(userState.user.uid);

      setShoppingListState(prevShoppingListState => ({
        ...prevShoppingListState,
        listItems
      }));

      const data = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=bee476ec188041048efea73c25ecc2cb`
      ).then(res => res.json())
       setRecipeState(data);
      
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
        setShoppingListState(prevShoppingListState => ({
          ...prevShoppingListState,
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
    setShoppingListState(prevShoppingListState => ({
      ...prevShoppingListState,
      newListItem: {
        ...prevShoppingListState.newListItem,
        [evt.target.name]: evt.target.value
      }
    }));
  }

  function handleEdit(id) {
    if(!userState.user) return;
    const itemToEdit = shoppingListState.listItems.find(item => item._id === id);
    setShoppingListState(prevShoppingListState => ({
      ...prevShoppingListState,
      newListItem: itemToEdit,
      editMode: true
    }));
  } 
  

  async function handleDelete(id) {
    if(!userState.user) return;
    try{
      const listItems = await deleteListItem(id, userState.user.uid);
      setShoppingListState(prevShoppingListState => ({
        ...prevShoppingListState,
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
      <br />
      {userState.user ? shoppingListState.listItems.map((list, idx) => (
        <article key={idx}>
          <div>{list.item}</div> 
          <div>{list.quantity}</div>
          <div>{list.unit}</div>
          <div 
          className="controls"
          onClick={() => handleEdit(list._id)}
          >{'✏️✏️✏️'}</div>
            <div 
          className="controls"
          onClick={() => handleDelete(list._id)}
          > {'🛒'}
          </div>
        </article>
      )) :
      <article>There's Nothing to See Here! - Log In to See What to Purchase!</article>
        }
     
       
      <br/>
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
            <option value="Box(es)">Box(es)</option>
            <option value="Bag(s)">Bag(s)</option>
            <option value="Jar(s)">Jar(s)</option>
            <option value="Bottle(s)">Bottle(s)</option>
            <option value="Number(s)">Number(s)</option>
            <option value="Ounce(s)">Ounce(s)</option>
            <option value="Pound(s)">Pound(s)</option>
          </select>
        </label>
        <button disabled={!userState.user}>{shoppingListState.editMode ? 'EDIT ITEM' : 'ADD ITEM'} </button>
      </form>
        <br />
      <div className="recipes">
        { userState.user ? recipeState.recipes.map ((recipe, idx) => (
        < Recipes key={idx} recipe={recipe} />
      )):
      <article>Log In to 👀 an Inspirational Recipe</article>
        }
   </div>
        
      <br />
    </section>
    < Footer />
 
    </>
  );
}