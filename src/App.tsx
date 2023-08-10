import './App.css';
import Header from './components/header/header';
import { useState, useEffect } from 'react';
import MobileMenu from './components/mobileMenu/mobileMenu';
import ShipmentList from './components/shipmentList/shipmentList';
import ShipmentDetails from './components/shipmentDetails/shipmentDetails';

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
        <button aria-label="Mobile Menu" className={`hamburger-icon ${mobileMenuOpen ? 'hamburger-open' : ''}`} onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
      {mobileMenuOpen && <MobileMenu shipments={shipments} onShipmentClick={handleShipmentClick}/>}
      <div className="container">
        <div className="row">
          <ShipmentList shipments={shipments} onShipmentClick={handleShipmentClick} mobileMenuOpen={mobileMenuOpen}/>
          <ShipmentDetails selectedShipment={selectedShipment} handleInputChange={handleInputChange} totalBays={totalBays} />
        </div>
      </div>
    </div>
  );
}

export default App;
