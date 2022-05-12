import React, { useEffect, useState } from "react";

interface Latlng {
  lat: number;
  lng: number;
}
interface ToiletPosition {
  id: number;
  title: string;
  roadName: string;
  latlng: Latlng;
}

interface SearchBarProps {
  positions: ToiletPosition[];
  setCenter: any;
}

const SearchBar = ({ positions, setCenter }: SearchBarProps) => {
  const [matchingList, setMatchingList] = useState<ToiletPosition[]>([]);
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (keyword.length) {
      const filteredToilet = [...positions].filter((toilet) => {
        return (
          toilet.roadName.includes(keyword) || toilet.title.includes(keyword)
        );
      });
      setMatchingList(filteredToilet);
    } else {
      setMatchingList([]);
    }
  }, [keyword]);

  return (
    <div className="absolute top-0 w-full z-50 px-6 pt-[10px]">
      <div className="bg-white h-[48px] mb-1 rounded-md shadow-search flex items-center px-[21.13px]">
        <img
          className="w-[14.09px] h-[14px] mr-[14.09px]"
          src="/images/main/search-icon.svg"
          alt="search-icon"
        />
        <input
          value={keyword}
          onChange={searchHandler}
          className="placeholder:text-gray20 w-full font-normal text-base leading-[26px] appearance-none outline-none"
          type="text"
          placeholder="내 주변 화장실이 어디있지?"
        />
      </div>
      {matchingList.length ? (
        <div className="w-full h-[100px] rounded-md shadow-search bg-white">
          {matchingList.map((toilet, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setCenter(toilet.latlng);
                  setMatchingList([]);
                }}
              >
                <div>{toilet.title}</div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
