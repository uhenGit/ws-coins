import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import coinStore from './store/coinStore';
import List from './components/List';
import Detales from './components/Detales';

const App = observer(() => {
  useEffect(() => {
    coinStore.fetchAllCoins();
  },[])
  return (
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/detales/:id" element={<Detales />} />
      </Routes>
  );
})

export default App;
