import { css } from 'styled/css'
import { stack } from 'styled/patterns'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Header } from 'src/components/Header/Header'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Header />
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
      <div
        className={stack({
          bg: { base: 'blue.300', _hover: 'blue.200' },
          py: '12',
          px: '8',
        })}
      >
        <h1 className={css({ fontSize: '4xl', fontWeight: 'bold' })}>
          HomePage
        </h1>
        <p>Hello World</p>
      </div>
    </>
  )
}

export default HomePage
