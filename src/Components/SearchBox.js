import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { listBanks } from '../actions/productActions'

const SearchBox = ({ history, match }) => {
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }, [keyword])

  return (
    <Form inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Banks...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
    </Form>
  )
}

export default SearchBox
