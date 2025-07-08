import React from 'react'

interface TotalItemProps{
    title: string;
    amount: number;
    bgColor: string;
    icon: React.ElementType;
}

const TotalItem = React.memo(({title, amount, bgColor, icon: Icon}: TotalItemProps) => {
  
  return (
     <div className="flex justify-between p-3 bg-white dark:bg-black-primary dark:text-white rounded-lg shadow-md w-44">
        <div className="flex flex-col">
        <span className="text-gray-700 dark:text-gray-300 text-sm">{title}</span>
        <span className="text-2xl font-medium">{amount?.toLocaleString()}</span>
        </div>
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${bgColor}`}>
            <Icon className="w-6 h-6 text-white font-bold"/>
        </div>
    </div>
  )
})

export default TotalItem