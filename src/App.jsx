import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import EntryScreen from './components/EntryScreen/EntryScreen'
import AccessGrantedScreen from './components/AccessGrantedScreen/AccessGrantedScreen'
import MorseScreen from './components/MorseScreen/MorseScreen'
import MissionCompleteScreen from './components/MissionCompleteScreen/MissionCompleteScreen'
import HeartUniverse from './components/HeartUniverse/HeartUniverse'
import FloatingElements from './components/FloatingElements/FloatingElements'
import FloatingPhotos from './components/FloatingPhotos/FloatingPhotos'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('entry')

  return (
    <div className="app">
      {/* Ambient background photos & floating stars (hidden during 3D universe for true cinematic immersion) */}
      {currentScreen !== 'universe' && (
        <>
          <FloatingElements />
          <FloatingPhotos mode="ambient" />
        </>
      )}

      <div className="secret-label" aria-hidden="true">
        A SECRET BIRTHDAY OPERATION
      </div>
      <AnimatePresence mode="wait">
        {currentScreen === 'entry' && (
          <EntryScreen
            key="entry"
            onSuccess={() => setCurrentScreen('access')}
          />
        )}
        {currentScreen === 'access' && (
          <AccessGrantedScreen
            key="access"
            onComplete={() => setCurrentScreen('universe')}
          />
        )}
        {currentScreen === 'universe' && (
          <HeartUniverse
            key="universe"
            onContinue={() => setCurrentScreen('morse')}
          />
        )}
        {currentScreen === 'morse' && (
          <MorseScreen
            key="morse"
            onComplete={() => setCurrentScreen('mission')}
          />
        )}
        {currentScreen === 'mission' && (
          <MissionCompleteScreen key="mission" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
