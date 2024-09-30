
import { gql } from "@apollo/client"
//*************** mutation ***************/
export const INSERT_INVENTORY = gql`
mutation Mutation($emailAddress: String) {
  insertInventory(emailAddress: $emailAddress) {
    jsonToken
    statusText
  }
}
`
export const INSERT_CHILD_INVENTORY = gql`
mutation Mutation($emailAddress: String, $styleCode: String) {
  insertChildInventory(emailAddress: $emailAddress, styleCode: $styleCode) {
    jsonToken
    statusText
  }
}
`
export const INSERT_VIEWS_COUNT = gql`
mutation InsertNumberOfViews($count: String, $productCode: String, $emailAddress: String, $ipAddress: String, $country: String) {
  insertNumberOfViews(count: $count, productCode: $productCode, emailAddress: $emailAddress, IpAddress: $ipAddress, Country: $country) {
    statusText
  }
}`
export const INSERT_VISITS = gql`
mutation Mutation($emailAddress: String, $ipAddress: String, $country: String) {
  insertNumberOfVisit(emailAddress: $emailAddress, IpAddress: $ipAddress, Country: $country) {
    jsonToken
    statusText
  }
}
`

export const UPDATE_CHILD_INVENTORY = gql`
mutation Mutation($productId: Int, $productCode: String, $productName: String, $productColor: String, $productSize: String, $productPrice: String, $productStatus: String, $productStock: String, $email: String) {
  updateChildInventory(productID: $productId, 
                       productCode: $productCode, 
                       productName: $productName, 
                       productColor: $productColor, 
                       productSize: $productSize, 
                       productPrice: $productPrice, 
                       productStatus: $productStatus, 
                       productStock: $productStock, 
                       Email: $email) {
    jsonToken
    statusText
  }
}
`
export const UPDATE_PARENT_INVENTORY = gql`
mutation Mutation($productId: Int, $category: String, $productType: String, $brandname: String, $productName: String, $status: String) {
  updateParentInventory(productID: $productId, category: $category, productType: $productType, brandname: $brandname, productName: $productName, status: $status) {
    jsonToken
    statusText
  }
}
`
export const SAVE_CROP_IMAGE = gql`
mutation Mutation($saveCropImageId: Int, $file: Upload) {
  saveCropImage(id: $saveCropImageId, file: $file) {
    jsonToken
    statusText
  }
}
`
export const SEND_MESSAGE = gql`
mutation PostMessage($message: String, $sender: String) {
  postMessage(Message: $message, Sender: $sender) {
    id
    Messages
    Sender
    dateSent
  }
}`

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

export const SET_ACTIVE_USERS = gql`
mutation SetActiveUsers($emailAddress: String) {
  setActiveUsers(emailAddress: $emailAddress) {
    accountEmail
    fullname
  }
}
`

export const SET_DEFAULT_ADDRESS = gql`
mutation UpdateDefaultAddress($accountEmail: String, $updateDefaultAddressId: Int) {
  updateDefaultAddress(accountEmail: $accountEmail, id: $updateDefaultAddressId) {
    statusText
  }
}
`

export const INSERT_SHIPPING_ADDRESS = gql`
mutation InsertShippingDetails($shippingDetailsInput: shippingDetailsInput) {
  insertShippingDetails(shippingDetailsInput: $shippingDetailsInput) {
    statusText
  }
}`

export const DELETE_SHIPPING_ADDRESS = gql`
mutation DeleteShippingDetails($deleteShippingDetailsId: Int) {
  deleteShippingDetails(id: $deleteShippingDetailsId) {
    statusText
  }
}
`

export const INSERT_FEEDBACK = gql`
mutation InsertProductFeedBacks($productFeedBacksInput: [ProductFeedBacksInput]) {
  insertProductFeedBacks(ProductFeedBacksInput: $productFeedBacksInput) {
    statusText
  }
}
`

export const UPDATE_ORDER_STATUS_FEEDBACK = gql`
mutation UpdateProductFeedBackStatus($productFeedBacksStatusParameter: [OrderstatusParameter]) {
  updateProductFeedBackStatus(ProductFeedBacksStatusParameter: $productFeedBacksStatusParameter) {
    statusText
  }
}
`