export function MetricCard({ title, value, unit, label, trend }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
                <h3 className="text-sm font-medium text-primary-red-one uppercase tracking-wider">{title}</h3>
                <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-bold text-gray-900">{value}</span>
                    <span className="ml-2 text-lg font-medium text-gray-400">{unit}</span>
                </div>
            </div>
            
            <div className="mt-4 flex items-center">
                {trend && (
                    <span className={`text-sm font-semibold mr-2 ${trend === 'up' ? 'text-green-500' : 'text-blue-500'}`}>
                        {trend === 'up' ? '▲' : '▼'}
                    </span>
                )}
                <span className="text-xs text-gray-400 font-medium">{label}</span>
            </div>
        </div>
    );
}