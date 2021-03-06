import './../App.css';
import Contacts from './../../contacts.json'
import { Component } from 'react';
import ContactCard from '../ContactCard/ContactCard';

class ContactList extends Component {

    constructor() {
        super()

        this.state = {
            contactsList: Contacts.slice(0, 5),
            buttonColor1: 'blue',
            buttonColor2: 'blue'
        }
    }

    addRandomContact = () => {

        const randomIndex = Math.floor(Math.random() * (Contacts.length - 5) + 5)
        const newContact = Contacts[randomIndex]

        const contactListCopy = [...this.state.contactsList]
        contactListCopy.unshift(newContact)

        this.setState({ contactsList: contactListCopy, buttonColor1: 'blue', buttonColor2: 'blue' })
    }

    sortAlphabetically = () => {

        const contactListCopy = [...this.state.contactsList]

        contactListCopy.sort((conct1, conct2) => {
            if (conct1.name > conct2.name) {
                return 1
            } else return -1
        })

        this.setState({ contactsList: contactListCopy, buttonColor1: 'green', buttonColor2: 'blue' })

    }

    sortByPopularity = () => {
        const contactListCopy = [...this.state.contactsList]

        contactListCopy.sort((conct1, conct2) => {
            if (conct1.popularity < conct2.popularity) {
                return 1
            } else return -1
        })

        this.setState({
            contactsList: contactListCopy, buttonColor2: 'green', buttonColor1: 'blue'
        })
    }

    deleteContact = contactID => {
        this.setState({
            contactsList: this.state.contactsList.filter(elm => elm.id !== contactID)
        })


    }


    render() {
        return (
            <main>

                <h1>IronContacts</h1>
                <div className="top-btns">
                    <button onClick={this.addRandomContact} >Add Random contact </button>
                    <button style={{ background: this.state.buttonColor1 }} onClick={this.sortAlphabetically} >Sort Alphabetically </button>
                    <button style={{ background: this.state.buttonColor2 }} onClick={this.sortByPopularity} >Sort by Popularity</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Popularity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contactsList.map(elm => <ContactCard key={elm.id} removeContact={() => this.deleteContact(elm.id)} pictureUrl={elm.pictureUrl} name={elm.name} popularity={elm.popularity} />)}
                    </tbody>
                </table>
            </main>
        )
    }
}

export default ContactList;
