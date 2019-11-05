import { LngLatBoundsLike } from 'mapbox-gl';
import { MissionRoute } from './models/mission-route';
import { MissionStep } from './models/mission';

export class AppUtil {
  public static getBounds(coordinates: number[][]): LngLatBoundsLike {
    let lon: number[] = new Array();
    let lat: number[] = new Array();

    coordinates.forEach(coordinate => {
      lon.push(coordinate[0]);
      lat.push(coordinate[1]);
    });

    lon = lon.sort();
    lat = lat.sort();

    const bounds: LngLatBoundsLike = [lon[0], lat[0], lon.slice(-1)[0], lat.slice(-1)[0]];
    return bounds;
  }

  public static getRoute(id: string, steps: MissionStep[]): MissionRoute {
    const pickup = [];
    const deliver = [];
    let foundWayPoint = false;
    steps.forEach((step: MissionStep) => {
      if (foundWayPoint) {
        deliver.push([step.lon, step.lat]);
      } else {
        pickup.push([step.lon, step.lat]);
      }
      if (step.wayPoint) {
        foundWayPoint = true;
      }
    });
    return {
      id: id,
      pickupRoute: pickup,
      deliverRoute: deliver,
    };
  }
  
  public static initGeoJson(): GeoJSON.FeatureCollection<GeoJSON.LineString> {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      ]
    };
  }
}