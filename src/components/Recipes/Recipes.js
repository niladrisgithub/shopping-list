import styles from './Recipes.module.css'
import Ingredient from '../Ingredient/Ingredient'

function Recipes({recipe}) {
    return (
        <div className={styles.recipe}>
             <section>
                <h3>Inspiration</h3>
                <p>Recipe: {recipe.title}</p>
                
            {recipe.extendedIngredients.map ((ingredient, idx) => (
          < Ingredient key={idx} ingredient={ingredient} />
        ))}

            <a href={recipe.spoonacularSourceUrl}>{recipe.spoonacularSourceUrl}</a>
                
            
             </section>
        </div>
    )
}

export default Recipes