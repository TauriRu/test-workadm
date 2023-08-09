import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShipmentList: React.FC = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetch('/shipments.json')
      .then(res => res.json())
      .then(data => setShipments(data));
  }, []);

  return (
    <ul>
      {shipments.map((shipment: any) => (
        <li key={shipment.id}>
          <Link to={`/shipments/${shipment.id}`}>{shipment.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ShipmentList;
