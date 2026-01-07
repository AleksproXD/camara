# 📸 Snap Swipe App

Una aplicación móvil intuitiva para capturar fotos y decidir su destino con un simple gesto de deslizamiento. Construida con React Native, Expo y TypeScript.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Características

- 📷 **Captura de fotos** con cámara frontal y trasera
- 👆 **Gestos intuitivos** tipo Tinder para tomar decisiones
- 💾 **Guarda directamente** en la galería del dispositivo
- 🗑️ **Elimina fotos** no deseadas con un deslizamiento
- 🎨 **Interfaz moderna** con animaciones fluidas
- 🌓 **Modo oscuro** en pantallas de decisión
- 📱 **Responsive** y optimizado para Android

## 🎯 ¿Cómo funciona?

1. **Toma una foto** usando la cámara integrada
2. **Desliza hacia la derecha (→)** para guardarla en tu galería
3. **Desliza hacia la izquierda (←)** para eliminarla
4. **¡Listo!** Revisa tus fotos en la app Galería de tu celular

## 🏗️ Arquitectura

El proyecto sigue principios de **Atomic Design** para una mejor organización y reutilización de componentes:

```
📦 snap-swipe-app/
├── 📂 app/                    # Pantallas principales (Expo Router)
│   ├── _layout.tsx           # Layout raíz
│   ├── index.tsx             # Menú principal
│   ├── camera.tsx            # Pantalla de cámara
│   └── photo-decision.tsx    # Decisión de foto
├── 📂 components/
│   ├── 📂 atoms/             # Componentes básicos
│   │   ├── IconButton.tsx
│   │   └── ActionButton.tsx
│   ├── 📂 molecules/         # Componentes combinados
│   │   ├── InfoCard.tsx
│   │   ├── MenuButton.tsx
│   │   ├── SwipeStamp.tsx
│   │   └── SwipeInstructions.tsx
│   └── 📂 organisms/         # Componentes complejos
│       ├── CameraControls.tsx
│       ├── PhotoCard.tsx
│       ├── PermissionScreen.tsx
│       ├── HeaderBar.tsx
│       ├── EmptyState.tsx
│       └── ProcessingOverlay.tsx
├── 📂 assets/                # Imágenes e iconos
├── app.json                  # Configuración de Expo
├── package.json
└── tsconfig.json
```

https://github.com/user-attachments/assets/cc46fa1f-d0d2-4314-9e17-137aac11b9a6

