import { Fragment, useState } from "react";
import IDrink from "../../dto/IDrink";
import styles from "./DrinkList.module.scss";
import { URL, TempId } from "../../constants/constants";

const DrinkList = ({drinks, onFetchDrinks}) => {
    const[newDrink, setNewDrink] = useState([]);
    const[isNewDrink, setIsNewDrink] = useState(false);

    const handleNewDrinkSubmit = async (event) => {
        event.preventDefault();
        const drink = new IDrink(TempId, newDrink);
        await fetch(`${URL}/drink`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(drink)
        })
        .then((res) => res.json())
        .then(resData => console.log(resData))
        .then(() => {
            setIsNewDrink(false);
            onFetchDrinks();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <Fragment>
            <div className={styles.drinkList}>
                {isNewDrink ? 
                    <div className={styles.drink}>
                        <div className={styles.heading}>
                            <h2>New Drink</h2>
                        </div>
                        <hr />
                        <form className={styles.drinkForm} onSubmit={handleNewDrinkSubmit}>
                            <input placeholder="Drink Name" 
                                onChange={event => setNewDrink(event.target.value)} value={newDrink} />
                            <button className={styles.addDrink} type="submit">Save</button>
                        </form>
                    </div> 
                    : 
                    <div className={styles.drinks}>
                        <div className={styles.heading}>
                            <h2>Drink list</h2> 
                        </div>
                        <hr />
                        {drinks.length > 0 ? 
                            <ul>
                                {drinks.map((obj, key) => (
                                    <li key={obj.Id}>{obj.Name}</li>
                                ))}
                            </ul>
                        :
                            <p>Drink list is empty</p>
                        }
                        <div className={styles.newDrink}>
                            <span onClick={() => setIsNewDrink(true)}>New Drink</span>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default DrinkList;