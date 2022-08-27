import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { Context } from './Context';

// import { useState } from 'react';
// import { Alert, Modal, Button } from 'react-bootstrap';
function App() {
  const [checkedTags, setCheckedTags] = useState<any[]>([]);
  
  return (
    <div className='App'>
      <Context.Provider value={{checkedTags, setCheckedTags}}>
        <TodoList  
          // checkedTags={checkedTags}
          // setSelectedTags={setSelectedTags}
        />
      </Context.Provider>
    </div>
  );
}

export default App;
