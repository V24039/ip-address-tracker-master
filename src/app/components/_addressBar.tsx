import React from "react";

type AddressBarProps = {
  ip_address: string;
  location: string;
  timeZone: string;
  isp: string;
};

const AddressBar = ({
  ip_address,
  location,
  timeZone,
  isp,
}: AddressBarProps) => {
  const details = [
    { label: "IP ADDRESS", value: ip_address },
    { label: "LOCATION", value: location },
    { label: "TIMEZONE", value: timeZone },
    { label: "ISP", value: isp },
  ];

  return (
    <div className="mt-10 grid md:grid-cols-4 gap-5 min-md:gap-4 h-fit bg-white rounded-xl shadow-2xl px-8 py-5 w-fit">
      {details.map(({ label, value }, index) => (
        <div
          key={`${label}-${index}`}
          className={`min-md:mt-5 ${index !== 3 && "min-md:border-r border-gray-300"}`}
        >
          <p className="font-semibold text-[10px] text-gray-400 sm:text-center md:text-left lg:text-left">{label}</p>
          <p className="font-semibold text-2xl sm:text-center md:text-left lg:text-left">{value || "-- --"}</p>
        </div>
      ))}
      <section></section>
    </div>
  );
};

export default AddressBar;
