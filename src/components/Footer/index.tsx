import React from 'react';
interface IFooterProps {
  currentMessage: string;
  onChangeMessage: (event: React.ChangeEvent) => void;
  onClickButton: () => void;
}

const Footer: React.FC<IFooterProps> = ({
  currentMessage,
  onChangeMessage,
  onClickButton,
}) => (
  <footer>
    <div className="footer-wrapper">
      <textarea
        value={currentMessage}
        placeholder="Send a message..."
        onChange={onChangeMessage}
      />
      <button
        data-testid="footer-button"
        className={currentMessage ? 'active' : ''}
        type="button"
        onClick={onClickButton}
      >
        <i className="material-icons">send</i>
      </button>
    </div>
  </footer>
);

export default Footer;
