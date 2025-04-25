import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Cryptotable from './components/Cryptotable';


function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-full p-40 bg-gray-100">
        <div className=" w-full h-screen">
      
           <div className="bg-white rounded-lg p-50 shadow">
           <Cryptotable/>
          </div>
        </div>
       </div> 
    </Provider>
  );
}

export default App;
