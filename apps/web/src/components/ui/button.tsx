import type React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none',
  variants: {
    size: {
      default: 'px-3 py-2',
      icon: 'p-2',
      'icon-sm': 'p-1',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export function Button({
  className,
  size,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return <button className={buttonVariants({ className, size })} {...props} />
}
