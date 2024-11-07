import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Button, Divider, Text } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import WebApp from 'mk-start-sdk';
import { BrowserRouter } from 'react-router-dom';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [status1, setStatus1] = useState('')
  const [status2, setStatus2] = useState('')
  const [status3, setStatus3] = useState('')
  const [paymentData, setPaymentData] = useState({
    "title": "TELECOM WIFI", // TELECOM IPTV, TELECOM TELEPHONE 
    "description": "TELECOM WIFI", // TELECOM IPTV, TELECOM TELEPHONE 
    "payload": "{\"user_id\":123456789,\"bot_id\":123456789,\"order_id\":\"c9a29481-89c3-4639-8507-9f496f732774\",\"payment_url\":\"https://mpi.gov.tm/payment/merchants/online/payment_ru.html?mdOrder=c9a29481-89c3-4639-8507-9f496f732774\",\"native_provider\":\"altyn_asyr\"}",
    "currency": "TMT",
    "prices": [
        {
            "label": "TELECOM WIFI", // TELECOM IPTV, TELECOM TELEPHONE 
            "amount": 2000 // 20 manat, price for one good/service
        }, 
        {
            "label": "TELECOM IPTV", // TELECOM WIFI, TELECOM TELEPHONE 
            "amount": 2000 // 20 manat, price for one good/service
        }
    ],
    "max_tip_amount": 4000 // 40 manat, total price
  })
  const [data, setData] = useState<any>({})
  const [slug, setSlug] = useState<any>('')
  const [invoiceStatus, setInvoiceStatus] = useState<any>('')
    
  const getSlug = async(uuidv4: string) => {
    const payment_payload = {
      "user_id": 123456789, // start user id
      "bot_id": 123456789, 
      "order_id": uuidv4, // uuid v4, orderId from bank 
      "payment_url": "https://mpi.gov.tm/payment/merchants/online/payment_ru.html?mdOrder=c9a29481-89c3-4639-8507-9f496f732774", // url from bank
      "native_provider": "altyn_asyr" // rysgal, senagat, vnesh
    }
    const payment_data = {
        "title": "TELECOM WIFI", // TELECOM IPTV, TELECOM TELEPHONE 
        "description": "TELECOM WIFI", // TELECOM IPTV, TELECOM TELEPHONE 
        // "payload": "{\"user_id\":123456789,\"bot_id\":123456789,\"order_id\":\"c9a29481-89c3-4639-8507-9f496f732774\",\"payment_url\":\"https://mpi.gov.tm/payment/merchants/online/payment_ru.html?mdOrder=c9a29481-89c3-4639-8507-9f496f732774\",\"native_provider\":\"altyn_asyr\"}",
        "payload": JSON.stringify(payment_payload),
        "currency": "TMT",
        "prices": [
            {
                "label": "TELECOM WIFI", // TELECOM IPTV, TELECOM TELEPHONE 
                "amount": 2000 // 20 manat, price for one good/service
            }, 
            {
                "label": "TELECOM IPTV", // TELECOM WIFI, TELECOM TELEPHONE 
                "amount": 2000 // 20 manat, price for one good/service
            }
        ],
        "max_tip_amount": 4000 // 40 manat, total price
    }
    setPaymentData(payment_data)
    try {
      const response = await fetch('https://slug.tmstart.com/api/invoice/link', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU2ODg5ODIsInVzZXJfaWQiOjF9.nBRbp5TafMksuM_PaJrsP0ucEvVwC_C_6cOjvSj8cVs`
        },
        body: JSON.stringify(payment_data)
      })
      const data = await response.json()
      return data;
    } catch(e) {
      console.log("Error fetching slug:", e)
    }
  }
  
  const handleClick = () => {
    WebApp.openInvoice(`https://tmstart.me/$4Gm8IT2RisxezKjaZlytXDj4cm4`, (status) => {
      console.log(status)
      setStatus1(status)
    })
  }
  const handleClick2 = () => {
    WebApp.openInvoice(`https://tmstart.me/$4Gb8u3SkvIk8gPLZAIYavUqf9Oo`, (status) => {
      console.log(status)
      setStatus2(status)
    })
  }
  const handleClick3 = () => {
    WebApp.openInvoice(`https://tmstart.me/$4GMIkd4TqGMZs5iy8iNpQQxPnOr`, (status) => {
      console.log(status)
      setStatus3(status)
    })
  }
  const handleClick4 = () => {
    const order_id = uuidv4()
    getSlug(order_id).then(data => {
      setData(data)
      setSlug(data.link) // must take slug from data
    }).catch(e => {
      console.error(e)
    })
  }
  const handleClick5 = () => {
    WebApp.openInvoice(`https://tmstart.me/$4G${slug}`, (status) => {
      console.log(status)
      setInvoiceStatus(status)
    })
  }
  useEffect(() => {
    WebApp.enableClosingConfirmation();
  }, [])
  return (
    <>
      <BrowserRouter>
        <div style={{ marginBottom: 30 }}>
          <Text weight='3'>WebApp version: {WebApp.version}</Text><br/>
          <Divider />
        </div>
        <Text weight='3'>Invoice status: {status1}</Text><br/>
        <Button
          size='l'
          stretched
          onClick={handleClick}
          style={{ marginBottom: "20px" }}
          >
          Open Invoice 1
        </Button>
        <Text weight='3'>Invoice status: {status2}</Text><br/>
        <Button
          size='l'
          stretched
          onClick={handleClick2}
          style={{ marginBottom: "20px" }}
          >
          Open Invoice 1
        </Button>
        <Text weight='3'>Invoice status: {status3}</Text><br/>
        <Button
          size='l'
          stretched
          onClick={handleClick3}
          style={{ marginBottom: "20px" }}
          >
          Open Invoice 1
        </Button>
        <Divider />
        <Text weight='1' style={{ marginBottom: "20px" }}>Slug generating:</Text><br/><br/>
        <Text weight='3' style={{ marginTop: "20px" }}>Data being sent:</Text><br/>
        <JsonView data={paymentData} shouldExpandNode={allExpanded} style={defaultStyles} /><br/>
        <Text weight='3' style={{ marginTop: "20px" }}>Response from core:</Text><br/>
        {
          data &&
          <JsonView data={data} shouldExpandNode={allExpanded} style={defaultStyles} />
        }
        <br/>
        <Button
          size='l'
          stretched
          onClick={handleClick4}
          style={{ marginBottom: "20px" }}
          >
          Send payment data core
        </Button>
        {
          slug && 
          <div>
            <Text weight='3' style={{ marginTop: "20px" }}>Invoice status: {invoiceStatus}</Text><br/>
            <Button
              size='l'
              stretched
              onClick={handleClick5}
              style={{ marginBottom: "20px" }}
              >
              Open invoice
            </Button>
          </div>
        }        
      </BrowserRouter>
    </>
  )
}

export default App
