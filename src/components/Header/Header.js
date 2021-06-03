import { login, logout } from '../../services/firebase'
import styles from './Header.module.css';

function Header(props) {
    return (
        <header className={styles.header}>
            <h1>{'🛒'}ShoppingList</h1>
            <nav>
                <ul>
                    {
                        props.user ?
                        <>
                        
                        <li>Welcome, {props.user.displayName}</li>
                        <li>
                            <img src={props.user.photoURL} 
                            alt={props.user.displayName} 
                            style={{height: '2.5rem', borderRadius: '42%'}}/>
                        </li>
                        <li 
                        className={styles.navLink}
                        onClick={logout}>
                            Logout
                        </li>
                        </>
                        :
                        <li
                        className={styles.navLink}
                        onClick={login}>
                            Login
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}


export default Header;