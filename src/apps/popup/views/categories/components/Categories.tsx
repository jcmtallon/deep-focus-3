import { PopupPageLayout, PopupPageBodyLayout } from 'apps/popup/components'
import { Button, IconGroup } from 'components'
import React, { KeyboardEventHandler, useCallback, useEffect, useState } from 'react'
import { addCategory, listCategories } from 'services/categories'
import { Category } from 'types'
import { getDefaultCategoryColor } from 'utils'
import { CategoryColorSelectPanel } from './CategoryColorSelectPanel'
import * as S from './Categories.styles'
import { CategoryEntry } from './CategoryEntry'

function Categories() {
  // New category input state
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryColor, setCategoryColor] = useState(getDefaultCategoryColor())

  // Existing categories data
  const [categories, setCategories] = useState<Category[]>([])

  // Category select panel state
  const [openCategorySelect, toggleCategorySelect] = useState<boolean>(false)

  const fetchCategoryData = useCallback(async () => {
    const categories = await listCategories()
    setCategories(categories)
  }, [setCategories])

  const handleAddCategoryClick = async () => {
    await addCategory({ name: categoryName, color: categoryColor })
    setCategoryName('')
    fetchCategoryData()
  }

  const handleNameInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') handleAddCategoryClick()
  }

  // Applies the color to the edited category if it exists, otherwise to the new category input.
  const handleColorChange = async (color: string) => {
    setCategoryColor(color)

    toggleCategorySelect(false)
  }

  // Fetch initial category data
  useEffect(() => {
    fetchCategoryData()
  }, [fetchCategoryData])

  return (
    <>
      <PopupPageLayout hideHeader>
        <PopupPageBodyLayout
          title="Clusters"
          subtitle="Group your sessions for better insights"
          primaryAction={
            <Button onClick={handleAddCategoryClick} startIcon={<IconGroup />}>
              Add cluster
            </Button>
          }
          secondaryAction={
            <S.InputRow>
              <S.CategoryNameInput
                value={categoryName}
                onKeyDown={handleNameInputKeyDown}
                onChange={e => setCategoryName(e.target.value)}
                placeholder="Write a cluster name"
              />
              <S.CategoryColorBubble
                tabIndex={0}
                role="button"
                style={{ backgroundColor: categoryColor }}
                onClick={() => {
                  setCategoryColor(categoryColor)
                  toggleCategorySelect(true)
                }}
              />
            </S.InputRow>
          }>
          <S.CategoriesWrapper>
            {categories.map(category => (
              <CategoryEntry
                key={category.id}
                category={category}
                onCategoryChanged={() => fetchCategoryData()}
              />
            ))}
          </S.CategoriesWrapper>
        </PopupPageBodyLayout>
      </PopupPageLayout>
      <CategoryColorSelectPanel
        selectedValue={categoryColor}
        open={openCategorySelect}
        onColorSelect={handleColorChange}
        onClose={() => toggleCategorySelect(false)}
      />
    </>
  )
}

export { Categories }
