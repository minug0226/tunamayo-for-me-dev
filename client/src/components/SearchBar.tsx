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
  const [searchOverlay, setSearchOverlay] = useState<boolean>(false);

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
    <>
      {searchOverlay ? (
        <div className="animate-onlyOpacity absolute top-0 w-full min-h-[100vh] z-50 pb-2 px-5 bg-white">
          <div className="bg-white pt-2 pb-[0.2px] sticky top-0">
            <div className="flex items-center bg-[#F6F6F6] pt-[10px] pb-3 px-2 rounded-[30px] mb-4">
              <img
                onClick={() => {
                  setSearchOverlay(false);
                  setKeyword("");
                }}
                className="w-6 h-6 mr-2"
                src="/images/common/back-icon.svg"
                alt="go-back-icon"
              />
              <input
                autoFocus
                value={keyword}
                onChange={searchHandler}
                className="bg-[#F6F6F6] w-full outline-none font-normal text-base leading-[26px]"
                type="text"
              />
              {keyword.length ? (
                <img
                  src="/images/common/delete.svg"
                  alt="clear-button"
                  onClick={() => {
                    setKeyword("");
                  }}
                />
              ) : null}
            </div>
          </div>

          <div className="pl-2 space-y-4 bg-white h-full">
            {matchingList.length
              ? matchingList.map((toilet, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setCenter({ center: toilet.latlng, isAllow: false });
                        setKeyword(toilet.title);
                        setSearchOverlay(false);
                        setMatchingList([]);
                      }}
                      className="flex items-center"
                    >
                      <img
                        className="mr-4"
                        src="/images/main/search-icon-gray.svg"
                        alt=""
                      />
                      <div>
                        <div className="font-normal text-base leading-[26px] text-tnBlack">
                          {toilet.title}
                        </div>
                        <div className="font-normal text-sm text-gray40">
                          {toilet.roadName}
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      ) : (
        <div className="absolute top-0 w-full z-30 px-6 pt-[10px]">
          <div className="bg-white h-[48px] pt-[10px] pb-3 rounded-[30px] shadow-search flex items-center px-3">
            <img
              className="w-6 h-6 mr-2"
              src="/images/main/search-icon.svg"
              alt="search-icon"
            />
            <input
              onClick={() => setSearchOverlay(true)}
              value={keyword}
              onChange={searchHandler}
              className="placeholder:text-gray20 w-full font-normal text-base leading-[26px] appearance-none outline-none"
              type="text"
              placeholder="내 주변 화장실이 어디있지?"
            />
          </div>
        </div>
      )}
    </>

    // {matchingList.length ? (
    //   <div className="w-full h-[100px] rounded-md shadow-search bg-white">
    //     {matchingList.map((toilet, i) => {
    //       return (
    //         <div
    //           key={i}
    //           onClick={() => {
    //             setCenter(toilet.latlng);
    //             setMatchingList([]);
    //           }}
    //         >
    //           <div>{toilet.title}</div>
    //         </div>
    //       );
    //     })}
    //     </div>
    //   ) : null}
    // </div>
  );
};

export default SearchBar;
