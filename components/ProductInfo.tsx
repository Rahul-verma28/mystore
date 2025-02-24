"use client";

import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold">$ {productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Colors:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;




// "use client";

// import { useState } from "react";
// import { MinusCircle, PlusCircle } from 'lucide-react';
// import useCart from "@/lib/hooks/useCart";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// import HeartFavorite from "./HeartFavorite";
// import { Skeleton } from "@/components/ui/skeleton";

// const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
//   const [selectedColor, setSelectedColor] = useState<string>(
//     productInfo.colors[0]
//   );
//   const [selectedSize, setSelectedSize] = useState<string>(
//     productInfo.sizes[0]
//   );
//   const [quantity, setQuantity] = useState<number>(1);

//   const cart = useCart();

//   return (
//     <Card className="max-w-[400px] w-full">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="text-2xl font-bold">{productInfo.title}</CardTitle>
//         <HeartFavorite product={productInfo} />
//       </CardHeader>
//       <CardContent className="flex flex-col gap-6">
//         <div className="flex justify-between items-center">
//           {/* <Badge variant="secondary" className="text-sm">
//             {productInfo.category}
//           </Badge> */}
//           <p className="text-3xl font-bold text-primary">
//             ${productInfo.price.toFixed(2)}
//           </p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-sm font-medium text-muted-foreground">Description:</h3>
//           <p className="text-sm">{productInfo.description}</p>
//         </div>

//         {productInfo.colors.length > 0 && (
//           <div className="space-y-2">
//             <h3 className="text-sm font-medium text-muted-foreground">Colors:</h3>
//             <div className="flex flex-wrap gap-2">
//               {productInfo.colors.map((color, index) => (
//                 <Button
//                   key={index}
//                   variant={selectedColor === color ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedColor(color)}
//                 >
//                   {color}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}

//         {productInfo.sizes.length > 0 && (
//           <div className="space-y-2">
//             <h3 className="text-sm font-medium text-muted-foreground">Sizes:</h3>
//             <div className="flex flex-wrap gap-2">
//               {productInfo.sizes.map((size, index) => (
//                 <Button
//                   key={index}
//                   variant={selectedSize === size ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedSize(size)}
//                 >
//                   {size}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="space-y-2">
//           <h3 className="text-sm font-medium text-muted-foreground">Quantity:</h3>
//           <div className="flex items-center gap-4">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => quantity > 1 && setQuantity(quantity - 1)}
//               disabled={quantity <= 1}
//             >
//               <MinusCircle className="h-4 w-4" />
//             </Button>
//             <span className="text-lg font-semibold">{quantity}</span>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setQuantity(quantity + 1)}
//             >
//               <PlusCircle className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <Button
//           className="w-full"
//           onClick={() => {
//             cart.addItem({
//               item: productInfo,
//               quantity,
//               color: selectedColor,
//               size: selectedSize,
//             });
//           }}
//         >
//           Add To Cart
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductInfo;

