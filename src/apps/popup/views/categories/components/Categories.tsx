import { PopupPageLayout, PopupPageBodyLayout } from 'apps/popup/components'
import { Button, IconGroup, IconX } from 'components'
import React, { KeyboardEventHandler, useCallback, useEffect, useState } from 'react'
import { addCategory, deleteCategory, listCategories, updateCategory } from 'services/categories'
import { Category } from 'types'
import { getDefaultCategoryColor } from 'utils'
import { CategoryColorSelectPanel } from './CategoryColorSelectPanel'
import * as S from './Categories.styles'

function Categories() {
  // New category input state
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryColor, setCategoryColor] = useState(getDefaultCategoryColor())

  // Existing categories data
  const [categories, setCategories] = useState<Category[]>([])

  // Edited category input state
  const [editedCategory, setEditedCategory] = useState<Category | null>(null)
  const [previousCategoryName, setPreviousCategoryName] = useState<string | null>(null)

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

  const handleDeleteCategoryClick = async (id: number) => {
    await deleteCategory(id)
    fetchCategoryData()
  }

  const handleNameInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') handleAddCategoryClick()
  }

  // Applies the color to the edited category if it exists, otherwise to the new category input.
  const handleColorChange = async (color: string) => {
    if (editedCategory) {
      await updateCategory({ ...editedCategory, color })
      setEditedCategory(null)
      fetchCategoryData()
    } else {
      setCategoryColor(color)
    }
    toggleCategorySelect(false)
  }

  const handleCategoryNameChange = async (name: string) => {
    if (editedCategory) updateCategory({ ...editedCategory, name })
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
              <S.CategoryRow key={category.id}>
                <S.CategoryLabelWrapper>
                  <S.CategoryLabel
                    contentEditable="true"
                    onFocus={e => {
                      setEditedCategory(category)
                      setPreviousCategoryName(e.currentTarget.textContent)
                    }}
                    onInput={e => handleCategoryNameChange(e.currentTarget.textContent || '')}
                    onBlur={e => {
                      if (!e.currentTarget.textContent && previousCategoryName) {
                        handleCategoryNameChange(previousCategoryName)
                        fetchCategoryData()
                      }
                      setPreviousCategoryName(null)
                      setEditedCategory(null)
                    }}>
                    {category.name}
                  </S.CategoryLabel>
                  <S.CategoryColorSample
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      setEditedCategory(category)
                      toggleCategorySelect(true)
                    }}
                    style={{ backgroundColor: category.color }}
                  />
                </S.CategoryLabelWrapper>
                <S.IconXWrapper role="button" onClick={() => handleDeleteCategoryClick(category.id)}>
                  <IconX />
                </S.IconXWrapper>
              </S.CategoryRow>
            ))}
          </S.CategoriesWrapper>
        </PopupPageBodyLayout>
      </PopupPageLayout>
      {/* Select panel used for selecting colors for new categories entries,
      and also to edit the color of existing categories. */}
      <CategoryColorSelectPanel
        selectedValue={editedCategory?.color || categoryColor}
        open={openCategorySelect}
        onColorSelect={handleColorChange}
        onClose={() => toggleCategorySelect(false)}
      />
    </>
  )
}

export { Categories }
