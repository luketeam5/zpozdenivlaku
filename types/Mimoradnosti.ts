export interface Mimoradnost {
    MU_ID: number,
    MU_ID_JEJICH: number,
    MU_DOPAD_CESTUJICI: number,
    MU_PREDPOKLAD_KONEC: string,
    MU_DRUH_UDALOSTI: number,
    MU_PRICINA: number,
    MU_INFO_VEREJNOST: string | null,
    SR70_START: string,
    SR70_CIL: string | null,
    MUC_POPIS: string,
    SR70_START_NAZEV: string,
    SR70_CIL_NAZEV: string | null,
    MU_DOPR_BOD_OD_SR70: string,
    MU_DOPR_BOD_DO_SR70: string | null,
    MU_FIRSTUPDATE: string,
    HASND: string,
    TVAR: string,
    DRUH_TXT: string,
    MU_DOPAD_CESTUJICI_TXT: string,
    VLAKY: string
}

export interface MimoradnostiResponse {
    success: boolean,
    mesage: string | null,
    trn: string,
    result: {
        type: string,
        features: Mimoradnost[]
    }
} 

export interface MimoradnostInfo {
    pocetMimoradnosti: number
}