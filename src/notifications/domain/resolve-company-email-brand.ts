const GRUPO_FG_LOGO_URL =
  'https://grupo-fg.com/assets/Grupo-FG-color.svg' as const;

const ALIANZA_LOGO_URL =
  'https://grupo-fg.com/assets/alianza/Logo%20Alianza.png' as const;

export type CompanyEmailBrand = {
  readonly companyName: string;
  readonly brandColorPrimary: string;
  readonly brandColorSecondary: string;
  readonly brandButtonTextColor: string;
  readonly logoUrl: string;
  readonly logoWidth: number;
};

const DEFAULT_BRAND: Omit<CompanyEmailBrand, 'companyName'> = {
  brandColorPrimary: '#0a2240',
  brandColorSecondary: '#98989A',
  brandButtonTextColor: '#ffffff',
  logoUrl: GRUPO_FG_LOGO_URL,
  logoWidth: 120,
};

function normalizeCompanyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function resolveCompanyEmailBrand(
  companyName: string,
): CompanyEmailBrand {
  const normalized = normalizeCompanyName(companyName);

  if (normalized.includes('alianza')) {
    return {
      companyName: companyName.trim(),
      brandColorPrimary: '#FF4D00',
      brandColorSecondary: '#898A8D',
      brandButtonTextColor: '#ffffff',
      logoUrl: ALIANZA_LOGO_URL,
      logoWidth: 200,
    };
  }

  if (normalized.includes('tableros') || normalized.includes('arrancadores')) {
    return {
      companyName: companyName.trim(),
      brandColorPrimary: '#00C4B3',
      brandColorSecondary: '#9EA1A1',
      brandButtonTextColor: '#000000',
      logoUrl: GRUPO_FG_LOGO_URL,
      logoWidth: 120,
    };
  }

  if (normalized.includes('manufacturing')) {
    return {
      companyName: companyName.trim(),
      brandColorPrimary: '#1E2A4A',
      brandColorSecondary: '#98989A',
      brandButtonTextColor: '#ffffff',
      logoUrl: GRUPO_FG_LOGO_URL,
      logoWidth: 120,
    };
  }

  if (normalized.includes('electrical')) {
    return {
      companyName: companyName.trim(),
      brandColorPrimary: '#0a2240',
      brandColorSecondary: '#98989A',
      brandButtonTextColor: '#ffffff',
      logoUrl: GRUPO_FG_LOGO_URL,
      logoWidth: 120,
    };
  }

  return {
    companyName: companyName.trim(),
    ...DEFAULT_BRAND,
  };
}
