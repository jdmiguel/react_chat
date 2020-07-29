import React from 'react';

export type HeaderProps = {
  onClick: () => void;
};

const Header:React.FC<HeaderProps> = ({onClick}) => {
  return(
    <header>
      <button type="button" onClick={onClick}></button>
      <div className="header-profile">
        <i data-testid={'label-icon'} className="material-icons">
          account_circle
        </i>
        <div>
          <h1>Ipresence User</h1>
          <h2>Online</h2>
        </div>
      </div>
      <div>
        <h3>150 new messages</h3>
      </div>
    </header>
  )
}

export default Header;