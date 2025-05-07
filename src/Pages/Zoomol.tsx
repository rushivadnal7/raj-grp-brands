import React, { useEffect, useRef, useState } from "react";
import {
  Bike,
  NotebookIcon as Scooter,
  FlaskRound as Flask,
} from "lucide-react";
// import TabsContainer from "../components/custom/TabContainer";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import ZoomolCarousel from "../components/zoomolCarousel/ZoomolCarousel";
import TabsContainer from "../components/custom/TabContainer";
import ScrollToTop from "../features/ScrollToTop";
import { GradualSpacing } from "../components/custom/GradualSpacing";
import CardSlider from "../components/custom/CardSlider";
import ZoomolCarousel from "../components/custom/ZoomolCarousel";



export interface TabData {
  id: string;
  title: string;
  tabTitle: string;
  icon?: React.ReactNode;
  description: string;
  ctaText?: string;
  img?: string;
  Id: number;
}

export const tabsData: TabData[] = [
  {
    Id: 1,
    id: "motorcycle-oils",
    title: "MOTORCYCLE & SCOOTER OIL",
    tabTitle: "MOTORCYCLE & SCOOTER OIL",
    // icon: <Flask size={70} />,
    img: "/Bike-icon.png",
    description:
      "Motorcycle and Scooter Oils are specially made for use in new generation Bikes and Gearless Scooters.",
  },
  {
    Id: 2,
    id: "bike-oils",
    title: "BIKE OILS",
    tabTitle: "BIKE OILS",
    icon: (
      <Bike
        className="group-hover:-rotate-12 transition-transform duration-1000 "
        size={70}
      />
    ),
    description:
      "Motorcycle and Scooter Oils are specially made for use in new generation Bikes and Gearless Scooters.",
    ctaText: "Explore Bike Oils",
  },
  {
    Id: 3,
    id: "scooter-oils",
    title: "SCOOTER OILS",
    tabTitle: "SCOOTER OILS",
    icon: <Scooter size={70} />,
    img: "/zoomol/Scooter-icon.png",
    description:
      "Scooter oils are specially made for use in new generation Bikes and Gearless Scooters.",
    ctaText: "Discover Scooter Oils",
  },
  {
    Id: 4,
    id: "specialty-oils",
    title: "SPECIALTY OILS",
    tabTitle: "SPECIALTY OILS",
    icon: (
      <Flask
        className="group-hover:-rotate-12     transition-transform duration-1000 "
        size={70}
      />
    ),
    description:
      "Specialty oils are specially made for use in new generation Bikes and Gearless Scooters.",
    ctaText: "View Specialty Oils",
  },
];

const tabImages: Record<string, string> = {
  "motorcycle-oils": "/bike.png",
  "bike-oils": "/bike.png",
  "scooter-oils": "/zoomol/Scooter.png",
  "specialty-oils": "/bike.png",
};

function Zoomol() {
  const [activeTabId, setActiveTabId] = useState("motorcycle-oils");

  const currentTab = tabsData.find((tab) => tab.id === activeTabId);

  const swipeStartX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoCycle = () => {
    intervalRef.current = setInterval(() => {
      setActiveTabId((prevId) => {
        const currentIndex = tabsData.findIndex((tab) => tab.id === prevId);
        const nextIndex = (currentIndex + 1) % tabsData.length;
        return tabsData[nextIndex].id;
      });
    }, 5000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startAutoCycle();
  };

  useEffect(() => {
    startAutoCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSwipeStart = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
    resetInterval();
  };

  const handleSwipeEnd = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;

    const deltaX = e.clientX - swipeStartX.current;
    const threshold = 40;

    const currentIndex = tabsData.findIndex((tab) => tab.id === activeTabId);

    if (deltaX > threshold) {
      // swipe right
      const prevIndex = (currentIndex - 1 + tabsData.length) % tabsData.length;
      setActiveTabId(tabsData[prevIndex].id);
    } else if (deltaX < -threshold) {
      // swipe left
      const nextIndex = (currentIndex + 1) % tabsData.length;
      setActiveTabId(tabsData[nextIndex].id);
    }
    swipeStartX.current = null;
    resetInterval();
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setActiveTabId((prevId) => {
  //       const currentIndex = tabsData.findIndex((tab) => tab.id === prevId);
  //       const nextIndex = (currentIndex + 1) % tabsData.length;
  //       return tabsData[nextIndex].id;
  //     });
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, [tabsData]);

  const cardDetails = [
    {
      detail: "<p>Passenger car<br/> motor oil</p>",
      img: "/zoomol/car.jpg",
    },
    {
      detail: "<p>Tractor oil</p>",
      img: "/zoomol/zenco-trac.png",
    },
    {
      detail: "<p>Three Wheeler</p>",
      img: "/zoomol/zenco-mg.png",
    },
    {
      detail: "<p>Gear &<br/>Transformer Oil</p>",
      img: "/zoomol/zenco-xp-9.png",
    },
    {
      detail: "<p>GREASES</p>",
      img: "/zoomol/lubritek-ultramile.png",
    },
    {
      detail: "<p>Hydraulic Oils</p>",
      img: "/zoomol/suprahydAW32.png",
    },
  ];

  const heroDotsNavigationHandler = (value: any) => {
    setActiveTabId(value);
    resetInterval();
  };

  const titleControls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // Reset title
      await titleControls.set({ y: -100, x: 100, scale: 2, opacity: 0 });

      // Step 1: Animate title in
      await titleControls.start({
        y: -100,
        x: 100,
        scale: 1.3,
        opacity: 1,
        transition: { duration: 1, ease: "easeInOut" },
      });

      // Step 2: Wait a bit before final scale
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Step 3: Animate title to bottom-left and smaller
      await titleControls.start({
        y: 0,
        x: 0,
        scale: 1,
        transition: { duration: 1, ease: "easeInOut" },
      });
    }

    sequence();
  }, [activeTabId]);

  return (
    <>
      <ScrollToTop />
      <div className="overflow-hidden">
        <div className="relative md:h-[100vh] h-[90vh] w-screen flex flex-col items-center justify-center">
          <div
            className="relative bg-white z-10 h-[50%] w-full  mb-20 sm:mb-32 lg:mb-56 cursor-pointer"
            onPointerDown={handleSwipeStart}
            onPointerUp={handleSwipeEnd}
          >
            {/* Background Image */}
            <div className="absolute select-none inset-0 overflow-hidden z-[10]">
              <motion.img
                className="hidden md:block absolute w-full h-full object-cover md:object-center pointer-events-none z-10"
                src="/building_blocks.png"
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
              <motion.img
                className="block md:hidden absolute w-full h-full  object-cover  pointer-events-none z-10"
                src="/zoomol/buildingMob.png"
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </div>
            {/* Foreground Image & Title */}
            <div className="relative  flex flex-col lg:flex-row items-center gap-4 lg:gap-8 lg:ml-64 px-4 z-30">
              <AnimatePresence mode="wait">
                {tabImages[activeTabId] && (
                  <motion.img
                    key={activeTabId}
                    src={tabImages[activeTabId]}
                    alt={currentTab?.title}
                    className="w-64 sm:w-80 md:w-96 cursor-pointer select-none pointer-events-none"
                    initial={{ x: 1200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -1200, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.h3
                  // dangerouslySetInnerHTML={{
                  //   __html: currentTab?.title ?? "",
                  // }}
                  className="text-3xl sm:text-4xl select-none md:text-5xl lg:text-6xl font-bold text-black leading-tight mt-4 lg:mt-0 z-[100] text-center lg:text-left"
                  animate={titleControls}
                  initial={false}
                  exit={{ opacity: 0, y: 50, scale: 0.95 }}
                  draggable={false}
                >
                  {/* {currentTab?.title} */}
                  {/* <TypewriterText text={currentTab?.title ?? ""} /> */}
                  <GradualSpacing text={currentTab?.tabTitle || ""} />
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Dot Navigation */}
            <div className="absolute z-50 top-10 sm:top-20 right-4 sm:right-6 rotate-90 lg:rotate-90 lg:top-28 lg:-translate-x-1/2 flex space-x-2 sm:space-x-4">
              {tabsData.map((tab) => (
                <div
                  key={tab.id}
                  className={`size-3 sm:size-4 rounded-full cursor-pointer transition-colors duration-300 ${
                    activeTabId === tab.id ? "bg-red-600" : "bg-gray-300"
                  }`}
                  onClick={() => heroDotsNavigationHandler(tab.id)}
                ></div>
              ))}
            </div>

            {/* Tab Container */}
            <div className="mt-4 sm:mt-6 lg:-mt-12 px-2 sm:px-4 z-[100]">
              <TabsContainer
                tabsData={tabsData}
                onTabChange={setActiveTabId}
                activeTab={activeTabId}
              />
            </div>
          </div>
        </div>

        <div className=" max-w-7xl mx-auto md:h-screen h-fit ">
          <h2 className="md:text-4xl text-2xl px-4 md:px-0 poppins-semibold my-12">
            Future ready engine Oil and greases
          </h2>
          <p className="text-justify md:text-lg text-base mt-5 px-5 md:px-0   ">
            Raj Petro Specialities Pvt Ltd., A Brenntag Group Company having
            expertise in the Industrial & Speciality Lubricants business,
            seamlessly have extended its offering in the Automotive Lubricant
            segment with a wide range of Future Ready Engine Oils & Greases
            having the brand “Zoomol”. Launched in October 2010, the company is
            set to redefine the automotive lubricants industry and have
            established the brand Zoomol as a high-Quality Premium range of
            lubricants catering to all segments in Diesel Engine Commercial and
            Agriculture segment, Two-Wheeler 4 Stroke Segment and Passenger Car
            Segment in addition to Gear Oils, Transmission Oils, Coolants and
            other Automotive Speciality products. All products of Zoomol are
            manufactured using high quality Group-II and Group- III base oils
            which are being imported from the best refineries in the world and
            further fortified with high end additives for a better performance
            and confirming to the global standards.
          </p>
          {/* <br /> */}
          <p className="text-justify md:text-lg text-base px-5 my-5 md:px-0 ">
            All Zoomol Engine Oils comply with the latest API standard, in
            addition to meeting the latest required Emission Norms as per the
            Government requirements confirming to the present Euro V / Bharat
            Stage V emission standard and is also ready with the formulation and
            products to meet the requirements of Euro VI / Bharat Stage VI
            emission standards. Zoomol Engine Oils perform very well in all
            engines in Indian driving condition, ensuring better engine
            maintenance, lower oil consumption, lesser wear and tear and
            ultimately lowering maintenance costs. Some of the top end Zoomol
            Engine Oils have approval from Global OEM’s.
          </p>
        </div>

        <div className="bg-gray-200 relative w-screen  h-fit flex justify-center items-center  ">
          <CardSlider isSecondOne={false} />
        </div>
        <ZoomolCarousel images={cardDetails} />
        <div className="bg-gray-200 w-screen h-fit flex justify-center items-center  ">
          <CardSlider isSecondOne={true} />
        </div>
        <ZoomolCarousel
          images={[...cardDetails.slice(3, 6), ...cardDetails.slice(0, 3)]}
        />
      </div>
    </>
  );
}

export default Zoomol;
