"use client";
import Image from "next/image";
import { AddressBar, SearchBar } from "./components";
import searchBgImage from "../../public/pattern-bg-desktop.png";
import searchBgImageMobile from "../../public/pattern-bg-mobile.png";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const api =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_V6M7cRmRtr4ApVpZqCVzAHqiuKVHK&ipAddress=";

export default function Home() {
  const userIP = "";
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [{ ip, lat, long, location, timezone, isp }, setLatLong] = useState<{
    ip: string;
    lat: number;
    long: number;
    location: string;
    timezone: string;
    isp: string;
  }>({ ip: "", lat: 0, long: 0, location: "", timezone: "", isp: "" });

  const Map = useMemo(
    () =>
      dynamic(() => import("./components/_map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [lat, long]
  );

  useEffect(() => {
    if (userIP === "") handleSearch(userIP);
  }, [userIP]);

  const handleSearch = async (userIP?: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetch(`${api}${searchValue || userIP}`);
      const json = await data.json();
      setLatLong({
        ip: json?.ip,
        lat: json?.location?.lat,
        long: json?.location?.lng,
        location: `${json?.location?.city}, ${json?.location?.city}, ${json?.location?.country}`,
        timezone: `UTC ${json?.location?.timezone}`,
        isp: json?.as?.name,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_value) {
      setError(
        "Something went wrong. Please check the IP address and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center z-30 bg-black opacity-35 h-full w-full fixed">
          <div className="border-4 rounded-full border-white bg-linear-to-r animate-spin h-12 w-12" />
        </div>
      )}
      <div className="relative h-70 md:h-72 lg:h-72 flex flex-col">
        <Image
          className="sm:bg-none"
          src={searchBgImage}
          alt="Search Background"
          fill
        />
        <Image
          className="md:hidden lg:hidden"
          src={searchBgImageMobile}
          alt="Search Background mobile"
          fill
        />
        <div className="relative z-10 flex flex-col justify-center items-center gap-6 mt-10">
          <p className="text-white text-2xl">IP Address Tracker</p>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearchClick={handleSearch}
          />
          <AddressBar
            ip_address={ip}
            location={location}
            timeZone={timezone}
            isp={isp}
          />
        </div>
      </div>
      <div className="absolute z-0 h-full w-full">
        <Map lat={lat} long={long} error={error} />
      </div>
    </>
  );
}
