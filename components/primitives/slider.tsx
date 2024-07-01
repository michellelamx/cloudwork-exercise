import * as SliderPrimitive from '@radix-ui/react-slider'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'


export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className='slider-root'
    {...props}
  >
    <SliderPrimitive.Track className='slider-track'>
      <SliderPrimitive.Range className='slider-range' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='slider-thumb' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName
