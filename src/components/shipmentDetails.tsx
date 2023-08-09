import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shipment, setShipment] = useState<any | null>(null);

  useEffect(() => {
    fetch(`/shipments/${id}.json`)  // Assuming you fetch the specific shipment data
      .then(res => res.json())
      .then(data => setShipment(data));
  }, [id]);

  if (!shipment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="shipment-card">
      <p className="shipment-id">ID: {shipment.id}</p>
      <p className="shipment-name">Name: {shipment.name}</p>
      <p className="shipment-email">Email: {shipment.email}</p>
      <p className="shipment-boxes">Boxes: {shipment.boxes}</p>
    </div>
  );
};

export default ShipmentDetails;
