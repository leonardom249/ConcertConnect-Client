import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export function EmailButton({
  city,
  state,
  date,
  name,
  image,
  time,
  venue,
  url,
  attraction,
  contacts,
  loggedIn
}) {
  
        if(contacts) {
            if (!loggedIn) {
                return (<a className="button blue push_button"
                    onClick={() => {
                        toast.error("Please login or signup to send this concert to your contacts", {
                            className: 'black-background',
                            bodyClassName: "grow-font-size",
                            progressClassName: 'fancy-progress-bar'
                        })
                    }}
                >Email Contacts</a>)
            }
            else if (loggedIn && contacts[0] && contacts[0].email !== null) {
                let emails = contacts.map(obj => obj.email)
                let listOfEmails = emails.slice(1)
                let createContactEmail =
                    `mailto:${contacts[0].email}?subject=${attraction} is coming to town&body=Hi,%20%0D%0A%20%0D%0AI found this concert and thought you may like it.  Details are:%20%0D%0A%20%0D%0AThe "${name}" event will be held on ${date} at ${venue} in ${city}, ${state}.  It will feature ${attraction} as the main event.  The event will start at ${time}.%20%0D%0A%20%0D%0AA link to tickets can be found at ${url}.%20%0D%0A%20%0D%0AThis has been an automated message generated by ConcertConnect.  Thanks and keep rockin!%20%0D%0A%20%0D%0Ahttps://concertconnect-client.herokuapp.com&bcc=${listOfEmails}`
                return (<a className="button blue push_button" href={createContactEmail}>Email Contacts</a>
            )}
            else {
                let createContactEmail = `mailto:?subject=${attraction} is coming to town&body=Hi,%20%0D%0A%20%0D%0AI found this concert and thought you may like it.  Details are:%20%0D%0A%20%0D%0AThe "${name}" event will be held on ${date} at ${venue} in ${city}, ${state}.  It will feature ${attraction} as the main event.  The event will start at ${time}.%20%0D%0A%20%0D%0AA link to tickets can be found at ${url}.%20%0D%0A%20%0D%0AThis has been an automated message generated by ConcertConnect.  Thanks and keep rockin!%20%0D%0A%20%0D%0Ahttps://concertconnect-client.herokuapp.com`
                return (<a className="button blue push_button" href={createContactEmail} >Email Contacts</a>
            )}

        }
  
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
});


export default connect(mapStateToProps)(EmailButton);
