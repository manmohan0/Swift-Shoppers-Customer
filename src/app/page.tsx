"use client"
import { Navbar } from "@/components/Navbar";
import { getAllImages } from "@/helper/getFiles";
import { useEffect, useState } from "react";
import { Section } from "@/components/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"


export default function Home() {
  
  const [urls, setUrls] = useState<string[]>([])

  useEffect(() => {
    const getImages = async () => {
      const images = await getAllImages({ bucketId: "67d7055d0033ccad33a0", nameIndex: 2, folder: "Home.Banner" })
      console.log(images)
      setUrls(images.imageUrls)
    }

    getImages()
  }, [])

  return (
    <>
      <Navbar/>
      <div className="relative w-full mx-auto">
        <Carousel opts={{
          align: 'start',
          loop: true,
        }} 
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]} key={"Banners"}>
          <CarouselContent>
            {urls.map((url, idx) => {
              return <CarouselItem key={idx}><Image src={url} alt={idx.toString()} width={1920} height={200} priority/></CarouselItem>
              // </>
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
      <Section title={"Clothing"}/>
    </>
  );
}
