import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabData {
  id: string;
  title: string;
  tabTitle: string;
  icon?: React.ReactNode;
  description: string;
  ctaText?: string;
  img?: string;
}
interface TabsContainerProps {
  tabsData: TabData[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  tabsData,
  onTabChange,
  activeTab,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabClick = (tabId: string) => {
    if (tabId !== activeTab && !isAnimating) {
      setIsAnimating(true);
      onTabChange?.(tabId);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const activeTabData = tabsData.find((tab) => tab.id === activeTab) as TabData;

  return (
    <div className="w-full max-w-[90rem] mx-auto z-20 relative">
      <div className="flex h-[140px] bg-white">
        {tabsData.map((tab) => (
          <motion.div
            key={tab.id}
            className={`relative ${
              activeTab === tab.id ? "flex-[1] sm:flex-[4]" : "flex-1"
            } overflow-hidden transition-all duration-500`}
            onClick={() => !isAnimating && handleTabClick(tab.id)}
          >
            <div
              className={`absolute inset-0 ml-0.5  ${
                activeTab === tab.id
                  ? "bg-black sm:bg-white"
                  : "bg-black cursor-pointer hover:bg-zinc-900"
              } transition-colors`}
            >
              <div
                className={`h-full flex items-center  ${
                  activeTab === tab.id
                    ? "justify-center sm:justify-start"
                    : "justify-center"
                }`}
              >
                {/* Show only title on small screens for active tab */}
                <div className="w-full">
                  <span className="hidden sm:inline">
                    {activeTab === tab.id ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          className="flex w-full max-w-5xl h-full sm:"
                          key={tab.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        >
                          {/* Logo Section */}
                          <div className="bg-red-600 p-4 w-max sm:p-8 px-6 flex items-center group">
                            <div className="flex items-center gap-2 sm:gap-3 text-white">
                              <div className="text-sm sm:text-lg">
                                {tab.img ? (
                                  <img
                                    src={tab.img}
                                    className={`${
                                      tab.img === "/Bike-icon.png"
                                        ? "md:scale-[4] lg:scale-100 lg:w-[150px] "
                                        : "w-[150px]"
                                    } `}
                                  />
                                ) : (
                                  tab.icon
                                )}
                              </div>
                              <div>
                                <h1
                                  dangerouslySetInnerHTML={{
                                    __html: tab.tabTitle,
                                  }}
                                  className="font-bold text-sm sm:text-xl leading-tight px-1 sm:px-2"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Description Section (Hidden on small devices) */}
                          <div className="bg-gray-100 w-full   sm:py-16 sm:px-4 over hidden sm:flex justify-center items-center ">
                            <p className="text-xs md:text-xs lg:text-base text-gray-800">
                              {tab.description}
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <div className="flex flex-col items-center text-white space-y-2 sm:space-y-4 px-2 sm:px-4">
                        <span
                          dangerouslySetInnerHTML={{ __html: tab?.title }}
                          className="font-medium text-center text-[10px] sm:text-sm tracking-wider"
                        >
                          {/* {tab.title} */}
                        </span>
                      </div>
                    )}
                  </span>
                  <span className="inline sm:hidden">
                    <div className="flex flex-col items-center text-white space-y-2 sm:space-y-4 m-6 px-2 text-center  sm:px-4">
                      <span className=" text-xs sm:text-lg ">{tab.title}</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TabsContainer;
