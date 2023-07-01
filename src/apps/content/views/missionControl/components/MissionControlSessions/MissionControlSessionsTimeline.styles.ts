import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-height: 460px;
  overflow: auto;
  padding-top: 20px;

  ::-webkit-scrollbar {
    display: none;
  }

  -webkit-mask-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 94%,
    rgba(0, 0, 0, 0) 100%
  );
`

const SessionSeparator = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  border-left: 1px solid #5f5858;
  margin-left: 24px;
  min-height: 40px;
`

export { Wrapper, SessionSeparator }
