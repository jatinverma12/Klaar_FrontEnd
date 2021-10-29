import React, { useEffect, useState } from 'react'
import { Row, Table, Form, Col, Dropdown } from 'react-bootstrap'
import { listBanks } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'

const UserScreen = ({ match }) => {
  const dispatch = useDispatch()

  const keyword = match.params.keyword
  const pageNumber = Number(match.params.pageNumber) || 1

  const bankList = useSelector((state) => state.bankList)
  const { loading, error, banks } = bankList

  const [perPage, setPerpage] = useState(10)
  const [pageCount, setPagecount] = useState(0)
  const [city, setCity] = useState('MUMBAI')

  const cities = ['MUMBAI', 'NEW DELHI', 'PUNE', 'NOIDA', 'MURADNAGAR']
  useEffect(() => {
    dispatch(listBanks(keyword, pageNumber, perPage, setPagecount, city))
  }, [dispatch, keyword, pageNumber, perPage, city])

  return (
    <>
      <h1>BANK LIST</h1>
      <div class='top' style={{ display: 'flex', flexDirection: 'row' }}>
        <Form>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column sm='4'>
              Page Size
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                type='number'
                name='pagesize'
                onChange={(e) =>
                  e.target.value > 1
                    ? setPerpage(e.target.value)
                    : setPerpage(1)
                }
                value={perPage}
                className='mr-sm-2 ml-sm-5'
              ></Form.Control>
            </Col>
          </Form.Group>
        </Form>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            CITIES
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {cities.map((c, index) =>
              c == city ? (
                <Dropdown.Item active key={index}>
                  {c}
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    setCity(c)
                  }}
                >
                  {c}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <h3>Bank_Id</h3>
                  </th>
                  <th>
                    <h3>Bank Name</h3>
                  </th>
                  <th>
                    <h3>IFSC Code</h3>
                  </th>
                  <th>
                    <h3>District</h3>
                  </th>
                  <th>
                    <h3>State</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {banks.map((bank, index) => (
                  <tr key={index}>
                    <td>{bank.bank_id}</td>
                    <td>{bank.bank_name}</td>
                    <td>{bank.ifsc}</td>
                    <td>{bank.district}</td>
                    <td>{bank.state}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Paginate
            pages={pageCount}
            page={pageNumber}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}
export default UserScreen
