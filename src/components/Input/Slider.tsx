import { MAX_ANIMATION_SPEED, MIN_ANIMATION_SPEED } from "@/shared/utils";

export const Slider = ({
    min = MIN_ANIMATION_SPEED,
    max = MAX_ANIMATION_SPEED,
    step = 10,
    value,
    handleChange,
    isDisabled = false,
}: {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled?: boolean;
}) => {
    return (
        <div className="flex gap-4 items-center justify-center">
            <span className="text-center text-gray-300 text-xs">Slow</span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                disabled={isDisabled}
                className="w-full h-[0.5rem] rounded-lg appearance-none cursor-pointer bg-gray-700  focus:ring-6 focus:ring-gray-500 focus:ring-opacity-50"
            />
            <span className="text-center text-gray-300 text-xs">Fast</span>
        </div>
    )
}