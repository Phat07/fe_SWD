import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Profile from '../Profile';

function ProfilePage(props) {
    return (
        <div
          className="app-container"
          style={{
            backgroundImage: `url(../../../public/assets/images/background/background5.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="header-container">
            <Header />
          </div>
          <div className="body-container">
            <Profile />
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      );
}

export default ProfilePage;