type KufarDealType = "let" | "sell" | string;

interface KufarParameterGroup {
  gi: number;
  gl?: string;
  go: number;
  po: number;
}

type KufarParameterValue =
  | string
  | number
  | boolean
  | null
  | Array<string | number | boolean | null>;

type KufarParameterLabel =
  | string
  | number
  | boolean
  | null
  | Array<string | number | boolean | null>;

interface KufarParameter {
  pl: string;
  vl: KufarParameterLabel;
  p: string;
  v: KufarParameterValue;
  pu: string;
  g?: KufarParameterGroup[];
}

interface KufarCalculatorEntry {
  currency: "USD" | "EUR" | "BYN" | "RUB" | string;
  price: string;
  price_per_meter: string | null;
}

interface KufarImage {
  id: string;
  media_storage: string;
  path: string;
  yams_storage: boolean;
}

interface KufarPaidServices {
  halva: boolean;
  highlight: boolean;
  polepos: boolean;
  ribbons: unknown;
}

interface KufarShowParameters {
  show_call: boolean;
  show_chat: boolean;
  show_import_link: boolean;
  show_web_shop_link: boolean;
}

export interface KufarAd {
  account_id: string;
  account_parameters: KufarParameter[];
  ad_id: number;
  ad_link: string;
  ad_parameters: KufarParameter[];
  body: string | null;
  body_short: string;
  calculator: KufarCalculatorEntry[];
  category: string;
  company_ad: boolean;
  currency: string;
  feedback_info: unknown;
  images: KufarImage[];
  is_mine: boolean;
  list_id: number;
  list_time: string;
  message_id: string;
  paid_services: KufarPaidServices;
  phone_hidden: boolean;
  price_byn: string;
  price_usd: string;
  remuneration_type: string;
  show_parameters: KufarShowParameters;
  subject: string;
  type: KufarDealType;
  [key: string]: unknown;
}

interface KufarPaginationPage {
  label: "prev" | "self" | "next" | string;
  num: number;
  token: string | null;
}

interface KufarPagination {
  pages: KufarPaginationPage[];
}

export interface KufarAdResponse {
  ads: KufarAd[];
  page_type: string;
  pagination: KufarPagination;
  total: number;
}
