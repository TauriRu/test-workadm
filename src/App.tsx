import './App.css';
import Header from './components/header/header';
import { useState, useEffect } from 'react';

export interface Shipment {
  id: string;
  name: string;
  email: string;
  boxes: string;
}

function App() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/shipments.json')
      .then(res => res.json())
      .then(data => setShipments(data));
  }, []);

  useEffect(() => {
    const handleUrlChange = () => {
      const pathParts = window.location.pathname.split('/');
      const shipmentId = pathParts[pathParts.length - 1];
      const selected = shipments.find(shipment => shipment.id === shipmentId);
      setSelectedShipment(selected || null);
    };

    window.addEventListener('popstate', handleUrlChange);
    handleUrlChange();
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [shipments]);
  const handleShipmentClick = (event: React.MouseEvent<HTMLAnchorElement>, shipmentId: string) => {
    event.preventDefault();
    const selected = shipments.find(shipment => shipment.id === shipmentId);
    setSelectedShipment(selected || { id: '', name: '', email: '', boxes: '' });

    window.history.pushState(null, '', `/shipment/${shipmentId}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedShipment) {
      const newSelectedShipment = { ...selectedShipment, boxes: event.target.value };
      setSelectedShipment(newSelectedShipment);
    }
  };

  const totalBays = selectedShipment && selectedShipment.boxes
    ? Math.ceil(selectedShipment.boxes.split(',').map(box => parseFloat(box.trim())).reduce((total, boxQty) => total + boxQty, 0) / 10)
    : 0;

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <div className="App">
   
      <Header shipments={shipments} onShipmentClick={handleShipmentClick} />
         <div className="mobile-header">
        <button className="hamburger-icon" onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            {shipments.map((shipment) => (
              <li className='shipmentList' key={shipment.id}>
                <a
                  href={`#${shipment.id}`}
                 
                  role="button"
                  onClick={(event) => handleShipmentClick(event, shipment.id)}
                >
                  {shipment.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="container">
        <div className="">
        <div className={`col-3 ${mobileMenuOpen ? '' : 'hide-company-names'}`}>
            <h1 className='selectingShippingTitle'>Shipments list</h1>
            <ul>
              {shipments.map((shipment) => (
                <li className='shipmentList' key={shipment.id}>
                  <a
                    href={`#${shipment.id}`}
                    className='shipmentLink'
                    role="button"
                    onClick={(event) => handleShipmentClick(event, shipment.id)}
                  >
                    {shipment.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={`col-9 ${mobileMenuOpen ? '' : 'col-12'}`}>
            {selectedShipment ? (
              <div className="shipment-card">
                <h1 className="shipment-name">{selectedShipment.name}</h1>
                <p className="shipment-email selected">Email: {selectedShipment.email}</p>
                <p className='selected'>CARGO BOXES</p>
                <p className="shipment-boxes">Boxes: <input
                  type='text'
                  value={selectedShipment.boxes || ''}
                  onChange={handleInputChange}
                /></p>
                <p className='selected'>Number of Cargo Bays:

                </p>
                <h3>{totalBays}</h3>
              </div>
            ) : (
              <h1>No shipment selected</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
