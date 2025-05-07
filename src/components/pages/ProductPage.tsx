"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { faBoltLightning, faCartShopping, faCheck, faIndianRupeeSign, faLocationDot, faMagnifyingGlass, faShield, faStar, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getAllImages } from "@/helper/getFiles";
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image";

export default function Product () {
    
    const [imageUrl, setImageUrl] = useState<string[] | null[]>([])
    const [currentImgUrl, setCurrentImgUrl] = useState<string | null>()

    useEffect(() => {
        const getImages = async () => {
            const images = await getAllImages({ bucketId: "67d7055d0033ccad33a0", nameIndex: 2, folder: "Electronics" })
            setCurrentImgUrl(images.imageUrls[0])
            setImageUrl(images.imageUrls)
        }
        getImages()
    }, [])
    
    return (
        <>
            {imageUrl.length > 0 ? <div className="flex mx-28 mt-2 bg-white">
                <div className="flex flex-col basis-1/2">
                    <div className="flex align-middle justify-center fixed">
                        <div className="h-96">
                            <Carousel orientation="vertical">
                                <CarouselContent>
                                    {imageUrl.map((url, index) => {
                                        return<>
                                            {url && <CarouselItem className="pt-0 z-0" key={index}>
                                                <div className="border">
                                                    <Image onClick={() => setCurrentImgUrl(url)} className="w-16" src={url} width={16} height={16} alt={""}/>
                                                </div>
                                            </CarouselItem>}
                                        </>
                                    })}
                                </CarouselContent>
                                <CarouselPrevious className="translate-y-10 z-1 cursor-pointer"/>
                                <CarouselNext className="-translate-y-10 z-1 cursor-pointer"/>
                            </Carousel>
                        </div>
                        <div className="flex flex-col justify-between">
                            {currentImgUrl && <Image className="w-96 border" src={currentImgUrl} alt={""} width={96} height={96}/>}
                            <div className="space-x-10 mt-3">
                                <button type="button" className="text-xl p-4 bg-yellow-500">
                                    <FontAwesomeIcon icon={faCartShopping} className="mr-1"/>
                                    Add To Cart 
                                </button>
                                <button type="button" className="text-xl p-4 ml-1 px-8 bg-orange-600">
                                    <FontAwesomeIcon icon={faBoltLightning} className="mr-1" />
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-3/4">
                    <div className="title">
                        SKT CTX-700 CASIO + CARRY CASE + STAND CTX-700 SKT + CARRY CASE + STAND Digital Portable Keyboard  (61 Keys)
                    </div>
                    <div className="">
                        <span className="mt-1 bg-green-600 font-normal text-sm p-1 rounded text-white">
                            4.3 <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span className="ml-2 mt-2 text-slate-600 text-sm">
                            67 Ratings & 11 Reviews
                        </span>
                    </div>
                    <div className="mt-6 text-green-700 font-semibold">
                        Special price
                    </div>
                    <div>
                        <b className=" text-3xl">
                            ₹12,591 
                        </b>
                        <del className="ml-3 mb-2 text-sm text-gray-500">
                            ₹14,690
                        </del>
                        <span className="text-green-700 ml-2 font-semibold">
                            14% off
                        </span>
                    </div>
                    <div className="flex flex-col font-medium text-sm mt-4">
                        Available offers
                        <div className="mt-3 font-serif">
                            {/* <FontAwesomeIcon icon={faTag} size="sm" style={{color: "#63E6BE",}} />   */}
                            <span className=" text-base font-medium mr-2">
                                Special Price 
                            </span>
                            <span>
                                Get extra 10% off (price inclusive of cashback/coupon)
                            </span>
                        </div>
                    </div>
                    <div className="flex mt-6">
                        <div className="flex basis-1/2">
                            <div className="text-sm text-slate-600 basis-1/4">
                                Delivery
                            </div>
                            <div className="basis-1/3 align-middle">
                                <div>
                                    <div className="flex w-72 border-blue-500 border-b-2">
                                        <FontAwesomeIcon icon={faLocationDot} style={{color: "gray"}} />
                                        <input className="basis-1/3 w-60 focus:border-none" type="text" name="pincode" id="pincode"/>
                                        <button type="submit" className="text-blue-500">check</button>
                                    </div>
                                    <div className="text-sm mt-1">
                                        Delivery by 4 Aug, Sunday <span className="text-gray-400"> | </span> <span className="text-green-500"> Free </span> <del className="ml-1 text-gray-400">₹40</del>
                                    </div>
                                    <div className="text-xs">
                                        if ordered before 6:59 PM
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-6">
                        <div className="flex basis-1/2">
                            <div className="text-sm text-slate-600 basis-1/4">
                                Highlights
                            </div>
                            <div className="text-sm basis-3/4">
                                No. of Keys: 61 | 
                                Key Type: Solid | 
                                Control Panel: Digital | 
                                Built in Speakers | 
                                For: Advanced
                            </div>
                        </div>
                        <div className="flex basis-1/2 ml-4">
                            <div className="text-sm text-slate-600 basis-1/4">
                                Services
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="text-sm">
                                    <FontAwesomeIcon icon={faShield} className="mr-1"/>
                                    3 Years All India Manufacturer Warranty
                                </span>
                                <span className="text-sm">
                                    <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-1"/>
                                    Cash on Delivery available
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-6">
                        <div className="flex basis-1/2">
                        
                            <div className="text-sm text-slate-600 basis-1/4">
                                Seller
                            </div>
                            <div className="align-middle">
                                <div>
                                    <div className="flex flex-col text-sm mt-1">
                                        <span className=" text-blue-500">
                                            CRYSTALARC LIFESTYLE
                                            <span className=" bg-blue-600 text-white text-xs p-1 ml-2 rounded-xl">
                                                4.3 <FontAwesomeIcon icon={faStar} style={{color: "white"}}/>
                                            </span>
                                        </span>
                                        <span className="text-sm mt-2">
                                            7 Days Replacement Policy
                                        </span>
                                        <span className=" text-blue-500 mt-2">
                                            See other Sellers
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-6">
                        <div className="flex basis-1/2">
                            <div className="text-sm text-slate-600 basis-1/4">
                                Description
                            </div>
                        </div>
                        <div className="text-sm mx-4">
                            This stylish Casio Digital Portable Keyboard has 61 Piano-style Keys that help give you a piano-like feel while pressing the keys. It comes with a Touch Toggle Button that has 3 sensitivity levels to ensure ease of use. This keyboard comes with an Audio Input Port that lets you use it as a playback device so that you can play along with your favourite songs. With many Built-in Songs, you can easily learn to play different tracks for your loved ones.
                        </div>
                    </div>
                    <div className="border-gray-200 border p-8 my-6 mr-5">
                        <div className="flex justify-between align-middle">
                            <span className="text-2xl font-bold">
                                Ratings & Reviews
                            </span>
                            <Link href={"#"} className="py-3 px-5 shadow-md">
                                Rate Product
                            </Link>
                        </div>
                        <div>
                            <div className="flex flex-col basis-1/6">
                                <span className="text-3xl text-green-600">
                                    4.3  <FontAwesomeIcon icon={faStar} className="text-green-600"/>
                                </span>
                                <span className="text-xs mt-2 text-wrap text-gray-400">
                                    67 Ratings &
                                    11 Reviews
                                </span>
                            </div>
                            <div className="my-4 py-4 border-y border-gray-200">
                                <div className="">
                                    <div className="space-x-4">
                                        <span className="bg-green-600 font-normal text-xs p-1 rounded text-white">
                                            4.3 <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span>
                                            Good choice
                                        </span>
                                    </div>
                                    <div className="text-sm my-2">
                                        Awesome, nice looking and stylish
                                        Except one thing that is sound everything great
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Sekhar Pasem <FontAwesomeIcon icon={faCheck} className="mx-2"/> Certified Buyer, Hyderabad, Mar, 2019
                                        <div className="float-right space-x-3">
                                            <button type="button">
                                                <FontAwesomeIcon icon={faThumbsUp} />
                                                <span className="mx-1">14</span>
                                            </button>
                                            <button type="button">
                                                <FontAwesomeIcon icon={faThumbsDown} />
                                                <span className="mx-1">1</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-gray-200 border p-6 my-4 mr-5">
                        <div className="flex justify-between align-middle ">
                            <span className="text-2xl font-bold">
                                Questions and Answers
                            </span>
                            <span className="py-3 px-5">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                        </div>
                        <div>
                            <div className="my-4 py-4 border-y border-gray-200">
                                <div>
                                    <div className="space-x-4">
                                        <span>
                                            Q: does it come with music stand
                                        </span>
                                    </div>
                                    <div className="text-sm my-2">
                                        <span>
                                            A: No it doesn&apos;t contain stand ! it only contains stand for keeping book ! No stand for placement.
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs">
                                            Anonymous
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        <FontAwesomeIcon icon={faCheck} className="mt-1 bg-gray-400 text-white p-1 w-2 h-2 rounded-full"/> Certified Buyer
                                        <div className="float-right space-x-3">
                                            <button type="button">
                                                <FontAwesomeIcon icon={faThumbsUp} />
                                                <span className="mx-1">14</span>
                                            </button>
                                            <button type="button">
                                                <FontAwesomeIcon icon={faThumbsDown} />
                                                <span className="mx-1">1</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between align-middle">
                                <span className="my-auto">
                                    Didn&apos;t get the right answer you were looking for
                                </span>
                                <span className="py-3 px-5 shadow-md">
                                    Rate Product
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div className="p-10 text-center text-xl">Loading profile...</div>}
        </>
    )
}