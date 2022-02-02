import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { MessageBlock } from './Components/MessageBlock';
// import { store } from "../main"



const Hello = () => {

  // window.electron.store.set('msgBlock', 'test');
  
  return (
    <div>
      {/* <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div> */}
      <MessageBlock />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // onDidChange:(key: string ,callback: (newValue: any, oldValue: any) => void) => void
        // any other methods you've defined...
      };
    };
  }
}

