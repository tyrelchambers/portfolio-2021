import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Tile = ({ data, icon }) => {
  return (
    <li className="bg-gray-50 rounded-lg shadow-md">
      <div
        className="flex w-full bg-gray-50 flex-col  rounded-2xl  relative"
        key={data.title}
      >
        <div className="w-full h-20 bg-gray-900 absolute rounded-lg"></div>
        <div className="z-10 mt-6">
          <div className="rounded-2xl w-28 h-28 p-4 mr-auto ml-auto bg-white shadow-lg flex justify-center items-center">
            {data.img && (
              <img src={data.img} alt={data.title} className="h-full" />
            )}
            {icon && (
              <FontAwesomeIcon
                icon={icon}
                className="text-green-500"
                size="2x"
              />
            )}
          </div>

          <div className="flex flex-col mt-4  rounded-md p-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer "
              className=" text-green-400 font-bold text-2xl underline"
            >
              {data.title}
            </a>
            <p className="text-gray-600 mt-2 font-thin">
              {data.description || data.author}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Tile;
