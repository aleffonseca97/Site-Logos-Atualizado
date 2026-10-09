import type { Dictionary } from "./dictionaries/pt-BR";

const aliases: Record<string, keyof Dictionary["errors"]> = {
  name_required: "nameRequired",
  "Nome obbligatorio": "nameRequired",
  email_invalid: "emailInvalid",
  "Email non valida": "emailInvalid",
  project_type_required: "projectTypeRequired",
  "Seleziona un tipo di progetto": "projectTypeRequired",
  message_short: "messageShort",
  "Messaggio troppo breve": "messageShort",
  consent_required: "consentRequired",
  "Il consenso è obbligatorio": "consentRequired",
  invalid_data: "invalid",
  invalid: "invalid",
  "Dati non validi": "invalid",
  save_failed: "saveFailed",
  "Salvataggio non riuscito": "saveFailed",
  save_message_failed: "saveMessageFailed",
  "Impossibile salvare il messaggio": "saveMessageFailed",
  unauthorized: "unauthorized",
  "Non autorizzato": "unauthorized",
  not_found: "notFound",
  "Non trovato": "notFound",
  invalid_credentials: "invalidCredentials",
  "Credenziali non valide": "invalidCredentials",
  login_failed: "loginFailed",
  "Accesso non riuscito": "loginFailed",
  upload_failed: "uploadFailed",
  "Upload fallito": "uploadFailed",
  "Errore upload": "uploadFailed",
  file_missing: "fileMissing",
  "File mancante": "fileMissing",
  unsupported_format: "unsupportedFormat",
  "Formato non supportato. Usa JPG, PNG, WEBP, GIF o SVG.": "unsupportedFormat",
  file_too_large: "fileTooLarge",
  "Il file supera il limite di 8MB.": "fileTooLarge",
  unexpected: "unexpected",
  "Errore imprevisto": "unexpected",
  "Invio non riuscito": "saveMessageFailed",
};

export function translateError(raw: string, errors: Dictionary["errors"]) {
  const key = aliases[raw];
  return key ? errors[key] : errors.unexpected;
}
