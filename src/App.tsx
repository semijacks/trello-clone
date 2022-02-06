import React from 'react';
import { Column } from './components/Column';
import { AppContainer } from './styles';
import { AddNewItem } from './components/AddNewItem';
import { useAppState } from './contexts/AppStateContext';

function App() {
  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} index={i} id={list.id}></Column>
      ))}
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={(text) => dispatch({ type: 'ADD_LIST', payload: text })}
      />
    </AppContainer>
  );
}

export default App;
