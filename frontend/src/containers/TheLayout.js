import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = ({isProfile}) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent isProfile={isProfile}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
