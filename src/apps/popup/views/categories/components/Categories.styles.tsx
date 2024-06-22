import { Input } from 'components'
import styled from 'styled-components'

const InputRow = styled.div`
  display: flex;
  justify-content: start;
  column-gap: 6px;
`

const CategoryNameInput: typeof Input = styled(Input)`
  width: 180px;
`

const CategoryColorBubble = styled.div`
  border-radius: 100%;
  border: 1px solid #1f2e70;
  width: 24px;
  height: 24px;
`

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;
`

const CategoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const IconXWrapper = styled.div`
  font-size: 10px;
  width: fit-content;
  height: fit-content;
`

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  column-gap: 8px;
  padding-left: 2px;
`

const CategoryLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
`

const CategoryColorSample = styled.div`
  border-radius: 100%;
  border: 1px solid #1f2e70;
  width: 14px;
  height: 14px;
`

export {
  CategoriesWrapper,
  CategoryColorBubble,
  CategoryColorSample,
  CategoryLabel,
  CategoryLabelWrapper,
  CategoryNameInput,
  CategoryRow,
  IconXWrapper,
  InputRow,
}
