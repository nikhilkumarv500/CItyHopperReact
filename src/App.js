import ParticlesComponent from "./components/controller/particle";
import ProjectView from "./components/view/ProjectView";
import './App.css';

function App() {
  return (
  <>
      <div className="App">
        <ParticlesComponent id="particles"/>
        <ProjectView />
      </div>
  </>
  );
}

export default App;
