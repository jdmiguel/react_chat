import React from 'react';

const Footer:React.FC = () => {
  return(
    <footer>
      <div className="footer-wrapper">
        <textarea placeholder="Send a message..." />
        <button type="button">
          <i className="material-icons">
            send
          </i>
        </button>
      </div>
    </footer>
  )
}

export default Footer;