/**
 * All site content lives here. Edit this file to update numbers, text or images.
 *
 * Figures verified by web search on 2026-09-25. Different stat providers count
 * some things differently (especially assists, and whether youth titles count as
 * "trophies"), so where sources disagree the note next to the figure says which
 * one is used. When you update numbers, bump LAST_UPDATED as well.
 */

export const LAST_UPDATED = '2026-09-25'

/* ------------------------------------------------------------------ */
/* Hero + career totals                                                */
/* ------------------------------------------------------------------ */

/*
 * Source: career-total trackers (messixronaldo.com, "929 Career Goals (September 2026)")
 * and Inter Miami CF's "Leo Messi Reaches 100 Goals for Inter Miami CF" (Sept 2026).
 * Split: Barcelona 672 + PSG 32 + Inter Miami 100 + Argentina 125 = 929.
 */
export const hero = {
  firstName: 'Lionel',
  lastName: 'Messi',
  tagline: 'From the streets of Rosario to the summit of the game.',
  careerGoals: 929,
  careerGoalsLabel: 'official career goals',
}

export type TotalStat = {
  label: string
  value: number
  suffix?: string
  note?: string
}

/*
 * Sources:
 * - Goals / appearances: messixronaldo.com & messistat.com (929 goals in 1,175 official matches, Sept 2026).
 * - Assists: providers range from ~385 to 460+ depending on what counts as an assist;
 *   "400+" is used as a conservative figure most trackers agree on.
 * - Trophies: MLSsoccer.com, "Lionel Messi lifts record 48th trophy as Inter Miami win Campeones Cup" (Sept 2026).
 * - Ballon d'Or: 2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023 (Britannica / ballondor.com).
 * - Argentina: 125 goals in 207 caps (FOX Sports / messistat.com after the 2026 World Cup).
 * - World Cup: 21 goals, 34 matches (FOX Sports "All 21 of Lionel Messi's FIFA World Cup goals", Britannica).
 */
export const careerTotals: TotalStat[] = [
  { label: 'Career goals', value: 929 },
  { label: 'Career assists', value: 400, suffix: '+', note: 'Counts vary by provider' },
  { label: 'Official matches', value: 1175 },
  { label: 'Trophies', value: 48, note: 'Most in football history' },
  { label: "Ballon d'Or", value: 8 },
  { label: 'Argentina goals', value: 125, note: 'in 207 caps' },
  { label: 'World Cup goals', value: 21, note: 'All-time record' },
  { label: 'World Cup matches', value: 34, note: 'All-time record' },
]

/* ------------------------------------------------------------------ */
/* Season-by-season club numbers (all competitions)                    */
/* ------------------------------------------------------------------ */

export type Season = {
  season: string
  club: 'Barcelona' | 'PSG' | 'Inter Miami'
  goals: number
  assists: number
}

/*
 * Goals: Barcelona & PSG seasons follow Transfermarkt/FBref all-competition totals
 * (Barcelona sums to 672, PSG to 32). Inter Miami by calendar year per Inter Miami CF's
 * 100-goal release: 2023 = 11, 2024 = 23, 2025 = 43, 2026 = 23 (season still in progress).
 * Assists: Transfermarkt-style counts; assist totals differ between providers, so treat as
 * approximate. 2025 = 19 MLS + 9 MLS Cup playoffs + other competitions (MLSsoccer.com).
 */
export const seasons: Season[] = [
  { season: '04/05', club: 'Barcelona', goals: 1, assists: 0 },
  { season: '05/06', club: 'Barcelona', goals: 8, assists: 3 },
  { season: '06/07', club: 'Barcelona', goals: 17, assists: 3 },
  { season: '07/08', club: 'Barcelona', goals: 16, assists: 13 },
  { season: '08/09', club: 'Barcelona', goals: 38, assists: 18 },
  { season: '09/10', club: 'Barcelona', goals: 47, assists: 11 },
  { season: '10/11', club: 'Barcelona', goals: 53, assists: 24 },
  { season: '11/12', club: 'Barcelona', goals: 73, assists: 29 },
  { season: '12/13', club: 'Barcelona', goals: 60, assists: 15 },
  { season: '13/14', club: 'Barcelona', goals: 41, assists: 15 },
  { season: '14/15', club: 'Barcelona', goals: 58, assists: 27 },
  { season: '15/16', club: 'Barcelona', goals: 41, assists: 23 },
  { season: '16/17', club: 'Barcelona', goals: 54, assists: 21 },
  { season: '17/18', club: 'Barcelona', goals: 45, assists: 23 },
  { season: '18/19', club: 'Barcelona', goals: 51, assists: 22 },
  { season: '19/20', club: 'Barcelona', goals: 31, assists: 25 },
  { season: '20/21', club: 'Barcelona', goals: 38, assists: 14 },
  { season: '21/22', club: 'PSG', goals: 11, assists: 15 },
  { season: '22/23', club: 'PSG', goals: 21, assists: 20 },
  { season: '2023', club: 'Inter Miami', goals: 11, assists: 5 },
  { season: '2024', club: 'Inter Miami', goals: 23, assists: 18 },
  { season: '2025', club: 'Inter Miami', goals: 43, assists: 30 },
  { season: '2026*', club: 'Inter Miami', goals: 23, assists: 15 },
]

/* Source: goal splits as in `hero` above; appearances from Transfermarkt / Inter Miami CF. */
export const clubSplits = [
  { name: 'Barcelona', goals: 672, apps: 778 },
  { name: 'PSG', goals: 32, apps: 75 },
  { name: 'Inter Miami', goals: 100, apps: 115 },
  { name: 'Argentina', goals: 125, apps: 207 },
]

/* ------------------------------------------------------------------ */
/* Career timeline                                                     */
/* ------------------------------------------------------------------ */

export type TimelineStage = {
  id: string
  period: string
  title: string
  place: string
  summary: string
  moments: { year: string; text: string }[]
}

/* Source: widely documented biography (Britannica "Lionel Messi"), plus MLSsoccer.com for 2023–2026. */
export const timeline: TimelineStage[] = [
  {
    id: 'rosario',
    period: '1987 – 2000',
    title: 'Rosario',
    place: 'Argentina',
    summary:
      'Born on 24 June 1987, Leo grew up playing with his brothers and cousins before joining the youth ranks of Newell\'s Old Boys.',
    moments: [
      { year: '1987', text: 'Born in Rosario, Santa Fe.' },
      { year: '1994', text: 'Joins Newell\'s Old Boys youth system — "La Máquina del \'87".' },
      { year: '1998', text: 'Diagnosed with a growth hormone deficiency at age 11.' },
    ],
  },
  {
    id: 'la-masia',
    period: '2000 – 2004',
    title: 'La Masia',
    place: 'Barcelona, Spain',
    summary:
      'A trial in Barcelona leads to a now-famous agreement written on a paper napkin. The club covers his treatment and he rises through the academy.',
    moments: [
      { year: '2000', text: 'The napkin agreement is signed in December.' },
      { year: '2003', text: 'Stars for the "Baby Dream Team" youth side with Piqué and Fàbregas.' },
      { year: '2004', text: 'First-team debut at 17 against Espanyol.' },
    ],
  },
  {
    id: 'barcelona',
    period: '2004 – 2021',
    title: 'FC Barcelona',
    place: 'Spain',
    summary:
      'Seventeen seasons, 672 goals and 35 trophies. The most prolific spell a player has ever had at a single club.',
    moments: [
      { year: '2005', text: 'First senior goal vs Albacete; U-20 World Cup winner with Argentina.' },
      { year: '2009', text: 'Historic sextuple and first Ballon d\'Or.' },
      { year: '2012', text: '91 goals in a calendar year — a world record.' },
      { year: '2015', text: 'Second treble, with the MSN attack.' },
      { year: '2021', text: 'Leaves as the club\'s all-time top scorer.' },
    ],
  },
  {
    id: 'psg',
    period: '2021 – 2023',
    title: 'Paris Saint-Germain',
    place: 'France',
    summary:
      'Two Ligue 1 titles in Paris, and a seventh and eighth Ballon d\'Or earned on either side of World Cup glory.',
    moments: [
      { year: '2021', text: 'Wins a seventh Ballon d\'Or after the Copa América.' },
      { year: '2022', text: 'World Cup champion in Qatar, named player of the tournament.' },
      { year: '2023', text: 'Second Ligue 1 title; record eighth Ballon d\'Or.' },
    ],
  },
  {
    id: 'inter-miami',
    period: '2023 – present',
    title: 'Inter Miami CF',
    place: 'United States',
    summary:
      'Brought instant silverware to a young club: four trophies, back-to-back MLS MVP awards and a hundred goals.',
    moments: [
      { year: '2023', text: 'Leagues Cup winner in his first month.' },
      { year: '2024', text: 'Supporters\' Shield and first MLS MVP; second straight Copa América with Argentina.' },
      { year: '2025', text: 'Golden Boot (29 goals), second MVP and the club\'s first MLS Cup.' },
      { year: '2026', text: 'Becomes the all-time World Cup top scorer; Campeones Cup brings trophy No. 48.' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Trophy cabinet                                                      */
/* ------------------------------------------------------------------ */

export type TrophyCategory = 'Club' | 'International' | 'Individual'

export type Trophy = {
  name: string
  category: TrophyCategory
  team?: string
  count: number
  years: string[]
  icon: 'trophy' | 'globe' | 'star' | 'medal' | 'crown' | 'shield' | 'boot' | 'award'
}

/*
 * Team trophies (48 total): Barcelona 35, PSG 3, Argentina 6 (incl. Olympic gold and U-20 World Cup),
 * Inter Miami 4 — per MLSsoccer.com / World Soccer Talk (Campeones Cup, Sept 2026).
 * Individual awards: Britannica, ballondor.com, MLSsoccer.com (2024/2025 MVP, 2025 Golden Boot,
 * 2025 MLS Cup MVP), Yahoo Sports (2026 World Cup awards: Rodri won the Golden Ball, Messi the Silver Ball).
 */
export const trophies: Trophy[] = [
  // International
  { name: 'FIFA World Cup', category: 'International', team: 'Argentina', count: 1, years: ['2022'], icon: 'globe' },
  { name: 'Copa América', category: 'International', team: 'Argentina', count: 2, years: ['2021', '2024'], icon: 'trophy' },
  { name: 'Finalissima', category: 'International', team: 'Argentina', count: 1, years: ['2022'], icon: 'trophy' },
  { name: 'Olympic Gold', category: 'International', team: 'Argentina', count: 1, years: ['2008'], icon: 'medal' },
  { name: 'FIFA U-20 World Cup', category: 'International', team: 'Argentina', count: 1, years: ['2005'], icon: 'trophy' },

  // Club
  { name: 'UEFA Champions League', category: 'Club', team: 'Barcelona', count: 4, years: ['2006', '2009', '2011', '2015'], icon: 'trophy' },
  { name: 'La Liga', category: 'Club', team: 'Barcelona', count: 10, years: ['2005', '2006', '2009', '2010', '2011', '2013', '2015', '2016', '2018', '2019'], icon: 'shield' },
  { name: 'Copa del Rey', category: 'Club', team: 'Barcelona', count: 7, years: ['2009', '2012', '2015', '2016', '2017', '2018', '2021'], icon: 'trophy' },
  { name: 'Supercopa de España', category: 'Club', team: 'Barcelona', count: 8, years: ['2005', '2006', '2009', '2010', '2011', '2013', '2016', '2018'], icon: 'trophy' },
  { name: 'UEFA Super Cup', category: 'Club', team: 'Barcelona', count: 3, years: ['2009', '2011', '2015'], icon: 'trophy' },
  { name: 'FIFA Club World Cup', category: 'Club', team: 'Barcelona', count: 3, years: ['2009', '2011', '2015'], icon: 'globe' },
  { name: 'Ligue 1', category: 'Club', team: 'PSG', count: 2, years: ['2022', '2023'], icon: 'shield' },
  { name: 'Trophée des Champions', category: 'Club', team: 'PSG', count: 1, years: ['2022'], icon: 'trophy' },
  { name: 'Leagues Cup', category: 'Club', team: 'Inter Miami', count: 1, years: ['2023'], icon: 'trophy' },
  { name: "MLS Supporters' Shield", category: 'Club', team: 'Inter Miami', count: 1, years: ['2024'], icon: 'shield' },
  { name: 'MLS Cup', category: 'Club', team: 'Inter Miami', count: 1, years: ['2025'], icon: 'trophy' },
  { name: 'Campeones Cup', category: 'Club', team: 'Inter Miami', count: 1, years: ['2026'], icon: 'trophy' },

  // Individual
  { name: "Ballon d'Or", category: 'Individual', count: 8, years: ['2009', '2010', '2011', '2012', '2015', '2019', '2021', '2023'], icon: 'crown' },
  { name: 'European Golden Shoe', category: 'Individual', count: 6, years: ['2010', '2012', '2013', '2017', '2018', '2019'], icon: 'boot' },
  { name: 'The Best FIFA Men\'s Player', category: 'Individual', count: 3, years: ['2019', '2022', '2023'], icon: 'star' },
  { name: 'FIFA World Player of the Year', category: 'Individual', count: 1, years: ['2009'], icon: 'star' },
  { name: 'World Cup Golden Ball', category: 'Individual', count: 2, years: ['2014', '2022'], icon: 'award' },
  { name: 'World Cup Silver Ball', category: 'Individual', count: 1, years: ['2026'], icon: 'award' },
  { name: 'UEFA Men\'s Player of the Year', category: 'Individual', count: 2, years: ['2011', '2015'], icon: 'star' },
  { name: 'Pichichi (La Liga top scorer)', category: 'Individual', count: 8, years: ['2010', '2012', '2013', '2017', '2018', '2019', '2020', '2021'], icon: 'boot' },
  { name: 'MLS MVP', category: 'Individual', count: 2, years: ['2024', '2025'], icon: 'award' },
  { name: 'MLS Golden Boot', category: 'Individual', count: 1, years: ['2025'], icon: 'boot' },
  { name: 'MLS Cup MVP', category: 'Individual', count: 1, years: ['2025'], icon: 'award' },
]

/* ------------------------------------------------------------------ */
/* Records                                                             */
/* ------------------------------------------------------------------ */

export type RecordItem = {
  value: string
  title: string
  detail: string
}

/*
 * Sources: Britannica (Ballon d'Or, World Cup appearances), FOX Sports & NBC (2026 World Cup goals, 21 total),
 * MLSsoccer.com (48 trophies; back-to-back MVP; 2025 MLS Cup playoff record), Guinness World Records
 * (91 goals in 2012), La Liga records (474 goals, 50 in 2011/12).
 */
export const records: RecordItem[] = [
  { value: '48', title: 'Most trophies ever', detail: 'The most decorated footballer in history, clear of the next-best tally of 44.' },
  { value: '8', title: "Most Ballon d'Or wins", detail: 'Twice as many as anyone else in the award\'s history.' },
  { value: '21', title: 'Most World Cup goals', detail: 'Passed Miroslav Klose\'s 16 during the 2026 World Cup, where he scored eight.' },
  { value: '34', title: 'Most World Cup matches', detail: 'Across a record six World Cups, from 2006 to 2026.' },
  { value: '91', title: 'Goals in a calendar year', detail: 'Scored for Barcelona and Argentina in 2012, a world record.' },
  { value: '672', title: 'Goals for one club', detail: 'Barcelona\'s all-time top scorer and the most goals for a single club.' },
  { value: '474', title: 'Most La Liga goals', detail: 'Including a record 50 in the 2011/12 season alone.' },
  { value: '6', title: 'European Golden Shoes', detail: 'More than any other player in the award\'s history.' },
  { value: '2', title: 'World Cup Golden Balls', detail: 'The only player to be named best player of the tournament twice (2014, 2022).' },
  { value: '2×', title: 'Back-to-back MLS MVP', detail: 'First player in MLS history to win the award in consecutive seasons (2024, 2025).' },
]

/* ------------------------------------------------------------------ */
/* Greatest moments carousel                                           */
/* ------------------------------------------------------------------ */

export type Moment = {
  year: string
  title: string
  description: string
  /** Put an image path here (e.g. '/images/getafe.jpg') once you have a licensed photo. */
  image?: string
  imageAlt: string
}

/* Source: widely documented match reports; 2026 World Cup details per NBC / FOX Sports / Yahoo Sports. */
export const moments: Moment[] = [
  {
    year: '2007',
    title: 'The Getafe solo goal',
    description: 'A teenage Messi collects the ball in his own half and dribbles past five players to score — a near-copy of Maradona\'s 1986 masterpiece.',
    imageAlt: 'Placeholder for a photo of Messi dribbling through the Getafe defence in 2007',
  },
  {
    year: '2009',
    title: 'Header in Rome',
    description: 'The smallest man on the pitch rises to head in the second goal of the Champions League final, sealing Barcelona\'s treble.',
    imageAlt: 'Placeholder for a photo of Messi\'s header in the 2009 Champions League final',
  },
  {
    year: '2012',
    title: '91 goals in a year',
    description: 'A calendar year of relentless scoring that broke Gerd Müller\'s 40-year-old record of 85.',
    imageAlt: 'Placeholder for a photo from Messi\'s record-breaking 2012',
  },
  {
    year: '2015',
    title: 'Boateng on the floor',
    description: 'A feint that leaves a defender sitting, then a delicate chip over the keeper in a Champions League semi-final against Bayern.',
    imageAlt: 'Placeholder for a photo of Messi\'s chip against Bayern Munich in 2015',
  },
  {
    year: '2021',
    title: 'Glory at the Maracanã',
    description: 'At last, a senior title with Argentina: the Copa América, won in Brazil, ends a 28-year wait.',
    imageAlt: 'Placeholder for a photo of Messi lifting the 2021 Copa América',
  },
  {
    year: '2022',
    title: 'World champion',
    description: 'Two goals in a final for the ages in Lusail, a penalty shoot-out win over France, and the one trophy missing from his cabinet.',
    imageAlt: 'Placeholder for a photo of Messi lifting the 2022 World Cup',
  },
  {
    year: '2025',
    title: 'MLS Cup at home',
    description: 'A record 15 goal contributions in the playoffs, capped by a 3–1 final win over Vancouver for Inter Miami\'s first MLS Cup.',
    imageAlt: 'Placeholder for a photo of Messi celebrating the 2025 MLS Cup',
  },
  {
    year: '2026',
    title: 'Beyond Klose',
    description: 'A hat-trick on his 200th cap, then goal No. 17 to become the World Cup\'s all-time top scorer. Argentina fell 1–0 in the final, but he finished with eight goals.',
    imageAlt: 'Placeholder for a photo of Messi at the 2026 World Cup',
  },
]

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const tribute = {
  // An original line written for this site — not a real quote.
  quote:
    'Some players are remembered for what they won. He will be remembered for how he made the rest of us feel while he won it.',
  attribution: 'A tribute from the fans',
}

export const sources = [
  { label: 'MLSsoccer.com', href: 'https://www.mlssoccer.com/news/lionel-messi-lifts-record-48th-trophy-as-inter-miami-win-campeones-cup' },
  { label: 'Inter Miami CF', href: 'https://www.intermiamicf.com/news/leo-messi-reaches-100-goals-for-inter-miami-cf' },
  { label: 'FOX Sports', href: 'https://www.foxsports.com/stories/soccer/messi-2026-world-cup-goals-ranked' },
  { label: 'Yahoo Sports', href: 'https://sports.yahoo.com/articles/every-award-winner-2026-world-233500005.html' },
  { label: 'Britannica', href: 'https://www.britannica.com/biography/Lionel-Messi' },
]
