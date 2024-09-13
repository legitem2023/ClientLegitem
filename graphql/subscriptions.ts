import { gql } from "@apollo/client"
//*************** subscription ***************/
export const ORDER_STATUS_SUBSCRIPTION = gql`
subscription MessageToOrder {
  messageToOrder {
    TrackingNo
    Address
    Contact
    StatusText
    OrderStatus
    OrderHistory {
      id
      Image
      Size
      Color
      productCode
      emailAddress
      TrackingNo
      OrderNo
      Quantity
      Price
      Address
      Contact
      StoreEmail
      dateCreated
      agentEmail
      StatusText
    }
  }
}
`;

export const READ_NEWS_SUBSCRIPTION = gql`
subscription MessageNews {
  messageNews {
    id
    title
    thumbnail
    summary
    postedBy
    dateCreated
  }
}`

export const ACTIVE_USERS = gql`
subscription ActiveUserList {
  ActiveUserList {
    accountEmail
    fullname
  }
}
`