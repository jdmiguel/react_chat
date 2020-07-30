import React from 'react';

interface IHeaderProps {
  onClick: () => void;
};

const Header:React.FC<IHeaderProps> = ({onClick}) => {
  return(
    <header>
      <button type="button" onClick={onClick}></button>
      <div className="header-profile">
        <i className="material-icons">
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