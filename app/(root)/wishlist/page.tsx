"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/action"
import { useEffect, useState } from "react"
// import { useRouter } from "next/router"
import toast from "react-hot-toast"

const Wishlist = () => {
  // const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [wishlist, setWishlist] = useState<ProductType[]>([])
  const [error, setError] = useState<string | null>(null)

  const getUser = async () => {
    try {
      const res = await fetch("/api/users")
      if (!res.ok) {
        if (res.status === 401) {
          toast("Please login to view your profile")
          // router.push("/login")
        } else {
          setError("Failed to fetch user data.")
        }
        setLoading(false)
        return
      }
      const data = await res.json()
      setSignedInUser(data)
      setLoading(false)
    } catch (err) {
      console.error("[users_GET]", err)
      setError("An unexpected error occurred.")
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const getWishlistProducts = async () => {
    setLoading(true)

    if (!signedInUser) return

    try {
      const wishlistProducts = await Promise.all(signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetails(productId)
        return res
      }))
      setWishlist(wishlistProducts)
    } catch (err) {
      console.error("Failed to fetch wishlist products:", err)
      setError("Failed to fetch wishlist products.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }

  if (loading) return <Loader />

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {error && <p className="text-red-500">{error}</p>}
      {wishlist.length === 0 && !error && (
        <p>No items in your wishlist</p>
      )}
      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser} />
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Wishlist