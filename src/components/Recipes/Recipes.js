import styles from './Recipes.module.css'

function Recipes({recipes}) {
    return (
        <div className={styles.recipe}>
             <section>
                <h3>Recipe: </h3>
             </section>
        </div>
    )
}

export default Recipes