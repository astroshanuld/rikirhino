import _ from 'lodash'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Desktop from 'views/News/partials/Desktop'
import Mobile from 'views/News/partials/Mobile'

const News = (props: any) => {
  const idNews = _.get(props, 'query.id', null)
  const screenSsm = useMediaQuery({ query: '(max-width: 576px)' })

  if (screenSsm) {
    return <Mobile idNews={idNews} />
  }

  return <Desktop idNews={idNews} />
}

export default News
