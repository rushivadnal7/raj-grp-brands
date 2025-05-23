import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Download, FileText } from "lucide-react";
import { FaPlay } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import { RajelRajolData } from "@/utils/RajellRajpolData";


const formSchema = z.object({
  firstName: z.string().min(3, { message: "First Name is required." }),
  lastName: z.string().min(3, { message: "Last Name is required." }),
  email: z.string().email({ message: "Enter a valid email" }),
  phoneNumber: z.string().regex(/^[1-9]\d{9}$/, {
    message: "Enter a valid 10-digit phone number (e.g., 1234567899).",
  }),
  companyName: z.string().min(3, { message: "Company name is required." }),
});

const RajelRajol = () => {
  // const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const pathParts = location.pathname.split("/"); // ['', 'zoomol']
  const name = pathParts[2];
  console.log(name);
  const [expandedSegment, setExpandedSegment] = useState("");
  const [visibleProductIndex, setVisibleProductIndex] = useState<number | null>(
    null
  );
  const [visibleApplicationIndex, setVisibleApplicationIndex] = useState<
    number | null
  >(null);

  const brandData = RajelRajolData.find(
    (data) => data.name.toLowerCase() === name?.toLowerCase()
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // const payload = {
      //     first_name: data.firstName,
      //     last_name: data.lastName,
      //     email: data.email,
      //     mobile_number: data.phoneNumber,
      //     company: data.companyName,
      //     brand: name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase(),
      // };

      // console.log(payload);

      // const response = await axios.post(
      //     "https://mail.actifyzone.com/API/Raj/Group/Mail/Brand",
      //     payload
      // );

      // toast.success("Brochure(s) downloaded successfully!", {
      //     position: "bottom-center",
      // });

      // console.log("Form submitted successfully:", response.data);
      const downloadFile = (filePath, fileName) => {
        const link = document.createElement("a");
        link.href = filePath;
        link.download = fileName;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      brandData?.brochureLinks.forEach((pdfPath) => {
        console.log(pdfPath);
        const fileName = pdfPath.split("/").pop(); // Extract actual filename from path
        downloadFile(pdfPath, fileName);
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Brochure Downloading Failed",
          error.response?.status,
          error.response?.data
        );
      } else {
        toast.error("An unexpected error occurred.", {
          description: "Please try again later.",
          position: "bottom-center",
        });
        console.error("Error submitting form:", error);
      }
    }
    // const link = document.createElement("a");
    // link.href = "/dummy_pdf.pdf"; // or your dynamic URL
    // link.download = "brochure.pdf";
    // link.target = "_blank";
    // link.rel = "noopener noreferrer";

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const toggleSegment = (segment: string) => {
    if (expandedSegment === segment) {
      setExpandedSegment("");
    } else {
      setExpandedSegment(segment);
    }
  };

  const toggleProductDescription = (index: number) => {
    if (visibleProductIndex === index) {
      setVisibleProductIndex(null);
    } else {
      setVisibleProductIndex(index);
    }
  };
  const toggleApplicationDescription = (index: number) => {
    if (visibleApplicationIndex === index) {
      setVisibleApplicationIndex(null);
    } else {
      setVisibleApplicationIndex(index);
    }
  };

  if (!brandData) {
    return <div>Brand not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{brandData.helmet.helmetTitle}</title>
        <meta
          name="description"
          content={brandData.helmet.description}
        />
      </Helmet>;
      <div className="bg-white">
        <div className="h-full relative">
          <img
            src={brandData.bannerImage}
            alt=""
            className="sm:object-center lg:h-[80%] w-screen object-center"
          />
        </div>
        {/* Header Section */}
        <div className=" md:px-10 mx-auto mb-[50px] bg-white  pt-24 max-sm:p-1">
          <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:grid-cols-1 2xl:grid-cols-2">
            {/* Left Column - Logo, Title and Description */}
            <div className="space-y-6 flex flex-col justify-start items-start ">
              {/* Logo and Title */}
              <div className="mb-4 mt-4 lg:mt-0">
                <img
                  src={brandData.mainLogo}
                  alt=""
                  className={`object-center h-[70px] lg:h-[100px]  mx-5  ${brandData.mainLogo === "/electrol.png" ||
                      brandData.mainLogo ===
                      "/transparent-brands-logo/agrispray.png"
                      ? "md:w-96 w-60 object-contain "
                      : ""
                    }`}
                />
                {/* <h1>{brandData.name}</h1> */}
              </div>

              {/* Product Description */}
              <div
                dangerouslySetInnerHTML={{ __html: brandData.description }}
                className="mx-5 text-lg text-justify"
              />
              {/* Download Brochure Button */}
              <div className="max-w-7xl mt-10 mx-auto lg:mx-0 px-4">
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-[#0066b2] text-white font-semibold py-4 px-10 rounded-lg shadow-md hover:bg-[#005a99] transition duration-300 flex items-center justify-center w-full sm:w-auto max-sm:py-5 max-sm:text-lg">
                        {" "}
                        Brochure
                        <FileText className="ml-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Download Brochure</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-4">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <div className="flex flex-wrap gap-4">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem className="w-full md:w-[calc(50%-0.5rem)]">
                                    <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                      First Name
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="First Name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem className="w-full md:w-[calc(50%-0.5rem)]">
                                    <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                      Last Name
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Last Name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex flex-wrap gap-4">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem className="w-full md:w-[calc(50%-0.5rem)]">
                                    <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                      Email
                                    </FormLabel>
                                    <FormControl>
                                      <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                  <FormItem className="w-full md:w-[calc(50%-0.5rem)]">
                                    <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                      Phone Number
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Phone Number"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className=" self-center justify-self-center w-full flex justify-center  ">
                              <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                  <FormItem className="w-full">
                                    <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                                      Company Name
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Company Name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Button
                              type="submit"
                              className="bg-[#0066b2] text-white font-semibold  rounded-lg shadow-md hover:bg-[#005a99] transition duration-300 flex items-center justify-center w-full sm:w-auto py-6"
                            >
                              Download Brochure
                              <FileText className="ml-2" />
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {["kyros", "onwo", "zoomol"].includes(
                    brandData.name?.toLowerCase()
                  ) && (
                      <button className="bg-[#0066b2] text-white font-semibold py-4 max-sm:py-6 px-4 rounded-lg shadow-md hover:bg-[#005a99] transition duration-300 flex items-center justify-center w-full sm:w-auto text-sm max-sm:text-base">
                        Product Data Sheet
                        <Download className="ml-2 size-5" />
                      </button>
                    )}

                  {brandData.link && (
                    <a
                      href={brandData.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full  sm:w-auto flex justify-center"
                    >
                      <img
                        className="h-16 sm:h-14 object-contain"
                        src="/youtubeButton.png"
                        alt="YouTube Button"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Features and Specifications */}
            <div className="gap-5 max-lg:my-5 lg:gap-10 flex  md:flex-row flex-col lg:m-5">
              {/* Features */}
              <div className="mt-8 max-sm:w-full max-md:w-1/3 md:mx-2 max-sm:flex justify-around  flex-row">
                {brandData.logo.map((logo, index) => (
                  <div key={index} className="flex flex-col mb-8 items-center">
                    <img src={logo.img} className="h-[80px] max-sm:h-[40px]" />
                    <span
                      className="text-[#0066b2] font-medium text-center"
                      dangerouslySetInnerHTML={{ __html: logo.imgName }}
                    />
                  </div>
                ))}
              </div>

              {/* Specifications Table */}
              <div className="border rounded-md overflow-hidden shadow-sm md:p-3 w-[430px] h-fit max-lg:w-[600px] max-sm:w-[100vw] max-sm:p-2">
                <div className="bg-gray-200 p-6">
                  <h3 className="text-[#0066b2] font-bold text-xl">
                    {brandData.table[0].header}
                  </h3>
                </div>
                <div>
                  <div className="flex flex-row gap-1 justify-start text-center items-start divide-x py-1 min-h-[80px] max-h-[180px]">
                    <div className="flex justify-start pl-8 items-center text-[13px] bg-gray-200 text-gray-700 w-full min-h-[80px]">
                      {brandData.table[0].row1.join(", ")}
                    </div>
                  </div>
                  <div className="flex flex-row divide-x gap-1 text-center justify-center items-center py-1 min-h-[80px] max-h-[180px]">
                    <div className="flex justify-start pl-8 items-center text-[13px] text-gray-700 bg-gray-200 w-full max-h-[180px] min-h-[80px] max-sm:px-2">
                      {brandData.table[0].row2.join(", ")}
                    </div>
                  </div>
                  <div className="flex flex-row divide-x gap-1 text-center py-1 min-h-[80px] max-h-[180px] h-[100px]">
                    <div className="flex justify-start pl-8 items-center text-[13px] w-full text-gray-700 bg-gray-200 min-h-[80px] max-sm:px-2">
                      {brandData.table[0].row3?.join(", ")}
                    </div>
                  </div>
                  <div className="flex justify-center items-center text-center flex-row divide-x gap-1 py-1 min-h-[80px] max-h-[180px]">
                    <div className="flex justify-start pl-8 items-center text-center text-[13px] text-gray-700 bg-gray-200 w-full min-h-[80px]">
                      {brandData.table[0].row4.join(", ")}
                    </div>
                  </div>
                  <div className="flex justify-center items-center text-center flex-row divide-x gap-1 py-1 min-h-[80px] max-h-[180px]">
                    <div className="flex justify-start pl-8 items-center text-center text-[13px] text-gray-700 bg-gray-200 w-full min-h-[80px]">
                      {brandData.table[0].row5.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Segments Section */}
        <div className="px-4 sm:px-8 md:px-15 ">
          <div className="w-full b-[150px] ml-5 ">
            <h2 className="text-xl sm:text-2xl font-bold uppercase mb-4 ">
              {brandData.segmentTitle1
                ? "segments -" + brandData.segmentTitle1
                : "segments"}
            </h2>

            <div className="space-y-4 pr-12">
              {brandData?.Segments1?.map((segment, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md w-full shadow-lg overflow-hidden"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleSegment(segment?.segmentName)}
                  >
                    <h3 className="text-sm sm:text-base poppins-semibold ">
                      {segment?.segmentName}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-[#0066b2] flex items-center justify-center text-white">
                      {expandedSegment === segment?.segmentName ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>

                  {expandedSegment === segment?.segmentName && (
                    <div className="px-4 pb-4">
                      <div className="flex flex-wrap gap-6 mb-4">
                        {segment?.productName?.map((product, productIndex) => (
                          <div
                            key={productIndex}
                            className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)]"
                          >
                            <div
                              className={`flex items-center justify-start cursor-pointer ${visibleProductIndex === productIndex
                                  ? "font-bold"
                                  : ""
                                }`}
                              onClick={() =>
                                toggleProductDescription(productIndex)
                              }
                            >
                              <span
                                className={`flex items-center poppins-semibold ${visibleProductIndex === productIndex
                                    ? "text-[#046fbb]"
                                    : "text-black"
                                  }`}
                              >
                                <FaPlay
                                  fill="#046fbb"
                                  className={`mr-2 ${visibleProductIndex === productIndex
                                      ? "rotate-90"
                                      : "rotate-0"
                                    } transition-all duration-200`}
                                />
                                {product.vname}
                              </span>
                            </div>
                            <hr className="block sm:hidden" />
                            {/* Mobile View: Product Description */}
                            {visibleProductIndex === productIndex && (
                              <div className="mt-2 block sm:hidden">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: product?.productDescription,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <hr className="hidden sm:flex" />

                      {/* Larger View: Product Description */}
                      {visibleProductIndex !== null && (
                        <div className="mt-4 hidden sm:flex">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                segment?.productName[visibleProductIndex]
                                  ?.productDescription,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {brandData.Segments2 && (
              <>
                <h2 className="text-xl sm:text-2xl uppercase mt-14 font-bold mb-4">
                  {"Segments - " + brandData.segmentTitle2 || ""}
                </h2>

                <div className="space-y-4 ">
                  {brandData?.Segments2?.map((segment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-lg overflow-hidden"
                    >
                      <div
                        className="flex justify-between items-center p-4 cursor-pointer"
                        onClick={() => toggleSegment(segment?.segmentName)}
                      >
                        <h3 className="text-sm sm:text-base poppins-semibold ">
                          {segment?.segmentName}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-[#0066b2] flex items-center justify-center text-white">
                          {expandedSegment === segment?.segmentName ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      {expandedSegment === segment?.segmentName && (
                        <div className="px-4 pb-4">
                          <div className="flex flex-wrap gap-6 mb-4">
                            {segment?.productName?.map(
                              (product, productIndex) => (
                                <div
                                  key={productIndex}
                                  className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)]"
                                >
                                  <div
                                    className={`flex items-center justify-start cursor-pointer ${visibleProductIndex === productIndex
                                        ? "font-bold"
                                        : ""
                                      }`}
                                    onClick={() =>
                                      toggleProductDescription(productIndex)
                                    }
                                  >
                                    <span
                                      className={`flex items-center font-bold ${visibleProductIndex === productIndex
                                          ? "text-[#046fbb]"
                                          : "text-black"
                                        }`}
                                    >
                                      <FaPlay fill="#046fbb" className="mr-2" />
                                      {product.vname}
                                    </span>
                                  </div>
                                  <hr className="block sm:hidden" />
                                  {/* Mobile View: Product Description */}
                                  {visibleProductIndex === productIndex && (
                                    <div className="mt-2 block sm:hidden">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: product?.productDescription,
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>

                          <hr className="hidden sm:flex" />

                          {/* Larger View: Product Description */}
                          {visibleProductIndex !== null && (
                            <div className="mt-4 hidden sm:flex">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    segment?.productName[visibleProductIndex]
                                      ?.productDescription,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-10 mb-10">
              {brandData?.name === "Electrol" && (
                <div className="space-y-4">
                  {brandData?.Segments3?.map((segment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-lg overflow-hidden"
                    >
                      <div
                        className="flex justify-between items-center p-4 cursor-pointer"
                        onClick={() => toggleSegment(segment?.segmentName)}
                      >
                        <h3 className="text-sm sm:text-base poppins-semibold">
                          {segment?.segmentName}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-[#0066b2] flex items-center justify-center text-white">
                          {expandedSegment === segment?.segmentName ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      {expandedSegment === segment?.segmentName && (
                        <div className="px-4 pb-4">
                          <div className="flex flex-wrap gap-6 mb-4">
                            {segment?.productName?.map(
                              (product, productIndex) => (
                                <div
                                  key={productIndex}
                                  className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)]"
                                >
                                  <div
                                    className={`flex items-center justify-start cursor-pointer ${visibleProductIndex === productIndex
                                        ? "font-bold"
                                        : ""
                                      }`}
                                    onClick={() =>
                                      toggleProductDescription(productIndex)
                                    }
                                  >
                                    <span
                                      className={`flex items-center poppins-semibold ${visibleProductIndex === productIndex
                                          ? "text-[#046fbb]"
                                          : "text-black"
                                        }`}
                                    >
                                      <FaPlay
                                        fill="#046fbb"
                                        className={`mr-2 ${visibleProductIndex === productIndex
                                            ? "rotate-90"
                                            : "rotate-0"
                                          } transition-all duration-200`}
                                      />
                                      {product.vname}
                                    </span>
                                  </div>
                                  <hr className="block sm:hidden" />
                                  {/* Mobile View: Product Description */}
                                  {visibleProductIndex === productIndex && (
                                    <div className="mt-2 block sm:hidden">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: product?.productDescription,
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>

                          <hr className="hidden sm:flex" />

                          {/* Larger View: Product Description */}
                          {visibleProductIndex !== null && (
                            <div className="mt-4 hidden sm:flex">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    segment?.productName[visibleProductIndex]
                                      ?.productDescription,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* APPLICATION SECTION */}
        <div className="px-4 sm:px-8 md:px-15 ">
          <h2 className="text-xl sm:text-2xl font-bold uppercase ml-5  ">
            application
          </h2>
          <p className="my-3 ml-5">{brandData.ApplicationDescription}</p>
          <div className=" pb-4 pr-5">
            <div className="flex flex-wrap flex-col divide-y-0 gap-2 mb-4 px-3   ">
              {brandData.Applications.map((product, productIndex) => (
                <>
                  <div
                    key={productIndex}
                    className="bg-white rounded-md w-full shadow-lg overflow-hidden p-4"
                  >
                    <div
                      className={`flex items-center justify-start font-normal  cursor-pointer ${visibleApplicationIndex === productIndex
                          ? "font-bold"
                          : ""
                        }`}
                      onClick={() => toggleApplicationDescription(productIndex)}
                    >
                      <span
                        className={`flex items-center justify-between w-full  poppins-semibold ${visibleApplicationIndex === productIndex
                            ? "text-[#046fbb]"
                            : "text-black"
                          }`}
                      >
                        {/* <FaPlay
                                                    fill="#046fbb"
                                                    className={`mr-2 ${visibleApplicationIndex === productIndex
                                                        ? "rotate-90"
                                                        : "rotate-0"
                                                        } transition-all duration-200`}
                                                /> */}
                        {product.vname}
                        <div className="w-8 h-8 rounded-full bg-[#0066b2] flex items-center justify-center text-white">
                          {visibleApplicationIndex === productIndex ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </span>
                    </div>
                    {visibleApplicationIndex === productIndex && (
                      <div className="mt-2 block ">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product?.productDescription,
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <hr className="block " />
                </>
              ))}
            </div>

            {/* <hr className="hidden sm:flex" />

                        {visibleApplicationIndex !== null && (
                            <div className="mt-4 hidden sm:flex">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            brandData.Applications[visibleApplicationIndex]
                                                ?.productDescription,
                                    }}
                                />
                            </div>
                        )} */}
          </div>
        </div>

        {/* SUPPLY OPTIONS  SECTION */}
        <div className="px-4 sm:px-8 md:px-15 mb-[150px]">
          <h2 className="text-xl sm:text-2xl font-bold uppercase mb-4  ml-5">
            SUPPLY OPTIONS
          </h2>
          <p className="my-3 ml-5">{brandData.supplyDescription}</p>
        </div>
      </div>
    </>
  );
};

export default RajelRajol;
