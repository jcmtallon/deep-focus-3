import styled from 'styled-components'

const Background = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  background-color: #15043b;
`

const SideNav = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  background-color: #130544;
  justify-content: center;
  padding: 10px;
`

const Page = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  color: white;
`

export { Page, SideNav, Background }
