import React from 'react'
import PrivacyPolicy from './PrivacyPolicy'
// import privacyPolicyData from 'json/Private.json'
const Privacy = () => {
  const privacyPolicyData = {
    "Privacy_Policy": {
        "Introduction": {
            "content": "Thank you for visiting Legitem. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [www.legitem.com] (the \"Site\"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."
        },
        "Information_We_Collect": {
            "content": "We may collect personal information about you in various ways, including:\n\nInformation You Provide: When you make a purchase, register an account, or communicate with us, you may provide personal information such as your name, email address, shipping address, and payment information.\n\nAutomatically Collected Information: We may automatically collect certain information about your device and usage patterns when you interact with our Site, including IP address, browser type, referring/exit pages, and operating system."
        },
        "Use_of_Your_Information": {
            "content": "We may use the information we collect for various purposes, including:\n\nTo process and fulfill your orders and requests.\nTo communicate with you, including sending order confirmations, updates, and promotional messages.\nTo improve our products and services.\nTo comply with legal obligations."
        },
        "Sharing_Your_Information": {
            "content": "We may share your information with third parties only in the ways that are described in this privacy policy:\n\nWith service providers who assist us in operating our website and conducting our business.\nWith your consent or as necessary to complete any transaction or provide any product you have requested.\nIn response to a subpoena or similar investigative demand, a court order, or other legal process."
        },
        "Security_of_Your_Information": {
            "content": "We use administrative, technical, and physical security measures to help protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security."
        },
        "Your_Choices_Regarding_Your_Information": {
            "content": "You have choices regarding the collection, use, and sharing of your personal information:\n\nYou may choose not to provide certain personal information, although this may limit your ability to use certain features of the Site.\nYou can update your account information and communication preferences at any time by logging into your account."
        },
        "Changes_to_This_Privacy_Policy": {
            "content": "We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons."
        }
    }
};
  return (
    <div>
        <PrivacyPolicy privacyPolicyData={privacyPolicyData} />
    </div>
  )
}

export default Privacy