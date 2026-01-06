import { GoogleGenAI, Chat, Modality } from "@google/genai";
import { marked } from "marked";
import { ttsManual } from "./ttsManual";

// === DOM Elements ===
const apiKeyInput = document.getElementById('api-key-input') as HTMLInputElement | null;
const saveApiKeyBtn = document.getElementById('save-api-key-btn') as HTMLButtonElement | null;
const apiKeyStatus = document.getElementById('api-key-status') as HTMLSpanElement | null;
const scriptInput = document.getElementById('script-input') as HTMLTextAreaElement | null;
const speakerListDiv = document.getElementById('speaker-list') as HTMLDivElement | null;
const addSpeakerBtn = document.getElementById('add-speaker-btn') as HTMLButtonElement | null;
const generateSpeechBtn = document.getElementById('generate-speech-btn') as HTMLButtonElement | null;
const loadingIndicator = document.getElementById('loading-indicator') as HTMLDivElement | null;
const audioOutputContainer = document.getElementById('audio-output-container') as HTMLDivElement | null;
const ttsErrorMessageDiv = document.getElementById('error-message') as HTMLDivElement | null;
const modelSelector = document.getElementById('model-selector') as HTMLSelectElement | null;
const chatHistoryContainer = document.getElementById('chat-history-container') as HTMLDivElement | null;
const chatInput = document.getElementById('chat-input') as HTMLTextAreaElement | null;
const sendChatMessageBtn = document.getElementById('send-chat-message-btn') as HTMLButtonElement | null;
const chatLoadingIndicator = document.getElementById('chat-loading-indicator') as HTMLDivElement | null;
const chatErrorMessageDiv = document.getElementById('chat-error-message') as HTMLDivElement | null;
const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement | null;

// === State ===
let API_KEY = localStorage.getItem('GEMINI_API_KEY') || '';
let ai: GoogleGenAI;
let geminiChat: Chat | null = null;

interface Speaker {
    id: string;
    name: string;
    voice: string;
}

const availableVoices = [
    { name: "Zephyr", gender: "F" }, { name: "Kore", gender: "F" },
    { name: "Aoede", gender: "F" }, { name: "Leda", gender: "F" },
    { name: "Puck", gender: "M" }, { name: "Charon", gender: "M" },
    { name: "Fenrir", gender: "M" }, { name: "Orus", gender: "M" },
];

let speakers: Speaker[] = [
    { id: `speaker-${Date.now()}`, name: "Locutor 1", voice: "Zephyr" }
];

// === API Key Management ===
function initializeAiClient() {
    if (API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
        initializeChat();
    }
}

if (apiKeyInput && API_KEY) {
    apiKeyInput.value = API_KEY;
}

if (saveApiKeyBtn && apiKeyInput) {
    saveApiKeyBtn.onclick = () => {
        const newKey = apiKeyInput.value.trim();
        if (newKey) {
            API_KEY = newKey;
            localStorage.setItem('GEMINI_API_KEY', newKey);
            if (apiKeyStatus) {
                apiKeyStatus.textContent = '✓ Salva!';
                apiKeyStatus.style.color = 'var(--success)';
                setTimeout(() => { apiKeyStatus.textContent = ''; }, 2000);
            }
            initializeAiClient();
            if (ttsErrorMessageDiv) ttsErrorMessageDiv.style.display = 'none';
        }
    };
}

initializeAiClient();

// === Theme Toggle ===
if (themeToggleBtn) {
    themeToggleBtn.onclick = () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    };
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
}

// === Voice Presets ===
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const voice = (btn as HTMLElement).dataset.voice;
        if (voice && speakers.length > 0) {
            speakers[0].voice = voice;
            renderSpeakers();
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });
});

// === Speaker Management ===
function renderSpeakers() {
    if (!speakerListDiv) return;
    speakerListDiv.innerHTML = '';

    speakers.forEach((speaker, index) => {
        const entry = document.createElement('div');
        entry.className = 'speaker-entry';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = speaker.name;
        nameInput.placeholder = 'Nome';
        nameInput.onchange = (e) => { speaker.name = (e.target as HTMLInputElement).value; };

        const voiceSelect = document.createElement('select');
        availableVoices.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.name;
            opt.textContent = `${v.name} (${v.gender})`;
            if (v.name === speaker.voice) opt.selected = true;
            voiceSelect.appendChild(opt);
        });
        voiceSelect.onchange = (e) => { speaker.voice = (e.target as HTMLSelectElement).value; };

        entry.appendChild(nameInput);
        entry.appendChild(voiceSelect);

        if (speakers.length > 1) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-danger';
            removeBtn.innerHTML = '✕';
            removeBtn.onclick = () => {
                speakers = speakers.filter(s => s.id !== speaker.id);
                renderSpeakers();
            };
            entry.appendChild(removeBtn);
        }

        speakerListDiv.appendChild(entry);
    });
}

if (addSpeakerBtn) {
    addSpeakerBtn.onclick = () => {
        if (speakers.length < 2) {
            speakers.push({
                id: `speaker-${Date.now()}`,
                name: `Locutor ${speakers.length + 1}`,
                voice: availableVoices[speakers.length % availableVoices.length].name
            });
            renderSpeakers();
        }
    };
}

renderSpeakers();

// === TTS Generation ===
async function handleGenerateSpeech() {
    if (!API_KEY) {
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Insira sua chave API primeiro.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }

    if (!scriptInput?.value.trim()) {
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = "Digite um texto para gerar fala.";
            ttsErrorMessageDiv.style.display = 'block';
        }
        return;
    }

    if (loadingIndicator) loadingIndicator.style.display = 'flex';
    if (generateSpeechBtn) generateSpeechBtn.disabled = true;
    if (ttsErrorMessageDiv) ttsErrorMessageDiv.style.display = 'none';

    const model = modelSelector?.value || 'gemini-2.5-flash-preview-tts';
    const text = scriptInput.value;

    let config: any = {
        responseModalities: [Modality.AUDIO],
        speechConfig: speakers.length === 1
            ? { voiceConfig: { prebuiltVoiceConfig: { voiceName: speakers[0].voice } } }
            : {
                multiSpeakerVoiceConfig: {
                    speakerVoiceConfigs: speakers.map(s => ({
                        speaker: s.name,
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: s.voice } }
                    }))
                }
            }
    };

    try {
        const stream = await ai.models.generateContentStream({
            model,
            contents: [{ role: "user", parts: [{ text }] }],
            config
        });

        let audioData = "";
        let mimeType = "audio/wav";

        for await (const chunk of stream) {
            const part = chunk.candidates?.[0]?.content?.parts?.[0];
            if (part && 'inlineData' in part && part.inlineData?.data) {
                audioData += part.inlineData.data;
                if (part.inlineData.mimeType) mimeType = part.inlineData.mimeType;
            }
        }

        if (audioData) {
            const bytes = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
            const blob = new Blob([bytes.buffer as ArrayBuffer], { type: mimeType });
            const url = URL.createObjectURL(blob);

            const entry = document.createElement('div');
            entry.className = 'audio-entry';
            entry.innerHTML = `
                <h4>🎵 ${new Date().toLocaleTimeString()}</h4>
                <audio controls src="${url}"></audio>
                <a href="${url}" download="audio_${Date.now()}.wav" class="btn btn-secondary btn-download">⬇ Download</a>
            `;
            audioOutputContainer?.insertBefore(entry, audioOutputContainer.firstChild);
        }

    } catch (error: any) {
        if (ttsErrorMessageDiv) {
            ttsErrorMessageDiv.textContent = error.message || "Erro ao gerar áudio.";
            ttsErrorMessageDiv.style.display = 'block';
        }
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        if (generateSpeechBtn) generateSpeechBtn.disabled = false;
    }
}

if (generateSpeechBtn) {
    generateSpeechBtn.onclick = handleGenerateSpeech;
}

// === Chat ===
function initializeChat() {
    if (!API_KEY) return;
    try {
        geminiChat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: `Você é um assistente especializado em TTS expressivo. Use este manual:\n${ttsManual}`
            }
        });
    } catch (e) {
        console.error("Chat init error:", e);
    }
}

async function handleSendChat() {
    if (!chatInput?.value.trim() || !geminiChat) return;

    const message = chatInput.value.trim();
    chatInput.value = '';

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user-message';
    userDiv.textContent = message;
    chatHistoryContainer?.appendChild(userDiv);

    if (chatLoadingIndicator) chatLoadingIndicator.style.display = 'flex';
    if (sendChatMessageBtn) sendChatMessageBtn.disabled = true;

    try {
        const stream = await geminiChat.sendMessageStream({ message });

        const modelDiv = document.createElement('div');
        modelDiv.className = 'chat-message model-message';
        chatHistoryContainer?.appendChild(modelDiv);

        let fullText = '';
        for await (const chunk of stream) {
            fullText += chunk.text || '';
            modelDiv.innerHTML = marked.parse(fullText) as string;
        }

        // Add copy buttons to code blocks
        modelDiv.querySelectorAll('pre').forEach(pre => {
            const btn = document.createElement('button');
            btn.className = 'copy-code-button';
            btn.textContent = 'Copiar';
            btn.onclick = () => {
                navigator.clipboard.writeText(pre.textContent || '');
                btn.textContent = '✓';
                setTimeout(() => btn.textContent = 'Copiar', 1500);
            };
            pre.appendChild(btn);
        });

        chatHistoryContainer?.scrollTo(0, chatHistoryContainer.scrollHeight);

    } catch (error: any) {
        if (chatErrorMessageDiv) {
            chatErrorMessageDiv.textContent = error.message || "Erro no chat.";
            chatErrorMessageDiv.style.display = 'block';
        }
    } finally {
        if (chatLoadingIndicator) chatLoadingIndicator.style.display = 'none';
        if (sendChatMessageBtn) sendChatMessageBtn.disabled = false;
    }
}

if (sendChatMessageBtn) {
    sendChatMessageBtn.onclick = handleSendChat;
}

if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendChat();
        }
    });
}
