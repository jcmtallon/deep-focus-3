import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 0px 20px;
  overflow: hidden;
`

const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0px 16px;
`

const Option = styled.div<{ selected?: boolean }>`
  font-size: 14px;
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 4px;
  border-bottom: 1px solid #9596b6;
  color: #9596b6;

  &:hover {
    background-color: #ffffff10;
  }

  ${({ selected }) =>
    selected &&
    css`
      color: white;
      font-weight: bold;
    `}
`

export { Wrapper, OptionsContainer, Option }
