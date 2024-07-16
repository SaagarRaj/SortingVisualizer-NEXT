'use client';
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { SortingAlgorithmType } from "../shared/types"
import { MAX_ANIMATION_SPEED, generateRandomNumberFromInterval } from "@/shared/utils";

interface SortingAlgorithmContextType {
    arrayToSort: number[];
    setArrayToSort: (array: number[]) => void,
    selectedAlgorithm: SortingAlgorithmType,
    setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void,
    isSorting: boolean,
    setIsSorting: (isSorting: boolean) => void,
    animationSpeed: number,
    setAnimationSpeed: (speed: number) => void,
    isAnimationComplete: boolean,
    setIsAnimationComplete: (isComplete: boolean) => void,
    resetArrayAndAnimation: () => void,
    runAniamtion: () => void,
    requireReset: boolean

}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined)

export const SortingAlgorithmProvider = ({ children }: { children: React.ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([])
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble")
    const [isSorting, setIsSorting] = useState<boolean>(false)
    const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED)
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false)


    useEffect(() => {
        resetArrayAndAnimation()
        window.addEventListener("resize", resetArrayAndAnimation);

        return () => {
            window.removeEventListener("resize", resetArrayAndAnimation)
        }
    }, [])

    const requireReset = isAnimationComplete || isSorting;
    const resetArrayAndAnimation = () => {
        const contentContainer = document.getElementById('content-container')
        if (!contentContainer) {
            return
        }

        const contentContainerWidth = contentContainer.clientWidth
        const tempArray: number[] = []
        const numlines = contentContainerWidth / 8;
        const containerHeight = window.innerHeight;
        const maxLineHeight = Math.max(containerHeight - 270, 100);
        for (let i = 0; i < numlines; i++) {
            tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight))
        }

        console.log(tempArray)
        setArrayToSort(tempArray)
        setIsAnimationComplete(false)
        setIsSorting(false)
    }

    const runAniamtion = () => { }

    const value = {
        arrayToSort,
        setArrayToSort,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isSorting,
        setIsSorting,
        animationSpeed,
        setAnimationSpeed,
        isAnimationComplete,
        setIsAnimationComplete,
        resetArrayAndAnimation,
        runAniamtion,
        requireReset
    }
    return <SortingAlgorithmContext.Provider value={value}>{children}</SortingAlgorithmContext.Provider>
}

export const useSortingAlgorithmContext = () => {
    const context = useContext(SortingAlgorithmContext)
    if (!context) {
        throw new Error("useSortingAlgorithmContext must be used within a SortingAlgorithmProvider")
    }
    return context
}