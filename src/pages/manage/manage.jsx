import { Fragment, useState, useEffect } from "react"
import IParty from "../../dto/IParty";
import IPerson from "../../dto/IPerson";
import IAttendee from "../../dto/IAttendee";
import IDrink from "../../dto/IDrink";
import styles from "./manage.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import PartyList from "../../components/PartyList/PartyList";
import AttendeeList from "../../components/AttendeeList/AttendeeList";
import DrinkList from "../../components/DrinkList/DrinkList";

const Manage = () => {
    const[parties, setParties] = useState([]);
    const[partyId, setPartyId] = useState("");
    const[people, setPeople] = useState([]);
    const[drinkId, setDrinkId] = useState("");
    const[allDrinks, setAllDrinks] = useState([]);
    const[attendees, setAttendees] = useState([]);
    const[drinks, setDrinks] = useState([]);

    useEffect(() => {
        let mounted = true;
        fetchParties();
        fetchDrinks();
    
        return () => {
          mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        console.log('PartyId', partyId);

        return () => {
            mounted = false;
        };
    }, [partyId]);

    const handleFetchAttendees = async (Id) => {
        setPartyId(Id);
        const url = "http://localhost:5000/api/attendee/party/" + Id;
        const data = await makeCall(url);
        const attendees = [];
        const people = [];
        data.map(obj => {
            const party = new IParty(obj.party.id, obj.party.partyDate, obj.party.location);
            const person = new IPerson(obj.person.id, obj.person.firstName, obj.person.lastName);
            people.push(person);
            const drink = new IDrink(obj.drink.id, obj.drink.name);
            const attendee = new IAttendee(obj.id, obj.partyId, obj.personId, obj.drinkId, party, person, drink);
            attendees.push(attendee);
        });
        setAttendees(attendees);
        setPeople(people);
    }

    const handleFetchFavoriteDrink = (Id) => {
        const drinks = attendees.filter(obj => obj.PersonId === Id).map(obj => {
            return obj.IDrink
        });
        setDrinks(drinks);
    }

    const fetchParties = async () =>{
        const url = "http://localhost:5000/api/party";
        const data = await makeCall(url);
        const parties = [];
        data.map(obj => {
            const party = new IParty(obj.id, obj.partyDate, obj.location);
            parties.push(party);
        });
        setParties(parties);
    }

    const fetchDrinks = async () =>{
        const url = "http://localhost:5000/api/drink";
        const data = await makeCall(url);
        const drinks = [];
        data.map(obj => {
            const drink = new IDrink(obj.id, obj.name);
            drinks.push(drink);
        });
        setDrinkId(drinks[0].Id);
        setAllDrinks(drinks);
    }

    async function makeCall(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    return (
        <Fragment>
            <div className={styles.manage}>
                <div className={styles.heading}>
                    <h1>Manage Party</h1>
                </div>
                <div className={styles.body}>
                    <div className={styles.partyList}>
                        <PartyList 
                            parties={parties} 
                            onFetchAttendees={handleFetchAttendees} 
                        />
                    </div>
                    <div className={styles.attendeeList}>
                        <AttendeeList
                            partyId={partyId} 
                            drinkId={drinkId} 
                            people={people} 
                            allDrinks={allDrinks} 
                            onFetchDrinks={handleFetchFavoriteDrink}
                        />
                    </div>
                    <div className={styles.drinkList}>
                        <DrinkList drinks={drinks} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Manage;