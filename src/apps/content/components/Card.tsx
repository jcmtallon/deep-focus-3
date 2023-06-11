import React from 'react'
import styled from 'styled-components'

interface CardProps {
  children: React.ReactNode
  title?: React.ReactNode
}

const Wrapper = styled.div`
  background-color: #170246;
  border: 1px solid #1b00a1;
  border-radius: 30px;
  padding: 26px;
`

const Title = styled.h1`
  color: #e8bb3f;
  font-size: 16px;
  font-weight: 700;
`

function Card(props: CardProps) {
  const { children, title } = props

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {children}
    </Wrapper>
  )
}

export { Card }
