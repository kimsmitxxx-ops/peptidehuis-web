/**
 * Curated VERIFIED wetenschappelijke bronnen per stof.
 *
 * IEDERE bron komt rechtstreeks uit PubMed ESEARCH met een stof-
 * specifieke query (mesh-terms in title/abstract). Auto-gegenereerd
 * door shop-dash/scripts/build-stof-sources.mjs — NIET handmatig
 * citaten schrijven, dat leidt tot mismatches met PMID.
 *
 * Re-build: node scripts/build-stof-sources.mjs > <output-pad>
 * Gegenereerd: 2026-06-25T12:36:20.040Z
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
      "pmid": "29210989",
      "title": "Supraphysiologic Testosterone Therapy in the Treatment of Prostate Cancer: Models, Mechanisms and Questions.",
      "firstAuthor": "Mohammad OS",
      "year": "2017",
      "journal": "Cancers"
    },
    {
      "pmid": "31334979",
      "title": "Anabolic Steroid Toxicity.",
      "firstAuthor": "Middlebrook I",
      "year": "2026",
      "journal": ""
    }
  ],
  "nandrolon": [
    {
      "pmid": "38887114",
      "title": "Impact of trenbolone on selected organs.",
      "firstAuthor": "Borecki R",
      "year": "2024",
      "journal": "Endokrynologia Polska"
    },
    {
      "pmid": "33187340",
      "title": "Nandrolone Decanoate: Use, Abuse and Side Effects.",
      "firstAuthor": "Patanè FG",
      "year": "2020",
      "journal": "Medicina (Kaunas, Lithuania)"
    },
    {
      "pmid": "33158202",
      "title": "Sudden Cardiac Death in Anabolic-Androgenic Steroid Users: A Literature Review.",
      "firstAuthor": "Torrisi M",
      "year": "2020",
      "journal": "Medicina (Kaunas, Lithuania)"
    },
    {
      "pmid": "38003989",
      "title": "Effects of Nandrolone Decanoate on Skeletal Muscle and Neuromuscular Junction of Sedentary and Exercised Rats.",
      "firstAuthor": "Tibúrcio FC",
      "year": "2023",
      "journal": "Medicina (Kaunas, Lithuania)"
    },
    {
      "pmid": "41936385",
      "title": "Effects of Nandrolone Decanoate on Muscle Strength, Body Composition and Bone Density: A Systematic Review and Meta-Analysis.",
      "firstAuthor": "Prokopidis K",
      "year": "2026",
      "journal": "Journal of cachexia, sarcopenia and muscle"
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
      "pmid": "24243897",
      "title": "MEAT SCIENCE AND MUSCLE BIOLOGY SYMPOSIUM--anabolic implants and meat quality.",
      "firstAuthor": "Duckett SK",
      "year": "2014",
      "journal": "Journal of animal science"
    },
    {
      "pmid": "24928725",
      "title": "Transcriptional regulation of myotrophic actions by testosterone and trenbolone on androgen-responsive muscle.",
      "firstAuthor": "Ye F",
      "year": "2014",
      "journal": "Steroids"
    },
    {
      "pmid": "782871",
      "title": "Pharmacological and endocrinological studies on anabolic agents.",
      "firstAuthor": "Neumann F",
      "year": "1976",
      "journal": "Environmental quality and safety. Supplement"
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
      "pmid": "21204296",
      "title": "Sulbutiamine in sports.",
      "firstAuthor": "Sobolevsky T",
      "year": "2010",
      "journal": "Drug testing and analysis"
    },
    {
      "pmid": "30817935",
      "title": "Supraphysiologic-dose anabolic-androgenic steroid use: A risk factor for dementia?",
      "firstAuthor": "Kaufman MJ",
      "year": "2019",
      "journal": "Neuroscience and biobehavioral reviews"
    },
    {
      "pmid": "37264491",
      "title": "A review of current chemistry, pharmacology, and regulation of endogenous anabolic steroids testosterone, boldenone, and nandrolone in horses.",
      "firstAuthor": "Dirikolu L",
      "year": "2023",
      "journal": "Journal of veterinary pharmacology and therapeutics"
    },
    {
      "pmid": "38474077",
      "title": "Anabolic Steroids Activate the NF-κB Pathway in Porcine Ovarian Putative Stem Cells Independently of the ZIP-9 Receptor.",
      "firstAuthor": "Wartalski K",
      "year": "2024",
      "journal": "International journal of molecular sciences"
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
      "pmid": "15998196",
      "title": "Intracerebroventricular self-administration of commonly abused anabolic-androgenic steroids in male hamsters (Mesocricetus auratus): nandrolone, drostanolone, oxymetholone, and stanozolol.",
      "firstAuthor": "Ballard CL",
      "year": "2005",
      "journal": "Behavioral neuroscience"
    },
    {
      "pmid": "26826321",
      "title": "New drostanolone metabolites in human urine by liquid chromatography time-of-flight tandem mass spectrometry and their application for doping control.",
      "firstAuthor": "Liu Y",
      "year": "2016",
      "journal": "Steroids"
    },
    {
      "pmid": "32386339",
      "title": "Searching for new long-term urinary metabolites of metenolone and drostanolone using gas chromatography-mass spectrometry with a focus on non-hydrolysed sulfates.",
      "firstAuthor": "Albertsdóttir AD",
      "year": "2020",
      "journal": "Drug testing and analysis"
    },
    {
      "pmid": "36516229",
      "title": "The Power of Keratinous Matrices (Head Hair, Body Hair and Nail Clippings) Analysis in a Case of Death Involving Anabolic Agents.",
      "firstAuthor": "Gheddar L",
      "year": "2023",
      "journal": "Journal of analytical toxicology"
    }
  ],
  "primobolan": [
    {
      "pmid": "39884271",
      "title": "Identification, structure, and agonist design of an androgen membrane receptor.",
      "firstAuthor": "Yang Z",
      "year": "2025",
      "journal": "Cell"
    },
    {
      "pmid": "41225275",
      "title": "Method validation for the detection of the anabolic-androgenic steroids methenolone and 19-norandrosterone in wastewater and application to real wastewater samples.",
      "firstAuthor": "Ertas BS",
      "year": "2025",
      "journal": "Environmental monitoring and assessment"
    },
    {
      "pmid": "17216314",
      "title": "Metabolism of methenolone acetate in a veal calf.",
      "firstAuthor": "Van Hoof N",
      "year": "2007",
      "journal": "Veterinary research communications"
    },
    {
      "pmid": "782871",
      "title": "Pharmacological and endocrinological studies on anabolic agents.",
      "firstAuthor": "Neumann F",
      "year": "1976",
      "journal": "Environmental quality and safety. Supplement"
    },
    {
      "pmid": "39113433",
      "title": "Evaluation of Methenolone Enanthate Efficacy in Preventing MRONJ: A Randomized Trial on Rats.",
      "firstAuthor": "Gürses G",
      "year": "2024",
      "journal": "Journal of oral pathology & medicine : official publication of the International Association of Oral Pathologists and the American Academy of Oral Pathology"
    }
  ],
  "anavar": [
    {
      "pmid": "38746694",
      "title": "Nutrition in Pediatric Burns.",
      "firstAuthor": "Mrazek AA",
      "year": "2024",
      "journal": "Seminars in plastic surgery"
    },
    {
      "pmid": "23582468",
      "title": "ESPEN endorsed recommendations: nutritional therapy in major burns.",
      "firstAuthor": "Rousseau AF",
      "year": "2013",
      "journal": "Clinical nutrition (Edinburgh, Scotland)"
    },
    {
      "pmid": "16932191",
      "title": "Oxandrolone.",
      "firstAuthor": "Akyurek M",
      "year": "2006",
      "journal": "Plastic and reconstructive surgery"
    },
    {
      "pmid": "38177003",
      "title": "Persistent inflammation, immunosuppression, and catabolism syndrome (PICS): a review of definitions, potential therapies, and research priorities.",
      "firstAuthor": "Chadda KR",
      "year": "2024",
      "journal": "British journal of anaesthesia"
    },
    {
      "pmid": "37149383",
      "title": "Metabolic and Nutritional Support.",
      "firstAuthor": "Shahrokhi S",
      "year": "2023",
      "journal": "The Surgical clinics of North America"
    }
  ],
  "dianabol": [
    {
      "pmid": "3044464",
      "title": "Drug-induced pancreatitis.",
      "firstAuthor": "Mallory A",
      "year": "1988",
      "journal": "Bailliere's clinical gastroenterology"
    },
    {
      "pmid": "14237023",
      "title": "[METHANDROSTENOLONE].",
      "firstAuthor": "IZUMRUDOVA ZL",
      "year": "1964",
      "journal": "Meditsinskaia promyshlennost' SSSR"
    },
    {
      "pmid": "14298727",
      "title": "PELIOSIS HEPATITIS.",
      "firstAuthor": "MACKAY RC",
      "year": "1965",
      "journal": "Southern medical journal"
    },
    {
      "pmid": "14259901",
      "title": "HORMONE-SULPHATASE RELATIONSHIPS.",
      "firstAuthor": "PULKKINEN MO",
      "year": "1965",
      "journal": "Acta endocrinologica"
    },
    {
      "pmid": "15744984",
      "title": "Methandienone (Dianabol) in corneal ulcers.",
      "firstAuthor": "Mathur KN",
      "year": "1971",
      "journal": "Indian journal of ophthalmology"
    }
  ],
  "winstrol": [
    {
      "pmid": "33158202",
      "title": "Sudden Cardiac Death in Anabolic-Androgenic Steroid Users: A Literature Review.",
      "firstAuthor": "Torrisi M",
      "year": "2020",
      "journal": "Medicina (Kaunas, Lithuania)"
    },
    {
      "pmid": "8844628",
      "title": "Effects of androgens on haemostasis.",
      "firstAuthor": "Winkler UH",
      "year": "1996",
      "journal": "Maturitas"
    },
    {
      "pmid": "8463465",
      "title": "The clinical spectrum of lipodermatosclerosis.",
      "firstAuthor": "Kirsner RS",
      "year": "1993",
      "journal": "Journal of the American Academy of Dermatology"
    },
    {
      "pmid": "24832911",
      "title": "Anabolic-androgenic steroid use among Brazilian bodybuilders.",
      "firstAuthor": "Nogueira FR",
      "year": "2014",
      "journal": "Substance use & misuse"
    },
    {
      "pmid": "20020362",
      "title": "Synthetic anabolic agents: steroids and nonsteroidal selective androgen receptor modulators.",
      "firstAuthor": "Thevis M",
      "year": "2010",
      "journal": "Handbook of experimental pharmacology"
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
      "pmid": "24636400",
      "title": "Anabolic steroid-induced hypogonadism: diagnosis and treatment.",
      "firstAuthor": "Rahnema CD",
      "year": "2014",
      "journal": "Fertility and sterility"
    },
    {
      "pmid": "36680549",
      "title": "Clomiphene citrate for male infertility: A systematic review and meta-analysis.",
      "firstAuthor": "Huijben M",
      "year": "2023",
      "journal": "Andrology"
    },
    {
      "pmid": "33375030",
      "title": "Treatment of Men with Central Hypogonadism: Alternatives for Testosterone Replacement Therapy.",
      "firstAuthor": "Ide V",
      "year": "2020",
      "journal": "International journal of molecular sciences"
    },
    {
      "pmid": "3127422",
      "title": "Inhibin.",
      "firstAuthor": "McNeilly AS",
      "year": "1988",
      "journal": "Human reproduction (Oxford, England)"
    }
  ],
  "nolvadex": [
    {
      "pmid": "24636400",
      "title": "Anabolic steroid-induced hypogonadism: diagnosis and treatment.",
      "firstAuthor": "Rahnema CD",
      "year": "2014",
      "journal": "Fertility and sterility"
    },
    {
      "pmid": "37592101",
      "title": "Gynecomastia.",
      "firstAuthor": "Ayyavoo A",
      "year": "2023",
      "journal": "Indian journal of pediatrics"
    },
    {
      "pmid": "33375030",
      "title": "Treatment of Men with Central Hypogonadism: Alternatives for Testosterone Replacement Therapy.",
      "firstAuthor": "Ide V",
      "year": "2020",
      "journal": "International journal of molecular sciences"
    },
    {
      "pmid": "25097095",
      "title": "Adverse effects of androgen deprivation therapy and strategies to mitigate them.",
      "firstAuthor": "Nguyen PL",
      "year": "2015",
      "journal": "European urology"
    },
    {
      "pmid": "36864030",
      "title": "Short-term tamoxifen administration improves hepatic steatosis and glucose intolerance through JNK/MAPK in mice.",
      "firstAuthor": "Fang Z",
      "year": "2023",
      "journal": "Signal transduction and targeted therapy"
    }
  ],
  "arimidex": [
    {
      "pmid": "38021712",
      "title": "Precocious Puberty: Types, Pathogenesis and Updated Management.",
      "firstAuthor": "Alghamdi A",
      "year": "2023",
      "journal": "Cureus"
    },
    {
      "pmid": "37592101",
      "title": "Gynecomastia.",
      "firstAuthor": "Ayyavoo A",
      "year": "2023",
      "journal": "Indian journal of pediatrics"
    },
    {
      "pmid": "16361981",
      "title": "Testotoxicosis: current viewpoint.",
      "firstAuthor": "Reiter EO",
      "year": "2005",
      "journal": "Pediatric endocrinology reviews : PER"
    },
    {
      "pmid": "42258614",
      "title": "ATM-Related Cancer Predisposition.",
      "firstAuthor": "Adam MP",
      "year": "1993",
      "journal": ""
    },
    {
      "pmid": "40326775",
      "title": "The Combination of Aromatase Inhibitors and GH Treatment for Idiopathic Short Stature in Male Adolescents.",
      "firstAuthor": "Cui Y",
      "year": "2025",
      "journal": "The Journal of clinical endocrinology and metabolism"
    }
  ],
  "hcg": [
    {
      "pmid": "38683021",
      "title": "A Current Perspective on Delayed Puberty and Its Management.",
      "firstAuthor": "Abacı A",
      "year": "2024",
      "journal": "Journal of clinical research in pediatric endocrinology"
    },
    {
      "pmid": "32010061",
      "title": "Hypogonadism and Cryptorchidism.",
      "firstAuthor": "Rodprasert W",
      "year": "2019",
      "journal": "Frontiers in endocrinology"
    },
    {
      "pmid": "31983283",
      "title": "m(6)A mRNA methylation regulates testosterone synthesis through modulating autophagy in Leydig cells.",
      "firstAuthor": "Chen Y",
      "year": "2021",
      "journal": "Autophagy"
    },
    {
      "pmid": "33345656",
      "title": "Human chorionic gonadotropin treatment: a viable option for management of secondary hypogonadism and male infertility.",
      "firstAuthor": "Fink J",
      "year": "2021",
      "journal": "Expert review of endocrinology & metabolism"
    },
    {
      "pmid": "27132576",
      "title": "Testosterone and Male Infertility.",
      "firstAuthor": "Ohlander SJ",
      "year": "2016",
      "journal": "The Urologic clinics of North America"
    }
  ]
};

export function getVerifiedSourcesFor(slug: string): VerifiedSource[] {
  return VERIFIED_SOURCES[slug] || [];
}
