import React from 'react';

interface IHeaderProps {
  onClick: () => void;
  unreadMessagesCounter: number;
  isTyping: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  onClick,
  unreadMessagesCounter,
  isTyping,
}) => (
  <header>
    <button type="button" onClick={onClick}></button>
    <div className="header-profile">
      <i className="material-icons">account_circle</i>
      <div>
        <h1>Ipresence User</h1>
        <h2 className={isTyping ? 'typing' : ''}>
          {isTyping ? 'Typing...' : 'Online'}
        </h2>
      </div>
    </div>
    <div>
      <h3>{`${unreadMessagesCounter} new messages`}</h3>
    </div>
  </header>
);

export default Header;
