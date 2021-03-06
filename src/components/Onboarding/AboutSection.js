import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor'

import '../styles/OnboardingPage.css'

export default class AboutSection extends React.Component {
    render() {
        return (
            <ScrollableAnchor id={'about'}>
                <section className="about-section background-3">
                    <h2 className="title">About</h2>
                    <div className="text-container row">
                        <div className="about-left col-6">
                            <i className="feature-icon fas fa-users fa-6x"></i>
                            <h3 className="about-text">This app is made for anyone who loves live music. We aim to help connect you and your friends with upcoming concerts of all genres.</h3>
                        </div>
                        <div className="about-right col-6">
                            <i className="feature-icon fas fa-headphones fa-6x"></i>
                            <h3 className="about-text">To find concerts, just log in and fill out where you want to see a show and what kind of show you want, then let our app show you upcoming music.</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="buttons-container">
                            <a href='#top' className="scroll-top-button">Scroll Top</a>
                        </div>
                    </div>
                </section>
            </ScrollableAnchor>
        );
    }
}