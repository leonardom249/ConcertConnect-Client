import React from 'react';
import { connect } from 'react-redux';
import { RiseLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';

import { newFavorite } from '../../actions/favorite-actions'
import { getContacts } from '../../actions/contacts-actions';
import { getFavorites } from '../../actions/favorite-actions'


import '../styles/ConcertAbout.css'
export class ConcertAboutPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(getFavorites())
        this.props.dispatch(getContacts())
        
    }


    render() {


        let airBNBCity = this.props.city.replace(' ', '-')
        let airBNBLink = `https://www.airbnb.com/s/${airBNBCity}--${this.props.state}--United-States/homes?refinement_paths%5B%5D=%2Fhomes&checkin=${this.props.date}`


        if (this.props.loading === true) {
            return (
                <div className="loading-wrapper">
                    <RiseLoader />
                </div>
            );
        }

        if (this.props.error) {
            return (
                <div>
                    <h2>OOPS!</h2>
                    <h3>Something Went Wrong:</h3>
                    <h3><em> {this.props.error}</em></h3>
                    <h4><strong>Please try searching again</strong></h4>
                </div>
            );
        }

        let describe = this.props.description;
        if (!this.props.description) {
            describe = <p>The "{this.props.name}" event will be held on {this.props.date} at {this.props.venue} in {this.props.city}, {this.props.state}.  It will feature {this.props.attraction} as the main event.  The event will start at {this.props.time}.</p>
        }

        let contactFriends;
        if (this.props.contacts) {
            if (!this.props.loggedIn) {
                contactFriends = <a className="button blue push_button"
                    onClick={() => alert('Please login or signup to send emails to your contact list')}
                >Email Contacts<i className="fas fa-address-book icon"></i></a>
            }
            else if (this.props.loggedIn && this.props.contacts[0] && this.props.contacts[0].email !== null) {
                let emails = this.props.contacts.map(obj => obj.email)
                let listOfEmails = emails.slice(1)
                let createContactEmail =
                    `mailto:${this.props.contacts[0].email}?subject=${this.props.attraction} is coming to town&body=Hi,%20%0D%0A%20%0D%0AI found this concert and thought you may like it.  Details are:%20%0D%0A%20%0D%0AThe "${this.props.name}" event will be held on ${this.props.date} at ${this.props.venue} in ${this.props.city}, ${this.props.state}.  It will feature ${this.props.attraction} as the main event.  The event will start at ${this.props.time}.%20%0D%0A%20%0D%0AThis has been an automated message generated by ConcertConnect.  Thanks and keep rockin!%20%0D%0A%20%0D%0A&bcc=${listOfEmails}`
                contactFriends = <a className="button blue push_button" href={createContactEmail}>Email Contacts<i className="fas fa-address-book icon"></i></a>
            }
            else {
                let createContactEmail = `mailto:?subject=${this.props.attraction} is coming to town&body=Hi,%20%0D%0A%20%0D%0AI found this concert and thought you may like it.  Details are:%20%0D%0A%20%0D%0AThe "${this.props.name}" event will be held on ${this.props.date} at ${this.props.venue} in ${this.props.city}, ${this.props.state}.  It will feature ${this.props.attraction} as the main event.  The event will start at ${this.props.time}.%20%0D%0A%20%0D%0AThis has been an automated message generated by ConcertConnect.  Thanks and keep rockin!%20%0D%0A%20%0D%0A`
                contactFriends = <a className="button blue push_button" href={createContactEmail} >Email Contacts<i className="fas fa-address-book icon"></i></a>
            }

        }
        return (
            <div className="concert-about-page">
                <h1 className="concert-title">{this.props.name}</h1>
                <div className="concert-about row">
                    <div className="row">
                        <div className="concert-search-about col-4">
                            <h3 className="header">Concert details</h3>
                            <label className="info-label">Date:</label>
                            <label className="concert-label">{this.props.date}</label>
                            <label className="info-label">Time:</label>
                            <label className="concert-label">{this.props.time}</label>
                            <label className="info-label">Venue:</label>
                            <label className="concert-label">{this.props.venue}</label>
                            <label className="info-label">City:</label>
                            <label className="concert-label">{this.props.city}</label>
                            <label className="info-label">State:</label>
                            <label className="concert-label">{this.props.state}</label>
                        </div>
                        <div className="concert-info-right col-4">
                            <h3 className="header">Concert description</h3>
                            <span>{describe}</span>
                        </div>
                        <div className="col-4">
                            <img src={this.props.image} alt='concert' className="concert-image"></img>
                        </div>

                    </div>
                    <div className="buttons-container row">
                        <div className="col-4">
                            <a className="button blue push_button"
                                onClick={() => {
                                    if (this.props.loggedIn) {
                                        this.props.dispatch(newFavorite(this.props.currentConcert))
                                        toast.success("Concert added to your account's favorites list!", {
                                            className: 'black-background',
                                            bodyClassName: "grow-font-size",
                                            progressClassName: 'fancy-progress-bar'
                                        })
                                    }
                                    else {
                                        toast.error("Please login or signup to save this concert to  your favorites", {
                                            className: 'black-background',
                                            bodyClassName: "grow-font-size",
                                            progressClassName: 'fancy-progress-bar'
                                        })
                                    }
                                }
                                }>Favorite<i className="fas fa-star icon"></i></a>
                        </div>
                        <div className="col-4">
                            <a href={this.props.url} target="_blank" className="button blue push_button">Buy Tickets<i className="fas fa-ticket-alt icon"></i></a>
                        </div>
                        <div className="col-4">
                            <a href={airBNBLink} target="_blank" className="button blue push_button">Find Hotels<i className="fas fa-building icon"></i></a>

                        </div>
                        <div className="col-4">
                            {contactFriends}
                        </div>
                    </div>
                </div>
                <ToastContainer position="bottom-left" hideProgressBar />
            </div>
        );

    }
}


const mapStateToProps = state => ({
    loading: state.ticketmaster.concerts,
    error: state.ticketmaster.error,
    city: state.ticketmaster.currentConcert.city,
    state: state.ticketmaster.currentConcert.state,
    date: state.ticketmaster.currentConcert.date,
    currentConcert: state.ticketmaster.currentConcert,
    name: state.ticketmaster.currentConcert.name,
    time: state.ticketmaster.currentConcert.time,
    venue: state.ticketmaster.currentConcert.venue,
    url: state.ticketmaster.currentConcert.url,
    image: state.ticketmaster.currentConcert.image,
    description: state.ticketmaster.currentConcert.description,
    attraction: state.ticketmaster.currentConcert.attraction,
    contacts: state.contact.contacts,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(ConcertAboutPage);