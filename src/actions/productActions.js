import axios from 'axios'
export const listBanks =
  (keyword = '', page, perPage, setPagecount, city) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'BANK_LIST_REQUEST' })

      let { data } = await axios.get(
        `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
      )

      if (keyword) {
        data = data.filter((bank) => {
          return (
            bank.bank_name.toLowerCase().startsWith(keyword.toLowerCase()) ||
            bank.district.toLowerCase().startsWith(keyword.toLowerCase()) ||
            bank.state.toLowerCase().startsWith(keyword.toLowerCase())
          )
        })
      }
      setPagecount(Math.ceil(data.length / perPage))
      const offset = (page - 1) * perPage
      const finalData = data.slice(offset, offset + perPage)
      dispatch({ type: 'BANK_LIST_SUCCESS', payload: finalData })
    } catch (err) {
      dispatch({ type: 'BANK_LIST_FAIL', payload: err })
    }
  }
