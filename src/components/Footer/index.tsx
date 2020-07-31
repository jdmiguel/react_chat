import React from 'react';
interface IFooterProps {
  onChange: (event: React.ChangeEvent) => void;
  onClick: () => void;
};

const Footer:React.FC<IFooterProps> = ({onChange, onClick}) => {
  return(
    <footer>
      <div className="footer-wrapper">
        <textarea placeholder="Send a message..." onChange={onChange}/>
        <button type="button" onClick={onClick}>
          <i className="material-icons">
            send
          </i>
        </button>
      </div>
    </footer>
  )
}

export default Footer;