# Creator Brain protocol

This protocol controls onboarding after installation intent is detected. The normal path uses six planned user responses.

## Conversation rules

Every question must:

- resolve named profile fields, source permissions or an installation gate;
- include a concrete example of the expected answer;
- reuse information already supplied or extracted;
- avoid asking for information that approved context can answer;
- group related requests into the current interaction.

The installer analyzes and updates state between interactions. It never advances because a message number was reached; it advances only when the current exit gate passes.

## Interaction 1 — Existing context and scope

### Question 1: reusable context

Ask whether relevant information already exists in visible LLM context, attachments, instructions, files, folders, vaults, repositories or other systems. Request exact scope and exclusions.

Example: `Utiliza el contexto visible de este proyecto y revisa C:\Creator. Incluye Perfil, Guiones y Publicaciones. Excluye Clientes, Finanzas y conversaciones privadas.`

### Question 2: creator purpose

Ask what the person creates, where and what the Creator Brain should help achieve. Permit the user to defer facts already available in approved context.

Example: `Creo contenido sobre IA aplicada para LinkedIn, X y vídeo. Quiero convertir experiencia y sistemas propios en contenido útil y reconocible. Extrae el resto de la carpeta.`

### Question 3: boundaries

Ask which information, subjects and life domains must remain outside the profile.

Example: `Excluye familia, salud, finanzas, datos de clientes, conversaciones privadas, credenciales y opiniones que no haya expresado públicamente.`

### Question 4: destination and initial write

Ask for a new or empty absolute destination and permission to create `.creator-brain/state.md`.

Example: `Destino: C:\Users\Alex\Documents\my-creator-brain. Autorizo crear la carpeta y el estado inicial.`

After the response, perform context discovery and initial extraction. Exit only when scope, exclusions, module activation candidates, destination and first-write consent are recorded.

## Interaction 2 — Additional evidence

### Question 1: remaining source package

Summarize what was already processed. Request all useful remaining sources at once: public profiles, website, CV or bio, brand and strategy documents, representative content, scripts, transcripts, offers, cases, audience material and approved or rejected examples.

Example: `Añade mi web, LinkedIn, cinco guiones, tres publicaciones que representan mi voz y dos ejemplos rechazados. La web define mi oferta actual; el CV solo sirve para trayectoria.`

### Question 2: source authority and freshness

Ask which source should win when materials represent different periods or purposes.

Example: `El documento de posicionamiento de 2025 está desactualizado. Usa la web para oferta y posicionamiento; usa los guiones de 2026 para voz.`

### Question 3: retention exceptions

Present the default of metadata and approved claims only. Ask only whether any creator-owned excerpts should be retained as approved examples.

Example: `Conserva como ejemplos de voz los fragmentos concretos que seleccione durante la calibración. No conserves ningún otro contenido original.`

Also include one adaptive block containing only fundamental profile fields that remain unsupported after interaction 1. Every adaptive question includes an example.

Exit only when the source manifest and extraction pass are complete.

## Interaction 3 — Gap closure

### Question 1: complete closure package

Present every missing applicable field, critical conflict, stale claim and inference requiring confirmation in one structured package. Offer direct answers or a specific targeted source.

Example: `Faltan tu promesa central, la audiencia prioritaria y los límites de claims. Además, la web dice “equipos de innovación” y LinkedIn dice “fundadores”. Confirma la opción actual o aporta el documento que la define.`

Do not ask known questions again. Accept direct correction, approved evidence, `not_applicable` or an allowed safe default.

Exit only when factual coverage is 100 percent, module activation is final and no critical factual conflict remains.

## Interaction 4 — Creator model and contract

### Question 1: review the integrated model

Present identity, positioning, audience, offer when active, voice, strategy, knowledge boundaries and the creative contract as one integrated proposal. Ask the user to confirm everything or state only corrections.

Example: `Confirmo todo salvo dos cambios: mi tono es directo, no provocador, y la audiencia secundaria son equipos de innovación, no agencias.`

Exit only when the creator model and every behavioral field are confirmed.

## Interaction 5 — Calibration

### Question 1: scenario choices

Present only scenarios required to resolve material uncertainty in voice, autonomy, evidence, channel adaptation or commercial behavior.

Example: `Ante un dato no verificado prefiero que marques la limitación y propongas verificarlo; no quiero que lo elimines silenciosamente ni que lo presentes como hecho.`

### Question 2: representative output evaluation

Test at least one representative task, voice decision, claim boundary and approval boundary. When multi-channel is active, test one cross-channel adaptation.

Example: `Apruebo la estructura del ejemplo B. Elimina la exageración del hook, conserva la observación propia y utiliza un CTA conversacional.`

Exit only when calibration fields resolve and every representative test passes.

## Interaction 6 — Preview and approval

### Question 1: final review

Present the complete compiled preview, profile summary, source and retention summary, coverage, calibration results, safe defaults, non-applicable fields, destination and exact files.

Ask the user to add or correct anything inside the defined creator scope and then explicitly approve.

Example: `Cambia el CTA predeterminado por una invitación a responder y elimina X como canal. Aprueba después de aplicar estos cambios.`

Apply self-contained corrections, recompute coverage and build only after explicit approval. Exit only after readback verification passes.

## Recovery

Tool limitations, invalid paths, inaccessible sources and missing permission remain in the current interaction state. A recovery exchange does not create a seventh profile module. If a critical requirement cannot be resolved, set `blocked` and name the exact requirement.
