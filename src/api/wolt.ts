const baseUrl = 'https://daas-public-api.development.dev.woltapi.com'
const merchantId = '6364e0048018ce361efafc95'
const apiKey = '_Io093_dDmZHeaxLBgzP-p-4as6Lo7obMfo_LlyfK2I'
const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${apiKey}` }

export async function deliveryFee(pickupAddress: string, dropoffAddress: string) {
  const pathname = `/merchants/${merchantId}/delivery-fee`
  const data = {
    pickup: {
      location: {
        formatted_address: pickupAddress
      }
    },
    dropoff: {
      location: {
        formatted_address: dropoffAddress
      }
    }
  }
  const body = JSON.stringify(data)
  const result = await fetch(baseUrl + pathname, { method: 'POST', headers, body })
  return result.json()
}
