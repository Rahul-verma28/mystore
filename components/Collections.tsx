// import { getCollections } from "@/lib/actions/action";
// import Image from "next/image";
// import Link from "next/link";

// const Collections = async () => {
//   const collections = await getCollections();

//   return (
//     <div className="flex flex-col items-center gap-10 py-8 px-5">
//       <p className="text-heading1-bold">Collections</p>
// {!collections || collections.length === 0 ? (
//   <p className="text-body-bold">No collections found</p>
// ) : (
//   <div className="flex flex-wrap items-center justify-center gap-8">
//     {collections.map((collection: CollectionType) => (
// <Link href={`/collections/${collection._id}`} key={collection._id}>
//               <Image
//                 key={collection._id}
//                 src={collection.image}
//                 alt={collection.title}
//                 width={350}
//                 height={200}
//                 className="rounded-lg cursor-pointer"
//               />
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Collections;

import { getCollections } from "@/lib/actions/action";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our latest collections
        </h2>

        {!collections || collections.length === 0 ? (
          <p className="text-body-bold">No collections found</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {/* <div className="flex flex-wrap items-center justify-center gap-8"> */}
            {collections.map((collection: CollectionType) => (
              <Link
                href={`/collections/${collection._id}`}
                key={collection._id}
                className="group relative"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={350}
                  height={200}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto border"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
