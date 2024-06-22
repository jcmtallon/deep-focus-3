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

export { CategoriesWrapper, CategoryColorBubble, CategoryNameInput, InputRow }
