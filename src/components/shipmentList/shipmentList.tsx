import React from 'react';
import { Shipment } from '../../App';

interface ShipmentListProps {
  shipments: Shipment[];
  onShipmentClick: (event: React.MouseEvent<HTMLAnchorElement>, shipmentId: string) => void;
  mobileMenuOpen: boolean;
}

const ShipmentList: React.FC<ShipmentListProps> = ({ shipments, onShipmentClick,mobileMenuOpen }) => {
  return (
    <div className={`col-3 ${mobileMenuOpen ? '' : 'hide-company-names'}`}>
      <h1 className='selectingShippingTitle'>Shipments list</h1>
      <ul>
        {shipments.map((shipment) => (
          <li className='shipmentList' key={shipment.id}>
            <a
              href={`#${shipment.id}`}
              className='shipmentLink'
              role="button"
              onClick={(event) => onShipmentClick(event, shipment.id)}
            >
              {shipment.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentList;
