import React from 'react';
interface IFooterProps {
  currentMessage: string;
  onChangeMessage: (event: React.ChangeEvent) => void;
  buttonClass: string;
  onClickButton: () => void;
};

const Footer:React.FC<IFooterProps> = ({currentMessage, onChangeMessage, buttonClass, onClickButton}) => {
  return(
    <footer>
      <div className="footer-wrapper">
        <textarea value={currentMessage} placeholder="Send a message..." onChange={onChangeMessage}/>
        <button data-testid="footer-button" className={buttonClass} type="button" onClick={onClickButton}>
          <i className="material-icons">
            send
          </i>
        </button>
      </div>
    </footer>
  )
}

export default Footer;