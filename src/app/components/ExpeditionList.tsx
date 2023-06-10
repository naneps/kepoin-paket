"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

type Expedition = {
    id_resi: string;
    nama_jasa_pengiriman: string;
    kode_ekspedisi: string;
};

type SelectedExpedition = {
    id_resi: string;
    kode_ekspedisi: string;
    nama_jasa_pengiriman: string;
    selected: boolean;
};

type OnSelectCallback = (selectedExpedition: SelectedExpedition | null) => void;

type ExpeditionListProps = {
    onSelect: OnSelectCallback;
};

const ExpeditionList = ({ onSelect }: ExpeditionListProps) => {
    const [expeditions, setExpeditions] = useState<SelectedExpedition[]>([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://berobatplus.shop/api/resi', {
                headers: {
                    'Content-Type': 'application/json',
                    // 'api-key': 'de39ea0b088a1c792ed4df498ef4c2548b4c88329a8409cca341710c97dffc61',
                },
            });

            const initialExpeditions = response.data.data.map((expedition: Expedition) => ({
                id_resi: expedition.id_resi,
                nama_jasa_pengiriman: expedition.nama_jasa_pengiriman,
                kode_ekspedisi: expedition.kode_ekspedisi,
                selected: false,
            }));
            setExpeditions(initialExpeditions);
        } catch (err) {
            setError('Error fetching expeditions');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelect = (id_resi: string) => {
        setExpeditions((prevExpeditions) =>
            prevExpeditions.map((expedition) => {
                if (expedition.id_resi === id_resi) {
                    const updatedExpedition = {
                        ...expedition,
                        selected: true,
                    };
                    onSelect(updatedExpedition); // Invoke the onSelect callback with the updated expedition
                    return updatedExpedition;
                }
                return {
                    ...expedition,
                    selected: false,
                };
            })
        );
    };

    return (
        <div className="flex flex-col items-center justify-center md:justify-start w-full mt-2">
            {error ? (
                <p>{error}</p>
            ) : (
                <ul className="flex flex-wrap justify-center space-x-2">
                    {expeditions.map((expedition) => (
                        <li
                            key={expedition.id_resi}
                            className={`px-3 py-1 rounded text-base md:text-2xl mb-3 ${expedition.selected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            onClick={() => handleSelect(expedition.id_resi)}
                        >
                            {expedition.nama_jasa_pengiriman}
                        </li>
                    ))}
                </ul>
            )}
            {!expeditions.some((expedition) => expedition.selected) && (
                <p className="text-red-500 text-sm">At least one item must be selected.</p>
            )}
        </div>
    );
};

export default ExpeditionList;
