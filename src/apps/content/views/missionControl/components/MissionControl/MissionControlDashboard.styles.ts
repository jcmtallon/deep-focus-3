import styled from 'styled-components'
import { Card as BaseCard } from 'apps/content/components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding: 32px;
  width: 100%;
  height: 100%;
`

const Body = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 32px;
  width: 100%;
  height: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  flex-grow: 1;
`

const Card = styled(BaseCard)`
  width: 100%;
`

export { Wrapper, Body, Column, Card }
