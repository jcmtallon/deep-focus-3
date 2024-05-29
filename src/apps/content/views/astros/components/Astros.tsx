import { Card, PageLayout, SideNav } from 'apps/content/components'
import React, { useEffect, useState } from 'react'
import { Astro } from 'types'
import { listObtainedAstros } from 'services/store'
import { StatsAstros } from './StatsAstros'

function Astros() {
  const [obtainedAstros, setObtainedAstros] = useState<Astro[]>([])

  const getObtainedAstros = async () => {
    const obtainedAstros = await listObtainedAstros()
    setObtainedAstros(obtainedAstros)
  }

  useEffect(() => {
    getObtainedAstros()
  }, [])

  return (
    <PageLayout sideNav={<SideNav activeElement="astros" />}>
      <Card title="Astros">
        <StatsAstros astros={obtainedAstros} />
      </Card>
    </PageLayout>
  )
}

export { Astros }
