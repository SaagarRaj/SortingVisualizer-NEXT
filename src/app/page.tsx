'use client';

import Select from "@/components/Input/Select";
import { Slider } from "@/components/Input/Slider";
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { SortingAlgorithmType } from "@/shared/types";
import { algorithmOptions, generateAnimationArray, sortingAlgorithmsData } from "@/shared/utils";
import { useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { RxReset } from "react-icons/rx";



export default function Home() {
  const {
    arrayToSort,
    isSorting,
    animationSpeed,
    setAnimationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requireReset,
    runAniamtion,
    resetArrayAndAnimation
  } = useSortingAlgorithmContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType)
  }

  const handlePlay = () => {
    if (requireReset) {
      resetArrayAndAnimation();
      return;
    }
    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAniamtion
    )
  }

  return (
    <main className="font-montserrat absolute top-0 h-screen  inset-0 -z-10  w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] ">
      <div className="flex h-full justify-center">
        <div id="content-container" className="flex max-w-[1080px] w-full flex-col lg:px-0 px-4">
          <div className=" h-[66px] relative flex items-center justify-between w-full">
            <h1 className=" text-gray-200 text-2xl font-light hidden md:flex ">Sorting Visualizer</h1>

            <div className="flex items-center justify-center gap-4">
              <Slider isDisabled={isSorting} value={animationSpeed} handleChange={(e) => setAnimationSpeed(Number(e.target.value))} />
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleChange}
                isDisabled={isSorting}
              />
              <button className="flex items-center justify-center" onClick={handlePlay}>
                {requireReset ? (<RxReset className="text-gray-400 h-8 w-8 " />) : (<FaPlayCircle className="text-system-green60 h-8 w-8" />)}
              </button>
            </div>

            <div className="hidden sm:flex absolute top-[120%] left-0 w-full">
              <div className="flex w-full text-white p-4 rounded border border-gray-500 bg-black bg-opacity-10 gap-6">
                <div className="flex flex-col items-start justify-start w-3/4 ">
                  <h3 className="text-lg">{sortingAlgorithmsData[selectedAlgorithm].title}</h3>
                  <p className="text-sm text-gray-400 pt-2">{sortingAlgorithmsData[selectedAlgorithm].description}</p>

                </div>

                <div className="flex flex-col items-start justify-start w-1/4 ">
                  <h3 className="text-lg">Time Complexity</h3>
                  <div className="flex flex-col gap-2">
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Worst Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].worstCase}
                      </span>
                    </p>

                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Average Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].averageCase}
                      </span>
                    </p>

                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Best Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].bestCase}
                      </span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div key={index} className="array-line relative w-1 mx-0.5 shadow-lg  rounded-lg default-line-color" style={{ height: `${value}px` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
