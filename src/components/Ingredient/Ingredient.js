import styles from './Ingredient.module.css'

function Ingredient({ingredient}) {
    return (
        <div className={styles.ingredient}>
             <section> 
                <li>{ingredient.originalName}</li>
               
             </section>
        </div>
    );
}

export default Ingredient