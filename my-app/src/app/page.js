import Image from "next/image";
import Header from "@/components/Header/page.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full bg-[#0A0A0A]">
        <section className="w-full h-[42vw] overflow-hidden relative flex flex-col">
          <Image
            src={"/images/hero/hero.jpg"}
            alt="hero"
            fill
            className="object-cover z-0"
          ></Image>
          <div className="w-full h-[42vw] hero-box absolute "></div>
          <div className="z-10 relative top-40 left-30">
            <h2 className="text-white text-9xl">
              NEW <br />
              ARRIVALS
            </h2>
            <button className="bg-[#ADFF2F] hover:bg-[#CCFF00] hover:text-white cursor-pointer mt-5 hero-title py-5 px-10 text-2xl shadow-[0_0_20px_#ADFF2F]">
              SHOP NOW
            </button>
          </div>
        </section>

        {/* Main */}
        <main className="w-full py-12 px-20 h-screen">
          <section>
            <h2 className="text-6xl text-white">TRENDING PRODUCTS</h2>
          </section>
        </main>

        <div className="h-screen"></div>
      </div>
    </>
  );
}
