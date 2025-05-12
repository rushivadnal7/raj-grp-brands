import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// TypeScript interface for images prop
interface Image {
  img: string;
  detail: string;
}

// Animation variants for bottom-to-top with fade
const itemVariants = {
  hidden: { y: 50, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Animation variants for x-axis slide
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  }),
};

const ZoomolCarousel = ({ images }: { images: Image[] }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync carousel state with current index
  useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      if (!isTransitioning) {
        const current = api.selectedScrollSnap();
        setCurrentIndex(current);
        setIsTransitioning(false);
      }
    };

    api.on("select", updateIndex);
    return () => {
      api.off("select", updateIndex);
    };
  }, [api, isTransitioning]);

  // Handle navigation (used for both arrows and dots)
  const navigateTo = (newIndex: number) => {
    if (api && !isTransitioning) {
      setIsTransitioning(true);
      const direction = newIndex > currentIndex ? 1 : -1;
      setDirection(direction);
      setCurrentIndex(newIndex);
      api.scrollTo(newIndex);
    }
  };

  // Handle dot click
  const handleDotClick = (index: number) => {
    navigateTo(index);
  };

  // Handle arrow navigation
  const handleNext = () => {
    if (api && !isTransitioning) {
      const newIndex = (currentIndex + 1) % images.length; // Loop to start if at end
      navigateTo(newIndex);
    }
  };

  const handlePrevious = () => {
    if (api && !isTransitioning) {
      const newIndex = (currentIndex - 1 + images.length) % images.length; // Loop to end if at start
      navigateTo(newIndex);
    }
  };

  // useEffect(() => {
  //   console.log("Updated displayImages:", displayImages);
  //   console.log("Original images:", images);
  // }, [displayImages, images]);

  // const activeImg = displayImages[0]?.img;

  return (
    <div className="relative py-10 w-full flex justify-center items-center max-sm:py-14">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full md:w-[80%] lg:w-[80%]"
      >
        <CarouselContent className="p-3">
          {images.map((c: Image, index: number) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 shrink-0 grow-0"
            >
              <motion.div
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                whileInView={itemVariants.visible}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                <Card className="border-0">
                  <CardContent className="p-0">
                    <img
                      className="object-contain w-full"
                      src={c.img}
                      alt={`slide-${c.detail}`}
                      onError={() =>
                        console.error(`Failed to load image: ${c.img}`)
                      }
                    />
                  </CardContent>
                </Card>

                {/* <div
                  className={`flex ${
                    c.detail === "<p>Gear &<br/>Transformer Oil</p>"
                      ? "w-[130%] -ml-4"
                      : "w-fit mx-auto"
                  } space-x-3 p-5 mt-4`}
                >
                  <div className="w-5 h-[4.5rem] bg-[#da2616]"></div>
                  <div
                    dangerouslySetInnerHTML={{ __html: c.detail }}
                    className={`text-left w-full flex ${
                      c.detail === "<p>Gear &<br/>Transformer Oil</p>"
                        ? "justify-start"
                        : "justify-center"
                    } items-center -mt-1.5 text-black text-2xl xl:text-4xl lg:text-2xl md:text-xl font-semibold uppercase`}
                  />
                </div> */}
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        {/* <CarouselPrevious onClick={handlePrevious} /> */}
        <CarouselPrevious onClick={handlePrevious}/>
        <CarouselNext onClick={handleNext} />
      </Carousel>

      {/* Semantic nav for dot navigation */}
      <nav
        className="absolute z-20 bottom-6 flex space-x-3 md:hidden"
        aria-label="Carousel navigation"
      >
        {images.map((item: Image, index: number) => (
          <button
            key={index}
            className={`size-3 sm:size-4 rounded-full cursor-pointer transition-colors duration-300 ${
              currentIndex === index ? "bg-[#da2616]" : "bg-gray-300"
            }  focus:outline-none focus:ring-2 focus:ring-[#da2616]`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => handleDotClick(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleDotClick(index);
              }
            }}
          />
        ))}
      </nav>
    </div>
  );
};

export default ZoomolCarousel;
