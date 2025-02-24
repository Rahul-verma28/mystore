import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import ProductList from "@/components/Products";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/action";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);

  return (
    <div>
      <div className="flex justify-center items-start gap-16 py-10 px-5">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>

      <div>
        <ProductList products={relatedProducts} />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;
