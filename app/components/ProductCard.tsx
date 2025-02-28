import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { Decimal } from '@prisma/client/runtime/library';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface iAppProps {
    images: string[];
    name: string;
    price: Decimal | null;
    smallDescription: string;
    id: string;
}

export default function ProductCard({images, id, price, smallDescription, name}: iAppProps) {
  const displayPrice = price ? price.toFixed(2) : 'N/A';
  return (
    <div className="rounded-lg">
        <Carousel className='w-full mx-auto'>
          <CarouselContent>
            {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image alt='Product Image' src={item} fill className='object-cover w-full h-full rounded-lg' />
              </div>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>

        <div  className='flex justify-between items-center mt-2'>
          <h1 className='font-semibold text-xl'>{name}</h1>
          <h3 className='inline-flex items-center rounded-md bg-primary/10 px-2 py1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10 '>
            €{displayPrice}
          </h3>
        </div>

        <p className='text-gray-600 line-clamp-2 text-sm'>{smallDescription}</p>

        <Button asChild className="w-full mt-5">
          <Link href={`/product/${id}`}>Learn More!</Link>
        </Button>
    </div>
  )
}

export function LoadingProductCard(){
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  )
}
