'use client'

import * as React from 'react'

import { createStyleContext } from '@one-ui/shared/style-context'
import { styled } from '@one-ui/styled-system/jsx'
import { scrollArea } from '@one-ui/styled-system/recipes'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const { withProvider, withContext } = createStyleContext(scrollArea)

const Viewport = withContext(ScrollAreaPrimitive.Viewport, 'viewport')
const Corner = withContext(ScrollAreaPrimitive.Corner, 'corner')
const Thumb = withContext(ScrollAreaPrimitive.ScrollAreaThumb, 'thumb')

const BaseScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    data-orientation={orientation}
    {...props}
  >
    <Thumb />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
BaseScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export const ScrollBar = withContext(styled(BaseScrollBar), 'scrollbar')

const BaseScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} {...props}>
    <Viewport>{children}</Viewport>
    <ScrollBar />
    <Corner />
  </ScrollAreaPrimitive.Root>
))
BaseScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export const ScrollArea = withProvider(styled(BaseScrollArea), 'root')
