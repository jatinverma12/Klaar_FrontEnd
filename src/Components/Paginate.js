import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router'

const Paginate = ({ pages, page, keyword }) => {
  const history = useHistory()
  let limit = pages < 3 ? 2 : pages < 4 ? 3 : pages < 5 ? 4 : 5
  let start = page > limit ? page - 1 : 1
  return (
    pages > 1 && (
      <Pagination>
        <Pagination.Prev
          onClick={() => {
            {
              keyword
                ? page !== 1 &&
                  history.push(`/search/${keyword}/page/${page - 1}`)
                : page !== 1 && history.push(`/page/${page - 1}`)
            }
          }}
        />
        {[...Array(limit).keys()].map((x) => (
          <LinkContainer
            key={x + start}
            to={
              keyword
                ? `/search/${keyword}/page/${x + start}`
                : `/page/${x + start}`
            }
          >
            <Pagination.Item active={x + start === page}>
              {x + start}
            </Pagination.Item>
          </LinkContainer>
        ))}
        <Pagination.Ellipsis />
        <Pagination.Item
          onClick={() => {
            {
              keyword
                ? history.push(`/search/${keyword}/page/${pages}`)
                : history.push(`/page/${pages}`)
            }
          }}
        >
          {pages}
        </Pagination.Item>

        <Pagination.Next
          onClick={() => {
            {
              keyword
                ? page !== pages &&
                  history.push(`/search/${keyword}/page/${page + 1}`)
                : page !== pages && history.push(`/page/${page + 1}`)
            }
          }}
        />
      </Pagination>
    )
  )
}

export default Paginate
