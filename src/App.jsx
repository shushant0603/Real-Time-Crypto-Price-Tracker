import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Cryptotable from './components/Cryptotable';
// import Change from './components/Change';
// import PriceTrendChart from './components/PriceTrendChart';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen w-full p-40 bg-gray-100">
        <div className=" w-full h-screen">
           {/* <h1 className="text-large text-center font-bold text-gray-900 mb-6">Crypto Price Tracker</h1>  */}
           <div className="bg-white rounded-lg p-50 shadow">
           <Cryptotable/>
           {/* <PriceTrendChart/> */}
          </div>
        </div>
       </div> 


      {/* <div className='w-full h-screen flex align-center justify-center'>
      <Change/>
      </div> */}

    </Provider>
  );
}

export default App;
