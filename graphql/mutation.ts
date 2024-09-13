
import { gql } from "@apollo/client"
//*************** mutation ***************/
export const INSERT_ORDER = gql`
mutation InsertOrder($orderHistoryInput: [OrderHistoryInput]) {
    insertOrder(OrderHistoryInput: $orderHistoryInput) {
      statusText
    }
}`

export const INSERT_SIGNUP = gql`
mutation InsertSignUp($signUpParameters: [SignUpParameters]) {
  insertSignUp(SignUpParameters: $signUpParameters) {
    statusText
  }
}
`

export const UPDATE_PASSWORD = gql`
mutation UpdatePassword($emailAddress: String, $password: String) {
  updatePassword(emailAddress: $emailAddress, password: $password) {
    statusText
  }
}
`

export const CREATELINK_TO_CHANGE_PASSWORD = gql`
mutation CreateLinkToChangePassword($emailAddress: String, $path: String) {
  createLinkToChangePassword(emailAddress: $emailAddress, path: $path) {
    statusText
  }
}
`

export const CONTACT_US = gql`
mutation ContactUs($messagebody: messagebody) {
  contactUs(messagebody: $messagebody) {
    statusText
  }
}
`
export const POSTPERSONAL_MESSAGES = gql`
mutation PostPersonalMessage($message: String, $sender: String, $reciever: String) {
  postPersonalMessage(Message: $message, Sender: $sender, Reciever: $reciever) {
    id
    Messages
    Sender
    Reciever
    dateSent
  }
}
`