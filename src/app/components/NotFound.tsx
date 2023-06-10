export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center lg:w-1/2 md:w-full my-3 p-2 ">
            <img src="/assets/search.png" className="w-3/4 md:w-1/4 h-auto" alt="Not Found" />
            <div className="p-4 bg-info rounded-lg text-white mt-4 lg:w-2/3 md:w-full">
                <p className="text-2xl font-bold my-2">Ngga Ketemunih</p>
                <p className="text-xl">Cek lagi resi ira, barangkali typo atau salah kurir</p>
            </div>
        </div>
    )
}