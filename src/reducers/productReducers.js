export const productListReducer = (state = { banks: [] }, action) => {
  switch (action.type) {
    case 'BANK_LIST_REQUEST':
      return { loading: true, banks: [] }
    case 'BANK_LIST_SUCCESS':
      return {
        loading: false,
        banks: action.payload,
      }
    case 'BANK_LIST_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
