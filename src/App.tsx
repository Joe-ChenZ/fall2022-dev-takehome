import { useContext, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { useGlobalContext, Context } from './Context';

// import { useState } from 'react';
// import { Alert, Modal, Button } from 'react-bootstrap';
function App() {
  const [checkedTags, setCheckedTags] = useState<any[]>([]);
  const [value, setValue] = useState(0);
  return (
    <div className='App'>
      <Context.Provider value={{checkedTags, setCheckedTags}}>
        <TodoList  
          value={value}
          setValue={setValue}
          // checkedTags={checkedTags}
          // setSelectedTags={setSelectedTags}
        />
      </Context.Provider>
    </div>
  );
}

export default App;
