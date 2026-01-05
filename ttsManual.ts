
export const ttsManual = `
# 📚 MANUAL COMPLETO DE PROMPTS PARA TTS EXPRESSIVO
## Sistema de Texto-para-Fala com Emocionalidade e Nuances Vocais

---

## 📋 ÍNDICE

1. [Princípios Fundamentais](#princípios-fundamentais)
2. [Caracteres de Voz & Tom](#caracteres-de-voz--tom)
3. [Marcadores de Efeitos Sonoros](#marcadores-de-efeitos-sonoros)
4. [Instruções de Ritmo & Velocidade](#instruções-de-ritmo--velocidade)
5. [Expressão Emocional](#expressão-emocional)
6. [Estilos de Performance](#estilos-de-performance)
7. [Técnicas de Entonação](#técnicas-de-entonação)
8. [Pausas & Respiração](#pausas--respiração)
9. [Efeitos ASMR & Ambientes](#efeitos-asmr--ambientes)
10. [Construção de Diálogos Multi-Falantes](#construção-de-diálogos-multi-falantes)
11. [Conversão de Formatos (.srt → TTS)](#conversão-de-formatos-srt--tts)
12. [Exemplos Práticos Completos](#exemplos-práticos-completos)
13. [Tabelas de Referência Rápida](#tabelas-de-referência-rápida)
14. [Troubleshooting & Otimização](#troubleshooting--otimização)

---

## 🎯 PRINCÍPIOS FUNDAMENTAIS

### Regra de Ouro #1: Context is Everything (O Contexto é Tudo)
Cada frase, pausa e efeito deve servir ao contexto narrativo. Não adicione elementos aleatoriamente.

### Regra de Ouro #2: Naturalidade Primeiro
A performance deve soar como fala humana genuína, não como robô interpretando instruções. Use marcadores como **guias**, não como comandos mecânicos.

### Regra de Ouro #3: Hierarquia de Importância
1. **Emoção & Intenção** (o que a personagem sente)
2. **Tom & Estilo** (como a voz deve soar)
3. **Ritmo & Pacing** (velocidade de entrega)
4. **Efeitos Sonoros** (elementos de suporte)

### Regra de Ouro #4: Ignore Parâmetros Técnicos
Não use pitch numbers, temperature, model configs, etc. Deixe isso para o modelo TTS. Você descreve em linguagem natural.

---

## 🎤 CARACTERES DE VOZ & TOM

### Dimensões Básicas da Voz

#### 1. **REGISTRO DE VOZ** (Alto, Médio, Baixo)

| Tom | Características | Uso Ideal | Exemplo |
|-----|-----------------|-----------|---------|
| **Voz Aguda** | Infantil, leve, alegre, inocente | Crianças, animais pequenos, personagens neuróticos | "Mamãe! Olha só!" |
| **Voz Média** | Neutra, profissional, acessível | Narração padrão, personagens adultos normais | "Bom dia, como posso ajudar?" |
| **Voz Grave** | Profunda, séria, autoritária | Vilões, narração épica, figuras de autoridade | "Você cometeu um grande erro..." |

#### 2. **QUALIDADE DE VOZ** (Texture)

| Qualidade | Descrição | Efeito Emocional | Exemplo |
|-----------|-----------|-----------------|---------|
| **Brilhante** | Clara, vibrante, ressonante | Entusiasmo, confiança, vitalidade | "Que dia MARAVILHOSO!" |
| **Rouca** | Áspera, com atrito, cansada | Fadiga, doença, envelhecimento | "Estou... tão... cansado..." |
| **Sussurrada** | Baixa, aérea, próxima do ouvido | Intimidade, segredo, sensualidade | "Psst... vem cá..." |
| **Nasal** | Ressonância nasal pronunciada | Sarcasmo, desdém, irritação | "Óbvio que não vai funcionar..." |
| **Metálica** | Dura, sem calor, artificial | Frieza, robótica, desapego | "Tarefa concluída. Eficiência: 100%." |
| **Morna** | Plana, sem vida, monótona | Depressão, tédio, derrota | "Tanto faz... não importa mesmo." |

#### 3. **VELOCIDADE DE FALA** (Base)

| Velocidade | BPM Aproximado | Contexto | Exemplo |
|------------|---|----------|---------|
| **Muito Lenta** | 80-100 | Dramática, emocionada, cansada | "Eu... não... posso... acreditar..." |
| **Lenta** | 100-120 | Ponderativa, carinhosa, pensativa | "Deixa eu pensar um pouco sobre isso..." |
| **Normal** | 120-150 | Fala cotidiana, conversas ordinárias | "Oi, tudo bem? Como foi seu dia?" |
| **Rápida** | 150-180 | Entusiasmada, nervosa, ansiosa | "MeuDeusmeudeusmeudeusistofuncionou?!" |
| **Muito Rápida** | 180+ | Pânico, excitação extrema, raiva | "Vocêfez O QUE?! Como ousa?!" |

---

## 🔊 MARCADORES DE EFEITOS SONOROS

### Efeitos Respiratórios

\`\`\`
(SUSPIRO) - Suspiro neutro, natural
(SUSPIRO_PROFUNDO) - Inhalação longa e profunda
(SUSPIRO_AFETIVO) - Suspiro carinhoso, apaixonado
(SUSPIRO_ALIVIADO) - Suspiro de alívio
(SUSPIRO_TRISTE) - Suspiro resignado, melancólico
(SUSPIRO_CANSADO) - Suspiro de fadiga extrema
(INALAÇÃO_RÁPIDA) - Inspiração súbita, choque
(EXALAÇÃO_LONGA) - Expiração prolongada e teatral
(RESPIRAÇÃO_PESADA) - Ofegante, após esforço
(RESPIRAÇÃO_OFEGANTE) - Após corrida, excitação
(ASMA_LEVE) - Respiração com dificuldade sutil
\`\`\`

### Efeitos Vocais Não-Verbais

\`\`\`
(TOSSE) - Tosse simples
(TOSSE_LEVE) - Tosse discreta
(TOSSE_PROFUNDA) - Tosse do peito
(PIGARRO) - Pigarro na garganta
(GARGALHADA_ALTA) - Risada completa, reverberante
(GARGALHADA_HISTÉRICA) - Risada incontrolável
(RISADA_LEVE) - Riso discreto e natural
(RISADA_NERVOSA) - Riso ansioso, forçado
(RISADA_MALANDRA) - Riso astuto, conspiratorial
(RISADA_INFANTIL) - Riso agudo e alegre
(RISADA_AMARGADA) - Riso cínico, sem humor
(RISADA_SUAVE) - Riso silencioso, contido
(GEMIDO) - Som de desconforto genérico
(GEMIDO_DOR) - Som de agonia
(GEMIDO_PRAZER) - Som de satisfação
(GEMIDO_EXASPERAÇÃO) - Expressão de frustração
(MURMÚRIO) - Vocalização indistinta
(RESMUNGO) - Som de desaprovação baixo
(GRUNHIDO) - Som gutural de força
(UIVA) - Som de frustração ou vitória
(ASSOBIO) - Assobio melódico
(PALMAS) - Aplausos (mesmo que gerado vocalmente)
\`\`\`

### Efeitos Orais & Faciais

\`\`\`
(BEIJO_AR) - Som de beijo no ar
(BEIJO_MOLHADO) - Som de beijo com saliva
(BEIJOS_MÚLTIPLOS) - Vários beijos rápidos
(RONRONO) - Som de gato ronronando (vocal)
(MIAU) - Miau simples
(MIAU_LONGO) - Miau prolongado e melódico
(MIAU_INQUISIDOR) - Miau como pergunta
(LATIDO) - Latido vocal
(LATIDO_AGUDO) - Latido em tom alto
(LATIDO_GRAVE) - Latido profundo
(BERRO_CACHORRO) - Uivo de cachorro
(ROSNA) - Resmungo de cão
(ASSOPRO) - Som de vento/ar com os lábios
(CLIQUE_LÍNGUA) - Som de língua no céu da boca
(ESTALO_DEDO) - Snap de dedo (pode ser vocal)
(ESTALO_LÍNGUA) - Estalo com língua no palato
(MORDER) - Som de mordida (sutil)
(GARGANHADA) - Riso histérico extremo
(BALBUCIO) - Som de bebê
(MAMADA) - Som de sucção (para context apropriado)
(ENGASGAMENTO) - Engasgo, sufocamento
(GARGAREJO) - Gargarejo na boca
\`\`\`

### Efeitos de Objetos & Movimento

\`\`\`
(PASSO) - Passo normal
(PASSOS_SUAVES) - Passos silenciosos
(PASSOS_ACELERADOS) - Corrida
(PASSOS_PESADOS) - Passos com peso
(ARRASTAR) - Som de arrastar pés
(SALTO) - Som de salto/pulo
(QUEDA) - Som de queda
(CHOQUE) - Impacto, colisão
(PORTA_ABRINDO) - Som de porta
(PORTA_FECHANDO) - Porta se fechando
(PORTA_BATENDO) - Porta batendo forte
(JANELA_ABRINDO) - Janela se abrindo
(GAVETA_ABRINDO) - Gaveta deslizando
(GAVETA_FECHANDO) - Gaveta se fechando
(BOLSA_ABRINDO) - Bolsa/mochila abrindo
(SACOLA_BALANÇANDO) - Som de sacola de plástico
(SACO_MEXENDO) - Saco movendo dentro
(PAPEL_AMASSANDO) - Papel amassado
(PAPEL_RASGANDO) - Papel sendo rasgado
(CAIXA_ABRINDO) - Caixa sendo aberta
(TAMPA_ABRINDO) - Tampa removida
(CLIQUE) - Som mecânico simples
(BUZINA) - Som de buzina
(TOQUE_CELULAR) - Notificação de telefone
(TELEFONE_TOCANDO) - Telefone antigo tocando
(BATIDA_PORTA) - Batida na porta
(BATIDA_JANELA) - Batida na janela
(BATER_PALMAS) - Som de palmas
(SOCAR) - Som de soco (contato)
(BOFETADA) - Som de tapa no rosto
\`\`\`

### Efeitos Especiais & Emotivos

\`\`\`
(PAUSA) - Silêncio momentâneo (indefinido)
(PAUSA_1S) - Pausa de 1 segundo
(PAUSA_2S) - Pausa de 2 segundos
(PAUSA_3S) - Pausa de 3 segundos
(PAUSA_DRAMÁTICA) - Pausa para efeito dramático
(PAUSA_PENSATIVA) - Pausa enquanto pensa
(PAUSA_HESITANTE) - Pausa de hesitação
(ELIPSE) - Voz desaparecendo gradualmente
(ECO) - Som com eco/reverberação
(TELEFONE_DISTANTE) - Som como se fosse de telefone antigo
(VOZ_DISTANTE) - Como se falasse de longe
(VOZ_PRÓXIMA) - Sussurro muito próximo do ouvido
(VOZ_DENTRO_CABEÇA) - Pensamento interno, reflexão
(VOZ_ALTERADA) - Voz muda/modificada (pode ser digital)
(TRÊMULO) - Voz tremendo de emoção
(VOZ_EMBARGADA) - Voz com choro contido
(VOZ_QUEBRANDO) - Voz falhando, quebrando
(VOZ_ROUCA_CHORO) - Rouca de tanto chorar
(RISO_MANÍACO) - Risada descontrolada, psicótica
(RISO_CHOROSO) - Riso misturado com choro
(SOLUÇO) - Som de soluço
(CHORO) - Choro sem palavras
(CHORO_SILENCIOSO) - Choro silencioso
(PRANTO) - Choro profundo, convulsão
\`\`\`

---

## ⏱️ INSTRUÇÕES DE RITMO & VELOCIDADE

### Técnicas de Pacing

#### **Fala Espaçada (Spaced Speech)**
\`\`\`
"Eu... (pausa) ...não... (pausa) ...acredito... (pausa) ...no que vejo."
\`\`\`
Uso: Emoção forte, choque, realização lenta
Efeito: Peso emocional aumentado, cada palavra ganha importância

#### **Fala Contínua com Pontuação (Continuous with Emphasis)**
\`\`\`
"Escuta aqui: você vai fazer EXATAMENTE o que eu disse ou vai se arrepender!"
\`\`\`
Uso: Autoridade, raiva, urgência
Efeito: Ritmo mantido mas com ênfase em palavras-chave

#### **Fala Acelerada Progressiva (Accelerating)**
\`\`\`
"Eu acho que... na verdade acho que... ACHO QUE VOCÊ PODERIA ESTAR CERTO!"
\`\`\`
Uso: Realização gradual, ansiedade crescente
Efeito: Tensão narrativa aumenta conforme fala progride

#### **Fala Desacelerativa (Decelerating)**
\`\`\`
"Tudo bem, tudo bem, t-u-d-o b-e-m..."
\`\`\`
Uso: Resignação, derrota, cansaço
Efeito: Perda de energia conforme progride

#### **Staccato (Palavras Curtas & Rupturas)**
\`\`\`
"Não. Não, não, não. NUNCA."
\`\`\`
Uso: Rejeição, decisão firme, nervosismo
Efeito: Cada palavra é um ponto de ruptura

#### **Legato (Fluxo Contínuo)**
\`\`\`
"Eu sempre soube que você era especial, sempre acreditei em você desde o primeiro momento..."
\`\`\`
Uso: Ternura, persuasão, romance
Efeito: Suavidade, continuidade emocional

### Modificadores de Ritmo (Prefixos)

\`\`\`
[LENTAMENTE] - Reduza velocidade para 60% do normal
[MUITO_LENTAMENTE] - Reduza para 40% do normal
[MODERADAMENTE_LENTO] - Reduza para 80% do normal
[NORMAL] - Velocidade padrão (100%)
[RÁPIDO] - Aumente para 130% do normal
[MUITO_RÁPIDO] - Aumente para 160% do normal
[ACELERAÇÃO] - Gradualmente mais rápido
[DESACELERAÇÃO] - Gradualmente mais lento
[PAUSANDO_ENTRE_PALAVRAS] - Pausa notável entre cada palavra
[ARRASTANDO_SÍLABAS] - Prolongue cada sílaba
[PICOTADO] - Voz cortada em pequenos fragmentos
[RESPIRANDO_ENTRE] - Respire entre phrases principais
\`\`\`

---

## 😊 EXPRESSÃO EMOCIONAL

### Estados Emocionais Primários

#### 1. **ALEGRIA**
- **Sinais Vocais**: Voz mais alta e brilhante, frequência aumentada
- **Respiração**: Mais leve, às vezes risadas intercaladas
- **Ritmo**: Ligeiramente mais rápido, bounce natural
- **Exemplos Marcadores**: 
  \`\`\`
  [ALEGRIA_CONTAGIANTE] Que dia MARAVILHOSO!
  [FELICIDADE_GENUÍNA] Você conseguiu! (RISADA_INFANTIL)
  [ENTUSIASMO] ISSO É INCRÍVEL!!!
  \`\`\`

#### 2. **TRISTEZA**
- **Sinais Vocais**: Voz mais baixa, registro mais grave, menos projeção
- **Respiração**: Suspiros frequentes, respiração pesada
- **Ritmo**: Mais lento, com pausas longas
- **Exemplos Marcadores**:
  \`\`\`
  [MELANCOLIA] (SUSPIRO_TRISTE) Ele já era... 
  [TRISTEZA_PROFUNDA] Nunca mais vou vê-lo... (VOZ_EMBARGADA)
  [LAMENTO] Pourquoi... por quê... (CHORO)
  \`\`\`

#### 3. **RAIVA / IRA**
- **Sinais Vocais**: Voz tensa, articulação afiada, tom baixo e ameaçador
- **Respiração**: Irregular, ofegante, às vezes tensa
- **Ritmo**: Pode ser rápido e cortante ou lento e ameaçador
- **Exemplos Marcadores**:
  \`\`\`
  [RAIVA_CONTIDA] Como. OUSAS. desrespeitá-me?!
  [IRA_EXPLOSIVA] VOCÊ ESTÁ BRINCANDO COMIGO?!
  [FÚRIA_CALMADA] Você vai se ARREPENDER disso... (tom ameaçador)
  \`\`\`

#### 4. **MEDO / PÂNICO**
- **Sinais Vocais**: Voz mais alta e tensa, tremendo, respiração irregular
- **Respiração**: Rápida, ofegante, às vezes falha
- **Ritmo**: Acelerado, entrecortado, irregular
- **Exemplos Marcadores**:
  \`\`\`
  [MEDO_INTENSO] (INALAÇÃO_RÁPIDA) Ele está vindo! Ele vem!
  [PÂNICO] Não, não, não, PRECISO SAIR DAQUI!
  [TERROR] (VOZ_TREMENDO) O que... o que foi aquilo?!
  \`\`\`

#### 5. **SURPRESA / CHOQUE**
- **Sinais Vocais**: Entonação salta para registro agudo, explosiva
- **Respiração**: Inspiração rápida, às vezes engasgo
- **Ritmo**: Abrupto, depois recai em shock
- **Exemplos Marcadores**:
  \`\`\`
  [SURPRESA] QUOI?! Você está AQUI?!
  [CHOQUE_TOTAL] (INALAÇÃO_RÁPIDA) Não... não é possível...
  [CHOQUE_AGRADÁVEL] Meu Deus! Você trouxe um cachorro?!
  \`\`\`

#### 6. **NOJO / REPULSA**
- **Sinais Vocais**: Voz nasal, léxica, com sons de engasgo
- **Respiração**: Ofegante, às vezes com pigarro
- **Ritmo**: Entrecortado, com pausas de aversão
- **Exemplos Marcadores**:
  \`\`\`
  [NOJO_FÍSICO] (ENGASGAMENTO) Que coisa REPUGNANTE!
  [REPULSA_MORAL] (PIGARRO) Como você pôde fazer isso?
  [ASCO] Eew! (GARGANHADA_SUPERFICIAL) Não quero ver!
  \`\`\`

#### 7. **CONFIANÇA / AUTORIDADE**
- **Sinais Vocais**: Voz firme, projetada, clara articulação
- **Respiração**: Controlada, pausas estratégicas
- **Ritmo**: Medido, com ênfase em palavras-chave
- **Exemplos Marcadores**:
  \`\`\`
  [CONFIANÇA_ABSOLUTA] Deixa comigo. Eu posso fazer isso.
  [TOM_AUTORITÁRIO] Você vai fazer EXATAMENTE o que digo.
  [LIDERANÇA] Estou aqui. Tudo vai ficar bem.
  \`\`\`

#### 8. **INSEGURANÇA / DÚVIDA**
- **Sinais Vocais**: Voz mais fraca, hesitante, com "uhms" e "ahs"
- **Respiração**: Ansioso, às vezes tremendo
- **Ritmo**: Lento, com muitas pausas de hesitação
- **Exemplos Marcadores**:
  \`\`\`
  [INSEGURO] Eu... acho que... talvez eu... não sei...
  [DÚVIDA] Será que... quer dizer... isso vai dar certo?
  [HESITANTE] (PAUSA_HESITANTE) Você tem certeza? Eu não tenho...
  \`\`\`

#### 9. **AMOR / TERNURA**
- **Sinais Vocais**: Voz morna, suave, próxima, frequência mais baixa
- **Respiração**: Lenta, profunda, às vezes com pequenos suspiros
- **Ritmo**: Legato, fluxo contínuo, sem pressa
- **Exemplos Marcadores**:
  \`\`\`
  [AMOR_PROFUNDO] (SUSPIRO_AFETIVO) Você é tudo para mim...
  [TERNURA] Meu amor, tudo vai ficar bem. (BEIJO_AR)
  [CARINHO] (VOZ_PRÓXIMA) Você é tão especial... tão perfeito.
  \`\`\`

#### 10. **SARCASMO / IRONIA**
- **Sinais Vocais**: Voz com undercut, entonação plana com picos de ironia
- **Respiração**: Controlada com pequenos suspiros de exasperação
- **Ritmo**: Medido mas com ênfase sarcástica
- **Exemplos Marcadores**:
  \`\`\`
  [SARCASMO_PESADO] Oh sim, CLARO, porque isso sempre dá certo.
  [IRONIA] (TOM_NASAL) Que ideia BRILHANTE! Vamos fazer exatamente isso!
  [DESDÉM] (RESPIRAÇÃO_LEVE) Como se eu fosse cair nessa...
  \`\`\`

---

## 🎭 ESTILOS DE PERFORMANCE

### Arcétipos de Personagens

#### **1. CRIANÇA (3-8 anos)**
- Voz aguda, clara, vibrante
- Excited, curious, sometimes whiny
- Lots of rising inflections (everything sounds like questions)
- Frequent pauses, giggles, hiccups
- Grammar sometimes imperfect
\`\`\`
[VOZ_INFANTIL] Ooohhh! Mamãe, olha! Olha! (RISADA_INFANTIL) 
(PAUSA_PENSATIVA) Mas... por que? Por quê? Por quêeee?
\`\`\`

#### **2. ADOLESCENTE (13-18)**
- Voz em transição, às vezes quebrando
- Atitude, dramático, às vezes sarcástico
- Rápido, expressivo, às vezes entediado
- Usa muito tom de pergunta mesmo em afirmações
\`\`\`
[ADOLESCENTE_DRAMÁTICO] Tipo, ninguém me entende, entende? (TOM_DRAMÁTICO)
Como se EU fosse a culpada por ISSO! Pff. (RESPIRAÇÃO_EXASPERADA)
\`\`\`

#### **3. ADULTO JOVEM (18-30)**
- Voz normalizando, confiante mas ainda em formação
- Energia, entusiasmo, romance possível
- Rápido quando entusiasmado, mais medido em momentos sérios
\`\`\`
[ADULTO_CONFIANTE] Eu posso fazer isso. Eu vou fazer isso.
(PAUSA_DETERMINADA) E ninguém vai me parar.
\`\`\`

#### **4. ADULTO MADURO (30-60)**
- Voz controlada, experiência, às vezes cansada
- Mais pausas, mais reflexão
- Tom de aviso, sabedoria, amargura possível
\`\`\`
[ADULTO_EXPERIENTE] Escuta aqui... eu já passei por isso antes.
(PAUSA_SIGNIFICATIVA) Deixa de ser tolo. Ouve a minha voz.
\`\`\`

#### **5. IDOSO (60+)**
- Voz rouca, mais fraca, às vezes trêmula
- Lento, pausas longas para respiração
- Nostálgia, sabedoria, fraqueza física
\`\`\`
[VOZ_IDOSA] (RESPIRAÇÃO_PESADA) Ah, filhinho... 
(PAUSA_3S) Quando eu tinha sua idade... (PAUSA_2S) ...as coisas eram diferentes.
\`\`\`

#### **6. PERSONAGEM VILÃO / ANTAGONISTA**
- Voz grave, fria, às vezes burlona
- Articulação precisa, pausas calculadas
- Ameaça contida ou explosão
\`\`\`
[VILÃO_FRIO] Você realmente acredita que pode vencer?
(RISADA_AMARGADA) Como é... encantador.
\`\`\`

#### **7. NARRADOR ÉPICO / DOCUMENTÁRIO**
- Voz profunda, projetada, dramática
- Ritmo majestoso, pausas teatrais
- Entonação rising-falling em phrases chave
\`\`\`
[NARRADOR_ÉPICO] E assim... começou a maior jornada da humanidade...
(PAUSA_DRAMÁTICA) Um que mudaria tudo... para sempre.
\`\`\`

#### **8. APRESENTADOR / LOCUTOR**
- Voz clara, articulação perfeita, energia
- Ritmo mantido, profissional mas amigável
- Confiança absoluta
\`\`\`
[LOCUTOR_RADIOFÔNICO] Olá a todos! Bem-vindo ao programa de hoje!
Eu sou seu apresentador, e HOJE temos surpresas INCRÍVEIS para você!
\`\`\`

#### **9. SUSSURRADOR / CONSPIRADOR**
- Voz muito baixa, próxima, aérea
- Lento, íntimo, às vezes com peso
- Segredo, confiança, sensualidade possível
\`\`\`
[TOM_CONSPIRATÓRIO] (VOZ_PRÓXIMA) Psst... escuta aqui...
(PAUSA_SUSPEITA) Ninguém pode saber que eu disse isso...
\`\`\`

#### **10. PERSONAGEM ASSUSTADO / FRACO**
- Voz mais alta, tremendo, fraca
- Respiração irregular, ofegante
- Muito hesitante, muitas pausas
\`\`\`
[VOZ_ASSUSTADA] Eu... eu não sei se... se consigo fazer isso...
(RESPIRAÇÃO_NERVOSA) Ele está vindo? Ele vem? (INALAÇÃO_RÁPIDA)
\`\`\`

#### **11. PERSONAGEM SENSUAL / SEDUTOR**
- Voz grave mas não agressiva, carregada de intenção
- Lento, cada palavra é uma carícia vocal
- Respiração próxima, pausas significativas
\`\`\`
[SENSUALIDADE_PURA] (VOZ_PRÓXIMA) Você sabe... (PAUSA_SIGNIFICATIVA)
...que é realmente difícil resistir a você?
\`\`\`

#### **12. PERSONAGEM MECÂNICO / ROBÔ**
- Voz ligeiramente artificial, sem variação emocional
- Pausas estranhas, ritmo não-natural
- Dicção perfeita mas fria
\`\`\`
[VOZ_ROBÓTICA] Tarefa. Recebida. Eficiência: 100%. 
Iniciando. Protocolo. Padrão. Agora.
\`\`\`

---

## 🎵 TÉCNICAS DE ENTONAÇÃO

### Curvas Melódicas

#### **Rising Intonation (Entonação Ascendente)**
Frases que terminam mais agudas - soam como perguntas ou incerteza.
\`\`\`
"Você vai vir comigo?" (levanta no "comigo")
"Ele realmente disse isso?" (levanta no "isso")
\`\`\`
Uso: Dúvida, expectativa, perguntas genuínas

#### **Falling Intonation (Entonação Descendente)**
Frases que terminam mais graves - som de finalidade, afirmação.
\`\`\`
"Eu vou fazer isso." (cai no "isso")
"Ele não volta." (cai no "volta")
\`\`\`
Uso: Afirmação, decisão, certeza

#### **Rise-Fall Intonation (Entonação Sobe-Desce)**
Pico no meio, depois cai - som dramático, ênfase.
\`\`\`
"Você é UM GÊ-NIO!" (sobe em GÊNIO, cai em NIO)
"Ele foi O MELHOR." (sobe em MELHOR, cai depois)
\`\`\`
Uso: Emoção, Drama, Contradição

#### **Plateau Intonation (Entonação Plana)**
Sem mudança de altura - robótica, monótona ou deliberada.
\`\`\`
"Não. Não vou. Fim de conversa." (cada frase em mesma altura)
\`\`\`
Uso: Frieza, autoridade, máquinas

#### **Wave Intonation (Entonação Ondulante)**
Sobe-desce-sobe-desce em sequência - lyrical, musical, playful.
\`\`\`
"Oh, meu amorzinho, que bebê tão lindo!" 
(ondula entre agudo e grave, suave)
\`\`\`
Uso: Lirismo, canção, personagens leves

### Técnicas de Ênfase

#### **Stress Timing (Ênfase por Timing)**
\`\`\`
Normal: "Você vai fazer ISSO"
Com pausa: "Você vai fazer... ISSO" (pausa antes da palavra-chave)
Diferente: "Você... vai fazer isso" (ênfase no "você")
\`\`\`

#### **Volume Emphasis (Ênfase por Volume)**
\`\`\`
Sussurrado: "eu-posso-fazer-isso" (muito baixo)
Normal: "Eu POSSO fazer isso"
Gritado: "EU POSSO FAZER ISSO"
\`\`\`

#### **Duration Emphasis (Ênfase por Duração)**
\`\`\`
Rápido: "Façamosissoagora!" (tudo rápido = urgência)
Lento: "Faaaa-ça-mos-isssooo-aaaagoooraaaa..." (tudo longo = drama)
Misto: "Vamos FAZER... isso... agora!" (algumas palavras longas)
\`\`\`

#### **Pitch Emphasis (Ênfase por Tom)**
\`\`\`
Baixo: "Você vai fazer isso." (tom firme, grave)
Alto: "VOCÊ vai fazer isso?" (tom inquisidor, agudo)
Contraste: "Você VAI fazer isso" (sobe em VAI, cai em fazer)
\`\`\`

---

## 💨 PAUSAS & RESPIRAÇÃO

### Tipologia de Pausas

| Tipo | Duração | Símbolo | Contexto |
|------|---------|---------|----------|
| **Micro-pausa** | 0.3s | (p) | Entre palavras, respiração natural |
| **Pausa Curta** | 0.5-1s | (,) ou (PAUSA) | Separador de thought units |
| **Pausa Normal** | 1-2s | (...) ou (PAUSA_1S) | Reflexão, drama |
| **Pausa Longa** | 2-3s | (---) ou (PAUSA_3S) | Momento emotivo, rébus |
| **Pausa Dramática** | 3-5s | (PAUSA_DRAMÁTICA) | Crescendo, expectativa |
| **Elipse** | Indeterminado | (ELIPSE) | Fade out, pensamento incompleto |

### Exemplos de Pausas no Contexto

\`\`\`
❌ ERRADO (Sem pausa):
"Eu amo você mais do que qualquer coisa no mundo e sempre vou te amar."

✅ CORRETO (Com pausa emotiva):
"Eu amo você... (PAUSA_2S) mais do que qualquer coisa no mundo.
(PAUSA_DRAMÁTICA) E sempre... sempre vou te amar."

---

❌ ERRADO (Pausa inútil):
"Oi. Como você está?"

✅ CORRETO (Sem pausa ou pausa mínima):
"Oi, como você está?" ou "Oi... (PAUSA) ...como você está?"
(a pausa só se justifica se há hesitação, frieza, etc)
\`\`\`

### Respiração Estratégica

\`\`\`
❌ ERRADO (Sem respiração marcada):
"Eu corri todo o caminho até aqui porque precisava te avisar sobre o perigo que está chegando..."

✅ CORRETO (Respiração marcada para realismo):
"Eu corri todo o caminho até aqui (RESPIRAÇÃO_OFEGANTE) 
porque precisava te avisar sobre... (RESPIRAÇÃO_PESADA) ...o perigo que está chegando."

---

Exemplo de respiração por seção:
(RESPIRAÇÃO_PESADA) Eu corro... mais rápido...
(INHALAÇÃO_RÁPIDA) Eles estão me alcançando!
(RESPIRAÇÃO_OFEGANTE) Preciso... chegar... lá!
\`\`\`

---

## 🎧 EFEITOS ASMR & AMBIENTES

### ASMR (Autonomous Sensory Meridian Response)

#### **Triggers Auditivos ASMR**

| Trigger | Exemplos | Efeito |
|---------|----------|--------|
| **Whisper** | Sussurro suave, próximo do microfone | Relaxamento, intimidade |
| **Tapping** | Batidas suaves em objetos | Concentração, calma |
| **Scratching** | Raspar unhas em superfícies | Relaxamento profundo |
| **Crinkling** | Papel amassado, sacola plástica | Satisfação ASMR |
| **Liquid Sounds** | Água, bebidas, sons molhados | Relaxamento |
| **Personal Attention** | Murmúrio, respiração proxima | Intimidade |
| **Roleplay** | Personagens calmantes | Imersão |

#### **Construindo ASMR no TTS**

\`\`\`
Exemplo: ASMR Cuidado com Gatinho

[ASMR_SUSSURRO] (RESPIRAÇÃO_SUAVE) Olá, meu gatinho... 
(PAUSA_RONRONO_VOCAL) Você é tão bonito...
(VOZ_PRÓXIMA) Vem cá, deixa eu te dar esse snack...
(SACOLA_BALANÇANDO) (SUSSURRO) Quietinho... relaxa...
(PAUSA_2S) (RONRONO_VOCAL_LONGO) Tá bom... está tudo bem...
\`\`\`

### Efeitos Ambientes

\`\`\`
[AMBIENTE_BIBLIOTECA]
(PASSOS_SUAVES) (SUSSURRO) Psst... aqui é silencioso...
(PAUSA) Você quer... explorar esses livros antigos? (FOLHAS_VIRANDO)

[AMBIENTE_TEMPESTADE]
(TROVÃO_DISTANTE) (CHUVA_PESADA_BACKGROUND)
(VOZ_NERVOSA) Ele está vindo... a tempestade...

[AMBIENTE_FLORESTA]
(PÁSSAROS_CANTANDO) (VENTO_FOLHAS)
(NARRADOR_ÉPICO) E assim, entraram na floresta mágica...

[AMBIENTE_HOSPITAL]
(BIP_MONITOR) (RESPIRAÇÃO_VENTILADOR_FUNDO)
(VOZ_FRACA) Eu... estou aqui... você está aqui?

[AMBIENTE_CAFÉ]
(XÍCARAS_TILINTANDO) (FUNDO_VOZES_INDISTINTAS)
(VOZ_CASUAL) Entonces, o que você quis me contar?
\`\`\`

---

## 🎬 CONSTRUÇÃO DE DIÁLOGOS MULTI-FALANTES

### Estrutura Base

\`\`\`
PERSONAGEM_A (características vocais): "Fala A" (efeito A)
PERSONAGEM_B (características vocais): "Fala B" (efeito B)
\`\`\`

### Exemplo Completo

\`\`\`
MÃE [VOZ_DOCE, CARINHOSA]:
(SUSPIRO_AFETIVO) Olá, meu pequeno...
(PAUSA_RONRONO) Você dormiu bem?

GATINHO [VOZ_AGUDINHA_ANIMAL]:
(MIAU_LONGO_CURIOSO) Meoooowww?

MÃE [VOZ_PLAYFUL]:
(RISADA_LEVE) Tá com fome, é?
Deixa mamãe pegar seu snack favorito...
(SACOLA_BALANÇANDO_ENTUSIASMADO)

GATINHO [VOZ_EXCITADA]:
(MIAU_INQUISIDOR) (MIAU_INQUISIDOR) Meow! MEOW!

MÃE [VOZ_AQUIETADORA, LENTA]:
(VOZ_PRÓXIMA) Shh... shh... (RESPIRAÇÃO_SUAVE)
(PAUSA_2S) Aqui, meu amor... (SACO_PETISCO_ABRINDO)

GATINHO [VOZ_SATISFEITA]:
(RONRONO_LONGO) Prrrrr... prrrrr... mrow...
\`\`\`

### Técnicas de Transição

\`\`\`
❌ ERRADO:
A: "Oi, como vai?"
B: "Bem, e você?"

✅ CORRETO:
A: "Oi, como vai?" (PAUSA_1S)
B: (PAUSA_RESPOSTA) "Bem, e você?" (TOM_INQUISIDOR)

---

Com sobreposição (overlap):
A: "Oi, como—"
B: (interrupção) "Bem, já que você perguntou..."
(Nota: Isso requer timing cuidadoso)
\`\`\`

---

## 📝 CONVERSÃO DE FORMATOS (.srt → TTS)

### De Arquivo SRT para Prompt TTS

#### **Passo 1: Extrair Informações**

\`\`\`
SRT Original:
---
1
00:00:02,240 --> 00:00:06,570
Você é um modelo de texto-para-fala.

2
00:00:06,570 --> 00:00:09,240
(PAUSA) Sua tarefa é transformar o texto.
\`\`\`

#### **Passo 2: Converter Timecodes**

\`\`\`
00:00:02,240 = 2.24 segundos
00:00:06,570 = 6.57 segundos
00:00:09,240 = 9.24 segundos
\`\`\`

#### **Passo 3: Montar Prompt TTS**

\`\`\`
[2.24s] Você é um modelo de texto-para-fala.
[6.57s] (PAUSA) Sua tarefa é transformar o texto.
[9.24s] (PAUSA_2S) Extraia todas as orientações do texto.
\`\`\`

#### **Passo 4: Adicionar Metadados Vocais**

\`\`\`
[2.24s] [VOZ_CLARA_PROFISSIONAL] Você é um modelo de texto-para-fala.
[6.57s] (PAUSA) [TOM_EDUCATIVO] Sua tarefa é transformar o texto.
[9.24s] (PAUSA_2S) [RITMO_MODERADO] Extraia todas as orientações do texto.
\`\`\`

### Exemplo Completo de Conversão

**SRT Original:**
\`\`\`
1
00:00:00,000 --> 00:00:03,000
(SFX: PORTA_ABRINDO) Olá, bem-vindo!

2
00:00:03,500 --> 00:00:07,000
Eu sou seu guia hoje. (PAUSA_2S)
Vamos explorar juntos?

3
00:00:07,500 --> 00:00:10,500
(VOZ_MISTERIOSAMENTE) Há segredos aqui...
\`\`\`

**Convertido para TTS:**
\`\`\`
[0s] (PORTA_ABRINDO) Olá, bem-vindo!
[3.5s] [VOZ_ENTUSIASTA] Eu sou seu guia hoje. (PAUSA_2S)
[7.0s] Vamos explorar juntos?
[7.5s] [VOZ_MISTERIOSA] Há segredos aqui...
\`\`\`

---

## 💡 EXEMPLOS PRÁTICOS COMPLETOS

### Exemplo 1: Narração Dramática

\`\`\`
[CENÁRIO: Narrador épico relata a queda de um reino]

[NARRADOR_ÉPICO] (VOZ_PROFUNDA_PROJETADA)
(PAUSA_DRAMÁTICA) 
A queda do reino começou... (PAUSA_2S) 
não com um grito... (PAUSA_1S)
mas com silêncio.

(PAUSA_DRAMÁTICA)
As muralhas que por séculos resistiram...
(RITMO_DESACELERANDO) 
caíram. Uma. A uma.

(TROVÃO_DISTANTE) (PAUSA_3S)

E ninguém... (PAUSA_LONGA) 
ninguém poderia salvá-los.
\`\`\`

### Exemplo 2: Diálogo Romântico

\`\`\`
[CENÁRIO: Casal reencontrando após anos]

ELE [CONFIANTE_MAS_EMOCIONADO]:
(RESPIRAÇÃO_PROFUNDA) Eu... eu não sei como começar.
(PAUSA_HESITANTE) Você... mudou. Mas também...
não mudou nada.

ELA [VOZ_SUAVE_TREMULOSA]:
(SUSPIRO_EMOCIONADO) Eu também senti a mesma coisa.
(PAUSA_SIGNIFICATIVA_2S)
(VOZ_PRÓXIMA) Você é... ainda é você.

ELE [VOZ_PRÓXIMA_CARINHOSA]:
(BEIJO_AR) Eu nunca parei de pensar em você.

ELA [VOZ_EMBARGADA_LÁGRIMAS]:
(SOLUÇO_CONTIDO) Nem eu... nem eu...
(PAUSA_3S) Perdão levou tanto tempo.

ELE [TOM_REASSEGURADOR]:
(PAUSA_1S) Não importa. Estou aqui agora.
(BEIJO_AR) E vou ficar.
\`\`\`

### Exemplo 3: Comedy/Sarcasmo

\`\`\`
[CENÁRIO: Personagem descobre situação absurda]

[VOZ_SARCÁSTICA_EXASPERADA]
Deixa ver se entendi...
(PAUSA_PENSATIVA)
Você... (PAUSA_PARA_EFEITO)
você colocou um PATO... 
em uma máquina de lavar roupa?

(PAUSA_1S) (RISADA_NERVOSA)

Oh sim, CLARO. Porque aquilo é TOTALMENTE...
(RITMO_RÁPIDO) ...a coisa mais inteligente que alguém já fez!

(GARGALHADA_SARCÁSTICA) (PAUSA_2S)

Como. Você ainda está vivo?
\`\`\`

### Exemplo 4: Horror/Terror

\`\`\`
[CENÁRIO: Personagem encontra algo terrível]

[VOZ_ASSUSTADA_TREMENDO]:
(INALAÇÃO_RÁPIDA) Não... não pode ser...

(PAUSA_2S) (RESPIRAÇÃO_OFEGANTE)

O que... o que estava aqui?
(PAUSA_HESITANTE) 
Há quanto tempo?

(SOM_MOVIMENTO_DISTANTE) (PAUSA_SUSPEITA)

(VOZ_ABAFADA) Espera... você ouviu?
(RESPIRAÇÃO_TENSA)
Algo se move...

(SOM_MAIS_PRÓXIMO) (INALAÇÃO_PÂNICO)

(GRITO_ABAFADO) Não, não, NÃO—

[PAUSA_DRAMÁTICA_5S]

(VOZ_FRACA_OFEGANTE) ...ele vem.
\`\`\`

### Exemplo 5: Instrução ASMR

\`\`\`
[CENÁRIO: Meditação guiada relaxante]

[ASMR_SUSSURRO_SUAVE] (RESPIRAÇÃO_LENTA)
(PAUSA_2S)
Bem-vindo... ao seu espaço seguro...
(VOZ_MUI_PRÓXIMA) (PAUSA_1S)

(PAUSA_RESPIRAÇÃO_PROFUNDA)
Respire comigo... (RESPIRAÇÃO_VOCAL)
(PAUSA_1S) In... (PAUSA_2S) ...out.

(PAUSA_3S) (ÁGUA_SUAVE_FUNDO)

Você está seguro aqui. (SUSSURRO)
Nada pode te machucar.
(PAUSA_2S) Apenas respire...

(PAUSA_LONGA_3S) (SONS_NATUREZA_SUAVE_FUNDO)

Deixe seus músculos relaxarem...
(PAUSA_1S) Cada respiração...
(PAUSA_1S) ...mais profunda...

(PAUSA_4S) (RESPIRAÇÃO_VOCAL_CONTÍNUA)
\`\`\`

---

## 📊 TABELAS DE REFERÊNCIA RÁPIDA

### Tabela 1: Mapeamento Emocional Rápido

| Emoção | Tom | Velocidade | Respiração | Efeito Primário |
|--------|-----|-----------|-----------|-----------------|
| **Alegria** | Alto, brilhante | Rápido | Leve | (RISADA) |
| **Tristeza** | Baixo, grave | Lento | Suspiros | (CHORO) |
| **Raiva** | Afiado, tenso | Rápido ou lento ameaçador | Irregular | (RESPIRAÇÃO_PESADA) |
| **Medo** | Alto, tremendo | Rápido | Ofegante | (INALAÇÃO_RÁPIDA) |
| **Surpresa** | Agudo, explosivo | Abrupto | Engasgo | (CHOQUE) |
| **Nojo** | Nasal, áspero | Entrecortado | Engasgamento | (PIGARRO) |
| **Confiança** | Firme, grave | Medido | Controlada | (PAUSA_DRAMÁTICA) |
| **Insegurança** | Fraca, aguda | Lento | Ansiosamente | (PAUSA_HESITANTE) |
| **Amor** | Morno, suave | Lento | Profunda | (SUSPIRO_AFETIVO) |
| **Sarcasmo** | Plana com picos | Medido | Irónica | (RISADA_AMARGADA) |

### Tabela 2: Modificadores de Voz por Contexto

| Contexto | Modificador | Aplicação | Exemplo |
|----------|-------------|-----------|---------|
| **Criança** | [VOZ_INFANTIL] | Todas as falas | "Mamãe!" |
| **Idoso** | [VOZ_ROUCA_CANSADA] | Falas principais | "Quando era jovem..." |
| **Sussurrado** | [SUSSURRO] ou (VOZ_PRÓXIMA) | Intimidade/segredo | "Psst... escuta..." |
| **Gritado** | [GRITO] | Emergência/raiva | "SAIA DAQUI AGORA!" |
| **Distante** | [VOZ_DISTANTE] | Áudio de longe | Parece afastado |
| **Dentro da Cabeça** | [PENSAMENTO] | Diálogos internos | Reflexão |
| **Telefone** | [VOZ_TELEFONE] | Chamadas | Sons distorcidos |
| **Robótico** | [VOZ_ROBÓTICA] | Máquinas | Sem emoção |
| **Sensual** | [SENSUALIDADE] | Romance | Voz carregada |
| **Autoridade** | [TOM_AUTORITÁRIO] | Liderança | Firme e claro |

### Tabela 3: Combinações de Efeitos Recomendadas

| Cenário | Efeitos Primários | Efeitos Secundários |
|---------|---|---|
| **Confronto Tenso** | (RESPIRAÇÃO_PESADA) + [RAIVA] | (PAUSA_DRAMÁTICA) |
| **Encontro Romântico** | (SUSPIRO_AFETIVO) + [AMOR] | (BEIJO_AR) |
| **Cena de Terror** | (INALAÇÃO_RÁPIDA) + [MEDO] | (RESPIRAÇÃO_OFEGANTE) |
| **Momento Cômico** | (RISADA_MALANDRA) + [SARCASMO] | (PAUSA_CÔMICA) |
| **Narrativa Épica** | [NARRADOR_ÉPICO] + (PAUSA_DRAMÁTICA) | (TROVÃO_DISTANTE) |
| **Cena Triste** | (CHORO) + [TRISTEZA] | (SUSPIRO_TRISTE) |
| **Relaxamento/ASMR** | [ASMR_SUSSURRO] + (RESPIRAÇÃO_SUAVE) | (SOM_NATUREZA) |
| **Ação/Adrenalina** | [RESPIRAÇÃO_OFEGANTE] + (RITMO_ACELERADO) | (SOM_MOVIMENTO) |

---

## 🔧 TROUBLESHOOTING & OTIMIZAÇÃO

### Problemas Comuns e Soluções

#### **Problema 1: Voz Soa Robótica/Sem Emoção**

\`\`\`
❌ CAUSA: Faltam marcadores emocionais
"Eu sou feliz. Eu gosto de você. Vamos comer."

✅ SOLUÇÃO: Adicione contexto emocional
[ALEGRIA_GENUÍNA] (RISADA_LEVE) Eu sou tão feliz! 
(SUSPIRO_AFETIVO) Eu gosto de você...
Vamos comer! (ENTUSIASMO)
\`\`\`

#### **Problema 2: Pausas Parecem Estranhas/Antinaturais**

\`\`\`
❌ CAUSA: Muitas pausas, sem propósito
"Eu... espera... não... sabia... disso..."

✅ SOLUÇÃO: Pausas apenas em momentos significativos
"Eu não sabia disso." (PAUSA_HESITANTE) 
"Esperai... você... você está falando sério?"
\`\`\`

#### **Problema 3: Diálogos Soam Entediantes**

\`\`\`
❌ CAUSA: Falta variação vocal entre personagens
"Oi, como vai? Bem, e você? Estou feliz!"

✅ SOLUÇÃO: Diferencie tom, velocidade, textura
PESSOA_A [VITALIDADE_ALTA]: Oi, COMO você está?! (ENERGIA)
PESSOA_B [VOZ_CANSADA]: Bem... estou... bem. (LENTO)
\`\`\`

#### **Problema 4: Efeitos Sonoros Não Funcionam**

\`\`\`
❌ CAUSA: Marcador inválido ou ambíguo
"Ele estava fazendo um som (RUÍDO_ESTRANHO)"

✅ SOLUÇÃO: Use marcadores padronizados
"Ele estava fazendo um som (GRUNHIDO_CONFUSO)"
ou descreva melhor:
"Ele fez um som como se estivesse pensando (PAUSA_MURMÚRIO)"
\`\`\`

#### **Problema 5: Transições Entre Tópicos Abruptas**

\`\`\`
❌ CAUSA: Nenhuma conexão emocional
"Tudo bem. Agora vamos falar sobre dinheiro."

✅ SOLUÇÃO: Use pausas e transições suaves
"Tudo bem. (PAUSA_2S) Mas... há algo que preciso te contar.
(PAUSA_HESITANTE) É sobre... dinheiro."
\`\`\`

### Dicas de Otimização

#### **Otimização 1: Economizar Tokens**

\`\`\`
❌ LONGO:
[VOZ_CLARA_PROFISSIONAL_BEM_ARTICULADA] (PAUSA_1S)
Você fez um ótimo trabalho! (PAUSA_1S) [ALEGRIA_GENUÍNA]

✅ CONCISO:
[VOZ_CLARA] (PAUSA_1S) Você fez um ótimo trabalho! [ALEGRIA]
\`\`\`

#### **Otimização 2: Maximizar Qualidade Vocal**

\`\`\`
✅ BOM: Use marcadores específicos
(RESPIRAÇÃO_PESADA) + [RAIVA_CONTIDA] = efeito específico

Melhor ainda: Combine contexto narrativo
"Você... OUSOU?" (RESPIRAÇÃO_PESADA) [RAIVA_LATENTE]
(Modelodeduz raiva + respiração = contexto mais rico)
\`\`\`

#### **Otimização 3: Teste Iterativo**

\`\`\`
Ciclo:
1. Gere com marcadores básicos
2. Ouça resultado
3. Ajuste marcadores baseado no que ouve
4. Re-gere com melhorias
5. Repita até satisfeito
\`\`\`

---

## 🎓 BOAS PRÁTICAS FINAIS

### Checklist Antes de Enviar Prompt

- [ ] Personagem tem tom definido? ([TOM_X] presente)
- [ ] Há emoção clara na narrativa?
- [ ] Pausas servem propósito? (não são aleatórias)
- [ ] Efeitos sonoros existem e são válidos?
- [ ] Texto flui naturalmente quando lido em voz alta?
- [ ] Não há contradições (ex: [ALEGRIA] + (CHORO) sem contexto)
- [ ] Velocidade é apropriada para o contexto?
- [ ] Respiração é natural/realista?
- [ ] Transições entre frases são suaves?
- [ ] Nenhum parâmetro técnico foi incluído?

### Evolução de Prompts

\`\`\`
VERSÃO 1 (Básica):
"Olá, tudo bem?"

VERSÃO 2 (Com Tom):
[VOZ_CASUAL] "Olá, tudo bem?"

VERSÃO 3 (Com Emoção):
[VOZ_CASUAL_AMIGÁVEL] (RISADA_SUAVE) "Olá! Tudo bem?"

VERSÃO 4 (Refinada):
[VOZ_CASUAL_ENTUSIASMADA] (PAUSA_0.5S) 
Olá! (RISADA_SUAVE) Tudo bem com você?
(TOM_INQUISIDOR) [GENUINAMENTE_INTERESSADO]
\`\`\`

---

## 🌟 CONCLUSÃO

O sistema de TTS expressivo é uma ferramenta poderosa para criar narrativas autênticas e emocionantes. Dominar essas técnicas permite transformar texto simples em performance vocal viva, completa e envolvente.

**Lembre-se:**
- **Contexto é rei**: Cada marcador deve servir a história
- **Naturalidade primeiro**: Soar humano, não robótico
- **Iteração melhora**: Teste, ouça, refine
- **Menos pode ser mais**: Um marcador bem colocado > 10 aleatórios
- **Emotion drives everything**: Se a emoção é real, a performance será real

Boa sorte em suas criações vocais! 🎙️✨

`;
