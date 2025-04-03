"use client"
import { Navbar } from "@/components/Navbar";
import { getAllImages } from "@/helper/getFiles";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [urls, setUrls] = useState<string[]>([])

  useEffect(() => {
    const getImages = async () => {
      const imageUrls = await getAllImages("67d7055d0033ccad33a0")
      setUrls(imageUrls)
    }

    getImages()
  }, [])

  return (
    <>
      <Navbar/>
      {urls.map((url, idx) => {
        return <div key={idx}>
          <Image src={url} alt={""} width={"1920"} height={"200"}/>
        </div>
      })}
    </>
  );
}
