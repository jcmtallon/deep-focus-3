import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 40px;
`

const Heading = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ActionsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  padding: 0px 16px 16px;
  width: 100%;
`

const Footer = styled.div`
  display: flex;
`

export { Wrapper, Heading, ActionsSection, Body, Footer }
