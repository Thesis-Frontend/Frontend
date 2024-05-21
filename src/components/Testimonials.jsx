import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import image from "../assets/my-photo.jpg";

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    position: "CEO, Innovatech",
    comment:
      "Pincident Lite has dramatically improved our operational efficiency. The multi-tenant architecture and customizable access controls are game changers!",
    image: image,
  },
  {
    id: 2,
    name: "Elif Korkmaz",
    position: "Operations Manager, TechSolutions",
    comment:
      "The level of detail and control over data access is unprecedented. Pincident Lite's system is integral to our day-to-day operations.",
    image: image,
  },
  {
    id: 3,
    name: "John Doe",
    position: "CTO, AutoAdvance",
    comment:
      "From scalability to security, Pincident Lite checks all the boxes for what we need in an enterprise management platform.",
    image: image,
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 mt-24 w-full">
      <div className="text-center py-10 w-full bg-slate-50">
        <span className="text-gray-600 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
          Testimonials
        </span>
        <h2 className="block w-full bg-gradient-to-b from-blue-600 to-gray-500 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
          Read What Our Clients Say
        </h2>
        <div className="flex max-w-5xl mx-auto gap-8 group mt-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="!bg-blue-600/45 duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-xl  w-1/3"
            >
              {/* <div className="flex items-center space-x-4 mb-4"> */}
              <img
                className="h-32 mx-auto rounded-full mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <h4 className="uppercase text-xl font-bold">
                {testimonial.name}
              </h4>
              {/* <div>
                  <p className="text-lg font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">
                    {testimonial.position}
                  </p>
                </div> */}
              {/* </div> */}
              <p className="text-sm leading-7 my-3 font-light opacity-70 inline-block">
                <FaQuoteLeft className="inline text-black text-xl" />
                {` ${testimonial.comment} `}
                <FaQuoteRight className="inline text-black text-xl" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
