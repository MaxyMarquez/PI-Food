import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import FormNewRecipe from './components/FormNewRecipe/FormNewRecipe';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/:id' element={<RecipeDetail />} />
        <Route path='/create_recipe' element={<FormNewRecipe />} />
      </Routes>
    </div>

  );
}

export default App;
