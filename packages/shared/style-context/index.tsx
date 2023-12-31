import React, {
  createContext,
  forwardRef,
  useContext,
  type ComponentType,
} from 'react'

type AnyProps = Record<string, unknown>
type AnyRecipe = {
  (props?: AnyProps): Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  splitVariantProps: (props: AnyProps) => any
}

type Slots<R extends () => Record<string, string>> = keyof ReturnType<R>

export const createStyleContext = <R extends AnyRecipe>(recipe: R) => {
  const StyleContext = createContext<ReturnType<R> | null>(null)

  const withProvider = <T,>(
    Component: ComponentType<T>,
    slot?: Slots<R>,
    defaultProps?: Partial<T> & { className?: string }
  ) => {
    const Comp = forwardRef((props: T & Parameters<R>[0], ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(
        props as AnyProps
      )
      const { className = '', ...rest } = otherProps
      const styles = recipe(variantProps) as ReturnType<R>
      const slotClass = styles?.[slot ?? '']
      const classNames = [
        defaultProps?.className ?? null,
        slotClass ?? null,
        className ?? null,
      ].filter(Boolean)

      return (
        <StyleContext.Provider value={styles}>
          <Component
            ref={ref}
            {...defaultProps}
            className={classNames.join(' ')}
            {...rest}
          />
        </StyleContext.Provider>
      )
    })
    Comp.displayName = Component.displayName || Component.name
    return Comp
  }

  const withContext = <T,>(
    Component: ComponentType<T>,
    slot?: Slots<R>,
    defaultProps?: Partial<T> & { className?: string }
  ) => {
    if (!slot) return Component

    const Comp = forwardRef(
      ({ className, ...rest }: T & { className?: string }, ref) => {
        const styles = useContext(StyleContext)
        const slotClass = styles?.[slot ?? '']
        const classNames = [
          defaultProps?.className ?? null,
          slotClass ?? null,
          className ?? null,
        ].filter(Boolean)

        return (
          <Component
            ref={ref}
            {...defaultProps}
            className={classNames.join(' ')}
            {...(rest as T)}
          />
        )
      }
    )
    Comp.displayName = Component.displayName || Component.name
    return Comp
  }

  const useSlot = (slot?: Slots<R>) => {
    const styles = useContext(StyleContext)
    return styles?.[slot ?? ''] ?? ''
  }

  return {
    withProvider,
    withContext,
    useSlot,
  }
}
