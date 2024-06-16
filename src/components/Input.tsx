import React, { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  letter-spacing: normal;
  box-sizing: border-box;

  min-width: 0;

  height: 26px;
  border-radius: 25px;
  padding: 0 12px;

  font-family: inherit;
  font-size: 14px;
  font-weight: normal;

  background-color: #1f2e70;
  color: white;

  &:hover {
  }

  &:has(input:focus) {
  }
`

const StyledInput = styled.input`
  font-size: inherit;
  border: none;
  border-radius: 0;
  outline: none !important; // !important prevents the outline appearing when :focus-visible
  background: 0 0;
  color: inherit;
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  min-width: 0;

  &::placeholder {
    color: #9596b6;
  }
`

interface InputProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'> {}

function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
  const { className, ...rest } = props

  return (
    <Wrapper className={className}>
      <StyledInput {...rest} ref={ref} />
    </Wrapper>
  )
}

export { Input }
export type { InputProps }
