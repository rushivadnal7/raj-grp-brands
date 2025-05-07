import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import imagesLoaded from "imagesloaded";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ScrollPinSectionProps {
  isSecondOne?: boolean;
}

const CardSlider = ({ isSecondOne }: ScrollPinSectionProps) => {
  const location = useLocation();
  const [areImagesLoaded, setImagesLoaded] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const cardRefs = useRef(new Array(4).fill(null));
  const textContentRefs = useRef(new Array(4).fill(null));
  const dotRefs = useRef(new Array(4).fill(null));
  const scrollTriggersRef = useRef<any[]>([]);

  //  Sample content for left sections that will change with each image
  const textContents = isSecondOne
    ? [
        {
          title: "CONSTRUCTION AND MINING",
          description: `Construction and Mining operations are
     important to the improvement and
     preservation of our daily living, providing
     resources used to create electricity, roads,
     and communities. Mines are typically located
     far from where most people work, often in
     mountainous or arid regions, and the
     equipment used is varied and can be
     operated continuously, 24 hours a day for
     7 days a week.`,
        },
        {
          title: "PREMIUM QUALITY",
          description:
            "      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, laudantium corrupti aperiam Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, lauimus a alias totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxim totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxime error eum necessitatibus modi voluptate fuga exercitationem cum voluptates, ipsa odit. Voluptatem tenetur laboriosam enim corrupti, minus aliquam.",
        },
        {
          title: "ENHANCED PERFORMANCE",
          description:
            "      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, laudantium corrupti aperiam placeat, voluptate nesciunt tempora alias quis. Molestiae obcaecati, minus inventore temporibus autem, dolorum  dicoribus autem, dolorum ducimus a alias totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam lnim corrupti, minus aliquam.quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxime error eum necessitatibus modi voluptate fuga exercitationem cum voluptates, ipsa odit. Voluptatem tenetur laboriosam enim corrupti, minus aliquam.coribus autem, dolorum ducimus a alias totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam lnim co",
        },
        {
          title: "LONG-LASTING PROTECTION",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, laudantium corrupti aperiam Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, laudas totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxime error eum necessitatibus modi voluptate fuga exercitationem cum voluptates, ipsa odit. Voluptatem tenetur laboriosam enim corrupti, minus aliquam.ro unde, laudas totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxime error eum ",
        },
      ]
    : [
        {
          title: "COMMERCIAL VEHICLE OIL",
          description: `Diesel Engine oil are used in automotive
     vehicles and are specially designed engine
     oils required to lubricate the parts of diesel
     engines, minimise the wear & tear, enhance
     power, keep the engine clean, reduce sludge
     formation, carry away the heat and help in
     smooth engine function and enhance engine
     life. Diesel engine oils are formulated with
     base oil and further fortified with variety of
     additives which takes care of various factors
     as mentioned above.`,
        },
        {
          title: "FUEL EFFICIENCY",
          description: ` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, laudantium corrupti aperiam placeat, a alias quis. Molestiae obcaecati, minus inventore temporibus autem, dololias totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxime error eum necessitatibus luptates, ipsa odit. Voluptatem tenetur laboriosam enim corrupti, minus aliquam. ulpa quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxime error eum necessitatibus modi volup`,
        },
        {
          title: "ENGINE CLEANLINESS",
          description:
            " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, laudantium corrupti aperiam placeat, voluptate nesciunt tempora alias quis. Molestiae obcaecati, minus inventore temporibus autem, dolorumalias totam ea officia, quo culpa quae vero. Veritatis, fugiat aut qui ex laboriosam labore vero officia maxime error eu aperiam placeat, voluptate nesciunt tempora alias quis. Molestiae obcaecati, minus inventore temporibus autem, dolorum ducimus am necessitatibus modi voluptate fuga exercitationem cum voluptates, ipsa odit. Voluptatem tenetur laboriosam enim corrupti, minus aliquam.",
        },
        {
          title: "ALL-WEATHER PROTECTION",
          description:
            "      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, ex voluptatum. Voluptatem qui dicta vero unde, laudantium corrupti aperiam placeat, voluptate nesciunt tempora alias quis. Molestiae obcaecati, minus inventore temporibus autem, dolorum ducimus ade, laudantium corrupti aperiam placeat, voluptate nesciunt tempora alias quis. Molestiae obcaecati, minus inventore temporibus autem, dolorum ducimus a alia aperiam placeat, voluptate nesciunt tempora alias quis. Molestiae obcaecati, minus inventore temporibus autem, dolorum ducimus as",
        },
      ];

  const images = isSecondOne
    ? [
        {
          id: 1,
          title: "Image 1",
          src: "/zoomol/Rforce-Turbo-Plus-01.png",
          description: "Description for image 1",
        },
        {
          id: 2,
          title: "Image 2",
          src: "/zoomol/Rforce-Turbo-Plus-01.png",
          description: "Description for image 2",
        },
        {
          id: 3,
          title: "Image 3",
          src: "/zoomol/Rforce-Turbo-Plus-01.png",
          description: "Description for image 3",
        },
        {
          id: 4,
          title: "Image 4",
          src: "/zoomol/Rforce-Turbo-Plus-01.png",
          description: "Description for image 4",
        },
      ]
    : [
        {
          id: 1,
          title: "Image 1",
          src: "/zoomol/Rforce-Turbo-Plus.png",
          description: "Description for image 1",
        },
        {
          id: 2,
          title: "Image 2",
          src: "/zoomol/Rforce-Turbo-Plus.png",
          description: "Description for image 2",
        },
        {
          id: 3,
          title: "Image 3",
          src: "/zoomol/Rforce-Turbo-Plus.png",
          description: "Description for image 3",
        },
        {
          id: 4,
          title: "Image 4",
          src: "/zoomol/Rforce-Turbo-Plus.png",
          description: "Description for image 4",
        },
      ];

  const handleDotClick = (index) => {
    const isMobile = window.innerWidth < 768;
    const scrollLength = isMobile ? 300 : 400;
    const totalScrollDistance =
      sectionRef.current.offsetHeight - window.innerHeight;
    const progressInterval = isMobile ? 0.2 : 0.25;
    const targetProgress = index * progressInterval;
    const targetScrollPosition = totalScrollDistance * targetProgress;

    gsap.to(window, {
      scrollTo: {
        y: sectionRef.current.offsetTop + targetScrollPosition,
        autoKill: false,
      },
      duration: 1,
      ease: "power2.inOut",
    });

    updateActiveDot(index);
  };

  const updateActiveDot = (activeIndex) => {
    dotRefs.current.forEach((dot, i) => {
      if (dot) {
        dot.classList.toggle("bg-black", i === activeIndex);
        dot.classList.toggle("bg-gray-400", i !== activeIndex);
      }
    });
  };

  useLayoutEffect(() => {
    // Reset scroll position on navigation
    window.scrollTo(0, 0);

    // Wait for images to load
    const imgLoad = imagesLoaded(sectionRef.current, { background: true });
    imgLoad.on("done", () => {
      setImagesLoaded(true);
      ScrollTrigger.refresh();
    });

    return () => {
      imgLoad.off("done");
    };
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (!imagesLoaded) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const scrollLength = isMobile ? 300 : 400;

      const mainScrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength}%`,
        pin: containerRef.current,
        pinSpacing: true,
        scrub: isMobile ? 0.5 : 1,
        anticipatePin: 1,
      });

      const cardsTl = gsap.timeline();
      const textTl = gsap.timeline();

      cardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 0, yPercent: 50 });
      });

      textContentRefs.current.forEach((textContent, index) => {
        if (textContent) {
          gsap.set(textContent, {
            opacity: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 20,
          });
        }
      });

      updateActiveDot(0);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const progressInterval = isMobile ? 0.2 : 0.25;
        const startProgress = index * progressInterval;
        const zIndex = index + 1;

        cardsTl.to(
          card,
          {
            opacity: 1,
            yPercent: 0,
            zIndex,
            duration: 0.25,
            ease: "power1.inOut",
          },
          startProgress
        );

        if (index > 0) {
          const prevIndex = index - 1;
          const currentText = textContentRefs.current[index];
          const prevText = textContentRefs.current[prevIndex];

          if (currentText && prevText) {
            textTl.to(
              prevText,
              {
                opacity: 0,
                y: -20,
                duration: 0.2,
                ease: "power1.out",
              },
              startProgress
            );

            textTl.to(
              currentText,
              {
                opacity: 1,
                y: 0,
                duration: 0.2,
                ease: "power1.in",
              },
              startProgress + 0.1
            );
          }
        }
      });

      const cardsScrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength}%`,
        animation: cardsTl,
        scrub: isMobile ? 0.5 : 1,
      });

      const textScrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength}%`,
        animation: textTl,
        scrub: isMobile ? 0.5 : 1,
      });

      const progressScrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength}%`,
        scrub: true,
        onUpdate: (self) => {
          const progressInterval = isMobile ? 0.2 : 0.25;
          const activeCardIndex = Math.min(
            Math.floor(self.progress / progressInterval),
            images.length - 1
          );
          updateActiveDot(activeCardIndex);
        },
      });

      scrollTriggersRef.current = [
        mainScrollTrigger,
        cardsScrollTrigger,
        textScrollTrigger,
        progressScrollTrigger,
      ];

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggersRef.current.forEach((trigger) => trigger?.kill());
      scrollTriggersRef.current = [];
      gsap.killTweensOf([
        window,
        sectionRef.current,
        containerRef.current,
        leftSectionRef.current,
        rightSectionRef.current,
      ]);
    };
  }, [imagesLoaded, isSecondOne]);

  // useEffect(() => {
  //   console.log('refreshed')
  // },[])

  return (
    <div
      ref={sectionRef}
      className="relative w-full mx-auto"
      style={{ minHeight: "300vh" }}
    >
      <div
        ref={containerRef}
        className="relative max-w-[85rem] mx-auto px-4 sm:px- h-max flex flex-col"
      >
        <div
          className={`w-full flex flex-col ${
            isSecondOne ? "md:flex-row-reverse" : "md:flex-row"
          } pt-16 md:py-0 items-center md:gap-x-12 justify-center md:justify-between flex-grow`}
        >
          {/* Left Section */}
          <div
            ref={leftSectionRef}
            className="w-full  md:h-full h-1/2 md:w-[40%] lg:w-[40%] flex justify-center items-center p-4 sm:py-8 relative md:mt- md:block"
          >
            {textContents.map((content, i) => (
              <div
                key={i}
                ref={(el) => (textContentRefs.current[i] = el)}
                className="absolute right-0 flex flex-col justify-center items-center w-full h-full"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <h2 className="text-3xl sm:text-5xl md:px-0 px-4 font-bold mb-4 text-black">
                  {content.title}
                </h2>
                <p className="md:text-lg text-base text-justify md:px-0 px-4 mb-6">
                  {content.description}
                </p>
              </div>
            ))}
          </div>
          {/* Right Section */}
          <div
            ref={rightSectionRef}
            className="w-full   md:w-[60%] lg:w-[50%] h-[100vh]  flex items-center justify-center md:justify-start"
          >
            <div className="relative w-full h-full flex   justify-center items-center md:items-center md:mt-0 mt-8 md:h-2/3">
              {images.map((image, i) => (
                <div
                  key={image.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  id={`card-${image.id}`}
                  className="absolute w-full rounded-lg lg:h-max"
                  style={{ opacity: 0, zIndex: i + 1 }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full scale-[1.1] h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className={`md:fixed top-1/2 ${
              isSecondOne ? "-left-[1%]" : "-right-[4%]"
            }  transform -translate-y-1/2 z-50 hidden md:flex flex-row md:flex-col space-y-3`}
          >
            {images.map((image, i) => (
              <button
                key={image.id}
                ref={(el) => (dotRefs.current[i] = el)}
                className="w-3 h-3 rounded-full bg-gray-400 hover:bg-black transition-colors duration-300"
                aria-label={`Go to ${image.title}`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        </div>
        {!isSecondOne && (
          <h1 className="uppercase max-sm:hidden text-[90px] absolute z-10 -bottom-8 left-[6%] text-neutral-300 poppins-bold text-start m-0">
            on highway
          </h1>
        )}
      </div>
    </div>
  );
};

export default CardSlider;
