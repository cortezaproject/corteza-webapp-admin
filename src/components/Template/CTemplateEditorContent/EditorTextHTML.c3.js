const props = {
  template: {
    createdAt: 'Thu Jul 22 2021 12:52:45 GMT+0300 (Eastern European Summer Time)',
    deletedAt: undefined,
    handle: 'quote',
    labels: {
      empty: '',
    },
    language: '',
    lastUsedAt: undefined,
    meta: Object,
    ownerID: '0',
    partial: false,
    templateID: '241120076030279682',
    type: 'text/html',
    updatedAt: undefined,
    template: '<h1>Details of Quote: {{.quote.values.QuoteNumber}} - {{.quote.values.Name}}</h1> \n<br> \n<table border="1" cellpadding="1" cellspacing="1" style="min-width:100%;"> \n  <tr> \n    <td valign="top"> \n      <strong>Quote Information</strong> \n      <br><br> \n      <strong>Quote Number:</strong> {{.quote.values.QuoteNumber}}<br> \n      <strong>Quote Name:</strong> {{.quote.values.Name}}<br> \n      <strong>Expiration Date:</strong> {{.quote.values.ExpirationDate}}<strong><br> \n      <strong>Description:</strong> {{.quote.values.Description}} \n    </td> \n    <td valign="top"> \n      <strong>Primary contact data</strong> \n      <br><br> \n      <strong>Contact Name:</strong> {{.quote.values.ContactId}}<br> \n      <strong>Email:</strong> {{.quote.values.Email}}<br> \n      <strong>Phone:</strong> {{.quote.values.Phon}} \n    </td> \n    <td valign="top"> \n      <strong>Totals</strong><br> \n      <br> \n      <strong>Subtotal:</strong> {{.quote.values.Subtotal}}<br> \n      <strong>Additional Discount:</strong> {{.quote.values.Discount}}<br> \n      <strong>Shipping and Handling:</strong> {{.quote.values.ShippingHandling}}<br> \n      <strong>Total Price:</strong> {{.quote.values.TotalPrice}}<br> \n      <strong>Tax:</strong> {{.quote.values.Tax}}<br> \n      <strong>Grand Total:</strong> {{.quote.values.GrandTotal}} \n    </td> \n  </tr> \n  <tr> \n    <td colspan="3"> \n      <strong>Products</strong> \n      <br><br> \n      {{range $index, $element := .lineItems}} \n        <strong>Price:</strong>{{$element.values.UnitPrice}}<br> \n        <strong>Quantity:</strong>{{$element.values.Quantity}}<br> \n        <strong>Subtotal:</strong>{{$element.values.Subtotal}}<br> \n        <strong>Discount:</strong>{{$element.values.Discount}}<br> \n        <strong>Total Price:</strong>{{$element.values.TotalPrice}}<br> \n        -------------------------<br> \n      {{end}} \n    </td> \n  </tr> \n  <tr> \n    <td valign="top"> \n      <strong>Bill To</strong><br> \n      <br> \n      <strong>Bill to Name:</strong> {{.quote.values.BillingName}}<br> \n      <strong>Bill to Street:</strong> {{.quote.values.BillingStreet}}<br> \n      <strong>Bill to City:</strong> {{.quote.values.BillingCity}}<br> \n      <strong>Bill to State:</strong> {{.quote.values.BillingState}}<strong><br> \n      <strong>Bill to Postal Code:</strong> {{.quote.values.BillingPostalCode}}<br> \n      <strong>Bill to Country:</strong> {{.quote.values.BillingCountry}} \n    </td> \n    <td valign="top"> \n      <strong>Quote To</strong><br> \n      <br> \n      <strong>Quote to Name:</strong> {{.quote.values.QuoteToName}}<br> \n      <strong>Quote to Street:</strong> {{.quote.values.QuoteToStreet}}<br> \n      <strong>Quote to City:</strong> {{.quote.values.QuoteToCity}}<br> \n      <strong>Quote to State:</strong> {{.quote.values.QuoteToState}}<strong><br> \n      <strong>Quote to Postal Code:</strong> {{.quote.values.QuoteToPostalCode}}<br> \n      <strong>Quote to Country:</strong> {{.quote.values.QuoteToCountry}} \n    </td> \n    <td valign="top"> \n      <strong>Ship To</strong><br> \n      <br> \n      <strong>Ship to Name:</strong> {{.quote.values.ShippingName}}<br> \n      <strong>Ship to Street:</strong> {{.quote.values.ShippingStreet}}<br> \n      <strong>Ship to City:</strong> {{.quote.values.ShippingCity}}<br> \n      <strong>Ship to State:</strong> {{.quote.values.ShippingState}}<strong><br> \n      <strong>Ship to Postal Code:</strong> {{.quote.values.ShippingPostalCode}}<br> \n      <strong>Ship to Country:</strong> {{.quote.values.ShippingCountry}} \n    </td> \n  </tr> \n</table>',
  },
}

const controls = []

const scenarios = [
  { label: 'Full form',
    props,
  },
  { label: 'Empty form',
    props: {
      ...props,
      canCreate: false,
    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
