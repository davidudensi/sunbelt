import { Fragment, useState } from "react";
import IPerson from "../../dto/IPerson";
import IAttendee from "../../dto/IAttendee";
import styles from "./AttendeeList.module.scss";
import { URL, TempId } from "../../constants/constants";

const AttendeeList = ({
    partyId, drinkId, people, allDrinks, onFetchDrinks, selectedParty, onFetchAttendees
}) => {
    const[firstName, setFirstName] = useState([]);
    const[lastName, setLastName] = useState([]);
    const[favoriteDrink, setFavoriteDrink] = useState(null);
    const[newPerson, setNewPerson] = useState(false);
    const[holderText, setHolderText] = useState("Select party to view attendees")

    const handleNewPersonSubmit = async (event) => {
        event.preventDefault();
        const person = new IPerson(TempId, firstName, lastName);
        const attendee = new IAttendee(TempId, partyId, '', drinkId);

        await fetch(`${URL}/person`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(person)
        }).then((response) => 
            response.json()
        ).then((data) => {
            attendee.PersonId = data.id;
            fetch( `${URL}/attendee`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(attendee)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then(() => {
                setNewPerson(false);
                onFetchAttendees(partyId, selectedParty);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Fragment>
            <div className={styles.attendeeList}>
                {newPerson ? 
                    <div className={styles.person}>
                        <div className={styles.heading}>
                            <h2>New Attendee</h2>
                        </div>
                        <hr />
                        <form className={styles.personForm} onSubmit={handleNewPersonSubmit}>
                            <input placeholder="First Name" 
                                onChange={event => setFirstName(event.target.value)} value={firstName} />
                            <input placeholder="Last Name" 
                                onChange={event => setLastName(event.target.value)} value={lastName} />
                            <select>
                                {allDrinks.map((obj, key) => (
                                    <option onChange={event => setFavoriteDrink(event.target.value)} value={favoriteDrink} 
                                        key={key}>{obj.Name}</option>
                                ))}
                            </select>
                            <button className={styles.addPerson} type="submit">Save</button>
                        </form>
                    </div> 
                    : 
                    <div className={styles.attendees}>
                        <div className={styles.heading}>
                            <h2>Attendee list</h2> 
                        </div>
                        <hr />
                        {people.length > 0 ? 
                            <ul>
                                {people.map((obj, key) => (
                                    <li onClick={() => onFetchDrinks(obj.Id)} key={obj.Id}>{obj.FirstName} {obj.LastName}</li>
                                ))}
                            </ul> 
                            : 
                            <p>{holderText}</p>
                        }
                        <div className={styles.newPerson}>
                            <span onClick={() => setNewPerson(true)}>New Attendee</span>
                        </div>
                        <div className={styles.selectedParty}>
                            <span>{selectedParty && <span>{selectedParty}</span>}</span>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default AttendeeList;