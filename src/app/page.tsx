"use client"
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import ExpeditionList from './components/ExpeditionList';
import NotFound from './components/NotFound';

type SelectedExpedition = Partial<{
  id_resi: string;
  kode_ekspedisi: string;
  selected: boolean;
}>;

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
    detail: Omit<SelectedExpedition, 'selected'>;
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
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading indicator
  const [error, setError] = useState<boolean>(false);

  const apiResi = process.env.API_RESI;
  const apiResiKey = process.env.API_RESI_KEY;

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
      .then(({ data }) => {
        console.log('Search result:', data);
        setSearchResult(data);
        setIsLoading(false);
        setError(false);
         // Stop loading indicator
      })
      .catch((error: AxiosError) => {
        console.error('Error searching resi:', error);
        setSearchResult(null);
        setIsLoading(false); // Stop loading indicator
        setError(true);
      });

  };

  const handleSearchClick = () => {
    const api_key = apiResiKey ?? '7593a38f6bc91459f453a20fe8e5a9ac7fabbeb4ed036e0544fe65790583ae58';
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
    <main className="h-full w-full mx-auto p-10">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-6xl font-bold">
          <span className="text-primary">Kepoin</span> <span className="text-info">Paket</span>
        </h1>

        <p className="text-xl my-2">Mau tau paket kamu lagi dimana cari yuk!</p>
        <ExpeditionList onSelect={handleExpeditionSelect} />
        <div className="flex flex-col items-center justify-center lg:w-1/2 mt-2 md:flex-row md:w-full sm:w-full mx-2">
          <input
            type="text"
            placeholder="masukin resi ira"
            className={`input input-bordered input-lg input-primary w-full max-w-8xl mb-2 md:mb-0 md:mr-2 ${awbInput ? '' : 'border-blue-500'
              }`}
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
        {
          error && (<NotFound />)
        }
        {searchResult && (
          <div className="mx-5 mt-3">

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
          //show video loading
          <div className="flex flex-col items-center justify-center">
            <video autoPlay loop muted className="w-80 h-80 box-content">

              <source src="/assets/loading.mp4" type="video/mp4" />
            </video>
            <p className="text-xl my-2">lagi nyariiiii</p>
          </div>
        )}
        {/* image and text */}

      </div>
    </main >
  );
}
