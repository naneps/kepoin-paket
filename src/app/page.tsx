"use client"
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import ExpeditionList from './components/ExpeditionList';

type SelectedExpedition = {
  id_resi: string;
  kode_ekspedisi: string;
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
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator


  const handleExpeditionSelect = (expedition: SelectedExpedition | null) => {
    setSelectedExpedition(expedition);
  };

  const searchResi = (api_key: string, awb: string, courier: string) => {
    setIsLoading(true); // Start loading indicator

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
        setIsLoading(false); // Stop loading indicator

      })
      .catch((error: AxiosError) => {
        // Handle the error
        console.error('Error searching resi:', error);
        setSearchResult(null);
        setIsLoading(false); // Stop loading indicator

      });
  };

  const handleSearchClick = () => {
    const api_key = '7593a38f6bc91459f453a20fe8e5a9ac7fabbeb4ed036e0544fe65790583ae58';
    const awb = awbInput;
    const courier = selectedExpedition?.kode_ekspedisi;

    if (awb && courier) {
      searchResi(api_key, awb, courier);
    }
  };

  const handleAwbInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAwbInput(event.target.value);
  };

  return (
    <main className="h-full w-full mt-5">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-bold">Kepoin Paket</h1>
        <p className="text-xl my-2">Mau tau paket kamu lagi dimana cari yuk!</p>
        <ExpeditionList onSelect={handleExpeditionSelect} />
        <div className="flex flex-row items-center justify-center w-1/2 mt-2">
          <input
            type="text"
            placeholder="masukin resi ira"
            className={`input input-bordered input-lg input-primary w-full max-w-6xl mr-2 ${awbInput ? '' : 'border-blue-500'}`}
            value={awbInput}
            onChange={handleAwbInputChange}
            required
          />
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSearchClick}
          >
            Cariin Sih!
          </button>
        </div>
        {!awbInput && (
          <h3 className="text-blue-500 text-lg">*wajib memasukkan nomor resi, yaaa</h3>
        )}
        {searchResult && (
          <div className="mt-4">
            {/* <p className="text-black">Success</p>
            <p className="text-black">Status: {searchResult.status}</p>
            <p className="text-black">Message: {searchResult.message}</p> */}
            {/* Render other relevant data properties */}
            {searchResult.data && (
              <div>
                <p>Nomor resi: {searchResult.data.summary.awb}</p>
                <p className='mb-3'>Jasa ekspedisi: {searchResult.data.summary.courier}</p>
                {/* Render other data properties */}
                {searchResult.data.history.map((history, index) => (
                  <div key={index}>
                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                      <li className="mb-10 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{history.date}</time>
                        <h3 className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{history.desc}</h3>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                          {history.location}
                        </p>
                      </li>
                    </ol>
                  </div>
                ))}
              </div>

            )}
          </div>
        )}
        {searchResult && searchResult.status === 400 && (
          <div className="mt-4 text-red-500">{searchResult.message}</div>
        )}
        {isLoading && (
          <div className="mt-4 flex items-center justify-center">
            <div role="status">
              <svg aria-hidden="true" className="inline w-20 h-20 mr-2 text-blue-200 animate-spin blue:text-blue-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

      </div>



    </main>
  );
}
