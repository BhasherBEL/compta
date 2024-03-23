import { writable } from "svelte/store";

import { textFR } from "./textFR";
import { textEN } from "./textEN";

export const lang = writable(textFR);
export const translation = (langCode: string) => {
  if (langCode === "en") lang.set(textEN);
  else lang.set(textFR);
};

export type Language = {
  lang: string;
  tooltips: {
    add_line: string;
    clipboard: string;
    delete_line: string;
    edit_line: string;
    lang_en: string;
    lang_fr: string;
    open_file: string;
    safe_delete: (isLocked: boolean) => string;
    scale_balance: (isExpanded: boolean) => string;
    save_file: string;
  };
  infos: {
    address: string;
    company: string;
    date_end: string;
    date_start: string;
    email: string;
    gen_info: string;
    manager: string;
    orga: string;
    quarter: string;
    year: string;
  };
  account: string;
  account_name: string;
  accounts: string;
  amount: string;
  and: string;
  calc_val: string;
  cash_flow: string;
  category: string;
  current_money: string;
  date: string;
  detail_balances: string;
  details: string;
  diff_of: string;
  event: string;
  events_balance: string;
  expense: string;
  help: string;
  income: string;
  info: string;
  initial_money: string;
  nature: string;
  natures_balance: string;
  label: string;
  comment: string;
  profit: string;
  ref: string;
  total: string;
  total_all: string;
  footer: {
    created_by: string;
    see_source_code: string;
    abstract: string;
    version: string;
    see_release_notes: string;
  };
  help_section: {
    lang_description: string;
    tabs_description: string;
    infos_accounts: string;
    cash_flow: string;
    detail_balances1: string;
    detail_balances2: string;
    detail_balances3: string;
    need_help: string;
  };
};
