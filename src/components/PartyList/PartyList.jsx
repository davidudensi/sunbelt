import { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import IParty from "../../dto/IParty";
import styles from "./PartyList.module.scss";

const PartyList = ({parties, onFetchAttendees}) => {
    const[newParty, setNewParty] = useState([]);
    const[partyDate, setPartyDate] = useState(null);
    const[isNewParty, setIsNewParty] = useState(false);
    // console.log(parties);

    const handleNewPartySubmit = async (event) => {
        event.preventDefault();
        const party = new IParty('98032584-417a-428d-99f5-cf9400a19c51', partyDate, newParty);
        await fetch("http://localhost:5000/api/party", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(party)
        })
        .then((res) => res.json())
        .then(resData => console.log(resData))
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <Fragment>
            <div className={styles.partyList}>
                {isNewParty ? 
                    <div className={styles.party}>
                        <div className={styles.heading}>
                            <h2>New Party</h2>
                        </div>
                        <hr />
                        <form className={styles.partyForm} onSubmit={handleNewPartySubmit}>
                            <input placeholder="Location" type="text"
                                onChange={event => setNewParty(event.target.value)} value={newParty} />
                            <DatePicker placeholderText="Select date" selected={partyDate} 
                                onChange={date => setPartyDate(date)} />
                            <button className={styles.addParty} type="submit">Save</button>
                        </form>
                    </div> 
                    : 
                    <div className={styles.parties}>
                        <div className={styles.heading}>
                            <h2>Party List</h2>
                        </div>
                        <hr />
                        {parties.length > 0 ? 
                            <ul>
                                {parties.map((obj, key) => (
                                    <li onClick={() => onFetchAttendees(obj.Id)} key={obj.Id}>{obj.Location}</li>
                                ))}
                            </ul>
                        :
                            <p>Party list is empty</p>
                        }
                        <div className={styles.newParty}>
                            <span onClick={() => setIsNewParty(true)}>New Party</span>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default PartyList;