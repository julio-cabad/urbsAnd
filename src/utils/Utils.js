const provincesEc = [
    {name: 'Azuay'},
    {name: 'Bolivar'},
    {name: 'Azogues'},
    {name: 'Cañar'},
    {name: 'Chimborazo'},
    {name: 'Cotopaxi'},
    {name: 'El Oro'},
    {name: 'Esmeraldas'},
    {name: 'Galápagos'},
    {name: 'Guayas'},
    {name: 'Imbabura'},
    {name: 'Loja'},
    {name: 'Los Ríos'},
    {name: 'Manabí'},
    {name: 'Morona Santiago'},
    {name: 'Napo'},
    {name: 'Sucumbíos'},
    {name: 'Pastaza'},
    {name: 'Pichincha'},
    {name: 'Santa Elena'},
    {name: 'Santo Domingo'},
    {name: 'Francisco De Orellana'},
    {name: 'Tungurahua'},
    {name: 'Zamora Chinchipe'}
];

const userRol = [
    {name: 'Administrador'},
    {name: 'Usuario'},
];

const statusDisplay = [
    {name: 'Activo'},
    {name: 'Inactivo'},
];

const unitResult = [
    {name: 'Positivo'},
    {name: 'Negativo'},
];

const modifyLeaders = [
    {name: 'Si'},
    {name: 'No'},
];
const targetEvaluationTime = [
    {name: 'Mensual'},
    {name: 'Bimensual'},
    {name: 'Trimestral'},
    {name: 'Quimestral'},
    {name: 'Semestral'},
    {name: 'Anual'},
];

const sign = [
    {name: '>'},
    {name: '>='},
    {name: '<'},
    {name: '<='},
];

const passed = [
    {name: 'Aprobado'},
    {name: '<No aprobado'},
];

const modalityEvaluateObjectives = [
    {name: 'Por colaborador'},
    {name: 'Por lider'},
];


const days = [{name: 'Lunes'}, {name: 'Martes'}, {name: 'Miércoles'}, {name: 'Jueves'}, {name: 'Viernes'},
    {name: 'Sábado'}, {name: 'Domingo'}]


const daysFns = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    52, 53, 54, 55, 56, 57, 58, 59,]

const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre']

const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027',
    '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041',
    '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050', '2051', '2052', '2053', '2054', '2055',
    '2056', '2057', '2058', '2059', '2060', '2061', '2062', '2063', '2064', '2065', '2066', '2067', '2068', '2069',
    '2070', '2071', '2072', '2073', '2074', '2075', '2075', '2076', '2077', '2078', '2079', '2080', '2081', '2082',
    '2083', '2084', '2085', '2086', '2087', '2088', '2089', '2090', '2091', '2092', '2093', '2094', '2095', '2096',
    '2097', '2098', '2099', '2100',]


export {
    provincesEc, days, hours, minutes, daysFns, months, years, userRol, statusDisplay, modifyLeaders, unitResult,
    targetEvaluationTime, modalityEvaluateObjectives, sign
}

export const onlyLetters = /^[A-Za-z]+$/;
export const namesControl = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ_ ]*$/;

export const cities = [
    {name: 'CUENCA'},
    {name: 'GIRÓN'},
    {name: 'GUALACEO'},
    {name: 'NABÓN'},
    {name: 'PAUTE'},
    {name: 'PUCARÁ'},
    {name: 'SAN FERNANDO'},
    {name: 'SANTA ISABEL'},
    {name: 'SIGSIG'},
    {name: 'OÑA'},
    {name: 'CHORDELEG'},
    {name: 'EL PAN'},
    {name: 'SEVILLA DE ORO'},
    {name: 'GUACHAPALA'},
    {name: 'CAMILO PONCE ENRIQUEZ'},

    {name: 'GUARANDA'},
    {name: 'CHIMBO'},
    {name: 'ECHEANDÍA'},
    {name: 'SAN MIGUEL'},
    {name: 'CALUMA'},
    {name: 'LAS NAVES'},

    {name: 'AZOGUES'},
    {name: 'BIBLIÁN'},
    {name: 'CAÑAR'},
    {name: 'LA TRONCAL'},
    {name: 'EL TAMBO'},
    {name: 'DÉLEG'},
    {name: 'SUSCAL'},

    {name: 'TULCÁN'},
    {name: 'BOLÍVAR'},
    {name: 'ESPEJO'},
    {name: 'MIRA'},
    {name: 'MONTÚFAR'},
    {name: 'SAN PEDRO DE HUACA'},

    {name: 'LATACUNGA'},
    {name: 'LA MANÁ'},
    {name: 'PANGUA'},
    {name: 'PUJILI'},
    {name: 'SALCEDO'},
    {name: 'SAQUISILI'},
    {name: 'SIGCHOS'},

    {name: 'RIOBAMBA'},
    {name: 'ALAUSÍ'},
    {name: 'COLTA'},
    {name: 'CHAMBO'},
    {name: 'CHUNCHI'},
    {name: 'GUAMOTE'},
    {name: 'GUANO'},
    {name: 'PALLATANGA'},
    {name: 'PENIPE'},
    {name: 'CUMANDÁ'},

    {name: 'MACHALA'},
    {name: 'ARENILLAS'},
    {name: 'ATAHUALPA'},
    {name: 'BALSAS'},
    {name: 'CHILLA'},
    {name: 'EL GUABO'},
    {name: 'HUAQUILLAS'},
    {name: 'MARCABELI'},
    {name: 'PASAJE'},
    {name: 'PIÑAS'},
    {name: 'PORTOVELO'},
    {name: 'SANTA ROSA'},
    {name: 'ZARUMA'},
    {name: 'LAS LAJAS'},

    {name: 'ESMERALDAS'},
    {name: 'ELOY ALFARO'},
    {name: 'MUISNE'},
    {name: 'QUININDÉ'},
    {name: 'SAN LORENZO'},
    {name: 'ATACAMES'},
    {name: 'RIO VERDE'},
    {name: 'LA CONCORDIA'},

    {name: 'GUAYAQUIL'},
    {name: 'ALFREDO BAQUERIZO MORENO'},
    {name: 'BALAO'},
    {name: 'BALZAR'},
    {name: 'COLIMES'},
    {name: 'DAULE'},
    {name: 'DURÁN'},
    {name: 'EL EMPALME'},
    {name: 'EL TRIUNFO'},
    {name: 'MILAGRO'},
    {name: 'NARANJAL'},
    {name: 'NARANJITO'},
    {name: 'PALESTINA'},
    {name: 'PEDRO CARBO'},
    {name: 'SAMBORONDÓN'},
    {name: 'SANTA LUCÍA'},
    {name: 'SALITRE'},
    {name: 'SAN JACINTO DE YAGUACHI'},
    {name: 'PLAYAS'},
    {name: 'SIMÓN BOLÍVAR'},
    {name: 'CORONEL MARCELINO MALIDUEÑA'},
    {name: 'LOMAS DE SARGENTILLO'},
    {name: 'NOBOL'},
    {name: 'GENERAL ANTONIO ELIZALDE'},
    {name: 'ISIDRO AYORA'},

    {name: 'IBARRA'},
    {name: 'ANTONIO ANTE'},
    {name: 'COTACACHI'},
    {name: 'OTAVALO'},
    {name: 'PIMAMPIRO'},
    {name: 'SAN MIGUEL DE URCUQUÍ'},

    {name: 'LOJA'},
    {name: 'CALVAS'},
    {name: 'CATAMAYO'},
    {name: 'CELICA'},
    {name: 'CHAGUARPAMBA'},
    {name: 'ESPÍNDOLA'},
    {name: 'GONZANAMÁ'},
    {name: 'MACARÁ'},
    {name: 'PALTAS'},
    {name: 'PUYANGO'},
    {name: 'SARAGURO'},
    {name: 'SOZORANGA'},
    {name: 'ZAPOTILLO'},
    {name: 'PINDAL'},
    {name: 'QUILANGA'},
    {name: 'OLMEDO'},

    {name: 'BABAHOYO'},
    {name: 'BABA'},
    {name: 'MONTALVO'},
    {name: 'PUEBLO VIEJO'},
    {name: 'QUEVEDO'},
    {name: 'URDANETA'},
    {name: 'VENTANAS'},
    {name: 'VINCES'},
    {name: 'PALENQUE'},
    {name: 'BUENA FÉ'},
    {name: 'VALENCIA'},
    {name: 'MOCACHE'},
    {name: 'QUINSALOMA'},


    {name: 'PORTOVIEJO'},
    {name: 'BOLÍVAR'},
    {name: 'CHONE'},
    {name: 'EL CARMEN'},
    {name: 'FLAVIO ALFARO'},
    {name: 'JIPIJAPA'},
    {name: 'JUNÍN'},
    {name: 'MANTA'},
    {name: 'MONTECRISTI'},
    {name: 'PAJÁN'},
    {name: 'PICHINCHA'},
    {name: 'ROCAFUERTE'},
    {name: 'SANTA ANA'},
    {name: 'SUCRE'},
    {name: 'TOSAGUA'},
    {name: '203 DE MAYO'},
    {name: 'PEDERNALES'},
    {name: 'OLMEDO'},
    {name: 'PUERTO LÓPEZ'},
    {name: 'JAMA'},
    {name: 'JARAMIJÓ'},
    {name: 'SAN VICENTE'},

    {name: 'MACAS'},
    {name: 'GUALAQUIZA'},
    {name: 'LIMÓN INDANZA'},
    {name: 'PALORA'},
    {name: 'SANTIAGO'},
    {name: 'SUCÚA'},
    {name: 'HUAMBOYA'},
    {name: 'SAN JUAN BOSCO'},
    {name: 'TAISHA'},
    {name: 'LOGROÑO'},
    {name: 'PABLO SEXTO'},
    {name: 'TIWINTZA'},

    {name: 'TENA'},
    {name: 'ARCHIDONA'},
    {name: 'EL CHACO'},
    {name: 'QUIJOS'},
    {name: 'CARLOS JULIO AROSEMA TOLA'},

    {name: 'PUYO'},
    {name: 'MERA'},
    {name: 'SANTA CLARA'},
    {name: 'ARAJUNO'},
    {name: 'SHELL'},

    {name: 'QUITO'},
    {name: 'CAYAMBE'},
    {name: 'MEJIA'},
    {name: 'PEDRO MONCAYO'},
    {name: 'RUMIÑAHUI'},
    {name: 'SAN MIGUEL DE LOS BANCOS'},
    {name: 'PEDRO VICENTE MALDONADO'},
    {name: 'PUERTO QUITO'},

    {name: 'AMBATO'},
    {name: 'BAÑOS DE AGUA SANTA'},
    {name: 'CEVALLOS'},
    {name: 'MOCHA'},
    {name: 'PATATE'},
    {name: 'QUERO'},
    {name: 'SAN PEDRO DE PELILEO'},
    {name: 'SANTIAGO DE PÍLLARO'},
    {name: 'TISALEO'},

    {name: 'ZAMORA'},
    {name: 'CHINCHIPE'},
    {name: 'NANGARITZA'},
    {name: 'YACUAMBI'},
    {name: 'YANTZAZA'},
    {name: 'EL PANGUI'},
    {name: 'CENTINELA DEL CÓNDOR'},
    {name: 'PALANDA'},
    {name: 'PAQUISHA'},

    {name: 'SAN CRISTÓBAL'},
    {name: 'ISABELA'},
    {name: 'SANTA CRUZ'},

    {name: 'LAGO AGRIO'},
    {name: 'GONZALO PIZARRO'},
    {name: 'PUTUMAYO'},
    {name: 'SHUSHUFINDI'},
    {name: 'SUCUMBIOS'},
    {name: 'CASCALES'},
    {name: 'CUYABENO'},

    {name: 'ORELLANA'},
    {name: 'AGUARICO'},
    {name: 'LA JOYA DE LOS SACHAS'},
    {name: 'LORETO'},

    {name: 'SANTO DOMINGO'},

    {name: 'SANTA ELENA'},
    {name: 'LA LIBERTAD'},
    {name: 'SALINAS'},
]
