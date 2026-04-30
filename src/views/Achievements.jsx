import { useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { WEIGHT_MILESTONES, DISTANCE_MILESTONES } from "../utils/dashboardUtils/gamificationConstants";

function Achievements() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('weight');

    const totalWeight = location.state.totalWeight;
    const totalDistance = location.state.totalDistance0;

    const currentData = activeTab === 'weight' ? WEIGHT_MILESTONES : DISTANCE_MILESTONES;
    const userValue = activeTab === 'weight' ? totalWeight : totalDistance;

    const tabClass = (tab) => 
        `px-6 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === tab 
            ? 'border-primary-red-one text-primary-red-one'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;

    return (
        <div className="w-full min-h-screen p-6 bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* The Headers & Tabs */}
                    <div className="px-8 pt-6 pb-0 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Milestones</h2>
                        <div className="flex space-x-8">
                            <button onClick={() => setActiveTab('weight')} className={tabClass('weight')}>
                                Weight Achievements
                            </button>
                            <button onClick={() => setActiveTab('distance')} className={tabClass('distance')}>
                                Distance Achievements
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="p-0">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
                                    <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Achievement</th>
                                    <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Threshold</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentData.map((item, index) => {
                                    // Check if achievement is met
                                    const isUnlocked = userValue >= item.threshold;

                                    return (
                                        <tr 
                                            key={index} 
                                            className={`transition-colors duration-300 
                                                ${isUnlocked 
                                                    ? 'bg-red-50 hover:bg-red-100/70'
                                                    : 'opacity-60'
                                                }`
                                            }
                                        >
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                    isUnlocked 
                                                    ? 'bg-red-100 text-primary-red-one'
                                                    : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                    Lv. {item.level}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className={`text-sm font-medium ${isUnlocked ? 'text-primary-red-one' : 'text-gray-900'}`}>
                                                    {item.comparison}
                                                </p>
                                                <p className={`text-xs ${isUnlocked ? 'text-primary-red-one' : 'text-gray-500'}`}>
                                                    {isUnlocked ? 'Milestone reached!' : 'Locked'}
                                                </p>
                                            </td>
                                            <td className="px-8 py-5 text-right font-mono text-sm text-gray-600">
                                                {item.threshold.toLocaleString()} 
                                                <span className="ml-1 text-gray-400">
                                                    {activeTab === 'weight' ? 'lbs' : 'miles'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="flex justify-end mt-4">
                    <Link 
                        to="/home/dashboard" 
                        className="px-6 py-2 bg-secondary-gray-two text-primary-red-one rounded-lg border border-transparent hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Achievements;