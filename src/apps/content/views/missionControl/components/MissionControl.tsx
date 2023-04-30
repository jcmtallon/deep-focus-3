import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #15043b;
  color: white;

  display: flex;
  flex-direction: column;
`

function MissionControl() {
  const [type, setType] = useState<string | null>()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const blockType = queryParams.get('blockType')
    if (blockType) setType(blockType)
  }, [])

  return <Wrapper>{type === 'site' ? 'Blocked' : 'Mission Control'}</Wrapper>
}

export { MissionControl }
