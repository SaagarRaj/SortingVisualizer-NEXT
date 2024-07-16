'use client';

import Select from "@/components/Input/Select";
import { Slider } from "@/components/Input/Slider";
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { SortingAlgorithmType } from "@/shared/types";
import { algorithmOptions } from "@/shared/utils";
import { useEffect } from "react";



export default function Home() {
  const { arrayToSort, isSorting, animationSpeed, setAnimationSpeed, selectedAlgorithm, setSelectedAlgorithm } = useSortingAlgorithmContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType)
  }

  useEffect(() => {
    console.log("Selected Algorithm", selectedAlgorithm)
  }, [selectedAlgorithm])
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
