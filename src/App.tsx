import React from 'react';
import { Column } from './components/Column';
import { Card } from './components/Card';
import { AppContainer } from './styles';
import { AddNewItem } from './components/AddNewItem';
import { useAppState } from './contexts/AppStateContext';

function App() {
  const { state } = useAppState();
  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} index={i}></Column>
      ))}
      <AddNewItem toggleButtonText='+ Add another list' onAdd={console.log} />
    </AppContainer>
  );
}

export default App;
