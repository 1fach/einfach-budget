import { MetaTags } from '@redwoodjs/web'

import { Spreadsheet } from 'src/components/Spreadsheet/spreadsheet'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Spreadsheet />
    </>
  )
}

export default HomePage
