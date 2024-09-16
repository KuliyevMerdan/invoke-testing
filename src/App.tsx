import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Button, Divider, Input, Text } from '@telegram-apps/telegram-ui';
import { useState } from 'react';
import WebApp from '../node_modules/mk-start-sdk/src'

function App() {
  const [button, setButton] = useState<string | undefined>("Not clicked")
  const [testEvent, setTestEvent] = useState()
  const [manual, setManual] = useState("")
  const [manualResponse, setManualResponse] = useState()
  const popupParams: any = {
    message: "Test popup",
    buttons: [
      { id: "ok", type: "default", text: "Ok" },
      { id: "cancel", type: "destructive", text: "Cancel"},
      { id: "close", type: "close", text: "Close"}
    ]
  }
  
  const handleClick = () => {
    WebApp.showPopup(popupParams, (event) => {
      console.log("Button id:", event)
      setButton(event)
    })
  }

  const handleSecondClick = () => {
    WebApp.invokeCustomMethod(
      'get_card_credentials', 
      {
        "User" : WebApp.initDataUnsafe.user?.username,
        "Text" : `Experimental text to get ${WebApp.initDataUnsafe.user?.username}'s card credentials`
      }, 
      (event) => {
      console.log("Card requested")
      console.log(event)
      setTestEvent(event)
    })
    WebApp.onEvent('customMethodInvoked', (event) => {
      console.log(event)
    })
  }
  const manualClick = () => {
    WebApp.invokeCustomMethod(
      manual,
      {},
      (event) => {
        console.log("Manual invoked")
        console.log(event)
        setManualResponse(event)
      }
    )
    console.log(manual)
  }
  return (
    <>
      <div style={{ marginBottom: 30 }}>
        <Text weight='3'>WebApp version: {WebApp.version}</Text><br/>
        {
          (button !== "Not clicked") ?
          <>
            <Text weight='1'>Clicked button on popup: {button}</Text><br />
          </> : null
        }
        <Button
          size='l'
          stretched
          onClick={handleClick}
          style={{ marginBottom: "20px" }}
        >
          Show test webapp
        </Button>

        <Divider />
      </div>
      <h2>On web:</h2>
      <p>Button below will invoke custom method with method called "get_card_credentials" in first param</p>
      <p>In addition, for testing I added second param with some data</p>
      <p>After invoking method, I will receive response from client and show its content below</p>
      <h3>Response: {testEvent}</h3>
      <Divider />
      <h2>On client:</h2>
      <p>When clicked on web, this button will post event and its params will be ("web_app_invoke_custom_method", false, req_params) </p>
      <p>In req_params there are 3 properties: </p>
      <ul>
        <li>req_id: (some generated id)</li>
        <li>method: (name of the custom method from web, like get_card_credentials)</li>
        <li>params: (params from web, if not, empty object)</li>
      </ul>
      <h3>Response: {testEvent}</h3>
      <Button
        size='l'
        stretched
        onClick={handleSecondClick}
        style={{ marginBottom: "20px" }}
      >
        Invoke custom method
      </Button>
      <Divider />
      <h2>Manual testing:</h2> 
      {
        (manualResponse !== "") &&
        <p>Response from custom name: {manualResponse}</p>
      }
      <h3>Set the method name</h3>
      <Input 
        header="Input" 
        placeholder="get_card_credentials" 
        value={manual}
        onChange={(e) => { setManual(e.target.value) }}
      />
      <Button
        stretched
        size='l'
        onClick={manualClick}
      >
        Test
      </Button>
    </>
  )
}

export default App
