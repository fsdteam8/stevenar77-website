import React from 'react'

interface WhyLearnProps {
  title: string;
  description: string;
  className?: string;
  icon: React.ReactNode;
  iconContainerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const WhyLearn: React.FC<WhyLearnProps> = ({
  title,
  description,
  className = "",
  icon,
  iconContainerClassName = "",
  titleClassName = "",
  descriptionClassName = ""
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className} w-[80%] mx-auto md:w-[40%] lg:w-[32%]`}>
      <div className={`flex justify-center mb-4 bg-[#EDFAFA] shadow-2xl w-12 h-12 items-center text-[#0694A2] rounded-full mx-auto ${iconContainerClassName}`}>
        {icon}
      </div>
      <h2 className={`text-[24px] font-medium text-[#27303F] leading-[150%] ${titleClassName}`}>
        {title}
      </h2>
      <p className={`text-[16px] text-[#6B7280] font-normal pt-2 leading-[150%] w-[90%]  mx-auto ${descriptionClassName}`}>
        {description}
      </p>
    </div>
  )
}

export default WhyLearn