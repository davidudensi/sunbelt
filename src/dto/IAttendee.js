class IAttendee {
    constructor(Id, PartyId, PersonId, DrinkId, IParty, IPerson, IDrink){
        this.Id = Id;
        this.PartyId = PartyId;
        this.PersonId = PersonId;
        this.DrinkId = DrinkId;

        this.IParty = IParty;
        this.IPerson = IPerson;
        this.IDrink = IDrink;
    }
}

export default IAttendee;