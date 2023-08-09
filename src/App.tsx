
import './App.css';
import Header from './components/header';
import { useState, useEffect } from 'react';


function App() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetch('/shipments.json')
      .then(res => res.json())
      .then(data => setShipments(data));
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Shipments</h1>
            {shipments.map((shipment: any) => (
              <div key={shipment.id}>
                <p>{shipment.id}</p>
                <p>{shipment.name}</p>
                <p>{shipment.email}</p>
                <p>{shipment.boxes}</p>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
