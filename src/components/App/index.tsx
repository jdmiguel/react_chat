import React, { useReducer, Dispatch } from 'react';

import Header from '../Header';

type ClassesAction = { type: 'hide'} | { type: 'show' };

const classesReducer = (classes: string[], action: ClassesAction) => {
  switch (action.type) {
    case 'hide':
      return [...classes,'hide'];
    case 'show':
      return classes.filter(appClass => appClass !== 'hide');
  }
};

const App:React.FC = () => {
  const [appClasses, dispatch]: [
    string[],
    Dispatch<ClassesAction>,
  ] = useReducer(classesReducer, ['app']);


  const handleAppClasses = () => {
    appClasses.includes('hide') ? dispatch({type: 'show'}) : dispatch({type: 'hide'})
  }

  return(
    <div className={appClasses.join(' ')}>
      <Header onClick={handleAppClasses}/>
    </div>
  )
}

export default App;
