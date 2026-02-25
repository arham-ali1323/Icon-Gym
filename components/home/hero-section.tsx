import Image from "next/image";
import heroImage from "../../public/images/hero.png";
import heroBg from "../../public/images/Hero-bg.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden py-[60px] md:py-[300px] lg:py-[400px]">
      {/* BACKGROUND IMAGE */}
      <Image
        src={heroBg}
        alt="Fitness Man Background"
        fill
        priority
        className="object-cover object-center z-0"
      />

      {/* TEXT */}
      <div className="absolute inset-0 z-10">
        {/* OBTAIN – top left */}
        <span
          className="
                      absolute top-6 left-6
                      uppercase font-orbitron font-black
                      text-[3rem] tracking-wide text-white md:pt-6
                      pt-[180px] md:text-[6rem] xl:text-[8rem]">
          OBTAIN
        </span>

        {/* CENTER TEXT */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="uppercase font-orbitron leading-none text-white/90">
            <span
              className="block text-[4.5rem] md:text-[12rem] xl:text-[16rem] 
               text-center"
            >
              FITNESS
            </span>
          </h1>
        </div>

        {/* GOAL – bottom right */}
        <span
          className="
                    absolute bottom-6 right-6
                    uppercase font-orbitron font-bold
                    text-[3rem] tracking-wide text-white mt-16 md:pb-6
                    pb-[180px] md:text-[6rem] xl:text-[8rem]">
          GOAL
        </span>
      </div>

      {/* IMAGE (center, above text) */}
      {/* IMAGE (center, on top of text) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <Image
          src={heroImage}
          alt="Fitness Man"
          width={820}
          priority
          className="mx-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl cursor-pointer"
        />
      </div>
    </section>
  );
}
