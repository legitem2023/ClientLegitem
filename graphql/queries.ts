
import { gql } from "@apollo/client"
//*************** QUERIES ***************/
export const GET_MESSAGES = gql`
query Messages {
  messages {
    id
    Messages
    Sender
    dateSent
  }
}`
export const GET_NAME_OF_STORE = gql`
query GetNameofStore {
  getNameofStore {
    nameOfStore
    image
    id
    email
  }
}`
export const GET_CHILD_INVENTORY = gql`
query GetChildInventory($skip: String, $take: String) {
  getChildInventory(skip: $skip, take: $take) {
    id
    thumbnail
    price
    productCode
    name
    category
  }
}`
export const GET_CHILD_INVENTORY_DETAIL = gql`
query GetChildInventory_details($styleCode: String) {
  getChildInventory_details(styleCode: $styleCode) {
    id
    name
    agentEmail
    category
    color
    creator
    dateCreated
    dateUpdated
    editor
    price
    imageReferences
    productCode
    productType
    size
    status
    stock
    style_Code
    thumbnail
    subImageFieldOut {
      ImagePath
      id
      subImageRelationChild
      subImageRelationParent
    }
  }
}
`
export const GET_CATEGORY = gql`
query GetCategory {
  getCategory {
    Name
    icon
    id
    image
    status
  }
}`
export const GET_RELATED_PRODUCTS = gql`
query GetRelatedProduct {
  getRelatedProduct {
    id
    thumbnail
    price
    size
    color
    name
    model
  }
}`
export const GET_VIEW_PRODUCT = gql`query GetToviewProduct($getToviewProductId: Int) {
  getToviewProduct(id: $getToviewProductId) {
    agentEmail
    model
    category
    color
    creator
    dateCreated
    dateUpdated
    editor
    id
    imageReferences
    name
    parentId
    price
    productCode
    productType
    size
    status
    stock
    style_Code
    thumbnail
    subImageFieldOut {
      ImagePath
      id
      subImageRelationChild
      subImageRelationParent
    }
  }
}`
export const GET_LOGIN = gql`
query GetLogin($username: String, $password: String) {
  getLogin(username: $username, password: $password) {
    jsonToken
    statusText
  }
}`
export const MANAGEMENT_INVENTORY = gql`
query GetParentInventory($emailAddress: String) {
  getParentInventory(EmailAddress: $emailAddress) {
    id
    styleCode
    name
    productType
    status
    agentEmail
    brandname
    category
    collectionItem
    dateCreated
    dateUpdated
    childInventory {
      agentEmail
      category
      color
      creator
      dateCreated
      dateUpdated
      editor
      id
    }
  }
}`
export const GET_ACCOUNTS = gql`
query GetUser {
  getUser {
    accountCode
    accountLevel
    agentIdentity
    dateCreated
    dateUpdated
    email
    image
    loginAttemp
    macAddress
    nameOfStore
    password
  }
}`
export const GET_ACCOUNT_DETAILS = gql`
query GetAccountDetails {
  getAccountDetails {
    id
    userId
    storeName
    fullname
    contactNo
    accountEmail
    Address
  }
}`
export const GET_ACCOUNT_DETAILS_ID = gql`
query GetAccountDetails($getAccountDetailsIdId: String) {
  getAccountDetails_id(id: $getAccountDetailsIdId) {
    id
    userId
    storeName
    fullname
    contactNo
    accountEmail
    Address
  }
}`



export const GET_PRODUCT_TYPES = gql`
query GetProductTypes {
  getProductTypes {
    Category
    Name
    id
  }
}`
export const GET_BRANDS = gql`
query GetBrand {
  getBrand {
    Name
    ProductType
    id
  }
}`
export const GET_NUM_OF_VIEWS = gql`
query GetNumberOfViews {
  getNumberOfViews {
    Country
    IpAddress
    count
    emailAddress
    id
    productCode
    dateVisited
  }
}`
export const GET_WEBSITE_VISITS = gql`
query GetWebsitVisits {
  getWebsitVisits {
    id
    Country
    IpAddress
    dateVisited
  }
}`
export const GET_LOCATION_DATA = gql`
query GetIp($ipAddress: String) {
  getIp(ipAddress: $ipAddress) {
    IpAddress
  }
}`
export const GET_INVENTORY_SUB_IMAGES = gql`
query GetInv_subImage {
  getInv_subImage {
    ImagePath
    id
    subImageRelationChild
    isVideo
  }
}`
//*************** QUERIES ***************/


//*************** MUTATION ***************/
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
mutation Mutation($count: String, $productCode: String, $emailAddress: String, $ipAddress: String, $country: String) {
  insertNumberOfViews(count: $count, productCode: $productCode, emailAddress: $emailAddress, IpAddress: $ipAddress, Country: $country) {
    jsonToken
    statusText
  }
}
`
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

//*************** MUTATION ***************/

export const MESSAGE_ADDED = gql`
subscription Subscription {
  messageAdded {
    id
    Messages
    Sender
    dateSent
  }
}`