import styled from 'styled-components'

const Background = styled.div`
  display: flex;
  width: 100%;
  min-width: 1100px;
  height: 100%;
  flex-direction: row;
  background: radial-gradient(50% 50% at 50% 50%, #15043b 60.94%, #100227 100%);
`

const SideNav = styled.div`
  display: flex;
  height: 100%;
  background-color: transparent;
  justify-content: center;
`

const Page = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  color: white;
`

export { Page, SideNav, Background }
