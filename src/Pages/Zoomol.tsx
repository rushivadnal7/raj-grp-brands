import React, { useEffect, useRef, useState } from "react";
import {
  Bike,
  NotebookIcon as Scooter,
  FlaskRound as Flask,
} from "lucide-react";
import TabsContainer from "@/components/custom/TabContainer";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import CardSlider from "./CardSlider";
// import ZoomolCarousel from "@/components/zoomolCarousel/ZoomolCarousel";
import ScrollToTop from "@/features/ScrollToTop";
import { GradualSpacing } from "@/components/custom/GradualSpacing";
// import { ImageCarousel } from "@/components/zoomolYaxisCarousel/ImageCarousel";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiFileText } from "react-icons/fi";
import { ImageCarousel } from "@/components/custom/ImageCarousel";
import CardSlider from "@/components/custom/CardSlider";
import ZoomolCarousel from "@/components/custom/ZoomolCarousel";

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
    id: "passenger-car-motor-oil",
    title: "Passenger Car Motor Oil",
    tabTitle: "Passenger Car Motor Oil",
    img: "/zoomolIcons/icon2.png",
    description:
      "Motorcycle and Scooter Oils are specially made for use in new generation Bikes and Gearless Scooters.",
    ctaText: "Discover Passenger Car Motor Oil",
  },
  {
    Id: 3,
    id: "diesel-engine-oils",
    title: "Diesel Engine Oils",
    tabTitle: "Diesel Engine Oils",

    img: "/zoomolIcons/icon3.png",
    description:
      "Scooter oils are specially made for use in new generation Bikes and Gearless Scooters.",
    ctaText: "Discover Diesel Engine Oils",
  },
  {
    Id: 4,
    id: "specialty-oils",
    title: "SPECIALTY OILS",
    tabTitle: "SPECIALTY OILS",

    img: "/zoomolIcons/icon4.png",
    description:
      "Specialty oils are specially made for use in new generation Bikes and Gearless Scooters.",
    ctaText: "View Specialty Oils",
  },
];

const tabImages: Record<string, string> = {
  "motorcycle-oils": "/bike.png",
  "passenger-car-motor-oil": "/zoomolHeroSection/car.png",
  "diesel-engine-oils": "/zoomolHeroSection/truck.png",
  "specialty-oils": "/zoomolHeroSection/grease.png",
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

  const [selectedTitle, setSelectedTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = (title: string) => {
    setSelectedTitle(title);
    setOpen(true);
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
      img: "/zoomolCarousel/carousel1.png",
    },
    {
      detail: "<p>Tractor oil</p>",
      img: "/zoomolCarousel/carousel2.png",
    },
    {
      detail: "<p>Three Wheeler</p>",
      img: "/zoomolCarousel/carousel3.png",
    },

    {
      detail: "<p>Passenger car <br/> motor oil</p>",
      img: "/zoomolCarousel/carousel4.png",
    },
    {
      detail: "<p>Tractor oil</p>",
      img: "/zoomolCarousel/carousel5.png",
    },
    {
      detail: "<p>Three Wheeler</p>",
      img: "/zoomolCarousel/carousel6.png",
    },
    // {
    //   detail: "<p>Gear &<br/>Transformer Oil</p>",
    //   img: "/zoomol/zenco-xp-9.png",
    // },
    // {
    //   detail: "<p>GREASES</p>",
    //   img: "/zoomol/lubritek-ultramile.png",
    // },
    // {
    //   detail: "<p>Hydraulic Oils</p>",
    //   img: "/zoomol/suprahydAW32.png",
    // },
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

  const images = [
    {
      src: "/zoomolCarousel/motorcycle1.png",
      alt: "Roxx Premium 4T Motorcycle Oil",
    },
    {
      src: "/zoomolCarousel/motorcycle2.png",
      alt: "Zoomol Roxx LV 4T Oil",
    },
    {
      src: "/zoomolCarousel/motorcycle3.png",
      alt: "Zoomol Roxx Scooter Oil",
    },
    {
      src: "/zoomolCarousel/motorcycle4.png",
      alt: "Front Fork Oil",
    },
    {
      src: "/zoomolCarousel/motorcycle5.png",
      alt: "Front Fork Oil",
    },
  ];

  const commercialImages = [
    {
      src: "/zoomolCarousel/commercialCarousel1.png",
      alt: "Roxx Premium 4T Motorcycle Oil",
    },
    {
      src: "/zoomolCarousel/commercialCarousel2.png",
      alt: "Zoomol Roxx LV 4T Oil",
    },
    {
      src: "/zoomolCarousel/commercialCarousel3.png",
      alt: "Zoomol Roxx Scooter Oil",
    },
    {
      src: "/zoomolCarousel/commercialCarousel4.png",
      alt: "Front Fork Oil",
    },
    {
      src: "/zoomolCarousel/commercialCarousel5.png",
      alt: "Front Fork Oil",
    },
    {
      src: "/zoomolCarousel/commercialCarousel6.png",
      alt: "Front Fork Oil",
    },
  ];

  const motoOilContent = [
    {
      title: "MOTORCYCLE & SCOOTER OIL",
      description:
        "Motorcycle and Scooter Oils are specially made for use in new generation Bikes and Gearless Scooters. The base oil and high-end additives allow the motorcycle & scooter oil to perform its vital function - lubricating the engine's moving parts to protect them against wear & tear, enhance power and acceleration, keep the engine clean, reduce sludge formation, carry away the heat and help in smooth engine function and enhance engine life. Understanding the specific requirements of the segment of Motor Cycle and Scooter oil, Raj Petro Specialities with its strong back up of ultramodern R&D Centres and the state-of-the-art manufacturing units have developed a wide range of high quality and performance-based motorcycle and scooter oils under the brand name of \"Roxx\" recommended for use in all Motorcycles and Scooter manufactured by major OEM's",
      categories: [
        {
          title: "BIKE OILS",
          items: [
            "ZOOMOL ROXX PREMIUM 4T 20W-40 SN/MA2",
            "ZOOMOL ROXX LV 4T 10W-30 SM/MA2",
            "ZOOMOL ROXX PREMIUM 4T 15W-50 SM/MA2",
          ],
        },
        {
          title: "SCOOTER OILS",
          items: ["ZOOMOL ROXX SCOOTER 10W-30 SN/MB"],
        },
        {
          title: "SPECIALITY OILS",
          items: ["FRONT FORK OIL"],
        },
      ],
    },
    {
      title: "DIESEL ENGINE OILS",
      description:
        "High-performance diesel engine oils designed for both On Highway and Off Highway applications. These oils are formulated with premium base stocks and advanced additive technology to ensure excellent engine protection, cleaner operation, and longer drain intervals. Ideal for modern heavy-duty diesel engines that comply with emission norms and operate under high loads and severe conditions.",
      categories: [
        {
          title: "ON HIGHWAY",
          items: [
            "ZOOMOL RFORCE 5100, 15W-40 CJ-4",
            "ZOOMOL RFORCE 4100, 15W-40 CI-4 PLUS",
            "ZOOMOL RFORCE XP PLUS, 15W-40 CI-4",
            "ZOOMOL RFORCE TURBO PLUS, 15W-40 CH-4",
            "ZOOMOL RFORCE TURBO, 15W-40 CF-4",
            "ZOOMOL RFORCE MGX. 20W-40 CF-4",
            "ZOOMOL RFORCE 6100 15W-40",
          ],
        },
        {
          title: "OFF HIGHWAY",
          items: [
            "ZOOMOL RFORCE 5100, 15W-40 CJ-4",
            "ZOOMOL RFORCE 4100, 15W-40 CI-4 PLUS",
            "ZOOMOL RFORCE XP PLUS, 15W-40 CI-4",
            "ZOOMOL RFORCE TURBO PLUS, 15W-40 CH-4",
            "ZOOMOL RFORCE TURBO, 15W-40 CF-4",
            "ZOOMOL RFORCE MGX. 20W-40 CF-4",
            "ZOOMOL RFORCE 6100 15W-40",
          ],
        },
      ],
    },
  ];

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
            <div className="relative  flex flex-col min-h-full lg:flex-row items-center gap-4 lg:gap-8 lg:ml-64 px-4 z-30">
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
            <div className="absolute z-50 top-10 sm:top-20 right-4 sm:right-6 rotate-90 lg:rotate-90 lg:-right-10 lg:top-28 lg:-translate-x-1/2 flex space-x-2 sm:space-x-4">
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

        <div className=" max-w-7xl mx-auto  h-fit py-5 md:px-10 lg:py-5">
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
            Engine Oils have approval from Global OEM’s
          </p>
        </div>

        {/* <div className="bg-gray-200 relative w-screen  h-fit flex justify-center items-center  ">
          <CardSlider isSecondOne={false} />
        </div> */}

        {/* Carousel Zoomol Card */}
        <ZoomolCarousel images={cardDetails} />
        {/* <div className="bg-gray-200 w-screen h-fit flex justify-center items-center  ">
          <CardSlider isSecondOne={true} />
        </div> */}

        <div className="w-full h-fit bg-[#f0f0f0] py-10 px-10">
          <div className="max-w-6xl mx-auto">
            {motoOilContent
              .slice(0, 1)
              .map(({ title, description, categories }, i) => (
                <React.Fragment key={i}>
                  <div className="gap-5 flex flex-col">
                    <h1 className="text-3xl underline font-semibold">
                      {title}
                    </h1>
                    <p className="text-justify">{description}</p>
                  </div>

                  <div className="my-5 flex flex-row max-sm:flex-col-reverse">
                    <div className="self-center">
                      {categories.map((category, index) => (
                        <div key={index}>
                          <h1 className="text-[#da2616] text-lg font-semibold pb-2">
                            {category.title}
                          </h1>
                          <div className="font-semibold space-y-2 py-2">
                            {category.items.map((item, idx) => (
                              <div
                                className="flex flex-row space-x-2"
                                key={idx}
                                onClick={() => handleClick(item)}
                              >
                                <div className="w-3 h-3 rounded-full bg-red-500 self-center" />
                                <p className="hover:underline">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="md:flex-1 ml-8 h-[400px]">
                      <ImageCarousel images={images} />
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* Carousel Zoomol Card */}
        <ZoomolCarousel
          images={[...cardDetails.slice(3, 6), ...cardDetails.slice(0, 3)]}
        />

        <div className="w-full h-fit bg-[#f0f0f0] py-10 px-10">
          <div className="max-w-6xl mx-auto">
            {motoOilContent
              .slice(1, 2)
              .map(({ title, description, categories }, i) => (
                <React.Fragment key={i}>
                  <div className="gap-5 flex flex-col">
                    <h1 className="text-3xl underline font-semibold">
                      {title}
                    </h1>
                    <p className="text-justify">{description}</p>
                  </div>

                  <div className="my-5 flex flex-row">
                    <div className="self-center">
                      {categories.map((category, index) => (
                        <div key={index}>
                          <h1 className="text-[#da2616] text-lg font-semibold pb-2">
                            {category.title}
                          </h1>
                          <div className="font-semibold space-y-2 py-2">
                            {category.items.map((item, idx) => (
                              <div
                                className="flex flex-row space-x-2"
                                key={idx}
                                onClick={() => handleClick(item)}
                              >
                                <div className="w-3 h-3 rounded-full bg-red-500 self-center" />
                                <p className="hover:underline">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 ml-8 h-[400px] self-center">
                      <ImageCarousel images={commercialImages} />
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl ">
          <DialogHeader>
            <DialogTitle className="w-40 ">
              <img
                className="w-full object-contain"
                src="/brands-logo/zoomol.jpg"
              />
            </DialogTitle>
            <DialogTitle className="font-bold text-2xl py-5">
              {selectedTitle}
            </DialogTitle>
            <DialogTitle className="my-6">Description</DialogTitle>
            <DialogDescription className="py-3">
              Zoomol Zest MGX Super 5W-40 is synthetic passenger car motor oil
              for gasoline and diesel engines formulated with latest API
              additive technology to provide high performance and protection,
              longer drain interval and increased engine life.
              <br />
              <br /> Zoomol Zest MGX Super 5W-40 meets the requirement of API
              SN/SM/CF SAE 5W-40.
              <br />
              <br />
              Zoomol Zest MGX Super 5W-40 is recommended for use in passenger’s
              cars manufactured by leading OEMS and other manufacturer where
              such type of oil is recommended.
            </DialogDescription>
          </DialogHeader>
          {/* <div className="flex items-center space-x-2 ">
            <div>
              <button onClick={} className="bg-[#0066b2] text-white font-semibold py-4 px-10 rounded-lg shadow-md hover:bg-[#005a99] transition duration-300 flex items-center justify-center w-full sm:w-auto max-sm:py-5 max-sm:text-lg">
                {" "}
                Download PDF
                <FiFileText className="ml-4" />
              </button>
            </div>
          </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Zoomol;
