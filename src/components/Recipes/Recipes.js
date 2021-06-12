import styles from './Recipes.module.css'

function Recipes({recipe}) {
    return (
        <div className={styles.recipe}>
             <section>
                <h3>Inspiration</h3>
                <p>Recipe: {recipe.title}</p>
                
                <p>Ingredients: {recipe.extendedIngredients.originalName}</p>
               
             </section>
        </div>
    )
}

export default Recipes