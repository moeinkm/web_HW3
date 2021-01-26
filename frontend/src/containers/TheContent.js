import React, { useEffect, Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import Posts from 'src/views/posts';

  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = ({isProfile}) => {

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Posts isProfile={isProfile}/>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
