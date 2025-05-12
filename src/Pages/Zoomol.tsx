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
import ScrollToTop from "@/features/ScrollToTop";
import { GradualSpacing } from "@/components/custom/GradualSpacing";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
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
import { Helmet } from "react-helmet";
import { ImageCarousel } from "@/components/custom/ImageCarousel";
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
      "Engineered for high-performance rides, our oils ensure smoother acceleration and superior clutch performance. Ideal for new-generation bikes and gearless scooters navigating city traffic or long hauls",
  },
  {
    Id: 2,
    id: "passenger-car-motor-oil",
    title: "Passenger Car Motor Oil",
    tabTitle: `Passenger Car <br/> <p class="lg:pt-2"> Motor Oil </p>`,
    img: "/zoomolIcons/icon2.png",
    description:
      "Designed to boost engine life and fuel efficiency in modern petrol vehicles. Experience a quieter drive with powerful protection in every kilometer.",
    ctaText: "Discover Passenger Car Motor Oil",
  },
  {
    Id: 3,
    id: "diesel-engine-oils",
    title: "Diesel Engine Oils",
    tabTitle: "Diesel Engine Oils",

    img: "/zoomolIcons/icon3.png",
    description:
      "Built to withstand heavy loads and high temperatures in commercial and utility vehicles. Delivers reliable wear protection, even in the most demanding conditions..",
    ctaText: "Discover Diesel Engine Oils",
  },
  {
    Id: 4,
    id: "specialty-oils",
    title: "SPECIALTY OILS",
    tabTitle: "SPECIALTY OILS",

    img: "/zoomolIcons/icon4.png",
    description:
      "Tailor-made solutions for niche applications across industrial, automotive, and agricultural sectors. Our specialty range meets extreme performance needs with customized formulations.",
    ctaText: "View Specialty Oils",
  },
];

const tabImageClasses: Record<string, string> = {
  "motorcycle-oils": " max-sm:mt-[40px] w-52 sm:w-64 md:w-[350px]",
  "passenger-car-motor-oil":
    " max-sm:mt-[110px] w-[300px] md:w-[600px] md:mt-[70px]",
  "diesel-engine-oils":
    "  max-sm:mt-[50px] w-[250px]  md:w-[500px] md:-mb-[100px] md:-mt-[100px] ",
  "specialty-oils": " max-sm:mt-[120px] w-[250px]  md:w-[350px] md:mt-[70px]",
};

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

  const [selectedItem, setSelectedItem] = useState<{
    subTitle: string;
    description: string;
  } | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (item: { subTitle: string; description: string }) => {
    setSelectedItem(item);
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
      detail: "<p>Three Wheeler</p>",
      img: "/zoomolCarousel/carousel7.png",
    },
  ];
  const cardDetail = [
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
    {
      detail: "<p>Three Wheeler</p>",
      img: "/zoomolCarousel/carousel8.png",
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
            {
              subTitle: "ZOOMOL ROXX PREMIUM 4T 20W-40 SN/MA2",
              description: `Zoomol Roxx Premium 4T 20W-40 API SN with “FCF” is a Synthetic Blend Future Ready 4- Stroke Engine Oil, formulated with highly refined base oil and further fortified with premium quality additive technology ensuring following benefits. <br/> <ul class="list-disc marker:text-black my-2 ml-4"> <li>  Enhanced DFI, SFI and STI ensuring 40%* Extra Clutch Friction Control resulting in faster and smoother ride.Extended drain interval of up to 12000** km</li> . <li>Enhanced heat protection up to 50%*</li>.<li>Reduced in piston deposits – 80%* cleaner piston</li>.<li>Reduced valve train wear by 4 Times lesser.</li></ul>Zoomol Roxx Premium 4T 20W-40 is specially formulated for wet clutch application for Young Generation Bikes with Enhanced Power, Smooth Drivability, Superior Gear protection and Improved Engine Cleanliness.<br/><br/>Zoomol Roxx Premium 4T 20W-40 meets and exceeds the performance requirement of JASO MA2 and the VTW requirement of API SN.<br/><br/>*Based on Oil Performance evaluation against industry test limits.<br/><br/>**Based on Oil drain interval validation through limited field trials. <br/><br/>Please refer OEM manual for the recommended drain period.`,
            },
            {
              subTitle: "ZOOMOL ROXX LV 4T 10W-30 SM/MA2",
              description: `Zoomol Roxx LV 4T 10W-30 is high performance 4-stroke motor cycle oil engineered to enhance the power and performance of two-wheelers specially formulated for wet clutch application. Its offer the following benefits.<ul class="my-2 ml-5 list-disc marker:text-black"><li>Longer engine life.</li> <li>Longer drain interval.</li> <li>Maximum gear protection.</li> <li>Superior clutch performance.</li> <li>Keeps engine cool and clean.</li></ul>Zoomol Roxx LV 4T 10W-30 meets the requirements of API SM and JASO MA2 SAE 10W-30.<br/> <br/>Zoomol Roxx LV 4T 10W-30 is recommended for use in all 4-stroke motorcycles manufactured by major OEM’s and all other manufactures of modern age bikes where such types of oil are recommended.`,
            },
            {
              subTitle: "ZOOMOL ROXX PREMIUM 4T 15W-50 SM/MA2",
              description: `Zoomol Roxx Premium 4T 15W-50 is premium quality high performance 4-stroke engine oil blended from Group-III base oils and fortified with selective additives. The product has been developed especially for high speed and high power 4-stroke new generation motorcycles. Its offer the followings benefits: - <ul class="my-2 ml-4 list-disc marker:text-black"><li>Improved engine and gear protection</li> <li> Enhanced clutch performance</li> <li>Superior engine cleanliness </li> <li>Extended drain interval </li> <li> Excellent low temperature fluidity</li> <li>Smooth drivability </li></ul> Zoomol Roxx Premium 4T 15W-50 exceeds the performance requirement of JASO MA2 and Valve Train Wear requirement of API SM.<br/> <br/>Zoomol Roxx Premium 4T 15W-50 is recommended for use in all high end 4-stroke motorcycles fitted with engines of 150 CC and above and fitted with dual spark plugs. Please refer OEM manual for recommended engine oil specification.`,
            },
          ],
        },
        {
          title: "SCOOTER OILS",
          items: [
            {
              subTitle: "ZOOMOL ROXX SCOOTER 10W-30 SN/MB",
              description: `Zoomol Roxx Scooter 10W-30 is high performance scooter oil specially developed for new generation or gearless scooters. It is formulated with power pack additive technology providing smooth ride and better pickup even in tough city riding conditions. Its offer the following benefits.<ul class="ml-4 my-2 list-disc marker:text-black"><li>Long-term protection against wear and corrosion. </li> <li>Effective low temperature engine start-up </li> <li> Low friction co-efficient and superior engine pick-up.</li> <li> Improved fuel economy.</li><li>Reduced oil consumption. </li> </ul> <br/> <br/> Zoomol Roxx Scooter 10W-30 meets the requirement of SAE 10W-30 API SN JASO MB and is suitable for use in all scooters manufactured by major OEM where such type of oil is recommended.`,
            },
          ],
        },
        {
          title: "SPECIALITY OILS",
          items: [
            {
              subTitle: "FRONT FORK OIL",
              description:
                "ZOOMOL ROXX FRONT FORK oil is carefully designed to meetrequirements of motor-cycle forks and suspension. It is blendedfrom superior quality base oils carefully selected additives toprovide protection against wear, trapped air and corrosion.",
            },
          ],
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
            {
              subTitle: "ZOOMOL RFORCE 5100, 15W-40 CJ-4",
              description:
                "ZOOMOL RFORCE 5100 is high performance API CJ-4 oil for use in heavy duty four-stroke cycle diesel engines designed to meet the latest exhaust emission standards. It can be safely used in all applications with diesel fuels ranging in sulfur content up to 500 ppm (0.05% by weight). This “low-SAPS” (low sulfated ash, phosphorus and sulfur) technology oil is especially effective at sustainingemission control system durability where Diesel Particulate Filters (DPF) are used. Optimum protection is provided for control of catalyst poisoning, particulate filter blocking, engine wear, piston deposits, low and high temperature stability, soot handling properties, oxidative thickening, foaming, and viscosity loss due to shear.",
            },
            {
              subTitle: "ZOOMOL RFORCE 4100, 15W-40 CI-4 PLUS",
              description:
                'Zoomol RForce 4100 15W-40 is a high-performance diesel engine oil formulated with superior quality Group II base oils and state of the art performance additives.<br/>Zoomol RForce 4100 15W-40 has been specially formulated to provide superior engine protection for high output, low emission diesel engine meeting Bharat IV emission standards especially in engine using Exhaust Gas Recirculation (EGR) for outstanding control of viscosity increase due to soot loading.<br/>Zoomol RForce 4100 15W-40 is eminently suitable for extended drain interval in transport fleet and off-road application and can also be used in older vehicles confirming Bharat standard I, II and III emission standards. It offers the following benefits <ul class="my-2 ml-4 list-disc marker:text-black"> <li> Recommended drain interval up to 50,000kms* under standard operating conditions.</li>  <li>Efficiently reduces engine wear and controls deposits. </li>  <li>Excellent wear protection of bearings and valve train components. </li> <li>Outstanding controls of viscosity thickening due to soot loading. </li></ul> Zoomol RForce 4100 15W-40 meets the requirements of API CI-4 Plus/SL SAE 15W-40. <br/><br/>Zoomol RForce 4100 API CI-4 is recommended for use in heavy and light commercial vehicles and other equipment’s manufactured by leading OEM\'s recommending engine oil confirming to the above-mentioned specification.<br/><br/>*Based on Oil drain interval validation through limited filed trials. Please refer OEM manual for recommended drain interval.',
            },
            {
              subTitle: "ZOOMOL RFORCE XP PLUS, 15W-40 CI-4",
              description:
                "ZOOMOL RFORCE 3100 is premium diesel engine oil formulated with supreme quality base oils and state of the art performance additives. It is specially formulated to provide superior engine protection for highoutput, low-emission diesel engines meeting Bharat IV emission standards. Suitable for engines employing EGR and those fitted with after treatment devices such as SCR. Eminently suitable for extended drain interval in transport fleets and off the road applications. This oil can also be used in older vehicles conforming to Bharat I, Bharat II and Bharat III emission standards.",
            },
            {
              subTitle: "ZOOMOL RFORCE TURBO PLUS, 15W-40 CH-4",
              description:
                "Zoomol RForce Turbo plus 15W-40 is a premium quality diesel engine oil formulated with supreme quality base oils and state of the art performance additives to provide superior engine protection for high-output, low-emission diesel engines meeting Bharat IV emission standards.<br/><br/>Zoomol RForce Turbo plus 15W-40 meets the requirements of API CH-4/SL.<br/><br/>Zoomol RForce Turbo Plus 15W-40 is recommended for use in Trucks, Buses and other related vehicles & equipment’s manufactured by leading OEM's recommending engine oil confirming to the above-mentioned specification.<br/><br/>Zoomol RForce Turbo plus 15W-40 is recommended for drain interval up to 36000 kms* in long haul application and 24000 kms* in city stop-and-go (severe operation) and ghat applications in all turbo charged heavy duty truck and buses under standard normal operating conditions. However please refer OEM manual for recommended drain interval for oil change.<br/><br/>*Based on Oil drain interval validation through limited field trials. Please refer OEM manual for the recommended drain period.",
            },
            {
              subTitle: "ZOOMOL RFORCE TURBO, 15W-40 CF-4",
              description:
                'Zoomol RForce Turbo 15W-40 is a multi-grade diesel engine oil formulated with superior quality paraffinic base oil and high-performance additives for naturally aspirated and turbocharged engines. It offers the following benefits: <ul class="my-2 ml-4 list-disc marker:text-black"><li>Excellent protection against wear and corrosion.</li> <li>Maximum engine life and minimized oil consumption.</li> <li>Improved control of valve train wear.</li> </ul> Zoomol RForce Turbo 15W-40 meets the requirement of API CF-4.<br/> <br/>Zoomol RForce Turbo 15W-40 is recommended for use in Truck and Buses and other related vehicles & equipment’s manufactured by leading OEM\'s recommending engine oil confirming to the above-mentioned specification.<br/> <br/>Zoomol RForce Turbo 15W-40 is recommended for drain interval up to 18000+ Kms* for heavy duty commercial vehicles and 350* hours for Tractors under normal operating condition. <br/> <br/>*Based on Oil drain interval validation through limited field trials. Please refer OEM manual for the recommended drain period',
            },
            {
              subTitle: "ZOOMOL RFORCE MGX. 20W-40 CF-4",
              description:
                'Zoomol RForce MGX 20W-40 is multi grade diesel engine oil formulated with superior quality paraffinic base oil and high-performance additives to provide excellent protection and performance under all-weather condition. Its offer the following benefits: <ul class="my-2 ml-4 list-disc marker:text-black"> <li>Enhanced wear protection and longer engine life</li> <li>Recommended drain interval up to 18000+ Kms* for heavy duty commercial vehicles.</li> <li>Excellent performance up to 300+ hours in tractors.</li> </ul>Zoomol RForce MGX 20W-40 meets the requirements of API CF-4.<br/><br/>Zoomol RForce MGX 20W-40 is recommended for use in Tractors and Commercial Vehicles and other related vehicles & equipment’s manufactured by leading OEM\'s recommending engine oil confirming to the above-mentioned specification.<br/><br/>*Based on Oil drain interval validation through limited field trials. Please refer OEM manual for the recommended drain period.',
            },
            {
              subTitle: "ZOOMOL RFORCE 6100 15W-40",
              description:
                '<p>Zoomol RForce 6100 15W-40 is a high performance API CK-4 oil formulated with premium quality base stocks and advanced additive technology for use in heavy duty 4-stroke diesel engines designed to meet the latest exhaust emission standard.</p><p>This “low-SAPS” oil is especially effective at sustaining emission control system durability like DPF, EGR, SCR and other advanced after-treatment systems of the latest Euro VI engines and is backward compatible with older generation engines. It offers the following Benefits:</p><p><strong>Product Benefits:</strong></p><ul class="list-disc pl-4 marker:text-black py-2  "><li>Excellent oxidation resistance and thermal stability, minimizes sludge formation and oil thickening.</li><li>Extended Drain interval up to 80000 KM*</li><li>Vastly improved control of soot-induced viscosity increase.</li><li>Excellent protection against corrosive and soot-related engine wear.</li><li>Excellent control of piston deposits and ring/liner wear.</li><li>Sustainability of emission control equipment such as DPF (Diesel Particulate Filter).</li><li>Excellent control of volatility, aeration, foaming, and oil consumption.</li></ul>',
            },
          ],
        },
        {
          title: "OFF HIGHWAY",
          items: [
            {
              subTitle: "ZOOMOL RFORCE 1000 20W-40 CF-4",
              description:
                "ZOOMOL RFORCE 1000 is superior Diesel Engine Oil formulate with good quality base oils and high performance additives to provide excellent engine protection and performance even in sever operating conditions. ",
            },
            {
              subTitle: "ZOOMOL RFORCE 1100 15W-40 CF-4",
              description:
                "ZOOMOL RFORCE 1100 is superior Diesel Engine Oil formulated with superior quality base oils and high performance additives to provide excellent engine protection and performance even in severoperating conditions.",
            },
            {
              subTitle: "ZOOMOL RFORCE 2100 15W-40 CH-4",
              description:
                "ZOOMOL RFORCE 2100 is a premium quality Diesel Engine Oil formulated with supreme quality base oils and state of the art performance additives. It has been specially formulated to provide superior engine protection for heavy duty non-turbocharged and turbocharged engines for on and off-road service. Suitable for use in high-output, low-emission diesel engines meeting Bharat IIIemission standards. This oil can also be used in older vehicles conforming to Bharat I and Bharat II emission standards",
            },
            {
              subTitle: "ZOOMOL RFORCE 3100 RF-4 15W-40 CI-4",
              description:
                "ZOOMOL RFORCE 3100 RF4 is premium quality diesel engine oil formulated with supreme quality base oils and state of the art performance additives. It is specially formulated to provide superior engine protection for high-output, low-emission diesel engines meeting Bharat IV emission standards. Suitable for engines employing EGR and those fitted with after treatment devices such as SCR. Eminently suitable for extended drain interval in transport fleets and off the road applications. This oil can also be used in older vehicles conforming to Bharat I, Bharat II and Bharat III emission standards.",
            },
            {
              subTitle: "ZOOMOL RFORCE 4100 RF-1 15W-40 CI-4 PLUS",
              description:
                "ZOOMOL RFORCE 4100 RF1 is premium quality Diesel Engine Oil formulated with supreme quality base oils and state of the art performance additives. It has been specially formulated to provide superior engine protection for high-output, low-emission diesel engines meeting Bharat IV emission standards. Suitable for engines- employing EGR and those fitted with after treatment devices such as SCR. Eminently suitable for Extended Drain Interval in Transport Fleets and Off-The-Road applications. This oil can also be used in older vehicles conforming to Bharat I, Bharat II and Bharat III emission standards.",
            },
            {
              subTitle: "ZOOMOL RFORCE 5100 RF-1 15W-40 CJ-4",
              description:
                "ZOOMOL RFORCE 5100 RF1 is high performance API CJ-4 oil for use in heavy duty four-stroke cycle diesel engines designed to meet the latest exhaust emission standards. It can be safely used in all applications with diesel fuels ranging in sulfur content up to 500 ppm (0.05% by weight). This “low-SAPS” (low sulfated ash, phosphorus and sulfur) technology oil is especially effective at sustaining emission control system durability where Diesel Particulate Filters (DPF) are used. Optimum protection is provided for control of catalyst poisoning, particulate filter blocking, engine wear, piston deposits, low and high temperature stability, soot handling properties, oxidative thickening, foaming, and viscosity loss due to shear.",
            },
            {
              subTitle: "ZOOMOL RFORCE 8200, RF-1 10W-40 CI-4/E4",
              description:
                "ZOOMOL RFORCE 8200 RF1 is premium quality diesel engine oil prepared from superior quality base oils to provide high performance and protection, reduced piston deposits, reduced oil consumption and optimized engine performance by keeping it clean and extended drain capability.",
            },
            {
              subTitle: "ZOOMOL RFORCE 8200, RF-3 10W-40 CI-4/E4",
              description:
                "ZOOMOL RFORCE 8200 RF3 is premium quality Scania LDF-3 approved diesel engine oil blended with superior quality base oils to provide high performance and protection, reduced piston deposits, reduced oil consumption and optimized engine performance by keeping it clean and extended drain capability.",
            },
            {
              subTitle: "ZOOMOL RFORCE SYN 8720 LA RF-1 10W-40 E-6",
              description:
                "ZOOMOL RFORCE SYN 8720LA RF1 10W-40 is high performance synthetic Diesel Engine oil for use in modern high performance, diesel engines designed to meet the latest exhaust emission standards. It is formulated with “Low SAPS” additive technology to provide the highest level of compatibility with advanced aftertreatment systems. It is a stay-in-grade oil providing excellent control of piston cleanliness, liner wear, soot handling and lubricant stability. While this oil is recommended for modern highly rated diesel engines meeting Euro VI emission standards and running under very severe conditions such as extended oil drain intervals, it also has tremendous reverse compatibility for use in older engines meeting lower emission standards such as Euro V, Euro IV and Euro III. It is suitable for EGR engines with or without Diesel Particulate Filters (DPF) and for engines fitted with SCR NOx reduction systems. This oil is eminently suitable for low emission diesel engines fitted with DPF in combination with low sulphur diesel fuel.",
            },
          ],
        },
      ],
    },
  ];
  const GradualSpacing = ({ text }: { text: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <>
      <Helmet>
        <title>Zoomol | High-Performance Automotive Lubricants</title>
        <meta
          name="description"
          content="Zoomol offers cutting-edge engine oils and greases for bikes, cars, tractors, and commercial vehicles—engineered for performance and protection. "
        />
      </Helmet>
      <ScrollToTop />
      <div className="overflow-hidden">
        <div className="relative md:h-[100vh] h-[90vh] w-screen flex flex-col items-center max-sm:justify-start justify-center lg:justify-end">
          <div
            className="relative bg-white z-10 h-[50%] w-full  mb-20 sm:mb-32 lg:mb-56 cursor-pointer "
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
                    className={`${
                      tabImageClasses[activeTabId] || ""
                    } cursor-pointer select-none pointer-events-none`}
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

        <div className=" max-w-7xl mx-auto  h-fit py-5 md:px-10 lg:py-5 lg:-pt-[40px]">
          <h2 className="md:text-4xl text-2xl px-4 md:px-0 poppins-semibold mb-12">
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
        <ZoomolCarousel images={[...cardDetails, ...cardDetails]} />
        {/* <div className="bg-gray-200 w-screen h-fit flex justify-center items-center  ">
          <CardSlider isSecondOne={true} />
        </div> */}

        <div className="w-full h-max bg-[#f0f0f0] py-10 px-10">
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
                    <div>
                      <div className="self-center">
                        {categories.map((category, index) => (
                          <div key={index}>
                            <h1 className="text-[#da2616] text-lg font-semibold">
                              {category.title}
                            </h1>
                            <div className="font-semibold space-y-2 py-2 cursor-pointer">
                              {category.items.map((item, idx) => (
                                <div
                                  className="flex flex-row space-x-2"
                                  key={idx}
                                  onClick={() => handleClick(item)}
                                >
                                  <div className="w-3 h-3 rounded-full bg-red-500 self-center" />
                                  <p className="hover:underline">
                                    {item.subTitle}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex  my-8">
                        <div className="py-4 w-48 border border-black text-center">
                          <a className="text-lg text-black">Know More</a>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:flex-1 md:ml-8 h-[200px] md:h-[400px] max-sm:self-end">
                      <ImageCarousel images={images} />
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* Carousel Zoomol Card */}
        <ZoomolCarousel images={[...cardDetail, ...cardDetail]} />

        <div className="w-full h-max bg-[#f0f0f0] py-10 px-10">
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

                  <div className="my-5 flex flex-row max-sm:flex-col-reverse">
                    <div>
                      <div className="self-center">
                        {categories.map((category, index) => (
                          <div key={index}>
                            <h1 className="text-[#da2616] text-lg font-semibold">
                              {category.title}
                            </h1>
                            <div className="font-semibold space-y-2 py-2 cursor-pointer">
                              {category.items.map((item, idx) => (
                                <div
                                  className="flex flex-row space-x-2"
                                  key={idx}
                                  onClick={() => handleClick(item)}
                                >
                                  <div className="w-3 h-3 rounded-full bg-red-500 self-center" />
                                  <p className="hover:underline">
                                    {item.subTitle}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex  my-8">
                        <div className="py-4 w-48 border border-black text-center">
                          <a className="text-lg text-black">Know More</a>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:flex-1 md:ml-8 h-[200px] md:h-[400px] md:self-center max-sm:self-end">
                      <ImageCarousel images={commercialImages} />
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="w-40">
              <img
                className="w-full object-contain"
                src="/brands-logo/zoomol.jpg"
                alt="Zoomol Logo"
              />
            </DialogTitle>
            <DialogTitle className="font-bold text-2xl py-5">
              {selectedItem?.subTitle || "Select an Item"}
            </DialogTitle>
            <DialogTitle className="my-6">Description</DialogTitle>
            <DialogDescription className="py-3">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    selectedItem?.description ||
                    "No description available for this item.",
                }}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Zoomol;
