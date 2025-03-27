import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
    return <>
            <nav>
                <div className="flex flex-row bg-electric-blue justify-between">
                    <span className="ml-10">
                        <Image src={"/swift_shoppers_logo_transparent.png"} alt={"swift_shoppers_logo_transparent.png"} width={60} height={60}/>
                    </span>
                    <span className="flex my-auto rounded-2xl bg-white border-2 border-gray-200 h-10">
                        <span className="my-auto p-2">
                            <FontAwesomeIcon className="text-slate-300" width={20} icon={faMagnifyingGlass} />
                        </span>
                        <input type="text" placeholder="Laptop, Mobiles, etc" name="Search" id="Search" className="focus:outline-none w-[600px] rounded-md px-1"/>
                    </span>
                    <div className="flex justify-center">
                            <span className="flex p-3 space-x-2 cursor-pointer hover:bg-hover-electric-blue">
                                <Link href={"/login"} className="my-auto flex space-x-2">
                                    <span>
                                        <FontAwesomeIcon width={20} icon={faUser} />
                                    </span>
                                    <span>
                                        Login
                                    </span>
                                </Link>
                            </span>
                        <span className="flex p-3 space-x-2 cursor-pointer hover:bg-hover-electric-blue">
                            <span className="my-auto">
                                <FontAwesomeIcon width={20} icon={faCartShopping} />
                            </span>
                            <span className="my-auto">
                                Cart
                            </span>
                        </span>
                        <span className="flex p-3 space-x-2 cursor-pointer hover:bg-hover-electric-blue">
                            <span className="my-auto">
                                <FontAwesomeIcon width={20} icon={faHeart} />
                            </span>
                            <span className="my-auto">
                                Wishlist
                            </span>
                        </span>
                    </div>
                </div>
            </nav>
        </>
}