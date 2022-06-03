import React, { useEffect, useMemo, useState, useCallback } from "react";
import { ToiletPosition } from "../types/toilet";
// import { SearchBarProps } from "../types/common";
import { useDispatch } from "react-redux";
import { changeCenter } from "../slices/mapCenterSlice";
import { useAllToiletsQuery } from "../api/toilet";
import _ from "lodash";

const SearchBar = () => {
  const dispatch = useDispatch();
  const allToilets = useAllToiletsQuery();

  const [matchingList, setMatchingList] = useState<ToiletPosition[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchOverlay, setSearchOverlay] = useState<boolean>(false);

  // const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setKeyword(e.target.value);
  // };

  // useMemo(() => {
  //   if (keyword.length && allToilets?.data) {
  //     const filteredToilet = [...allToilets.data].filter((toilet) => {
  //       return (
  //         toilet.roadName.includes(keyword) || toilet.title.includes(keyword)
  //       );
  //     });
  //     setMatchingList(filteredToilet);
  //   } else {
  //     setMatchingList([]);
  //   }
  // }, [keyword]);

  const queryRequest = async (search: string, allToilets: any) => {
    console.log("keyword", search);
    console.log("data", allToilets?.data);
    if (search && allToilets?.data) {
      const filteredToilet = [...allToilets.data].filter((toilet) => {
        return (
          toilet.roadName.includes(search) || toilet.title.includes(search)
        );
      });
      setMatchingList(filteredToilet);
    } else {
      setMatchingList([]);
    }
  };

  // useEffect(() => {
  //   if (keyword.length && allToilets?.data) {
  //     const filteredToilet = [...allToilets.data].filter((toilet) => {
  //       return (
  //         toilet.roadName.includes(keyword) || toilet.title.includes(keyword)
  //       );
  //     });
  //     setMatchingList(filteredToilet);
  //   } else {
  //     setMatchingList([]);
  //   }
  // }, [keyword]);

  const debounceFilter = useCallback(_.debounce(queryRequest, 500), []);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    debounceFilter(e.target.value, allToilets);
    if (keyword === "") setMatchingList([]);
  };
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
            {matchingList.length ? (
              matchingList.map((toilet, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      dispatch(changeCenter(toilet.latlng));
                      // setCenter({ center: toilet.latlng, isAllow: false });
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
            ) : (
              <div className="flex flex-col items-center pt-[60px]">
                <img
                  className="w-12 h-12"
                  src="images/common/search-bar.svg"
                  alt="search-bar"
                />
                <div className="flex flex-col items-center font-normal text-base leading-[26px] text-gray40">
                  <div>근처 지하철명이나 건물, 주소</div>
                  <div>등으로 검색해 보세요!</div>
                </div>
              </div>
            )}
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
  );
};

export default SearchBar;
