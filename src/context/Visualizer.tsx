'use client';
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { SortingAlgorithmType, AnimationArrayType } from "../shared/types"
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
    runAniamtion: (animation: AnimationArrayType) => void,
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

        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= 0; i--) {
                window.clearInterval(i);
            }
        }, 0);

        setTimeout(() => {
            const arrLines = document.getElementsByClassName("array-line");
            for (let i = 0; i < arrLines.length; i++) {
                arrLines[i].classList.remove("change-line-color");
                arrLines[i].classList.add("default-line-color");
            }
        }, 0);
    }

    const runAniamtion = (animations: AnimationArrayType) => {
        setIsSorting(true);

        const inverseSpeed = (1 / animationSpeed) * 200;
        const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>;

        const updateClassList = (
            indexes: number[],
            addClassName: string,
            removeClassName: string
        ) => {
            indexes.forEach((index) => {
                arrayLines[index].classList.add(addClassName);
                arrayLines[index].classList.remove(removeClassName);
            })
        }

        const updateHeightValue = (
            lineIndex: number,
            newHeight: number | undefined
        ) => {
            if (newHeight === undefined) return;
            arrayLines[lineIndex].style.height = `${newHeight}px`;
        }

        animations.forEach((animation, index) => {
            setTimeout(() => {
                const [values, isSwap] = animation;

                if (!isSwap) {
                    updateClassList(values, "changed-line-color", "default-line-color");
                    setTimeout(() => {
                        updateClassList(values, "default-line-color", "changed-line-color");
                    }, inverseSpeed)
                } else {
                    const [lineIndex, newHeight] = values;
                    updateHeightValue(lineIndex, newHeight)
                }

            }, index * inverseSpeed)
        });

        const finalTimeout = animations.length * inverseSpeed;

        setTimeout(() => {
            Array.from(arrayLines).forEach((line) => {
                line.classList.add("pulse-animation", "changed-line-color");
                line.classList.remove("default-line-color");
            });

            setTimeout(() => {
                Array.from(arrayLines).forEach((line) => {
                    line.classList.remove("pulse-animation", "changed-line-color");
                    line.classList.add("default-line-color");
                });
                setIsSorting(false);
                setIsAnimationComplete(true);
            }, 1000);
        }, finalTimeout);
    };

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