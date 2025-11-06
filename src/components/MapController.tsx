import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';

interface MapControllerProps {
  bounds: LatLngBoundsExpression;
}

const MapController = ({ bounds }: MapControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);

  return null;
};

export default MapController;
