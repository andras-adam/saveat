import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import { useState } from 'react'
import { env } from '../../config'


const baseUrl = 'https://daas-public-api.development.dev.woltapi.com'
const merchantId = env.WOLT_MERCHANT_ID
const apiKey = env.WOLT_API_KEY
const headers = { 'content-type': 'application/json', 'authorization': `Bearer ${apiKey}` }

async function getCurrentAddress(): Promise<string> {
  // Check for permission
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
    return ''
  }
  // Calculate the current address
  const currentLocation = await Location.getCurrentPositionAsync({})
  const [ currentAddress ] = await Location.reverseGeocodeAsync({
    latitude: currentLocation.coords.latitude,
    longitude: currentLocation.coords.longitude
  })
  const { city, postalCode, street, streetNumber } = currentAddress
  return `${street} ${streetNumber}, ${postalCode} ${city}`
}

export async function deliveryFee(pickupAddress: string) {
  const pathname = `/merchants/${merchantId}/delivery-fee`
  const dropoffAddress = await getCurrentAddress()
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

export async function deliveryOrder(pickupAddress: string, contents: object[]) {
  const pathname = `/merchants/${merchantId}/delivery-order`
  const dropoffAddress = await getCurrentAddress()
  const data = {
    pickup: {
      location: {
        formatted_address: pickupAddress
      },
      contact_details: {
        name: 'John Doe',
        phone_number: '+358501235467',
        send_tracking_link_sms: false
      }
    },
    dropoff: {
      location: {
        formatted_address: dropoffAddress
      },
      contact_details: {
        name: 'John Doe',
        phone_number: '+358501235467',
        send_tracking_link_sms: false
      }
    },
    customer_support: {
      email: 'test@example.com',
      phone_number: '+358501235467',
      url: 'https://example.com'
    },
    is_no_contact: true,
    contents: contents,
    tips: [],
    min_preparation_time_minutes: 5
  }
  const body = JSON.stringify(data)
  const result = await fetch(baseUrl + pathname, { method: 'POST', headers, body })
  return result.json()
}

export async function DeliveryOrder(
  merchant_id: string, pickupAddress: string, pickupComment: string, pickupsmsTracking: boolean,
  name: string, phoneno: string, address: string, pickupLocation: LocationObject, contactName: string,
  contactPhoneno: string, contactTracking: boolean, dropoffComment: string, supportEmail: string,
  supportPhoneNo: string, supportUrl: string, isContact: boolean,
  merchant_order_reference_id: string, contentsDescriptions: string, contentsID: string, contentsTags: string,
  contentsCount: number, tipsPreDelivery: string, tipsAmount: number, tipsCurrency: string, minPreparation: number,
  scheduledTime: string
) {

  const [ location, setLocation ] = useState<LocationObject | null>(null)

  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
    return
  }

  const currentLocation = await Location.getCurrentPositionAsync({})
  setLocation(currentLocation)

  const pathname = `/merchants/${merchant_id}/delivery-order`
  const data = {
    pickup: {
      location: {
        formatted_address: pickupAddress,
        coordinates: {
          lat: pickupLocation.coords.latitude,
          lon: pickupLocation.coords.longitude
        }
      },
      comment: pickupComment,
      contact_details: {
        name: name,
        phone_number: phoneno,
        send_tracking_link_sms: pickupsmsTracking
      }
    },
    dropoff: {
      location: {
        formatted_address: address,
        coordinates: {
          lat: location?.coords.latitude,
          lon: location?.coords.longitude
        }
      },
      contact_details: {
        name: contactName,
        phone_number: contactPhoneno,
        send_tracking_link_sms: contactTracking
      },
      comment: dropoffComment
    },
    customer_support: {
      email: supportEmail,
      phone_number: supportPhoneNo,
      url: supportUrl
    },
    merchant_order_reference_id: merchant_order_reference_id,
    is_no_contact: isContact,
    contents: [
      {
        count: contentsCount,
        description: contentsDescriptions,
        identifier: contentsID,
        tags: [ contentsTags ]
      }
    ],
    tips: [
      {
        type: tipsPreDelivery,
        price: {
          amount: tipsAmount,
          currency: tipsCurrency
        }
      }
    ],
    min_preparation_time_minutes: minPreparation,
    scheduled_dropoff_time: scheduledTime // Must be in ISO8601
  }
  const body = JSON.stringify(data)
  const result = await fetch(baseUrl + pathname, { method: 'POST', headers, body })
  return result.json()
}

export async function Deliveries(
  venue_id: string, minPreparation: number, pickupComment: string, dropoffComment: string, dropoffTime: string,
  priceAmount: number, priceCurrency: string, recipientName: string, recipientPhoneNo: string,
  recipientMail: string, parcelWeight: number, parcelWidth: number, parcelHeight: number, parceldepth: number,
  parcelDescription: string, parcelID: string, parcelAge: number, parcelIDVer: string, parcelTags: string,
  shipment_promise_id: string, supportEmail: string, supportPhoneNo: string, supportUrl: string,
  merchant_order_reference_id: string, smsRecieved: string, smsPickedUp: string, tipsType: string,
  tipsAmount: number, tipsCurrency: string


) {
  const [ LocationSet, SetLocation ] = useState<LocationObject | null>(null)

  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
    return
  }

  const currentLocation = await Location.getCurrentPositionAsync({})
  SetLocation(currentLocation)

  const pathname = `/v1/venues/${venue_id}/deliveries`
  const data
    = {
      pickup: {
        options: {
          min_preparation_time_minutes: minPreparation
        },
        comment: pickupComment
      },
      dropoff: {
        location: {
          coordinates: {
            lat: LocationSet?.coords.latitude,
            lon: LocationSet?.coords.longitude
          }
        },
        comment: dropoffComment,
        options: {
          is_no_contact: false,
          scheduled_time: dropoffTime
        }
      },
      price: {
        amount: priceAmount,
        currency: priceCurrency
      },
      recipient: {
        name: recipientName,
        phone_number: recipientPhoneNo,
        email: recipientMail
      },
      parcels: [
        {
          dimensions: {
            weight_gram: parcelWeight,
            width_cm: parcelWidth,
            height_cm: parcelHeight,
            depth_cm: parceldepth
          },
          description: parcelDescription,
          identifier: parcelID,
          dropoff_restrictions: {
            age_limit: parcelAge,
            identity_verification: {
              name: parcelIDVer
            }
          },
          tags: [ parcelTags ]
        }
      ],
      shipment_promise_id: shipment_promise_id,
      customer_support: {
        url: supportUrl,
        email: supportEmail,
        phone_number: supportPhoneNo
      },
      merchant_order_reference_id: merchant_order_reference_id,
      sms_notifications: {
        received: smsRecieved,
        picked_up: smsPickedUp
      },
      tips: [
        {
          type: tipsType,
          price: {
            amount: tipsAmount,
            currency: tipsCurrency
          }
        }
      ]
    }
  const body = JSON.stringify(data)
  const result = await fetch(baseUrl + pathname, { method: 'POST', headers, body })
  return result.json()
}

export async function ShipmentPromises(
  venue_id: string, street: string, city: string, post_code: string,
  language: string, minTime: number, scheduledTime: string
) {
  const [ LocationSet, SetLocation ] = useState<LocationObject | null>(null)

  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
    return
  }

  const currentLocation = await Location.getCurrentPositionAsync({})
  SetLocation(currentLocation)

  const pathname = `/v1/venues/${venue_id}/shipment-promises`
  const data = {
    street: street,
    city: city,
    post_code: post_code,
    lat: LocationSet?.coords.latitude,
    lon: LocationSet?.coords.longitude,
    language: language,
    min_preparation_time_minutes: minTime,
    scheduled_dropoff_time: scheduledTime // Must be in ISO8601
  }
  const body = JSON.stringify(data)
  const result = await fetch(baseUrl + pathname, { method: 'POST', headers, body })
  return result.json()
}
