import type { ServiceId, ProjectTypeId } from "@/lib/config";
import type { Locale } from "../locale";
import type { Dictionary } from "./pt-BR";
import { ptBR } from "./pt-BR";
import { it } from "./it";
import { en } from "./en";

export const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  it,
  en,
};

export type { Dictionary };

type _ServicesOk = Exclude<ServiceId, keyof Dictionary["services"]> extends never ? true : never;
type _TypesOk = Exclude<ProjectTypeId, keyof Dictionary["projectTypes"]> extends never ? true : never;

const servicesOk: _ServicesOk = true;
const typesOk: _TypesOk = true;

void servicesOk;
void typesOk;
