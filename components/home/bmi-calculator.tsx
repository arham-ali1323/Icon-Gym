"use client";

import { useState } from "react";
import ScrollToTopWaterFill from "@/components/ui/back-to-top";

interface BMIResult {
  bmi: string;
  category: string;
  color: string;
  bmr: number;
  tdee: number;
  recommendedCalories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityFactor, setActivityFactor] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const ageNum = age ? parseFloat(age) : null;

    if (!height || !weight) {
      alert("Please enter height and weight");
      return;
    }

    if (
      isNaN(heightNum) ||
      heightNum <= 0 ||
      heightNum < 50 ||
      heightNum > 250
    ) {
      alert("Please enter a valid height between 50 and 250 cm");
      return;
    }

    if (
      isNaN(weightNum) ||
      weightNum <= 0 ||
      weightNum < 20 ||
      weightNum > 300
    ) {
      alert("Please enter a valid weight between 20 and 300 kg");
      return;
    }

    if (
      age &&
      (isNaN(ageNum!) || ageNum! <= 0 || ageNum! < 10 || ageNum! > 120)
    ) {
      alert("Please enter a valid age between 10 and 120");
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    const bmi = bmiValue.toFixed(1);

    let category = "";
    let color = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
      color = "text-blue-400";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal weight";
      color = "text-green-400";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
      color = "text-yellow-400";
    } else {
      category = "Obese";
      color = "text-red-400";
    }

    let bmr = 0;
    if (gender && age && ageNum) {
      if (gender === "male") {
        bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
      } else if (gender === "female") {
        bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
      }
    }

  const activityMultipliers: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9
};

const tdee = activityFactor
  ? Math.round(bmr * activityMultipliers[activityFactor])
  : 0;

let recommendedCalories = tdee;

if (goal === "lose") recommendedCalories = tdee - 500;
if (goal === "gain") recommendedCalories = tdee + 300;
if (goal === "muscle") recommendedCalories = tdee + 400;

// MACROS (simple & realistic)
const protein = Math.round((recommendedCalories * 0.15) / 4);
const fat = Math.round((recommendedCalories * 0.25) / 9);
const carbs = Math.round((recommendedCalories * 0.6) / 4);

setResult({
  bmi,
  category,
  color,
  bmr: Math.round(bmr),
  tdee,
  recommendedCalories,
  protein,
  fat,
  carbs
});
  };

  return (
    <>
    <div className="bg-gradient-to-br from-gray-900 via-red-900/20 to-black text-white p-4 md:p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
            </div>
          </div>
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold tracking-wider mb-2">
            CALCULATE YOUR
          </h1>
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold tracking-wider">
            BMI NOW!!
          </h2>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Height */}
          <div>
            <label className="block text-orange-600 text-sm font-semibold mb-2 tracking-wider">
              HEIGHT / CM
            </label>
            <input
              type="number"
              placeholder="Height / cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:border-orange-600 transition"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-orange-600 text-sm font-semibold mb-2 tracking-wider">
              WEIGHT / KG
            </label>
            <input
              type="number"
              placeholder="Weight / kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:border-orange-600 transition"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-orange-600 text-sm font-semibold mb-2 tracking-wider">
              AGE OF YOU
            </label>
            <input
              type="number"
              placeholder="Age of you"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded px-4 py-3 text-white placeholder-white focus:outline-none focus:border-orange-600 transition"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-orange-600 text-sm font-semibold mb-2 tracking-wider">
              GENDER
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-[52px] bg-black border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-600 transition appearance-none cursor-pointer"
            >
              <option value="">Select a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Activity Factors and Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
          {/* Activity Factor */}
          <div>
            <label className="block text-orange-600 text-sm font-semibold mb-2 tracking-wider">
              ACTIVITY FACTOR
            </label>
            <select
              value={activityFactor}
              onChange={(e) => setActivityFactor(e.target.value)}
              className="w-full h-[52px] bg-black border border-gray-700 rounded px-4 text-white focus:outline-none focus:border-orange-600 transition appearance-none cursor-pointer"
            >
              <option value="">Select an activity factor</option>
              <option value="sedentary">
                Sedentary (little to no exercise)
              </option>
              <option value="light">Light (exercise 1-3 days/week)</option>
              <option value="moderate">
                Moderate (exercise 3-5 days/week)
              </option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="veryActive">
                Very Active (intense exercise daily)
              </option>
            </select>
          </div>

          {/* Detailed Activity Factor */}
          <div>
            <label className="block text-orange-600 text-sm font-semibold mb-2 tracking-wider">
              I want...
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full h-[52px] bg-black border border-gray-700 rounded px-4 text-white focus:outline-none focus:border-orange-600 transition appearance-none cursor-pointer"
            >
              <option value="">I want (choose an option)</option>
              <option value="lose">Weight Loss</option>
              <option value="gain">Weight Gain</option>
              <option value="muscle">Build Muscle</option>
            </select>
          </div>

          {/* Calculate Button */}
          <div>
            {/* Empty label to match height */}
            <label className="block text-transparent text-sm mb-2">.</label>

            <button
              onClick={calculateBMI}
              className="w-full h-[52px] bg-orange-600 hover:bg-orange-700 text-white font-bold rounded tracking-wider text-lg transition transform hover:scale-105"
            >
              CALCULATE BMI
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
  <div className="mt-10 bg-gradient-to-b from-black to-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-6">

    {/* RESULT */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-orange-600 flex items-center justify-center rounded">
        📊
      </div>
      <h3 className="text-xl font-bold tracking-widest">RESULT</h3>
    </div>

    <p className="text-gray-300 leading-relaxed">
      Based on the data you gave us, your BMI is{" "}
      <span className={`font-bold ${result.color}`}>
        {result.bmi}
      </span>
      , the total energy expended for someone your stature is{" "}
      <span className="text-orange-500 font-bold">
        {result.bmr} Kcal
      </span>{" "}
      (BMR), this is the calories your body needs per day just to survive.
      Taking into account your physical activity, you will need{" "}
      <span className="text-orange-500 font-bold">
        {result.tdee} Kcal
      </span>{" "}
      (TDEE) per day to maintain your weight.
    </p>

    <p className="text-white font-semibold">
      ➜ To achieve your goal we recommend{" "}
      <span className="text-orange-500 font-bold">
        {result.recommendedCalories} Kcal
      </span>{" "}
      per day.
    </p>

    <hr className="border-zinc-800" />

    {/* FOOD */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-orange-600 flex items-center justify-center rounded">
        🍎
      </div>
      <h3 className="text-xl font-bold tracking-widest">FOOD</h3>
    </div>

    <p className="text-gray-300">
      We recommend{" "}
      <span className="text-orange-500 font-bold">
        {result.protein} g
      </span>{" "}
      of protein,{" "}
      <span className="text-orange-500 font-bold">
        {result.fat} g
      </span>{" "}
      of fat, and{" "}
      <span className="text-orange-500 font-bold">
        {result.carbs} g
      </span>{" "}
      of carbohydrates.
    </p>

    <p className="text-gray-400 text-sm">
      Aim for a ratio of 1/3 saturated fat (meat, milk, etc.) and 2/3
      unsaturated fat (fish, avocado, coconut milk).
    </p>
  </div>
)}
      </div>
    </div>
    <ScrollToTopWaterFill />
    </>
  );
}
