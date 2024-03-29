import { useEffect, useState } from 'react'

import { NProgress } from '@einfach-ui/react'
import { css } from '@einfach-ui/styled/css'
import { Grid, GridItem } from '@einfach-ui/styled/jsx'

import { useLocation } from '@redwoodjs/router'

import { NavigationMenu, Sidebar } from 'src/components/AppLayout'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [progress, setProgress] = useState(false)
  const [prevLoc, setPrevLoc] = useState({})
  const location = useLocation()

  useEffect(() => {
    setPrevLoc(location)
    setProgress(true)
    window.scrollTo(0, 0) //Go to top on every page load
  }, [location])

  useEffect(() => {
    setProgress(false)
  }, [prevLoc])

  return (
    <>
      <NProgress isAnimating={progress} />
      <div className={css({ display: 'none', md: { display: 'block' } })}>
        <NavigationMenu />
        <div>
          <div className={css({ bg: 'background' })}>
            <Grid gridTemplateColumns={{ lg: '6' }}>
              <Sidebar
                className={css({ display: 'none', lg: { display: 'block' } })}
              />
              <GridItem colSpan={5} borderLeftWidth={{ lg: '1px' }}>
                {children}
              </GridItem>
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppLayout
