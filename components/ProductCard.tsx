// "use client";

// import { Heart } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import HeartFavorite from "./HeartFavorite";

// interface ProductCardProps {
//   product: ProductType;
//   updateSignedInUser?: (updatedUser: UserType) => void;
// }

// const ProductCard = ({ product, updateSignedInUser }: ProductCardProps ) => {
//   return (
//     <Link
//       href={`/products/${product._id}`}
//       className="w-[220px] flex flex-col gap-2"
//     >
//       <Image
//         src={product.media[0]}
//         alt="product"
//         width={250}
//         height={300}
//         className="h-[250px] rounded-lg object-cover"
//       />
//       <div>
//         <p className="text-base-bold">{product.title}</p>
//         <p className="text-small-medium text-grey-2">{product.category}</p>
//       </div>
//       <div className="flex justify-between items-center">
//         <p className="text-body-bold">${product.price}</p>
// <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
//         {/* <Heart product={product} updateSignedInUser={updateSignedInUser}/> */}
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="bg-background rounded-xl transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={product.media?.[0] ?? "/placeholder.svg"}
          alt={product.title}
          width={300}
          height={300}
          className="size-full object-cover transition-transform duration-300 hover:scale-110 rounded-2xl"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/products/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>

      {/* <div className="p-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg line-clamp-1">
              {product.title}
            </h3>
            <p className="text-muted-foreground text-sm">{product.category}</p>
            <HeartFavorite product={product} updateSignedInUser={updateSignedInUser}/>
          </div>
          <div>
            <Button type="submit" size="sm" disabled={false}>
              {false ? "Please wait" : "Buy Now"}
            </Button>
          </div>
        </div>
      </div> */}
      {/* <div className="">
        <Image
          src={product.media?.[0] ?? "/placeholder.svg"}
          alt={product.title}
          width={300}
          height={300}
          className="size-full object-cover transition-transform duration-300 hover:scale-110 rounded-2xl"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={`/products/${product._id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div> */}
    </Link>
  );
};
export default ProductCard;

export function ProductCardSkeleton() {
  return (
    <div className="bg-background rounded-xl shadow-md overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-col gap-2 flex-grow">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
