import React, { HTMLAttributes, useState } from 'react'
import { IconX } from 'components'
import { Category } from 'types'
import { deleteCategory, updateCategory } from 'services/categories'
import * as S from './CategoryEntry.styles'
import { CategoryColorSelectPanel } from './CategoryColorSelectPanel'

interface CategoryEntryProps extends HTMLAttributes<HTMLDivElement> {
  category: Category
  onCategoryChanged?: () => void
}

function CategoryEntry(props: CategoryEntryProps) {
  const { category, onCategoryChanged, ...otherProps } = props

  const [openCategorySelect, toggleCategorySelect] = useState<boolean>(false)

  const handleCategoryDeletion = async (id: number) => {
    await deleteCategory(id)
    onCategoryChanged?.()
  }

  const handleColorChange = async (color: string) => {
    await updateCategory({ ...category, color })
    onCategoryChanged?.()
  }

  const handleCategoryNameChange = async (name: string) => {
    updateCategory({ ...category, name })
    // Not calling onCategoryChanged here as it's not necessary to update the text content
    // of the label, plus refetching the category data can impact the placement of the cursor
    // in the contenteditable element, impacting the UX.

    // If the category name is left empty, we restore it to the previous value.
    // But the user cannot see this until they access the screen again.
    // FIXME: Improve the UX by showing a toast or dialog, or the restored value.
  }

  return (
    <>
      <S.Row {...otherProps}>
        <S.LabelWrapper>
          <S.Label
            contentEditable="true"
            onInput={e => handleCategoryNameChange(e.currentTarget.textContent || category.name)}>
            {category.name}
          </S.Label>
          <S.ColorBubble
            tabIndex={0}
            role="button"
            onClick={() => toggleCategorySelect(true)}
            style={{ backgroundColor: category.color }}
          />
        </S.LabelWrapper>
        <S.IconXWrapper role="button" onClick={() => handleCategoryDeletion(category.id)}>
          <IconX />
        </S.IconXWrapper>
      </S.Row>
      <CategoryColorSelectPanel
        selectedValue={category.color}
        open={openCategorySelect}
        onColorSelect={color => {
          handleColorChange(color)
          toggleCategorySelect(false)
        }}
        onClose={() => toggleCategorySelect(false)}
      />
    </>
  )
}

export { CategoryEntry }
