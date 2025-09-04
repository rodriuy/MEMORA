# **App Name**: Memorias de Familia

## Core Features:

- Family Dashboard: A private, centralized hub for each family to manage their memories, accessible after secure login with Firebase Authentication.
- Story Upload: Upload audio recordings, photos, and text transcripts to create stories, tagging them with family member names, emotional tags, and linked NFC card IDs.
- Memory Exploration: Browse and search stories using a timeline or family tree view, filterable by tag or family member, to easily relive cherished moments.
- Interactive Avatar Simulation: Simulate an AI avatar that "speaks" the uploaded audio via Web Speech API, offering a preview of the avatar feature, acting as a tool, and managed as if from an external device.
- NFC Card Simulation: Simulate the reading of NFC cards via a button to trigger playback of the linked story, providing an intuitive experience mirroring the physical interaction.
- Realtime Database Connection: Real-time Firebase sync for the NFC box connection, allowing playing back memory by simulating event with external calls to Firebase, emulating behavior of a Raspberry Pi using NFC reader events.
- Account data handling: User authentication to isolate user accounts using email/password and Google sign-in using Firebase Auth.

## Style Guidelines:

- Primary color: Burnt Sienna (#E9724C) evoking warmth and nostalgia.
- Background color: Pale Sand (#F2EBD3), a desaturated complement to the primary.
- Accent color: Forest Green (#3D84A8), a cool, contrasting color suggestive of growth and heritage.
- Body and headline font: 'Literata', a serif font with a literary, vintage feel suitable for the application.
- Use simple, hand-drawn style icons representing family, memories, and Uruguayan cultural elements.
- Clean, intuitive layout with a focus on accessibility for users of all ages, featuring clear sectioning and prominent calls to action.
- Subtle fade-in animations and smooth transitions between sections to create a polished and engaging user experience.