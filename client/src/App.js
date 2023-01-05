
import './App.css';
import MyForm from './components/get/Getform';
import NavigationBar from './Navigation';
import Disp from './components/display/Display';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
     
      {<MyForm/>}
      <Disp/>
    </div>
  );
}

export default App;
