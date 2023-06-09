"use client"
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import ExpeditionList from './components/ExpeditionList';

type SelectedExpedition = {
  id_resi: string;
  nama_jasa_pengiriman: string;
  selected: boolean;
};
type SearchResult = {
  status: number;
  message: string;
  data: {
    summary: {
      awb: string;
      courier: string;
      service: string;
      status: string;
      date: string;
      desc: string;
      amount: string;
      weight: string;
    };
    detail: {
      origin: string;
      destination: string;
      shipper: string;
      receiver: string;
    };
    history: {
      date: string;
      desc: string;
      location: string;
    }[];
  };
};



export default function Home() {
  const [selectedExpedition, setSelectedExpedition] = useState<SelectedExpedition | null>(null);
  const [awbInput, setAwbInput] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);


  const handleExpeditionSelect = (expedition: SelectedExpedition | null) => {
    setSelectedExpedition(expedition);
  };

  const searchResi = (api_key: string, awb: string, courier: string) => {
    // Perform the resi search using the provided parameters
    const apiUrl = `https://api.binderbyte.com/v1/track?api_key=${api_key}&awb=${awb}&courier=${courier}`;

    // Make the API request
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response and extract the relevant data
        console.log('Response:', response);
        const result = response.data;
        setSearchResult(result);
        console.log('Result:', result);
      })
      .catch((error: AxiosError) => {
        // Handle the error
        console.error('Error searching resi:', error);
        setSearchResult(null);
      });
  };

  const handleSearchClick = () => {
    const api_key = 'de39ea0b088a1c792ed4df498ef4c2548b4c88329a8409cca341710c97dffc61';
    const awb = awbInput;
    const courier = selectedExpedition?.nama_jasa_pengiriman;

    if (awb && courier) {
      searchResi(api_key, awb, courier);
    }
  };

  const handleAwbInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAwbInput(event.target.value);
  };

  return (
    <main className="h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-bold">Kepoin Paket</h1>
        <p className="text-xl my-2">Mau tau paket kamu lagi dimana cari yuk!</p>
        <ExpeditionList onSelect={handleExpeditionSelect} />
        <div className="flex flex-row items-center justify-center w-1/2 mt-2">
          <input
            type="text"
            placeholder="masukin resi ira"
            className="input input-bordered input-lg input-primary w-full max-w-6xl mr-2"
            value={awbInput}
            onChange={handleAwbInputChange}
          />
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSearchClick}
          >
            Cariin Sih!
          </button>
        </div>
        {searchResult && (
          <div className="mt-4">
            <p className="text-black">Success</p>
            <p className="text-black">Status: {searchResult.status}</p>
            <p className="text-black">Message: {searchResult.message}</p>
            {/* Render other relevant data properties */}
            {searchResult.data && (
              <div>
                <p>Awb: {searchResult.data.summary.awb}</p>
                <p>Courier: {searchResult.data.summary.courier}</p>
                {/* Render other data properties */}
                {
                  searchResult.data.history.map((history) => (
                    <div>
                      <p>Date: {history.date}</p>
                      <p>Desc: {history.desc}</p>
                      <p>Location: {history.location}</p>
                    </div>
                  ))

                }
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
