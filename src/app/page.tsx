'use client';

import Select from "@/components/Input/Select";
import { Slider } from "@/components/Input/Slider";
import { Confetti } from "@/components/Confetti";
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { SortingAlgorithmType } from "@/shared/types";
import { algorithmOptions, generateAnimationArray, sortingAlgorithmsData } from "@/shared/utils";
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
    resetArrayAndAnimation,
    showConfetti
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
      <Confetti isVisible={showConfetti} />
      <div className="flex h-full justify-center">
        <div id="content-container" className="flex max-w-[1080px] w-full flex-col lg:px-0 px-4">
          <div className="min-h-[66px] relative flex flex-col sm:flex-row items-center justify-between w-full gap-4 py-2">
            <h1 className="text-gray-200 text-xl sm:text-2xl font-light">Sorting Visualizer</h1>

            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <Slider isDisabled={isSorting} value={animationSpeed} handleChange={(e) => setAnimationSpeed(Number(e.target.value))} />
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleChange}
                isDisabled={isSorting}
              />
              <button className="flex items-center justify-center" onClick={handlePlay}>
                {requireReset ? (<RxReset className="text-gray-400 h-6 w-6 sm:h-8 sm:w-8" />) : (<FaPlayCircle className="text-system-green60 h-6 w-6 sm:h-8 sm:w-8" />)}
              </button>
            </div>

            <div className="w-full mt-4 sm:mt-0 sm:absolute sm:top-[120%] sm:left-0">
              <div className="flex flex-col sm:flex-row w-full text-white p-3 sm:p-4 rounded border border-gray-500 bg-black bg-opacity-10 gap-4 sm:gap-6">
                <div className="flex flex-col items-start justify-start w-full sm:w-3/4">
                  <h3 className="text-sm sm:text-base font-medium">{sortingAlgorithmsData[selectedAlgorithm].title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 pt-1 sm:pt-2 leading-relaxed">{sortingAlgorithmsData[selectedAlgorithm].description}</p>
                </div>

                <div className="flex flex-col items-start justify-start w-full sm:w-1/4">
                  <h3 className="text-sm sm:text-base font-medium">Time Complexity</h3>
                  <div className="flex flex-col gap-1 sm:gap-2 mt-1">
                    <p className="flex w-full text-xs sm:text-sm text-gray-500">
                      <span className="w-20 sm:w-28">Worst:</span>
                      <span>{sortingAlgorithmsData[selectedAlgorithm].worstCase}</span>
                    </p>
                    <p className="flex w-full text-xs sm:text-sm text-gray-500">
                      <span className="w-20 sm:w-28">Average:</span>
                      <span>{sortingAlgorithmsData[selectedAlgorithm].averageCase}</span>
                    </p>
                    <p className="flex w-full text-xs sm:text-sm text-gray-500">
                      <span className="w-20 sm:w-28">Best:</span>
                      <span>{sortingAlgorithmsData[selectedAlgorithm].bestCase}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[calc(100vh-200px)] sm:h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div key={index} className="array-line relative w-1 mx-0.5 shadow-lg rounded-lg default-line-color" style={{ height: `${value}px` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
