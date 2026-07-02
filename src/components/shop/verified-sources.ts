/**
 * Curated VERIFIED wetenschappelijke bronnen per stof.
 *
 * IEDERE bron komt rechtstreeks uit PubMed ESEARCH met een stof-
 * specifieke query (mesh-terms in title/abstract) + post-filter op titel:
 *   - must-include stof-naam (bijv. 'nandrolone', 'trenbolone')
 *   - exclude off-topic velden (meat science, veterinary, breast cancer, etc)
 * Auto-gegenereerd door shop-dash/scripts/build-stof-sources.mjs.
 *
 * Re-build: node scripts/build-stof-sources.mjs > <output-pad>
 * Gegenereerd: 2026-07-02T12:34:39.028Z
 */

export type VerifiedSource = {
  pmid: string;
  title: string;
  firstAuthor: string | null;
  year: string;
  journal: string;
};

export function sourceUrl(s: VerifiedSource) {
  return `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`;
}

export function formatCitation(s: VerifiedSource): string {
  const parts = [s.firstAuthor, s.year && `(${s.year})`].filter(Boolean);
  return parts.length ? parts.join(' ') : 'Unknown';
}

export const VERIFIED_SOURCES: Record<string, VerifiedSource[]> = {
  "testosteron": [
    {
      "pmid": "11701431",
      "title": "Testosterone dose-response relationships in healthy young men.",
      "firstAuthor": "Bhasin S",
      "year": "2001",
      "journal": "American journal of physiology. Endocrinology and metabolism"
    },
    {
      "pmid": "8637535",
      "title": "The effects of supraphysiologic doses of testosterone on muscle size and strength in normal men.",
      "firstAuthor": "Bhasin S",
      "year": "1996",
      "journal": "The New England journal of medicine"
    },
    {
      "pmid": "2917954",
      "title": "Effect of testosterone on muscle mass and muscle protein synthesis.",
      "firstAuthor": "Griggs RC",
      "year": "1989",
      "journal": "Journal of applied physiology (Bethesda, Md. : 1985)"
    },
    {
      "pmid": "31334979",
      "title": "Anabolic Steroid Toxicity.",
      "firstAuthor": "Middlebrook I",
      "year": "2026",
      "journal": ""
    },
    {
      "pmid": "32448030",
      "title": "Androgen Treatment in Adolescent Males With Hypogonadism.",
      "firstAuthor": "Rey RA",
      "year": "2020",
      "journal": "American journal of men's health"
    }
  ],
  "nandrolon": [
    {
      "pmid": "33187340",
      "title": "Nandrolone Decanoate: Use, Abuse and Side Effects.",
      "firstAuthor": "Patanè FG",
      "year": "2020",
      "journal": "Medicina (Kaunas, Lithuania)"
    },
    {
      "pmid": "41936385",
      "title": "Effects of Nandrolone Decanoate on Muscle Strength, Body Composition and Bone Density: A Systematic Review and Meta-Analysis.",
      "firstAuthor": "Prokopidis K",
      "year": "2026",
      "journal": "Journal of cachexia, sarcopenia and muscle"
    },
    {
      "pmid": "38003989",
      "title": "Effects of Nandrolone Decanoate on Skeletal Muscle and Neuromuscular Junction of Sedentary and Exercised Rats.",
      "firstAuthor": "Tibúrcio FC",
      "year": "2023",
      "journal": "Medicina (Kaunas, Lithuania)"
    },
    {
      "pmid": "41477377",
      "title": "Nandrolone Decanoate for Postmenopausal Osteoporosis: A Systematic Review and Meta-Analysis of Randomized Trials.",
      "firstAuthor": "Camara LC",
      "year": "2025",
      "journal": "Cureus"
    },
    {
      "pmid": "36922878",
      "title": "The toxic effects of anabolic steroids \"nandrolone decanoate\" on cardiac and skeletal muscles with the potential ameliorative effects of silymarin and fenugreek seeds extract in adult male albino rats.",
      "firstAuthor": "Hassan DAE",
      "year": "2023",
      "journal": "BMC pharmacology & toxicology"
    }
  ],
  "trenbolone": [
    {
      "pmid": "38887114",
      "title": "Impact of trenbolone on selected organs.",
      "firstAuthor": "Borecki R",
      "year": "2024",
      "journal": "Endokrynologia Polska"
    },
    {
      "pmid": "39486244",
      "title": "Examining the association between trenbolone, psychological distress, and aggression among males who use anabolic-androgenic steroids.",
      "firstAuthor": "Piatkowski T",
      "year": "2024",
      "journal": "The International journal on drug policy"
    },
    {
      "pmid": "20138077",
      "title": "Tissue selectivity and potential clinical applications of trenbolone (17beta-hydroxyestra-4,9,11-trien-3-one): A potent anabolic steroid with reduced androgenic and estrogenic activity.",
      "firstAuthor": "Yarrow JF",
      "year": "2010",
      "journal": "Steroids"
    },
    {
      "pmid": "3288174",
      "title": "The genotoxicity of trenbolone, a synthetic steroid.",
      "firstAuthor": "Richold M",
      "year": "1988",
      "journal": "Archives of toxicology"
    },
    {
      "pmid": "1874853",
      "title": "Disposition of 17 beta-trenbolone in humans.",
      "firstAuthor": "Spranger B",
      "year": "1991",
      "journal": "Journal of chromatography"
    }
  ],
  "boldenone": [
    {
      "pmid": "15204529",
      "title": "Presence and metabolism of the anabolic steroid boldenone in various animal species: a review.",
      "firstAuthor": "De Brabander HF",
      "year": "2004",
      "journal": "Food additives and contaminants"
    },
    {
      "pmid": "8044023",
      "title": "Identification and verification of the anabolic steroid boldenone in equine blood and urine by HPLC/ELISA.",
      "firstAuthor": "Hagedorn HW",
      "year": "1994",
      "journal": "Biomedical chromatography : BMC"
    },
    {
      "pmid": "37264491",
      "title": "A review of current chemistry, pharmacology, and regulation of endogenous anabolic steroids testosterone, boldenone, and nandrolone in horses.",
      "firstAuthor": "Dirikolu L",
      "year": "2023",
      "journal": "Journal of veterinary pharmacology and therapeutics"
    },
    {
      "pmid": "17613052",
      "title": "Phytosterol consumption and the anabolic steroid boldenone in humans: a hypothesis piloted.",
      "firstAuthor": "Ros MM",
      "year": "2007",
      "journal": "Food additives and contaminants"
    },
    {
      "pmid": "34719837",
      "title": "Inhibition of boldenone-induced aggression in rats by curcumin: Targeting TLR4/MyD88/TRAF-6/NF-κB pathway.",
      "firstAuthor": "El-Shamarka ME",
      "year": "2022",
      "journal": "Journal of biochemical and molecular toxicology"
    }
  ],
  "masteron": [
    {
      "pmid": "32245263",
      "title": "Exploring the Polymorphism of Drostanolone Propionate.",
      "firstAuthor": "Borodi G",
      "year": "2020",
      "journal": "Molecules (Basel, Switzerland)"
    },
    {
      "pmid": "26826321",
      "title": "New drostanolone metabolites in human urine by liquid chromatography time-of-flight tandem mass spectrometry and their application for doping control.",
      "firstAuthor": "Liu Y",
      "year": "2016",
      "journal": "Steroids"
    },
    {
      "pmid": "1606052",
      "title": "The methyl-5 alpha-dihydrotestosterones mesterolone and drostanolone; gas chromatographic/mass spectrometric characterization of the urinary metabolites.",
      "firstAuthor": "de Boer D",
      "year": "1992",
      "journal": "The Journal of steroid biochemistry and molecular biology"
    },
    {
      "pmid": "32386339",
      "title": "Searching for new long-term urinary metabolites of metenolone and drostanolone using gas chromatography-mass spectrometry with a focus on non-hydrolysed sulfates.",
      "firstAuthor": "Albertsdóttir AD",
      "year": "2020",
      "journal": "Drug testing and analysis"
    },
    {
      "pmid": "15998196",
      "title": "Intracerebroventricular self-administration of commonly abused anabolic-androgenic steroids in male hamsters (Mesocricetus auratus): nandrolone, drostanolone, oxymetholone, and stanozolol.",
      "firstAuthor": "Ballard CL",
      "year": "2005",
      "journal": "Behavioral neuroscience"
    }
  ],
  "primobolan": [
    {
      "pmid": "36843443",
      "title": "LC-MS/(MS) confirmatory doping control analysis of intact phase II metabolites of methenolone and mesterolone after Girard's Reagent T derivatization.",
      "firstAuthor": "Angelis YS",
      "year": "2023",
      "journal": "Drug testing and analysis"
    },
    {
      "pmid": "26259657",
      "title": "Comparison of sulfo-conjugated and gluco-conjugated urinary metabolites for detection of methenolone misuse in doping control by LC-HRMS, GC-MS and GC-HRMS.",
      "firstAuthor": "Fragkaki AG",
      "year": "2015",
      "journal": "Journal of mass spectrometry : JMS"
    },
    {
      "pmid": "39113433",
      "title": "Evaluation of Methenolone Enanthate Efficacy in Preventing MRONJ: A Randomized Trial on Rats.",
      "firstAuthor": "Gürses G",
      "year": "2024",
      "journal": "Journal of oral pathology & medicine : official publication of the International Association of Oral Pathologists and the American Academy of Oral Pathology"
    },
    {
      "pmid": "32852087",
      "title": "Quantitative analysis of total methenolone in animal source food by liquid chromatography-tandem mass spectrometry.",
      "firstAuthor": "Zheng J",
      "year": "2021",
      "journal": "Drug testing and analysis"
    },
    {
      "pmid": "1606051",
      "title": "Studies on anabolic steroids--11. 18-hydroxylated metabolites of mesterolone, methenolone and stenbolone: new steroids isolated from human urine.",
      "firstAuthor": "Masse R",
      "year": "1992",
      "journal": "The Journal of steroid biochemistry and molecular biology"
    }
  ],
  "anavar": [
    {
      "pmid": "35832568",
      "title": "A Reappraisal of Oxandrolone in Burn Management.",
      "firstAuthor": "Kopel J",
      "year": "2022",
      "journal": "The Journal of pharmacy technology : jPT : official publication of the Association of Pharmacy Technicians"
    },
    {
      "pmid": "25351160",
      "title": "Oxandrolone use in adult burn patients. Systematic review and meta-analysis.",
      "firstAuthor": "Real DS",
      "year": "2014",
      "journal": "Acta cirurgica brasileira"
    },
    {
      "pmid": "31504621",
      "title": "Oxandrolone in the Treatment of Burn Injuries: A Systematic Review and Meta-analysis.",
      "firstAuthor": "Ring J",
      "year": "2020",
      "journal": "Journal of burn care & research : official publication of the American Burn Association"
    },
    {
      "pmid": "8970686",
      "title": "Oxandrolone in AIDS-wasting myopathy.",
      "firstAuthor": "Berger JR",
      "year": "1996",
      "journal": "AIDS (London, England)"
    }
  ],
  "dianabol": [
    {
      "pmid": "14237023",
      "title": "[METHANDROSTENOLONE].",
      "firstAuthor": "IZUMRUDOVA ZL",
      "year": "1964",
      "journal": "Meditsinskaia promyshlennost' SSSR"
    },
    {
      "pmid": "5911066",
      "title": "Methandienone in pulmonary tuberculosis.",
      "firstAuthor": "Bhatia JL",
      "year": "1966",
      "journal": "Journal of the Indian Medical Association"
    },
    {
      "pmid": "6511149",
      "title": "Influence of exercise and Dianabol on the degradation rate of myofibrillar proteins of the heart and three fiber types of skeletal muscle of female guinea pigs.",
      "firstAuthor": "Morano I",
      "year": "1984",
      "journal": "International journal of sports medicine"
    },
    {
      "pmid": "61389",
      "title": "\"Anabolic\" effects of methandienone in men undergoing athletic training.",
      "firstAuthor": "Hervey GR",
      "year": "1976",
      "journal": "Lancet (London, England)"
    },
    {
      "pmid": "6545487",
      "title": "Contractile responses of rat lateral gastrocnemius and soleus to dianabol (17 beta-hydroxy-17-methyl-1,4-androstadien-3-one) and exercise.",
      "firstAuthor": "Lubek BM",
      "year": "1984",
      "journal": "Steroids"
    }
  ],
  "winstrol": [
    {
      "pmid": "20566358",
      "title": "Chromosome damage and cytotoxicity in oral mucosa cells after 2 months of exposure to anabolic steroids (decadurabolin and winstrol) in weight lifting.",
      "firstAuthor": "Martins RA",
      "year": "2010",
      "journal": "Steroids"
    },
    {
      "pmid": "41731624",
      "title": "Empagliflozin and platelet-rich plasma improve stanozolol induced cardiotoxicity by reducing NF-κB/P65, IL-1B and apoptosis.",
      "firstAuthor": "Hafez SM",
      "year": "2026",
      "journal": "BMC pharmacology & toxicology"
    },
    {
      "pmid": "38720122",
      "title": "Effect of Stanozolol and/or Cannabis Abuse on Hypertrophic Mechanism and Oxidative Stress of Male Albino Rat Cardiac Tissue in Relation to Exercise: A Sport Abuse Practice.",
      "firstAuthor": "Mowaad NA",
      "year": "2024",
      "journal": "Cardiovascular toxicology"
    },
    {
      "pmid": "40534105",
      "title": "Protective effects of allicin against stanozolol-induced cardiotoxicity: Physiological and histopathological evidence in a rabbit model.",
      "firstAuthor": "Asker MH",
      "year": "2025",
      "journal": "Animal models and experimental medicine"
    },
    {
      "pmid": "14091139",
      "title": "[STANOZOLOL IN PEDIATRICS].",
      "firstAuthor": "LIS M",
      "year": "1963",
      "journal": "La Semana medica"
    }
  ],
  "clomid": [
    {
      "pmid": "34933414",
      "title": "Clomiphene citrate for men with hypogonadism: a systematic review and meta-analysis.",
      "firstAuthor": "Huijben M",
      "year": "2022",
      "journal": "Andrology"
    },
    {
      "pmid": "36680549",
      "title": "Clomiphene citrate for male infertility: A systematic review and meta-analysis.",
      "firstAuthor": "Huijben M",
      "year": "2023",
      "journal": "Andrology"
    },
    {
      "pmid": "39434750",
      "title": "Safety and efficacy of enclomiphene and clomiphene for hypogonadal men.",
      "firstAuthor": "Saffati G",
      "year": "2024",
      "journal": "Translational andrology and urology"
    },
    {
      "pmid": "39338395",
      "title": "Clomiphene Citrate Treatment as an Alternative Therapeutic Approach for Male Hypogonadism: Mechanisms and Clinical Implications.",
      "firstAuthor": "Wu YC",
      "year": "2024",
      "journal": "Pharmaceuticals (Basel, Switzerland)"
    },
    {
      "pmid": "41066380",
      "title": "Clomiphene or enclomiphene citrate for the treatment of male hypogonadism: a systematic review and meta-analysis of randomized controlled trials.",
      "firstAuthor": "Hohl A",
      "year": "2025",
      "journal": "Archives of endocrinology and metabolism"
    }
  ],
  "nolvadex": [
    {
      "pmid": "36864030",
      "title": "Short-term tamoxifen administration improves hepatic steatosis and glucose intolerance through JNK/MAPK in mice.",
      "firstAuthor": "Fang Z",
      "year": "2023",
      "journal": "Signal transduction and targeted therapy"
    },
    {
      "pmid": "9426725",
      "title": "Tamoxifen for flutamide/finasteride-induced gynecomastia.",
      "firstAuthor": "Staiman VR",
      "year": "1997",
      "journal": "Urology"
    },
    {
      "pmid": "10796497",
      "title": "Clomiphene or tamoxifen for idiopathic oligo/asthenospermia.",
      "firstAuthor": "Vandekerckhove P",
      "year": "2000",
      "journal": "The Cochrane database of systematic reviews"
    }
  ],
  "arimidex": [
    {
      "pmid": "17904790",
      "title": "Aromatase inhibitor and bone.",
      "firstAuthor": "Miki Y",
      "year": "2007",
      "journal": "Biomedicine & pharmacotherapy = Biomedecine & pharmacotherapie"
    },
    {
      "pmid": "10572233",
      "title": "[Aromatase inhibitors].",
      "firstAuthor": "Feutrie ML",
      "year": "1999",
      "journal": "Bulletin du cancer"
    },
    {
      "pmid": "23103016",
      "title": "Aromatase inhibitors for male infertility.",
      "firstAuthor": "Schlegel PN",
      "year": "2012",
      "journal": "Fertility and sterility"
    },
    {
      "pmid": "9394367",
      "title": "Anastrozole: a new selective nonsteroidal aromatase inhibitor.",
      "firstAuthor": "Goss PE",
      "year": "1997",
      "journal": "Oncology (Williston Park, N.Y.)"
    },
    {
      "pmid": "10418994",
      "title": "Aromatase and its inhibitors.",
      "firstAuthor": "Brodie A",
      "year": "1999",
      "journal": "The Journal of steroid biochemistry and molecular biology"
    }
  ],
  "hcg": [
    {
      "pmid": "33345656",
      "title": "Human chorionic gonadotropin treatment: a viable option for management of secondary hypogonadism and male infertility.",
      "firstAuthor": "Fink J",
      "year": "2021",
      "journal": "Expert review of endocrinology & metabolism"
    },
    {
      "pmid": "39442683",
      "title": "Optimal restoration of spermatogenesis after testosterone therapy using human chorionic gonadotropin and follicle-stimulating hormone.",
      "firstAuthor": "Stocks BT",
      "year": "2025",
      "journal": "Fertility and sterility"
    },
    {
      "pmid": "37673783",
      "title": "Insulin-like Factor 3, Basal and Human Chorionic Gonadotropin-Stimulated Testosterone as Biomarkers to Predict the Effect of Testosterone Replacement in Testicular Cancer Survivors With Mild Leydig Cell Insufficiency.",
      "firstAuthor": "Medici C",
      "year": "2024",
      "journal": "Clinical genitourinary cancer"
    },
    {
      "pmid": "39901824",
      "title": "Human chorionic gonadotropin-based clinical treatments for infertile men with non-obstructive azoospermia.",
      "firstAuthor": "Esteves SC",
      "year": "2026",
      "journal": "Andrology"
    },
    {
      "pmid": "38572627",
      "title": "Fertility outcomes in male adults with congenital hypogonadotropic hypogonadism treated during puberty with human chorionic gonadotropin and recombinant follicle stimulating hormone.",
      "firstAuthor": "Grob F",
      "year": "2024",
      "journal": "Journal of paediatrics and child health"
    }
  ]
};

export function getVerifiedSourcesFor(slug: string): VerifiedSource[] {
  return VERIFIED_SOURCES[slug] || [];
}
