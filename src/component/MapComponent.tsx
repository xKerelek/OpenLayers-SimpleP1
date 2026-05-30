import { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj.js';
import 'ol/ol.css';

export default function MapComponent() {
    const mapTarget = useRef(null);

    useEffect(() => {
        if (!mapTarget.current) return;

        const map = new Map({
            target: mapTarget.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([20.98, 50.01]),
                zoom: 13,
            }),
        });

        return () => {
            map.setTarget(undefined);
        };
    }, []);

    return (
        <div>
            <div className="flex justify-center items-center p-5 bg-amber-400 rounded-b-2xl w-max mx-auto">
                <h1 className="text-3xl font-bold font-mono text-center">Interaktywa mapa drzew pomnikowych w Tarnowie</h1>
            </div>

            <div ref={mapTarget} className="map-container w-full h-[80vh] mt-5 border-2 border-gray-400"></div>
        </div>
    );
}
