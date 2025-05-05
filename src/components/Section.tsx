import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel"
import { getAllImages } from "@/helper/getFiles"
import { useEffect, useState } from "react"
import Image from "next/image"

export const Section = ({ title } : { title:string }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [imageNames, setImagesNames] = useState<string[]>([])

    useEffect(() => {
        const getImages = async () => {
          const images = await getAllImages({ bucketId:"67d7055d0033ccad33a0", nameIndex: 2, folder: "Section.electronics"})
          setImagesNames(images.imageNames)
          setImageUrls(images.imageUrls)
        }
    
        getImages()
    }, [])
      
    return <>
        <div className=" bg-white p-2 m-3">
            <span className=" text-2xl p-2 font-medium">{title}</span>
            <Carousel key={title}>
                <CarouselContent>
                    {imageUrls.map((url, index) => {
                        const image = imageNames[index]
                        return (
                        <CarouselItem key={index} className="basis-1/6 hover:cursor-pointer">
                            <div className="p-4 flex flex-col items-center rounded">
                                <div className="relative h-[240px] w-[180px]">
                                    <Image src={url} alt="Image" fill={true} className="rounded" sizes="(max-width: 768px) 100vw, (max-width: 1200px)"/>
                                </div>
                                <span className=" mt-2 text-center">{image}</span>
                            </div>
                        </CarouselItem>
                    )})}
                </CarouselContent>              
                <CarouselPrevious className="left-2"/>
                <CarouselNext className="right-2"/>
            </Carousel>
        </div>
    </>
}