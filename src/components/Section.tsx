import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel"
import { getAllImages } from "@/helper/getFiles"
import { useEffect, useState } from "react"
import Image from "next/image"

export const Section = ({ title } : { title:string }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [image_Names, setImages_Names] = useState<string[]>([])

    useEffect(() => {
        const getImages = async () => {
          const images = await getAllImages({ bucketId:"67d7055d0033ccad33a0", nameIndex: 2, folder: "Section.electronics"})
          setImages_Names(images.imageNames)
          setImageUrls(images.imageUrls)
        }
    
        getImages()
    }, [])
      
    return <>
        <div className=" bg-white p-1">
            <span className="text-lg p-2 font-bold">{title}</span>
            <Carousel key={title}>
                <CarouselContent>
                        {imageUrls.map((url, index) => (
                            <CarouselItem key={index} className="basis-1/6">
                                <div className="p-4 flex flex-col items-center border rounded">
                                    <div className="relative h-[100px] w-[100px]">
                                        <Image src={url} alt="Image" fill className="object-contain" />
                                    </div>
                                    <span className="text-xs mt-2 text-center">{image_Names[index]}</span>
                                </div>
                            </CarouselItem>
                        ))}
                </CarouselContent>              
                <CarouselPrevious className=" translate-x-9"/>
                <CarouselNext className="-translate-x-9"/>
            </Carousel>
        </div>
    </>
}