import { SlidePanelSelect, SlidePanelSelectOption } from 'apps/popup/components'
import React, { HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react'
import { Category } from 'types'
import { getStoredSelectedCategoryId, listCategories, storeSelectedCategoryId } from 'services/categories'
import { IconChevronDown } from 'components'
import * as S from './FocusControlsCategorySelect.styles'

interface FocusControlsCategorySelectProps extends HTMLAttributes<HTMLDivElement> {
  categoryId: number | undefined

  onCategoryIdChange?: (categoryId: number | undefined) => void
}

function FocusControlsCategorySelect(props: FocusControlsCategorySelectProps) {
  const { categoryId, onCategoryIdChange, ...otherProps } = props

  const [categories, setCategories] = useState<Category[]>([])
  const [open, setOpen] = useState(false)

  const category = useMemo(() => categories.find(c => c.id === Number(categoryId)), [categories, categoryId])

  const fetchCategoryData = useCallback(async () => {
    const categories = await listCategories()
    setCategories(categories)
  }, [setCategories])

  const fetchSelectedCategoryId = useCallback(async () => {
    const selectedCategoryId = await getStoredSelectedCategoryId()
    onCategoryIdChange?.(selectedCategoryId)
  }, [onCategoryIdChange])

  // Fetch initial category data
  useEffect(() => {
    fetchCategoryData()
    fetchSelectedCategoryId()
  }, [fetchCategoryData, fetchSelectedCategoryId])

  return (
    <>
      {category ? (
        <S.Chip
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          style={{ backgroundColor: category.color }}
          {...otherProps}>
          <span>{category.name}</span>
          <IconChevronDown />
        </S.Chip>
      ) : (
        <S.Chip>
          <span>Select a cluster</span>
          <IconChevronDown />
        </S.Chip>
      )}
      <SlidePanelSelect open={open} onClose={() => setOpen(false)}>
        {categories.map(cat => (
          <SlidePanelSelectOption
            selected
            key={cat.id}
            onClick={async () => {
              await storeSelectedCategoryId(cat.id)
              onCategoryIdChange?.(cat.id)
              setOpen(false)
            }}>
            <S.Wrapper>
              {cat.name}
              <S.ColorBubble style={{ backgroundColor: cat.color }} />
            </S.Wrapper>
          </SlidePanelSelectOption>
        ))}
      </SlidePanelSelect>
    </>
  )
}

export { FocusControlsCategorySelect }
