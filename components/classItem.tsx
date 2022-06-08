import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ClassItemProps {
  id: number;
  src: string;
  alt: string;
  tag1: string;
  tag2: string;
  tag3: string;
  name: string;
  summary: string;
  price: number;
}

function ClassItem({
  id,
  src,
  alt,
  name,
  summary,
  price,
  tag1,
  tag2,
  tag3,
}: ClassItemProps) {
  return (
    <Link href={`/class/${id}`}>
      <a>
        <div className="w-full rounded-2xl pb-6 ">
          {/* <Image alt={alt} className="w-full rounded-2xl" src={src}></Image> */}
        </div>
        <div className="mt-4 flex">
          <div className="mr-3 flex items-center justify-center rounded-full bg-red-300 py-1 px-2 text-sm font-medium">
            {tag1}
          </div>
          <div className="mr-3 flex  items-center justify-center rounded-full bg-red-300 py-1 px-2 text-sm font-medium">
            {tag2}
          </div>
          <div className="mr-3 flex  items-center justify-center rounded-full bg-red-300 py-1 px-2 text-sm font-medium">
            {tag3}
          </div>
        </div>
        <div className="mt-6 flex  flex-col">
          <span className="text-2xl font-medium">{name}</span>
          <p className="mt-4 text-sm font-medium">{summary}</p>
          <h4 className="mt-6 text-2xl font-semibold text-red-500">
            {`월 ${price}원`}
          </h4>
        </div>
      </a>
    </Link>
  );
}

export default ClassItem;
