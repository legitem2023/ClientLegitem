
import { gql } from "@apollo/client"
//*************** mutation ***************/
export const INSERT_ORDER = gql`
mutation InsertOrder($orderHistoryInput: [OrderHistoryInput]) {
    insertOrder(OrderHistoryInput: $orderHistoryInput) {
      statusText
    }
}`
