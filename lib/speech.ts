// Voices load asynchronously in some browsers (notably Chrome), so the first
// call may need to wait for the "voiceschanged" event before a voice list is available.
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
      return
    }
    const handleVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
      resolve(window.speechSynthesis.getVoices())
    }
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged)
  })
}

// Common female voice names across macOS/iOS Safari, Chrome, and Windows —
// the Web Speech API has no standard gender field, so we match on name.
const FEMALE_VOICE_NAMES = [
  'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'allison', 'susan',
  'vicki', 'zira', 'hazel', 'female',
]

function pickFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  const pool = englishVoices.length > 0 ? englishVoices : voices
  return (
    pool.find((v) => FEMALE_VOICE_NAMES.some((name) => v.name.toLowerCase().includes(name))) ??
    pool[0]
  )
}

export async function speakText(text: string, onEnd?: () => void) {
  const utt = new SpeechSynthesisUtterance(text)
  utt.pitch = 1.3
  utt.rate = 0.9
  if (onEnd) utt.onend = onEnd

  const voices = await loadVoices()
  const voice = pickFemaleVoice(voices)
  if (voice) utt.voice = voice

  window.speechSynthesis.speak(utt)
}
