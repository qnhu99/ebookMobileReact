# ebookMobileReact
Basic commands
---------------
- install package:
`yarn add <package>`

- install library
`yarn` or `yarn install`

- run application
`yarn react-native start`
`yarn react-native run-android`

How to connect to a physical machine
---------------
Ref: https://reactnative.dev/docs/running-on-device

1. Enable Debugging over USB
   
   To enable USB debugging on your device, you will first need to enable the **Developer options** menu by going to **Settings → About phone → Software information** and then tapping the **Build number** row at the bottom **seven times**. 
   
   You can then go back to **Settings → Developer** options to enable **USB debugging**.

   Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running `adb devices`

        $ adb devices
        List of devices attached
        emulator-5554 offline   # Google emulator
        14ed2fcc device         # Physical device

2. Plug in your device via USB (cable)
3. Connecting to the development server
   Open terminal and run: 

        adb -s <device name> reverse tcp:8081 tcp:8081
    To find the device name, run the following adb command: `adb devices`
4. Start Metro with command: 
   
        yarn react-native start
5. Start your application: 
   
        yarn react-native run-android