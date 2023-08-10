import React from 'react';
import { Shipment } from '../../App';

interface ShipmentCardProps {
  selectedShipment: Shipment | null;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalBays: number;
}

const ShipmentDetails: React.FC<ShipmentCardProps> = ({ selectedShipment, handleInputChange, totalBays }) => {
  return (
    <div className='col-sm-8'>
      {selectedShipment ? (
        <div className="shipment-card">
          <h1 className="shipment-name">{selectedShipment?.name}</h1>
          <p className="shipment-email selected">Email: {selectedShipment?.email}</p>
          <p className='selected'>CARGO BOXES</p>
          <p className="shipment-boxes">Boxes: <input
            type='text'
            value={selectedShipment?.boxes || ''}
            onChange={handleInputChange}
          /></p>
          <p className='selected'>Number of Cargo Bays:</p>
          <h3>{totalBays}</h3>
        </div>
      ) : (
        <div className="shipment-card">
          <h1 className="shipment-name">No shipment selected</h1>
        </div>
      )
      }

    </div>
  );
};

export default ShipmentDetails;
