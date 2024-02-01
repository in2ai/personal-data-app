# personal-data-app
personal-data-app es un proyecto para aplicaciones móviles desarrollado en React Native para la búsqueda de empleo al ofrecer a los usuarios la capacidad de conectar sus perfiles de LinkedIn o Europass, o ingresar manualmente sus datos como un currículum vitae. Todo esto de forma local y nativa en el dispositivo móvil y conectándose mediante el protocolo Nostr para buscar, filtrar y ver ofertas que las empresas publican en el Relay.

## Requisitos
1. Node.js LTS: https://nodejs.org/en
2. Android Studio para Android.
3. Xcode para iOS.

## Instalación y ejecución del proyecto
```batch
npm install
npx expo prebuild
npx run
```

### Ejecución iOS
Para la ejecución del proyecto en iOS necesitas una máquina con MacOS y Xcode instalado junto con la Command Line Tools y un simulador instalado.
Cuando hayamos hecho un prebuild con `npx expo prebuild` se nos creará una carpeta en la raíz del proyecto llamada `ios`
```batch
cd ios
pod install
cd ..
npx expo run:ios
```

## Problemas encontrados
### Nostr (nostr-tools)
Para la integración del protocolo Nostr se está usando la librería `nostr-tools` (https://www.npmjs.com/package/nostr-tools), esta librería está desarrollada para Node.js.

React Native se ejecuta sobre Node.js, sin embargo, RN elimina algunas funciones que son requeridas por `nostr-tools`, esto lo hemos arreglado mediante *polyfills* con las siguientes librerías:
```
react-native-url-polyfill
fast-text-encoding
react-native-get-random-values
react-native-webview-crypto
```

### Descompresión de archivos
Para la descompresión de archivos (importación .zip de LinkedIn) se está usando la librería `react-native-zip-archive`, desarrollada para RN, sin embargo, al estar usando Expo hemos tenido que hacer un prebuild ya que esta librería usa funciones nativas de Android e iOS que aún no han llegado a Expo.

# https://in2ai.com
