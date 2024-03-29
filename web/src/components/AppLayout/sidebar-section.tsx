import { LinkButton, Skeleton } from '@einfach-ui/react'
import { css } from '@einfach-ui/styled/css'
import { Folder } from 'lucide-react'

type SidebarSectionItem = {
  title: string
  link: string
}

export type SidebarSectionProps = {
  title: string
  items: SidebarSectionItem[]
}

export const SidebarSection = ({ title, items }: SidebarSectionProps) => {
  return (
    <div className={css({ px: '3', py: '2' })}>
      <h2
        className={css({
          mb: '2',
          px: '4',
          fontSize: 'lg',
          lineHeight: 'lg',
          fontWeight: 'semibold',
          letterSpacing: 'tight',
        })}
      >
        {title}
      </h2>
      <div className={css({ my: '1' })}>
        {items.map((item) => (
          <LinkButton
            key={`${title}-${item.title}`}
            variant="ghost"
            className={css({
              w: 'full',
              justifyContent: 'flex-start',
              textTransform: 'capitalize',
            })}
            to={item.link}
          >
            <Folder className={css({ mr: '2', h: '4', w: '4' })} />
            {item.title}
          </LinkButton>
        ))}
      </div>
    </div>
  )
}

export const SidebarSectionSkeleton = ({ title }: { title: string }) => {
  return (
    <div className={css({ px: '3', py: '2' })}>
      <h2
        className={css({
          mb: '2',
          px: '4',
          fontSize: 'lg',
          lineHeight: 'lg',
          fontWeight: 'semibold',
          letterSpacing: 'tight',
        })}
      >
        {title}
      </h2>
      <div
        className={css({
          my: '1',
        })}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton w="80%" h="5" my="4" mx="3" key={index} />
        ))}
      </div>
    </div>
  )
}
