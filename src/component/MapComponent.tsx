import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import type { MonumentInterface } from "../interfaces/MonumentInterface.ts";
import mockData from "../mockData.json";

export default function MapComponent() {
    const mapTarget = useRef<HTMLDivElement>(null);
    const [selectedMonument, setSelectedMonument] = useState<MonumentInterface | null>(null);

    useEffect(() => {
        if (!mapTarget.current) return;

        const features = mockData.map((monument) => {
            const point = new Feature({
                geometry: new Point(fromLonLat(monument.coordinates)),
            });

            point.set('monumentData', monument);

            point.setStyle(
                new Style({
                    image: new Circle({
                        radius: 8,
                        fill: new Fill({ color: '#ff3300' }),
                        stroke: new Stroke({ color: '#ffffff', width: 2 }),
                    }),
                })
            );
            return point;
        });

        const vectorSource = new VectorSource({features});
        const vectorLayer = new VectorLayer({source: vectorSource});
        const rasterLayer = new TileLayer({source: new OSM()});


        const initialMap = new Map({
            target: mapTarget.current,
            layers: [ rasterLayer, vectorLayer ],
            view: new View({
                center: fromLonLat([20.98, 50.01]),
                zoom: 15,
            }),
        });

        initialMap.on('singleclick', (event) => {
            const feature = initialMap.forEachFeatureAtPixel(event.pixel, (feat) => feat);

            if(feature) {
                const data = feature.get('monumentData') as MonumentInterface;
                setSelectedMonument(data);
            } else {
                setSelectedMonument(null);
            }
        });

        initialMap.on('pointermove', (event) => {
            if(initialMap.hasFeatureAtPixel(event.pixel)) {
                initialMap.getTargetElement().style.cursor = 'pointer';
            } else {
                initialMap.getTargetElement().style.cursor = '';
            }
        });

        return () => {
            initialMap.setTarget(undefined);
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="flex justify-center p-5 bg-amber-300 rounded-b-2xl w-max mx-auto">
                <span className="text-3xl font-bold">Interaktywna mapa pomników w Tarnowie</span>
            </div>
            <div ref={mapTarget} className="mt-8 w-full h-[80vh]" />

            {selectedMonument && (
                <div className="absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl p-6 flex flex-col z-10 animate-fade-in-right overflow-y-auto">

                    <button
                        onClick={() => setSelectedMonument(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
                    >
                        ✖
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800 pr-6 mb-4">
                        {selectedMonument.name}
                    </h2>

                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="flex flex-col">
                            <img src={selectedMonument.image} alt={selectedMonument.name} className="w-full h-[30vh] object-cover rounded-lg shadow-sm border border-gray-200" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 uppercase text-xs">Lokalizacja</span>
                            <span>{selectedMonument.location}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 uppercase text-xs">Autor</span>
                            <span>{selectedMonument.author}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 uppercase text-xs">Data odsłonięcia</span>
                            <span>{selectedMonument.date}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <span className="font-semibold text-gray-800 uppercase text-xs block mb-2">Opis</span>
                            <p className="leading-relaxed text-justify">
                                {selectedMonument.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
