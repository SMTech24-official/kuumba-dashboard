import React from "react";
import Image from "next/image";
import amazonIcon from "@/assets/amazon-icon.png"; // Replace with your image path
import linkedinIcon from "@/assets/linkedin-icon.png";
import quotationMarkUp from "@/assets/quotationMarkUp.png";
import quotationMarkDown from "@/assets/quotationMarkDown.png";

const text = `Fantastic service and professional team!
[Company Name] exceeded
expectations with their attention to detail and timely delivery.
Highly recommended!`;
const TestimonialCard = () => {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-4">
        {/* User Image */}
        <div className="h-16 w-16 xs:w-32 xs:h-14 rounded-full overflow-hidden">
          <Image
            src={
              "https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
            }
            alt="User Image"
            width={48}
            height={48}
            className="h-full w-full"
          />
        </div>
        {/* User Info */}
        <div>
          <p className="font-semibold text-lg">Arlene McCoy</p>
          <div className="flex space-x-2 text-sm text-gray-500 mb-4">
            <span>
              <Image src={amazonIcon} height={10} width={40} alt="image" />
            </span>
            <span>
              <Image src={linkedinIcon} height={10} width={40} alt="image" />
            </span>
          </div>
          {/* Testimonial Text */}
          <div className=" text-lg text-gray-700 flex flex-wrap ">
            <span className="me-1">
              <Image src={quotationMarkUp} height={10} width={20} alt="image" />
            </span>
            {text?.length > 150 ? (
              <span className="">{text.slice(0, 150)}...</span>
            ) : (
              text
            )}
            <span className="">
              <Image
                src={quotationMarkDown}
                height={10}
                width={20}
                alt="image"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
