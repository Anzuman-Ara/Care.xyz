"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
          <div className="relative container section">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                      Trusted Care Services for
                      <span className="text-primary block">Your Loved Ones</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                      Find reliable and trusted care services for children, elderly, and other family members. Book easily and securely through our platform.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/auth/register" className="btn-primary text-lg px-8 py-4 text-center">
                      Get Started
                    </Link>
                    <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTegD3PetFKbooBVorUXd37tq9TpUJgC2m4fw&s"
                    alt="Caregivers and Patients"
                    width={600}
                    height={500}
                    className="relative rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services slider Section */}
        <section className="container section">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Care Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional care services tailored to meet the unique needs of your loved ones
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full"
            >
            <SwiperSlide>
              <div className="card p-6 text-center mx-4">
                <img
                  src="/baby-care.png"
                  alt="Baby Care"
                  className="w-full h-88 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">Baby Care</h3>
                <p className="text-muted-foreground">Professional babysitting and childcare services for your little ones.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card p-6 text-center mx-4">
                <img
                  src="/elderly-care.png"
                  alt="Elderly Care"
                  className="w-full h-88 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">Elderly Care</h3>
                <p className="text-muted-foreground">Compassionate care for seniors to ensure their well-being and comfort.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card p-6 text-center mx-4">
                <img
                  src="/sick-care.png"
                  alt="Sick People Care"
                  className="w-full h-88 object-cover center rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">Sick People Care</h3>
                <p className="text-muted-foreground">Specialized medical care and support for those in need.</p>
              </div>
            </SwiperSlide>
           </Swiper>
         </div>
       </section>

        {/* About Section */}
        <section className="w-full max-w-5xl about-section mb-12 mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            About Care.xyz
          </h2>
          <div className="max-w-4xl mx-auto font-comic">
            <p className="text-lg leading-relaxed mb-6">
              Care.xyz is a web application that helps users book reliable and trusted care services for their loved ones. Whether you need babysitting, elderly care, or special care at home, our platform makes it easy and secure to find and hire caretakers.
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is to make caregiving accessible, secure, and hassle-free for everyone. With a focus on quality and trust, we ensure that you find the best care services tailored to your needs.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="container section">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide comprehensive care solutions with experienced professionals, flexible scheduling, and secure payment processing.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Baby Care */}
            <div className="bg-accent dark:bg-blue-900 p-6 rounded-lg shadow-md card">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Baby Care</h3>
              <p className="text-gray-600 dark:text-gray-300 font-comic mb-4">
                Professional babysitting services to ensure your child is safe and cared for.
              </p>
              <Link
                href="/service/baby-care"
                className="btn-primary"
              >
                View Details
              </Link>
            </div>

            {/* Elderly Service */}
            <div className="bg-secondary dark:bg-green-900 p-6 rounded-lg shadow-md card">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Elderly Service</h3>
              <p className="text-gray-600 dark:text-gray-300 font-comic mb-4">
                Compassionate care for the elderly to ensure their well-being and comfort.
              </p>
              <Link
                href="/service/elderly-care"
                className="btn-primary"
              >
                View Details
              </Link>
            </div>

            {/* Sick People Service */}
            <div className="bg-primary dark:bg-purple-900 p-6 rounded-lg shadow-md card">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Sick People Service</h3>
              <p className="text-gray-600 dark:text-gray-300 font-comic mb-4">
                Specialized care for individuals who need medical attention and support.
              </p>
              <Link
                href="/service/sick-people-care"
                className="btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        </section>


        {/* Challenges Section */}
        <section className="container section">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Challenges We Address</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding the common challenges in caregiving and how we help overcome them
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-accent p-6 rounded-lg shadow-md card">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Finding Reliable Caregivers</h3>
              <p className="text-gray-600 dark:text-gray-300 font-comic">
                Difficulty in locating trustworthy and qualified caregivers for your loved ones.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md card">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Time Constraints</h3>
              <p className="text-gray-600 dark:text-gray-300 font-comic">
                Balancing work, family, and caregiving responsibilities without compromising quality.
              </p>
            </div>
            <div className="bg-primary p-6 rounded-lg shadow-md card">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-300 font-comic">
                Ensuring the care provided meets high standards and addresses specific needs.
              </p>
            </div>
          </div>
        </section>


        {/* Testimonials */}
        <section className="container section">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from families who have experienced our care services
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="testimonial-card font-comic">
              <p className="mb-4 text-lg leading-relaxed">
                "Care.xyz made it so easy to find a babysitter for my child. The service was excellent!"
              </p>
              <p className="font-semibold text-primary">- Sarah J.</p>
            </div>
            <div className="testimonial-card font-comic">
              <p className="mb-4 text-lg leading-relaxed">
                "I was worried about my elderly mother, but the caretaker from Care.xyz was amazing!"
              </p>
              <p className="font-semibold text-primary">- John D.</p>
            </div>
            <div className="testimonial-card font-comic">
              <p className="mb-4 text-lg leading-relaxed">
                "The sick care service was a lifesaver. Highly recommended!"
              </p>
              <p className="font-semibold text-primary">- Emily R.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}