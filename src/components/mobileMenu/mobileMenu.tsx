import React from 'react';
import { Shipment } from '../../App';

interface MobileMenuProps {
  shipments: Shipment[];
  onShipmentClick: (event: React.MouseEvent<HTMLAnchorElement>, shipmentId: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ shipments, onShipmentClick }) => {
  return (
    <div className="mobile-menu">
      <ul>
        {shipments.map((shipment) => (
          <li className='shipmentList' key={shipment.id}>
            <a
              href={`#${shipment.id}`}
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

export default MobileMenu;
