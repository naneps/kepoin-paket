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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setIsLoading(true); // Set loading state to true before making the API request

        try {
            const response = await axios.get('https://berobatplus.shop/api/resi', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const initialExpeditions = response.data.data.map((expedition: Expedition) => ({
                id_resi: expedition.id_resi,
                nama_jasa_pengiriman: expedition.nama_jasa_pengiriman,
                kode_ekspedisi: expedition.kode_ekspedisi,
                selected: false,
            }));
            setExpeditions(initialExpeditions);
            console.log(response);
            setIsLoading(false); // Set loading state to false after the request is completed
        } catch (err) {
            setError('Error fetching expeditions');
            setIsLoading(false); // Set loading state to false if an error occurs
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
        <div className="flex flex-col items-center justify-center md:justify-start w-full mx-2">
            {isLoading ? ( // Display loading state while fetching data
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="lg:w-1/2 md:w-full p-5  mb-2 overflow-x-scroll rounded-lg">
                    <ul className="flex flex-wrap justify-center space-x-2 md:gap-y-2 gap-2">
                        {expeditions.map((expedition) => (
                            <li
                                key={expedition.id_resi}
                                className={`badge px-5 py-5 lg:text-2xl ${expedition.selected
                                    ? 'badge-primary'
                                    : 'badge-primary badge-outline'
                                    }`}
                                onClick={() => handleSelect(expedition.id_resi)}
                            >
                                {expedition.nama_jasa_pengiriman}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {!expeditions.some((expedition) => expedition.selected) && (
                <p className="text-red-500 text-sm">At least one item must be selected.</p>
            )}
        </div>
    );
};

export default ExpeditionList;
