
import { GoogleGenAI, GenerateContentResponse, Chat, Modality } from "@google/genai";
import { marked } from "marked"; // For rendering Markdown from chat
import { ttsManual } from "./ttsManual";

// API Key Management
const apiKeyInput = document.getElementById('api-key-input') as HTMLInputElement | null;
const saveApiKeyBtn = document.getElementById('save-api-key-btn') as HTMLButtonElement | null;
const apiKeyStatus = document.getElementById('api-key-status') as HTMLSpanElement | null;
const apiContainer = document.getElementById('api-key-container') as HTMLDivElement | null;

let API_KEY = localStorage.getItem('GEMINI_API_KEY') || process.env.API_KEY || '';

function updateApiKeyStatus(message: string, type: 'success' | 'error' | 'info') {
    if (!apiKeyStatus) return;
    apiKeyStatus.textContent = message;
    apiKeyStatus.className = 'api-key-status'; // Reset
    if (type === 'success') apiKeyStatus.classList.add('text-success'); // Assuming bootstrap or custom class, but verify css
    apiKeyStatus.style.color = type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--text-secondary)';
    
    setTimeout(() => {
        apiKeyStatus.textContent = '';
    }, 3000);
}

if (apiKeyInput) {
    // Determine if we should mask the key initially
    if (API_KEY) {
        apiKeyInput.value = API_KEY;
    }

    if (saveApiKeyBtn) {
        saveApiKeyBtn.onclick = () => {
            const newKey = apiKeyInput.value.trim();
            if (newKey) {
                API_KEY = newKey;
                localStorage.setItem('GEMINI_API_KEY', newKey);
                updateApiKeyStatus('Chave salva!', 'success');
                // Re-initialize AI client
                initializeAiClient();
                initializeChat(); // Re-init chat with new key
                
                // Hide error messages if they were visible
                if (ttsErrorMessageDiv) ttsErrorMessageDiv.style.display = 'none';
                if (chatErrorMessageDiv) chatErrorMessageDiv.style.display = 'none';
            } else {
                updateApiKeyStatus('Chave vazia!', 'error');
            }
        };
    }
}

let ai: GoogleGenAI;

function initializeAiClient() {
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    } else {
        console.warn("API Key not found. Please enter it in the UI.");
    }
}

initializeAiClient();

if (!API_KEY) {
    if (apiKeyInput) apiKeyInput.focus();
    // Errors will be shown when user tries to interact
}

interface Speaker {
    id: string;
    name: string;
    voice: string;
}

interface VoiceOption {
    name: string;
    gender: string;
}

const availableVoices: VoiceOption[] = [
    { name: "Achernar", gender: "Feminino" }, { name: "Aoede", gender: "Feminino" },
    { name: "Autonoe", gender: "Feminino" }, { name: "Callirrhoe", gender: "Feminino" },
    { name: "Despina", gender: "Feminino" }, { name: "Erinome", gender: "Feminino" },
    { name: "Gacrux", gender: "Feminino" }, { name: "Kore", gender: "Feminino" },
    { name: "Laomedeia", gender: "Feminino" }, { name: "Leda", gender: "Feminino" },
    { name: "Pulcherrima", gender: "Feminino" }, { name: "Sulafat", gender: "Feminino" },
    { name: "Vindemiatrix", gender: "Feminino" }, { name: "Zephyr", gender: "Feminino" },
    { name: "Achird", gender: "Masculino" }, { name: "Algenib", gender: "Masculino" },
    { name: "Algieba", gender: "Masculino" }, { name: "Alnilam", gender: "Masculino" },
    { name: "Charon", gender: "Masculino" }, { name: "Enceladus", gender: "Masculino" },
    { name: "Fenrir", gender: "Masculino" }, { name: "Iapetus", gender: "Masculino" },
    { name: "Orus", gender: "Masculino" }, { name: "Puck", gender: "Masculino" },
    { name: "Rasalgethi", gender: "Masculino" }, { name: "Sadachbia", gender: "Masculino" },
    { name: "Sadaltager", gender: "Masculino" }, { name: "Schedar", gender: "Masculino" },
    { name: "Umbriel", gender: "Masculino" }, { name: "Zubenelgenubi", gender: "Masculino" }
];


let speakers: Speaker[] = [
    { id: `speaker-${Date.now()}-1`, name: "Locutor 1", voice: "Zephyr" },
];

interface AudioHistoryEntry {
    id: number;
    title: string;
    scriptText: string;
    speakersSummary: string;
    audioPlayerSrc: string;
    downloadHref: string;
    downloadFilename: string;
    fileExtension: string;
    audioBlob?: Blob;
}

let audioHistory: AudioHistoryEntry[] = [];
let audioEntryCounter = 0;

// --- Theme Management ---
function applyTheme(theme: string) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', 'Ativar modo claro');
            themeToggleBtn.title = 'Ativar modo claro';
        }
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', 'Ativar modo escuro');
            themeToggleBtn.title = 'Ativar modo escuro';
        }
    }
}

function toggleTheme() {
    const currentThemeIsDark = document.body.classList.contains('dark-theme');
    const newTheme = currentThemeIsDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.onclick = toggleTheme;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
});


// --- Base64 and ArrayBuffer Helper Functions ---
function base64ToUint8Array(base64: string): Uint8Array {
    try {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    } catch (e) {
        console.error("Failed to decode base64 string:", e);
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Erro ao decodificar dados de áudio (base64 inválido).";
            ttsErrorMessageDiv.style.display = 'block';
        }
        throw new Error("Invalid base64 string for audio data.");
    }
}

function uint8ArrayToBase64(buffer: Uint8Array): string {
    let binary = '';
    const len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(buffer[i]);
    }
    return btoa(binary);
}

function concatArrayBuffers(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer {
    const view1 = new Uint8Array(buffer1);
    const view2 = new Uint8Array(buffer2);
    const result = new Uint8Array(view1.length + view2.length);
    result.set(view1, 0);
    result.set(view2, view1.length);
    return result.buffer as ArrayBuffer;
}

// --- WAV Conversion Functions ---
interface AudioMimeParams {
    sampleRate: number;
    bitsPerSample: number;
    numChannels: number;
}

function parseAudioMimeTypeParams(mimeType: string): AudioMimeParams {
    let sampleRate = 24000;
    let bitsPerSample = 16;
    let numChannels = 1;

    const parts = mimeType.toLowerCase().split(';');
    const mainType = parts[0].trim();

    const lMatch = mainType.match(/audio\/l(\d+)/);
    if (lMatch && lMatch[1]) {
        bitsPerSample = parseInt(lMatch[1], 10);
    }

    for (let i = 1; i < parts.length; i++) {
        const param = parts[i].trim();
        const [key, value] = param.split('=').map(s => s.trim());
        if (value) {
            switch (key) {
                case 'rate': case 'ratec': sampleRate = parseInt(value, 10); break;
                case 'channels': numChannels = parseInt(value, 10); break;
                case 'bits': case 'bitspersample': bitsPerSample = parseInt(value, 10); break;
            }
        }
    }
    if (isNaN(sampleRate) || sampleRate <=0) sampleRate = 24000;
    if (isNaN(bitsPerSample) || ![8, 16, 24, 32].includes(bitsPerSample)) bitsPerSample = 16;
    if (isNaN(numChannels) || numChannels <=0) numChannels = 1;
    return { sampleRate, bitsPerSample, numChannels };
}

function convertToWavBlob(base64AudioData: string, mimeType: string): Blob {
    const { sampleRate, bitsPerSample, numChannels } = parseAudioMimeTypeParams(mimeType);
    const audioDataBytes = base64ToUint8Array(base64AudioData);
    const dataSize = audioDataBytes.length;

    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const chunkSize = 36 + dataSize;

    const header = new ArrayBuffer(44);
    const view = new DataView(header);

    view.setUint8(0, 'R'.charCodeAt(0)); view.setUint8(1, 'I'.charCodeAt(0)); view.setUint8(2, 'F'.charCodeAt(0)); view.setUint8(3, 'F'.charCodeAt(0));
    view.setUint32(4, chunkSize, true);
    view.setUint8(8, 'W'.charCodeAt(0)); view.setUint8(9, 'A'.charCodeAt(0)); view.setUint8(10, 'V'.charCodeAt(0)); view.setUint8(11, 'E'.charCodeAt(0));
    view.setUint8(12, 'f'.charCodeAt(0)); view.setUint8(13, 'm'.charCodeAt(0)); view.setUint8(14, 't'.charCodeAt(0)); view.setUint8(15, ' '.charCodeAt(0));
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    view.setUint8(36, 'd'.charCodeAt(0)); view.setUint8(37, 'a'.charCodeAt(0)); view.setUint8(38, 't'.charCodeAt(0)); view.setUint8(39, 'a'.charCodeAt(0));
    view.setUint32(40, dataSize, true);

    const wavBuffer = concatArrayBuffers(header, audioDataBytes.buffer as ArrayBuffer);
    return new Blob([new Uint8Array(wavBuffer)], { type: 'audio/wav' });
}


function getSpeakerSummary(currentSpeakers: Speaker[]): string {
    if (currentSpeakers.length === 0) return "Nenhum locutor configurado.";
    return currentSpeakers.map(s => {
        const voiceDetails = availableVoices.find(v => v.name === s.voice);
        const voiceDisplayName = voiceDetails ? `${s.voice} (${voiceDetails.gender})` : s.voice;
        return `${s.name || 'Nome não definido'} (Voz: ${voiceDisplayName})`;
    }).join(', ');
}

// --- Audio Visualizer ---
function setupAudioVisualizer(audioElement: HTMLAudioElement, canvasElement: HTMLCanvasElement) {
    if (!audioElement || !canvasElement) return;

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let source: MediaElementAudioSourceNode;
    let animationId: number;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    // Use a flag to ensure we don't connect multiple sources to the same element
    // @ts-ignore
    if (audioElement._visualizerSetup) return;

    const initAudioContext = () => {
        if (!audioContext) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioContext = new AudioContextClass();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            
            try {
                source = audioContext.createMediaElementSource(audioElement);
                source.connect(analyser);
                analyser.connect(audioContext.destination);
                // @ts-ignore
                audioElement._visualizerSetup = true;
            } catch (e) {
                // If source already connected (e.g. strict CORS), visualization might fail but audio works
                console.warn("Audio Visualizer connection failed:", e);
                return;
            }
        }
        
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    };

    const draw = () => {
        if (!analyser || !ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const width = canvasElement.width;
        const height = canvasElement.height;
        ctx.clearRect(0, 0, width, height);

        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        const isDark = document.body.classList.contains('dark-theme');
        // Simple color generation
        const rStart = isDark ? 138 : 66; // primary R
        const gStart = isDark ? 180 : 133; // primary G
        const bStart = isDark ? 248 : 244; // primary B

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 255 * height;

            // Make it dynamic
            ctx.fillStyle = `rgb(${rStart - (barHeight/2)}, ${gStart}, ${bStart})`;
            
            // Rounded bars look nicer
            if (barHeight > 0) {
                 ctx.fillRect(x, height - barHeight, barWidth, barHeight);
            }

            x += barWidth + 1;
        }

        animationId = requestAnimationFrame(draw);
    };

    audioElement.addEventListener('play', () => {
        initAudioContext();
        draw();
    });

    audioElement.addEventListener('pause', () => {
         cancelAnimationFrame(animationId);
    });

    audioElement.addEventListener('ended', () => {
         cancelAnimationFrame(animationId);
         ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    });
}


function renderAudioHistory() {
    if (!audioOutputContainer) return;
    audioOutputContainer.innerHTML = '';

    audioHistory.forEach(entry => {
        const newAudioEntryDiv = document.createElement('div');
        newAudioEntryDiv.className = 'audio-playback-entry';
        newAudioEntryDiv.setAttribute('aria-labelledby', `audio-title-${entry.id}`);

        const entryTitleElement = document.createElement('h3');
        entryTitleElement.id = `audio-title-${entry.id}`;
        entryTitleElement.textContent = entry.title;
        newAudioEntryDiv.appendChild(entryTitleElement);

        const scriptDetailsDiv = document.createElement('div');
        scriptDetailsDiv.className = 'audio-entry-details';
        scriptDetailsDiv.innerHTML = `
            <p><strong>Roteiro:</strong></p>
            <pre>${entry.scriptText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
            <p><strong>Locutor(es) e Voz(es):</strong> ${entry.speakersSummary}</p>
        `;
        newAudioEntryDiv.appendChild(scriptDetailsDiv);

        // Canvas for Visualization
        const canvas = document.createElement('canvas');
        canvas.className = 'audio-visualizer';
        canvas.width = 600; // Intrinsic width
        canvas.height = 100; // Intrinsic height
        newAudioEntryDiv.appendChild(canvas);

        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.src = entry.audioPlayerSrc;
        audioPlayer.crossOrigin = "anonymous"; // Helps with MediaElementSource
        audioPlayer.setAttribute('aria-label', `Reprodutor de áudio para ${entry.title}`);
        newAudioEntryDiv.appendChild(audioPlayer);

        const downloadLink = document.createElement('a');
        downloadLink.href = entry.downloadHref;
        downloadLink.download = entry.downloadFilename;
        downloadLink.textContent = `Baixar ${entry.title} (.${entry.fileExtension})`;
        downloadLink.className = 'btn btn-secondary btn-download';
        newAudioEntryDiv.appendChild(downloadLink);

        audioOutputContainer.appendChild(newAudioEntryDiv);

        // Setup Visualizer logic
        setupAudioVisualizer(audioPlayer, canvas);
    });
}


function renderSpeakers() {
    if (!speakerListDiv) return;
    speakerListDiv.innerHTML = '';
    speakers.forEach((speaker, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'speaker-entry';
        entryDiv.setAttribute('aria-label', `Configuração para ${speaker.name || `Locutor ${index + 1}` }`);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = `speaker-name-${speaker.id}`;
        nameInput.value = speaker.name;
        nameInput.placeholder = 'Nome do Locutor (ex: Alice)';
        nameInput.setAttribute('aria-label', 'Nome do Locutor');
        nameInput.onchange = (e) => {
            speaker.name = (e.target as HTMLInputElement).value;
        };

        const voiceSelect = document.createElement('select');
        voiceSelect.id = `speaker-voice-${speaker.id}`;
        voiceSelect.setAttribute('aria-label', 'Selecionar Voz');
        availableVoices.forEach(v => {
            const option = document.createElement('option');
            option.value = v.name;
            option.textContent = `${v.name} (${v.gender})`;
            if (v.name === speaker.voice) {
                option.selected = true;
            }
            voiceSelect.appendChild(option);
        });
        voiceSelect.onchange = (e) => {
            speaker.voice = (e.target as HTMLSelectElement).value;
        };

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"/></svg>`;
        removeBtn.className = 'btn btn-danger';
        removeBtn.setAttribute('aria-label', `Remover ${speaker.name || `Locutor ${index + 1}`}`);
        removeBtn.onclick = () => {
            if (speakers.length > 1) {
                speakers = speakers.filter(s => s.id !== speaker.id);
                renderSpeakers();
            }
        };

        entryDiv.appendChild(nameInput);
        entryDiv.appendChild(voiceSelect);
        if (speakers.length > 1) {
            entryDiv.appendChild(removeBtn);
        }
        speakerListDiv.appendChild(entryDiv);
    });
}

function addSpeaker() {
    if (speakers.length >= 2) {
         if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Para esta demonstração, a funcionalidade de múltiplos locutores é limitada a 2. Para usar um único locutor, remova um dos existentes.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }
    speakers.push({
        id: `speaker-${Date.now()}-${speakers.length + 1}`,
        name: `Locutor ${speakers.length + 1}`,
        voice: availableVoices[ (speakers.length % availableVoices.length) ].name
    });
    renderSpeakers();
}

async function handleGenerateSpeech() {
    if (!API_KEY) {
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Chave da API Gemini ausente. Não é possível gerar fala.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }
    if (!scriptInput || !scriptInput.value.trim()) {
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Por favor, insira algum texto no roteiro.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }
    if (speakers.some(s => !s.name.trim())) {
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Por favor, certifique-se de que todos os locutores tenham um nome.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }
    if (speakers.length === 0) {
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Por favor, adicione pelo menos um locutor.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }
    if (speakers.length > 2) {
         if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Esta demonstração suporta 1 locutor ou, para múltiplos locutores, exatamente 2. Por favor, ajuste o número de locutores.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }

    if (loadingIndicator) loadingIndicator.style.display = 'flex';
    if (generateSpeechBtn) generateSpeechBtn.disabled = true;
    if (ttsErrorMessageDiv) {
        ttsErrorMessageDiv.textContent = '';
        ttsErrorMessageDiv.style.display = 'none';
    }

    const currentScriptText = scriptInput.value;
    const currentSpeakersSummary = getSpeakerSummary(speakers);
    const selectedModel = modelSelector ? modelSelector.value : 'gemini-2.5-flash-preview-tts';

    let requestConfigPayload: any;

    if (speakers.length === 1) {
        requestConfigPayload = {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: {
                        voiceName: speakers[0].voice
                    }
                }
            }
        };
    } else { // Assumes speakers.length is 2 due to previous checks
        const speakerConfigsForMulti = speakers.map(s => ({
            speaker: s.name,
            voiceConfig: {
                 prebuiltVoiceConfig: {
                    voiceName: s.voice
                }
            }
        }));
        requestConfigPayload = {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                multiSpeakerVoiceConfig: {
                    speakerVoiceConfigs: speakerConfigsForMulti,
                },
            },
        };
    }

    // IMPORTANT: Series 2.5 TTS models DO NOT support systemInstruction (preambles).
    // We move the instruction to the user message to avoid Error 500/400 "Preambles not allowed".
    const ttsInstructionWrapper = `Perform the following script exactly as written with high expressiveness. Generate ONLY audio output. Do not include any text responses.

SCRIPT:
${currentScriptText}`;

    console.log("TTS Request - Selected Model:", selectedModel);
    console.log("TTS Request - Speakers Config:", JSON.stringify(speakers, null, 2));

    const informationalTextsFromStream: string[] = [];
    let audioChunkFound = false;
    let accumulatedAudioDataB64 = "";
    let audioMimeType = "audio/wav";

    try {
        const stream = await ai.models.generateContentStream({
            model: selectedModel,
            contents: [{
                role: "user",
                parts: [{ text: ttsInstructionWrapper }],
            }],
            config: requestConfigPayload as any,
        });

        for await (const chunk of stream) {
            const candidate = chunk.candidates?.[0];

            if (!candidate?.content?.parts?.length) {
                if (chunk.text) {
                    if (!informationalTextsFromStream.includes(chunk.text)) {
                        informationalTextsFromStream.push(chunk.text);
                    }
                }
                continue;
            }

            for (const part of candidate.content.parts) {
                if (part && 'inlineData' in part && part.inlineData) {
                    audioChunkFound = true;
                    const inlineData = part.inlineData;
                    if (inlineData.data) {
                        accumulatedAudioDataB64 += inlineData.data;
                    }
                    if (inlineData.mimeType) {
                        if (inlineData.mimeType.startsWith("audio/")) {
                             audioMimeType = inlineData.mimeType;
                        } else if (inlineData.mimeType === "application/octet-stream" && (inlineData.data || accumulatedAudioDataB64)) {
                            audioMimeType = "audio/L16";
                        }
                    }
                } else if (part && 'text' in part && part.text) {
                    const textPartContent = part.text;
                    if (!informationalTextsFromStream.includes(textPartContent)) {
                        informationalTextsFromStream.push(textPartContent);
                    }
                }
            }
        }

        if (audioChunkFound && accumulatedAudioDataB64) {
            audioEntryCounter++;
            let audioBlob: Blob;
            let finalMimeTypeForPlayer = audioMimeType;
            let finalFileExtension = audioMimeType.split('/')[1]?.split(';')[0] || 'raw';

            if (audioMimeType.toLowerCase().startsWith("audio/l")) { // Covers audio/L16, audio/L24 etc.
                try {
                    audioBlob = convertToWavBlob(accumulatedAudioDataB64, audioMimeType);
                    finalMimeTypeForPlayer = "audio/wav";
                    finalFileExtension = "wav";
                } catch (conversionError: any) {
                    console.error("Failed to convert L-PCM to WAV Blob:", conversionError);
                     if (ttsErrorMessageDiv && (!ttsErrorMessageDiv.textContent || ttsErrorMessageDiv.style.display === 'none')) {
                         ttsErrorMessageDiv.textContent = `Falha ao converter áudio ${audioMimeType} para WAV: ${conversionError.message}. O áudio pode não ser reproduzível.`;
                         ttsErrorMessageDiv.style.display = 'block';
                    }
                    // Fallback to using raw data if conversion fails
                    const rawBytes = base64ToUint8Array(accumulatedAudioDataB64);
                    audioBlob = new Blob([rawBytes], {type: audioMimeType});
                }
            } else {
                 const rawBytes = base64ToUint8Array(accumulatedAudioDataB64);
                 audioBlob = new Blob([rawBytes], {type: audioMimeType});
            }

            const audioPlayerSrc = URL.createObjectURL(audioBlob);
            const now = new Date();
            const timestampIso = now.toISOString().replace(/[:.]/g, '-');
            const entryTitle = `Áudio Gerado ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            const downloadFilename = `audio_gerado_${timestampIso}.${finalFileExtension}`;

            const newHistoryEntry: AudioHistoryEntry = {
                id: audioEntryCounter,
                title: entryTitle,
                scriptText: currentScriptText,
                speakersSummary: currentSpeakersSummary,
                audioPlayerSrc: audioPlayerSrc,
                downloadHref: audioPlayerSrc,
                downloadFilename: downloadFilename,
                fileExtension: finalFileExtension,
                audioBlob: audioBlob
            };

            audioHistory.unshift(newHistoryEntry);
            renderAudioHistory();
            // Clear error message if it was related to informational text that's now superseded by success
            if (ttsErrorMessageDiv && informationalTextsFromStream.some(text => ttsErrorMessageDiv.textContent?.includes(text))) {
                 ttsErrorMessageDiv.textContent = '';
                 ttsErrorMessageDiv.style.display = 'none';
            }

        } else {
            let specificReason = "";
            if (audioChunkFound && !accumulatedAudioDataB64) {
                specificReason = "Os dados de áudio recebidos estavam vazios.";
            } else if (!audioChunkFound) {
                specificReason = "Nenhuma parte de áudio foi encontrada na resposta do modelo.";
            } else {
                specificReason = "Nenhum dado de áudio utilizável foi recebido."; // Fallback
            }

            let fullMessage = "";
            const adviceFooter = "Por favor, tente novamente. Se o problema persistir, verifique seu roteiro, sua cota da API, e se o modelo selecionado é adequado para a tarefa.";

            if (informationalTextsFromStream.length > 0) {
                const infoText = informationalTextsFromStream.join('; ');
                fullMessage = `O modelo retornou informações mas não gerou áudio: "${infoText}". Isso pode indicar um problema com o roteiro ou filtros de segurança. Revise-o. ${adviceFooter}`;
                console.warn("Mensagens informativas do modelo (sem áudio principal):", infoText);
            } else {
                fullMessage = `Falha ao gerar áudio: ${specificReason}. Nenhuma informação adicional foi retornada. Isso pode ser um problema temporário. ${adviceFooter}`;
            }
            
            if (ttsErrorMessageDiv) {
                ttsErrorMessageDiv.textContent = fullMessage;
                ttsErrorMessageDiv.style.display = 'block';
            }
        }

    } catch (error: any) {
        console.error("Error generating speech (raw error object):", error);
        let displayError = "Falha ao gerar fala. Verifique o console para detalhes.";
        if (error.message) {
            if (error.message.includes("API key not valid")) {
                displayError = "A Chave da API Gemini não é válida. Por favor, verifique sua chave.";
            } else if (error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("rate limit") || error.message.toLowerCase().includes("resource_exhausted")) {
                displayError = "Limite de cota excedido (Quota exceeded). Por favor, aguarde alguns minutos antes de tentar novamente ou verifique se o modelo Pro está disponível no seu plano.";
            } else if (modelSelector && error.message.toLowerCase().includes("model") && error.message.toLowerCase().includes("not support audio")) {
                displayError = `O modelo selecionado (${modelSelector.value}) não suporta saída de áudio com as configurações atuais.`;
            } else if (error.message.includes("not supported by the AudioOut model")) {
                displayError = "O modelo de áudio não pôde processar este roteiro (pode ser devido ao conteúdo ou filtros). Tente simplificar o texto.";
            } else if (error.message.includes("Preambles (System Instructions) passed to AudioOut model")) {
                displayError = "Erro técnico: Instruções do sistema não são permitidas para este modelo de áudio. Reporte este erro.";
            } else {
                 displayError = `Falha ao gerar fala: ${error.message}`;
            }
        }
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = displayError;
            ttsErrorMessageDiv.style.display = 'block';
        }
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        if (generateSpeechBtn) generateSpeechBtn.disabled = false;
    }
}

// --- Chat Functionality ---

function initializeChat() {
    if (!API_KEY) {
        if (chatErrorMessageDiv) {
            chatErrorMessageDiv.textContent = "Chave da API Gemini ausente. Não é possível iniciar o chat.";
            chatErrorMessageDiv.style.display = 'block';
        }
        console.error("API_KEY missing, cannot initialize chat.");
        return;
    }
    try {
        const systemInstruction = `Você é um assistente especializado em criar prompts para um sistema de Texto-para-Fala (TTS) expressivo. Sua principal tarefa é ajudar o usuário a formatar texto para gerar áudio com emoção, ritmo e estilo específicos, seguindo o manual abaixo. Quando o usuário pedir ajuda para criar um prompt TTS, ou perguntar como expressar uma certa emoção ou som, use este manual para guiar sua resposta e fornecer exemplos de texto formatado. Responda em Português do Brasil.

--- MANUAL DE PADRÃO PARA TTS EXPRESSIVO ---
${ttsManual}
--- FIM DO MANUAL ---`;

        geminiChat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                 systemInstruction: systemInstruction,
            },
        });
        if (chatErrorMessageDiv) {
            chatErrorMessageDiv.textContent = '';
            chatErrorMessageDiv.style.display = 'none';
        }
    } catch (error: any) {
        console.error("Error initializing chat:", error);
        if (chatErrorMessageDiv) {
            chatErrorMessageDiv.textContent = `Erro ao iniciar o chat: ${error.message || 'Erro desconhecido'}`;
            chatErrorMessageDiv.style.display = 'block';
        }
    }
}

function addCopyButtonsToPreBlocks(containerElement: HTMLElement) {
    const preElements = containerElement.querySelectorAll('pre');
    preElements.forEach(preElement => {
        if (preElement.querySelector('.copy-code-button')) {
            return;
        }

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar';
        copyButton.className = 'btn btn-secondary copy-code-button';
        copyButton.setAttribute('aria-label', 'Copiar código');
        copyButton.type = 'button';

        copyButton.onclick = () => {
            const codeElement = preElement.querySelector('code');
            const codeToCopy = codeElement ? codeElement.innerText : preElement.innerText;

            navigator.clipboard.writeText(codeToCopy)
                .then(() => {
                    copyButton.textContent = 'Copiado!';
                    copyButton.classList.add('copied');
                    setTimeout(() => {
                        copyButton.textContent = 'Copiar';
                        copyButton.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Falha ao copiar código: ', err);
                    copyButton.textContent = 'Erro';
                    setTimeout(() => {
                        copyButton.textContent = 'Copiar';
                    }, 2000);
                });
        };
        preElement.appendChild(copyButton);
    });
}


function appendChatMessage(message: string, sender: 'user' | 'model', isStreaming: boolean = false): HTMLDivElement | null {
    if (!chatHistoryContainer) return null;

    if (isStreaming && sender === 'model') {
        let lastMessageDiv = chatHistoryContainer.lastElementChild as HTMLDivElement;
        if (lastMessageDiv && lastMessageDiv.classList.contains('model-message') && lastMessageDiv.dataset.streaming === 'true') {
            // Append to existing streaming message
            const tempDiv = document.createElement('div'); // Create a temporary div for parsing
            tempDiv.innerHTML = marked.parse(message) as string; // Parse the new part
            lastMessageDiv.innerHTML += tempDiv.innerHTML; // Append parsed HTML to existing
            chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
            return lastMessageDiv;
        }
    }

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', `${sender}-message`);
    messageDiv.innerHTML = marked.parse(message) as string;

    if (sender === 'model' && isStreaming) {
        messageDiv.dataset.streaming = 'true';
    }

    // Add copy buttons only after streaming is complete or for non-streamed model messages
    if (sender === 'model' && !isStreaming) {
        addCopyButtonsToPreBlocks(messageDiv);
    }

    chatHistoryContainer.appendChild(messageDiv);
    chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
    return messageDiv;
}


async function handleSendChatMessage() {
    if (!API_KEY) {
        if (chatErrorMessageDiv) {
            chatErrorMessageDiv.textContent = "Chave da API Gemini ausente. Não é possível enviar mensagem.";
            chatErrorMessageDiv.style.display = 'block';
        }
        return;
    }
    if (!geminiChat) {
        initializeChat();
        if (!geminiChat) {
             if (chatErrorMessageDiv) {
                chatErrorMessageDiv.textContent = "Sessão de chat não iniciada. Tente novamente.";
                chatErrorMessageDiv.style.display = 'block';
            }
            return;
        }
    }

    if (!chatInput) return;
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    appendChatMessage(messageText, 'user');
    chatInput.value = '';
    // Reset height after sending
    chatInput.style.height = 'auto'; 
    chatInput.disabled = true;
    if (sendChatMessageBtn) sendChatMessageBtn.disabled = true;
    if (chatLoadingIndicator) chatLoadingIndicator.style.display = 'flex';
    if (chatErrorMessageDiv) {
        chatErrorMessageDiv.textContent = '';
        chatErrorMessageDiv.style.display = 'none';
    }

    try {
        const stream = await geminiChat.sendMessageStream({ message: messageText });
        let currentModelMessageDiv: HTMLDivElement | null = null;
        let accumulatedResponse = "";

        for await (const chunk of stream) {
            const chunkText = chunk.text;
            if (chunkText) {
                accumulatedResponse += chunkText;
                if (!currentModelMessageDiv) {
                    // Create new div for the start of the model's response
                    currentModelMessageDiv = appendChatMessage('', 'model', true);
                }
                if (currentModelMessageDiv) {
                    // Update existing streaming div with the full accumulated response, parsed
                    currentModelMessageDiv.innerHTML = marked.parse(accumulatedResponse) as string;
                    if (chatHistoryContainer) chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
                }
            }
        }
        if (currentModelMessageDiv) {
            // Final update after stream ends
            currentModelMessageDiv.innerHTML = marked.parse(accumulatedResponse) as string;
            addCopyButtonsToPreBlocks(currentModelMessageDiv); // Add copy buttons now that content is final
            delete currentModelMessageDiv.dataset.streaming;
            if (chatHistoryContainer) chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
        }

    } catch (error: any) {
        console.error("Error sending chat message:", error);
        let displayError = "Falha ao enviar mensagem.";
        if (error.message) {
            if (error.message.includes("API key not valid")) {
                displayError = "A Chave da API Gemini não é válida. Por favor, verifique sua chave.";
            } else if (error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("rate limit") || error.message.toLowerCase().includes("resource_exhausted")) {
                displayError = "Você excedeu sua cota da API Gemini (Quota exceeded). Tente novamente em alguns segundos ou verifique se atingiu o limite diário.";
            } else {
                 displayError = `Erro no chat: ${error.message}`;
            }
        }
        if (chatErrorMessageDiv) {
            chatErrorMessageDiv.textContent = displayError;
            chatErrorMessageDiv.style.display = 'block';
        }
    } finally {
        if (chatLoadingIndicator) chatLoadingIndicator.style.display = 'none';
        if (chatInput) {
            chatInput.disabled = false;
            chatInput.focus();
        }
        if (sendChatMessageBtn) sendChatMessageBtn.disabled = false;
    }
}

// --- Chat Input Auto-Resize ---
function setupChatInputResize() {
    if (!chatInput) return;
    
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto'; // Reset height to recalculate
        this.style.height = (this.scrollHeight) + 'px'; // Set new height
        if (this.value === '') {
             this.style.height = 'auto'; // Reset if empty to default min-height via CSS
        }
    });
}


// Initial setup for TTS
if (addSpeakerBtn) addSpeakerBtn.onclick = addSpeaker;
if (generateSpeechBtn) generateSpeechBtn.onclick = handleGenerateSpeech;

if (scriptInput) {
    scriptInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (generateSpeechBtn && !generateSpeechBtn.disabled) {
                handleGenerateSpeech();
            }
        }
    });
}

// Initial setup for Chat
if (sendChatMessageBtn) sendChatMessageBtn.onclick = handleSendChatMessage;
if (chatInput) {
    setupChatInputResize(); // Enable auto-resize
    chatInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (sendChatMessageBtn && !sendChatMessageBtn.disabled) {
                handleSendChatMessage();
            }
        }
    });
}

// Initialize chat when the page loads if API key is present
if (API_KEY && chatSection) {
    initializeChat();
}

renderSpeakers();
renderAudioHistory();
