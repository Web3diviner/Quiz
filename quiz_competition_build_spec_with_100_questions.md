# Quiz Competition Website — Build Specification + 100-Question Bank

This file extends the original frontend-only quiz competition build specification with a ready-to-import question bank.

## Question Bank Composition

- 30 Nigeria Current Affairs questions — verified as a snapshot for **30 September 2026**
- 40 Bible questions
- 20 Growth Mindset questions
- 10 General Knowledge tie-breaker questions

> Note: The three requested category counts total 90, so 10 general-knowledge tie-breakers were added to make the bank exactly 100 questions.

## Implementation Requirement

Load the following question bank into the application's default `sampleQuestions.ts` or equivalent seed file. The organizer must still be able to edit, delete, reorder, import, or replace these questions from the Question Bank screen.

The Nigeria Current Affairs category should display a small label such as `Current Affairs snapshot: 30 Sep 2026` so organizers know those questions may need refreshing in future competitions.

## Current Affairs Verification Sources

- State House, Abuja — current Presidency leadership and 2026 budget materials.
- National Assembly of Nigeria — 10th National Assembly leadership.
- Supreme Court of Nigeria — Chief Justice profile.
- Central Bank of Nigeria — Governor profile, September 2026 MPC decisions, and Payments System Vision 2028.
- National Bureau of Statistics — CPI rebasing and current headline inflation figure.
- FIBA — Nigeria's 2025 Women's AfroBasket title.
- Reuters — Nigeria's historic 2024 Olympic women's basketball quarter-final qualification.

## Ready-to-Import Question Bank

```json
[
  {
    "id": "q1",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Who is the President of the Federal Republic of Nigeria as of September 2026?",
    "options": {
      "A": "Bola Ahmed Tinubu",
      "B": "Kashim Shettima",
      "C": "Goodluck Jonathan",
      "D": "Muhammadu Buhari"
    },
    "correctAnswer": "A",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q2",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Who is Nigeria's Vice President as of September 2026?",
    "options": {
      "A": "Godswill Akpabio",
      "B": "Kashim Shettima",
      "C": "Tajudeen Abbas",
      "D": "Femi Gbajabiamila"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q3",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Who is the President of the Nigerian Senate in the 10th National Assembly?",
    "options": {
      "A": "Tajudeen Abbas",
      "B": "Benjamin Kalu",
      "C": "Godswill Akpabio",
      "D": "Michael Bamidele"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q4",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Who is the Speaker of Nigeria's House of Representatives in the 10th National Assembly?",
    "options": {
      "A": "Tajudeen Abbas",
      "B": "Godswill Akpabio",
      "C": "Ibrahim Jibrin",
      "D": "Benjamin Kalu"
    },
    "correctAnswer": "A",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q5",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Who is the Chief Justice of Nigeria as of September 2026?",
    "options": {
      "A": "Olukayode Ariwoola",
      "B": "Kudirat Kekere-Ekun",
      "C": "Walter Onnoghen",
      "D": "Tanko Muhammad"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q6",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Who is the Governor of the Central Bank of Nigeria as of September 2026?",
    "options": {
      "A": "Godwin Emefiele",
      "B": "Olayemi Cardoso",
      "C": "Lamido Sanusi",
      "D": "Aigboje Aig-Imoukhuede"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q7",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What is the total expenditure in Nigeria's assented 2026 federal budget?",
    "options": {
      "A": "₦58.18 trillion",
      "B": "₦68.32 trillion",
      "C": "₦49.74 trillion",
      "D": "₦72.50 trillion"
    },
    "correctAnswer": "B",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q8",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "How much was allocated to capital expenditure in Nigeria's assented 2026 federal budget?",
    "options": {
      "A": "₦32.2 trillion",
      "B": "₦15.8 trillion",
      "C": "₦4.799 trillion",
      "D": "₦15.4 trillion"
    },
    "correctAnswer": "A",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q9",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Approximately how much was allocated to debt service in the assented 2026 federal budget?",
    "options": {
      "A": "₦7.4 trillion",
      "B": "₦10.2 trillion",
      "C": "₦15.8 trillion",
      "D": "₦22.1 trillion"
    },
    "correctAnswer": "C",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q10",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What title was given to Nigeria's 2026 budget?",
    "options": {
      "A": "Budget of Economic Recovery",
      "B": "Budget of Consolidation, Renewed Resilience and Shared Prosperity",
      "C": "Budget of National Rebirth",
      "D": "Budget of Growth and Stability"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q11",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "How much was the 2026 Appropriation Bill when first presented to the National Assembly in December 2025?",
    "options": {
      "A": "₦58.18 trillion",
      "B": "₦68.32 trillion",
      "C": "₦44.50 trillion",
      "D": "₦61.00 trillion"
    },
    "correctAnswer": "A",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q12",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What total revenue was projected in the originally presented 2026 budget proposal?",
    "options": {
      "A": "₦20.50 trillion",
      "B": "₦27.90 trillion",
      "C": "₦34.33 trillion",
      "D": "₦41.25 trillion"
    },
    "correctAnswer": "C",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q13",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What crude-oil benchmark price was used in the original 2026 budget proposal?",
    "options": {
      "A": "US$54.00 per barrel",
      "B": "US$64.85 per barrel",
      "C": "US$72.50 per barrel",
      "D": "US$80.00 per barrel"
    },
    "correctAnswer": "B",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q14",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What daily crude-oil production assumption was used in the original 2026 budget proposal?",
    "options": {
      "A": "1.20 million barrels",
      "B": "1.50 million barrels",
      "C": "1.84 million barrels",
      "D": "2.50 million barrels"
    },
    "correctAnswer": "C",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q15",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What average naira-to-dollar exchange-rate assumption was used in the original 2026 budget proposal?",
    "options": {
      "A": "₦1,000/$1",
      "B": "₦1,200/$1",
      "C": "₦1,400/$1",
      "D": "₦1,800/$1"
    },
    "correctAnswer": "C",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q16",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "How much was proposed for education in the original 2026 federal budget?",
    "options": {
      "A": "₦1.25 trillion",
      "B": "₦2.48 trillion",
      "C": "₦3.52 trillion",
      "D": "₦5.41 trillion"
    },
    "correctAnswer": "C",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q17",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "How much was proposed for health in the original 2026 federal budget?",
    "options": {
      "A": "₦2.48 trillion",
      "B": "₦3.52 trillion",
      "C": "₦3.56 trillion",
      "D": "₦5.41 trillion"
    },
    "correctAnswer": "A",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q18",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "How many major tax reform bills did President Tinubu sign into law on 26 June 2025?",
    "options": {
      "A": "Two",
      "B": "Three",
      "C": "Four",
      "D": "Six"
    },
    "correctAnswer": "C",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q19",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Which body was created by the 2025 tax reforms to replace the Federal Inland Revenue Service structure?",
    "options": {
      "A": "National Tax Commission",
      "B": "Nigeria Revenue Service",
      "C": "Federal Revenue Authority",
      "D": "Nigeria Fiscal Service"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q20",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "When were the remaining new federal tax laws scheduled to commence fully?",
    "options": {
      "A": "1 October 2025",
      "B": "1 January 2026",
      "C": "1 April 2026",
      "D": "1 July 2026"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q21",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What Monetary Policy Rate did the CBN set at its September 2026 MPC meeting?",
    "options": {
      "A": "21%",
      "B": "23%",
      "C": "25%",
      "D": "26.5%"
    },
    "correctAnswer": "B",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q22",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What was the CBN's Monetary Policy Rate immediately before the September 2026 reset?",
    "options": {
      "A": "22%",
      "B": "24%",
      "C": "25.5%",
      "D": "26.5%"
    },
    "correctAnswer": "D",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q23",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What Cash Reserve Requirement did the CBN retain for Deposit Money Banks in September 2026?",
    "options": {
      "A": "20%",
      "B": "30%",
      "C": "40%",
      "D": "45%"
    },
    "correctAnswer": "D",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q24",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What is the name of the CBN payment-system blueprint launched in June 2026?",
    "options": {
      "A": "PSV 2025",
      "B": "PSV 2028",
      "C": "Naira Vision 2030",
      "D": "Digital Nigeria 2028"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q25",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "On what date was Nigeria's Payments System Vision 2028 officially launched?",
    "options": {
      "A": "1 January 2026",
      "B": "1 March 2026",
      "C": "1 June 2026",
      "D": "1 September 2026"
    },
    "correctAnswer": "C",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q26",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "How many guiding principles anchor the CBN's Payments System Vision 2028?",
    "options": {
      "A": "Four",
      "B": "Five",
      "C": "Six",
      "D": "Eight"
    },
    "correctAnswer": "C",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q27",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "What is the base year of Nigeria's rebased Consumer Price Index introduced in 2025?",
    "options": {
      "A": "2009",
      "B": "2015",
      "C": "2020",
      "D": "2024"
    },
    "correctAnswer": "D",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q28",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "According to the latest NBS figure available around late September 2026, Nigeria's headline inflation rate was approximately what?",
    "options": {
      "A": "8.25%",
      "B": "15.39%",
      "C": "24.48%",
      "D": "34.80%"
    },
    "correctAnswer": "B",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q29",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Which Nigerian team won a record fifth consecutive Women's AfroBasket title in 2025?",
    "options": {
      "A": "D'Tigers",
      "B": "Super Falcons",
      "C": "D'Tigress",
      "D": "Falconets"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q30",
    "category": "Nigeria Current Affairs — Sep 2026",
    "question": "Nigeria's D'Tigress defeated which country 78–64 in the 2025 Women's AfroBasket final?",
    "options": {
      "A": "Senegal",
      "B": "Mali",
      "C": "Cameroon",
      "D": "Côte d'Ivoire"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q31",
    "category": "Bible",
    "question": "What is the first book of the Bible?",
    "options": {
      "A": "Exodus",
      "B": "Genesis",
      "C": "Psalms",
      "D": "Matthew"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q32",
    "category": "Bible",
    "question": "What is the last book of the New Testament?",
    "options": {
      "A": "Jude",
      "B": "Acts",
      "C": "Revelation",
      "D": "Hebrews"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q33",
    "category": "Bible",
    "question": "Who built the ark before the great flood?",
    "options": {
      "A": "Abraham",
      "B": "Moses",
      "C": "Noah",
      "D": "Jacob"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q34",
    "category": "Bible",
    "question": "What was the name of Abraham's wife?",
    "options": {
      "A": "Rachel",
      "B": "Sarah",
      "C": "Rebekah",
      "D": "Leah"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q35",
    "category": "Bible",
    "question": "Who led the Israelites out of Egypt?",
    "options": {
      "A": "Joshua",
      "B": "Moses",
      "C": "Aaron",
      "D": "Joseph"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q36",
    "category": "Bible",
    "question": "On which mountain did Moses receive the Ten Commandments?",
    "options": {
      "A": "Mount Carmel",
      "B": "Mount Sinai",
      "C": "Mount Zion",
      "D": "Mount Tabor"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q37",
    "category": "Bible",
    "question": "Who defeated Goliath?",
    "options": {
      "A": "Saul",
      "B": "Jonathan",
      "C": "David",
      "D": "Samuel"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q38",
    "category": "Bible",
    "question": "Which king was especially known for asking God for wisdom?",
    "options": {
      "A": "David",
      "B": "Saul",
      "C": "Solomon",
      "D": "Hezekiah"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q39",
    "category": "Bible",
    "question": "On which mountain did Elijah challenge the prophets of Baal?",
    "options": {
      "A": "Mount Carmel",
      "B": "Mount Sinai",
      "C": "Mount Ararat",
      "D": "Mount Olivet"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q40",
    "category": "Bible",
    "question": "To which city was Jonah sent to preach?",
    "options": {
      "A": "Jericho",
      "B": "Nineveh",
      "C": "Bethlehem",
      "D": "Damascus"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q41",
    "category": "Bible",
    "question": "Who was thrown into a den of lions?",
    "options": {
      "A": "Joseph",
      "B": "Daniel",
      "C": "Elisha",
      "D": "Jeremiah"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q42",
    "category": "Bible",
    "question": "Which three men were thrown into the fiery furnace?",
    "options": {
      "A": "Peter, James and John",
      "B": "Shadrach, Meshach and Abednego",
      "C": "Cain, Abel and Seth",
      "D": "Moses, Aaron and Joshua"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q43",
    "category": "Bible",
    "question": "Which woman became queen and helped save the Jewish people in Persia?",
    "options": {
      "A": "Ruth",
      "B": "Deborah",
      "C": "Esther",
      "D": "Miriam"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q44",
    "category": "Bible",
    "question": "Which biblical figure is especially associated with enduring severe trials while remaining faithful?",
    "options": {
      "A": "Job",
      "B": "Samson",
      "C": "Gideon",
      "D": "Ezra"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q45",
    "category": "Bible",
    "question": "Psalm 23 begins by describing the Lord as what?",
    "options": {
      "A": "A fortress",
      "B": "A shepherd",
      "C": "A judge",
      "D": "A warrior"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q46",
    "category": "Bible",
    "question": "Which prophet wrote, 'Here am I; send me'?",
    "options": {
      "A": "Isaiah",
      "B": "Jeremiah",
      "C": "Ezekiel",
      "D": "Hosea"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q47",
    "category": "Bible",
    "question": "Which is the first Gospel in the New Testament?",
    "options": {
      "A": "Mark",
      "B": "Luke",
      "C": "John",
      "D": "Matthew"
    },
    "correctAnswer": "D",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q48",
    "category": "Bible",
    "question": "Who was the mother of Jesus?",
    "options": {
      "A": "Martha",
      "B": "Elizabeth",
      "C": "Mary",
      "D": "Salome"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q49",
    "category": "Bible",
    "question": "In which town was Jesus born?",
    "options": {
      "A": "Nazareth",
      "B": "Bethlehem",
      "C": "Jerusalem",
      "D": "Capernaum"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q50",
    "category": "Bible",
    "question": "Who baptized Jesus in the Jordan River?",
    "options": {
      "A": "Peter",
      "B": "John the Baptist",
      "C": "Andrew",
      "D": "James"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q51",
    "category": "Bible",
    "question": "How many apostles did Jesus appoint?",
    "options": {
      "A": "Seven",
      "B": "Ten",
      "C": "Twelve",
      "D": "Seventy"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q52",
    "category": "Bible",
    "question": "What was Jesus' first recorded miracle in the Gospel of John?",
    "options": {
      "A": "Feeding the five thousand",
      "B": "Walking on water",
      "C": "Turning water into wine",
      "D": "Healing a blind man"
    },
    "correctAnswer": "C",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q53",
    "category": "Bible",
    "question": "Where did Jesus deliver the teaching commonly called the Sermon on the Mount?",
    "options": {
      "A": "On a mountain",
      "B": "Inside the Temple",
      "C": "On a boat",
      "D": "In a palace"
    },
    "correctAnswer": "A",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q54",
    "category": "Bible",
    "question": "The Lord's Prayer begins with which words?",
    "options": {
      "A": "Holy, holy, holy",
      "B": "Our Father in heaven",
      "C": "Blessed are the meek",
      "D": "The Lord is my shepherd"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q55",
    "category": "Bible",
    "question": "What food did Jesus multiply to feed about five thousand people?",
    "options": {
      "A": "Seven loaves and seven fish",
      "B": "Five loaves and two fish",
      "C": "Two loaves and five fish",
      "D": "Twelve loaves and one fish"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q56",
    "category": "Bible",
    "question": "Whom did Jesus raise from the dead after he had been in the tomb for four days?",
    "options": {
      "A": "Stephen",
      "B": "Lazarus",
      "C": "Jairus",
      "D": "Nicodemus"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q57",
    "category": "Bible",
    "question": "Which disciple betrayed Jesus?",
    "options": {
      "A": "Thomas",
      "B": "Judas Iscariot",
      "C": "Matthew",
      "D": "Philip"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q58",
    "category": "Bible",
    "question": "Which disciple denied Jesus three times before the rooster crowed?",
    "options": {
      "A": "Peter",
      "B": "John",
      "C": "Andrew",
      "D": "Bartholomew"
    },
    "correctAnswer": "A",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q59",
    "category": "Bible",
    "question": "At what place was Jesus crucified?",
    "options": {
      "A": "Bethany",
      "B": "Golgotha",
      "C": "Nazareth",
      "D": "Emmaus"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q60",
    "category": "Bible",
    "question": "According to the Gospels, on which day did Jesus rise from the dead?",
    "options": {
      "A": "The same day",
      "B": "The second day",
      "C": "The third day",
      "D": "The seventh day"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q61",
    "category": "Bible",
    "question": "In which Gospel chapter is the Great Commission famously recorded as 'go and make disciples of all nations'?",
    "options": {
      "A": "Matthew 28",
      "B": "Mark 1",
      "C": "Luke 2",
      "D": "John 3"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q62",
    "category": "Bible",
    "question": "In which chapter of Acts is the Day of Pentecost recorded?",
    "options": {
      "A": "Acts 1",
      "B": "Acts 2",
      "C": "Acts 9",
      "D": "Acts 16"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q63",
    "category": "Bible",
    "question": "On the road to which city did Saul encounter Jesus in a life-changing conversion experience?",
    "options": {
      "A": "Rome",
      "B": "Jerusalem",
      "C": "Damascus",
      "D": "Antioch"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q64",
    "category": "Bible",
    "question": "Who was imprisoned with Paul when an earthquake opened the prison doors in Philippi?",
    "options": {
      "A": "Barnabas",
      "B": "Silas",
      "C": "Timothy",
      "D": "Luke"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q65",
    "category": "Bible",
    "question": "In which New Testament book is the 'fruit of the Spirit' listed?",
    "options": {
      "A": "Romans",
      "B": "Galatians",
      "C": "Ephesians",
      "D": "Philippians"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q66",
    "category": "Bible",
    "question": "Which chapter is often called the Bible's 'faith chapter' because it lists examples of faith?",
    "options": {
      "A": "Romans 8",
      "B": "Hebrews 11",
      "C": "James 2",
      "D": "1 Peter 5"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q67",
    "category": "Bible",
    "question": "In which book is the 'armor of God' described?",
    "options": {
      "A": "Ephesians",
      "B": "Colossians",
      "C": "Romans",
      "D": "1 Thessalonians"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q68",
    "category": "Bible",
    "question": "Which chapter is widely known as the 'love chapter'?",
    "options": {
      "A": "Psalm 23",
      "B": "John 17",
      "C": "1 Corinthians 13",
      "D": "Romans 12"
    },
    "correctAnswer": "C",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q69",
    "category": "Bible",
    "question": "Which verse contains the short statement 'Jesus wept'?",
    "options": {
      "A": "John 3:16",
      "B": "John 11:35",
      "C": "Matthew 5:9",
      "D": "Luke 15:11"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q70",
    "category": "Bible",
    "question": "In Revelation 21, what holy city is described as coming down out of heaven from God?",
    "options": {
      "A": "Jericho",
      "B": "New Jerusalem",
      "C": "Nazareth",
      "D": "New Babylon"
    },
    "correctAnswer": "B",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q71",
    "category": "Growth Mindset",
    "question": "Which statement best describes a growth mindset?",
    "options": {
      "A": "Abilities are fixed at birth",
      "B": "Abilities can be developed through learning, strategy and practice",
      "C": "Only talented people succeed",
      "D": "Failure permanently limits ability"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q72",
    "category": "Growth Mindset",
    "question": "Which statement best reflects a fixed mindset?",
    "options": {
      "A": "I can improve with practice",
      "B": "Feedback can help me grow",
      "C": "I'm either naturally good at this or I'm not",
      "D": "I can try a different strategy"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q73",
    "category": "Growth Mindset",
    "question": "Why is adding the word 'yet' useful in growth-mindset thinking?",
    "options": {
      "A": "It guarantees success",
      "B": "It turns a present limitation into something that may improve",
      "C": "It removes the need for practice",
      "D": "It makes every task easy"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q74",
    "category": "Growth Mindset",
    "question": "How should constructive feedback generally be viewed in a growth mindset?",
    "options": {
      "A": "As information that can guide improvement",
      "B": "As proof of low intelligence",
      "C": "As a personal attack",
      "D": "As something to ignore"
    },
    "correctAnswer": "A",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q75",
    "category": "Growth Mindset",
    "question": "What is a growth-minded response to a difficult challenge?",
    "options": {
      "A": "Avoid it immediately",
      "B": "Try it, learn, and adjust strategies",
      "C": "Assume difficulty means lack of talent",
      "D": "Wait until it becomes easy"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q76",
    "category": "Growth Mindset",
    "question": "Which interpretation of failure best fits a growth mindset?",
    "options": {
      "A": "Failure is evidence that learning is impossible",
      "B": "Failure can provide information about what to improve",
      "C": "Failure should always be hidden",
      "D": "Failure proves intelligence is fixed"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q77",
    "category": "Growth Mindset",
    "question": "Which combination best supports improvement?",
    "options": {
      "A": "Effort alone, regardless of method",
      "B": "Effective effort, useful strategies, feedback and practice",
      "C": "Natural talent without practice",
      "D": "Repeating the same mistake indefinitely"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q78",
    "category": "Growth Mindset",
    "question": "What is deliberate practice?",
    "options": {
      "A": "Doing only tasks you already master",
      "B": "Focused practice aimed at specific weaknesses with feedback",
      "C": "Practising randomly without goals",
      "D": "Studying only when tested"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q79",
    "category": "Growth Mindset",
    "question": "Which type of praise is most consistent with encouraging a growth mindset?",
    "options": {
      "A": "You're a genius",
      "B": "You're naturally gifted",
      "C": "Your strategy and persistence helped you solve that",
      "D": "You're smarter than everyone else"
    },
    "correctAnswer": "C",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q80",
    "category": "Growth Mindset",
    "question": "Which comparison is most useful for growth-oriented learning?",
    "options": {
      "A": "Comparing yourself only with the top performer",
      "B": "Comparing current progress with your previous performance",
      "C": "Avoiding all measurement",
      "D": "Measuring only final results"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q81",
    "category": "Growth Mindset",
    "question": "Which goal best reflects a growth mindset?",
    "options": {
      "A": "Never make a mistake",
      "B": "Learn how to solve progressively harder problems",
      "C": "Always look smarter than others",
      "D": "Only choose tasks you can already do"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q82",
    "category": "Growth Mindset",
    "question": "What can mistakes do during learning?",
    "options": {
      "A": "Reveal gaps and guide the next attempt",
      "B": "Always reduce intelligence",
      "C": "Make practice useless",
      "D": "Prove the learner should stop"
    },
    "correctAnswer": "A",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q83",
    "category": "Growth Mindset",
    "question": "What does asking for help usually represent in a growth mindset?",
    "options": {
      "A": "Weakness",
      "B": "A useful learning strategy when needed",
      "C": "Proof that someone cannot learn",
      "D": "A reason to avoid the task"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q84",
    "category": "Growth Mindset",
    "question": "If a study strategy repeatedly fails, what is the most growth-minded response?",
    "options": {
      "A": "Work longer using exactly the same method",
      "B": "Change or refine the strategy and seek feedback",
      "C": "Quit the subject",
      "D": "Blame natural ability"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q85",
    "category": "Growth Mindset",
    "question": "How should constructive criticism be handled?",
    "options": {
      "A": "Evaluate it and use relevant points to improve",
      "B": "Reject it automatically",
      "C": "Treat it as a final judgment of ability",
      "D": "Avoid anyone who gives feedback"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q86",
    "category": "Growth Mindset",
    "question": "What is a stretch goal?",
    "options": {
      "A": "A goal that is challenging enough to require growth",
      "B": "A goal with no measurable outcome",
      "C": "A goal that requires no effort",
      "D": "A goal chosen only to impress others"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q87",
    "category": "Growth Mindset",
    "question": "Which statement about persistence is most accurate from a growth-mindset perspective?",
    "options": {
      "A": "Persistence means never changing your approach",
      "B": "Persistence works best when combined with reflection and strategy changes",
      "C": "Persistence guarantees every goal",
      "D": "Persistence matters only for beginners"
    },
    "correctAnswer": "B",
    "difficulty": "Hard",
    "points": 30
  },
  {
    "id": "q88",
    "category": "Growth Mindset",
    "question": "What is neuroplasticity?",
    "options": {
      "A": "The brain's ability to change and form new connections through experience and learning",
      "B": "The belief that intelligence never changes",
      "C": "A method of memorising without understanding",
      "D": "A personality test"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q89",
    "category": "Growth Mindset",
    "question": "Why is reflection useful after completing a task?",
    "options": {
      "A": "It helps identify what worked, what failed and what to change next",
      "B": "It proves mistakes should be avoided",
      "C": "It replaces future practice",
      "D": "It guarantees a perfect next attempt"
    },
    "correctAnswer": "A",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q90",
    "category": "Growth Mindset",
    "question": "A student scores poorly on a test. Which response best demonstrates a growth mindset?",
    "options": {
      "A": "I'm just bad at this subject",
      "B": "I'll review my mistakes, ask for help and change how I study",
      "C": "There is no reason to try again",
      "D": "The score proves my ability cannot improve"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q91",
    "category": "General Knowledge Tie-Breaker",
    "question": "What is the largest planet in our Solar System?",
    "options": {
      "A": "Earth",
      "B": "Saturn",
      "C": "Jupiter",
      "D": "Neptune"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q92",
    "category": "General Knowledge Tie-Breaker",
    "question": "Which ocean is the largest by surface area?",
    "options": {
      "A": "Atlantic Ocean",
      "B": "Indian Ocean",
      "C": "Pacific Ocean",
      "D": "Arctic Ocean"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q93",
    "category": "General Knowledge Tie-Breaker",
    "question": "What is the chemical symbol for gold?",
    "options": {
      "A": "Ag",
      "B": "Au",
      "C": "Gd",
      "D": "Go"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  },
  {
    "id": "q94",
    "category": "General Knowledge Tie-Breaker",
    "question": "How many sides does a regular hexagon have?",
    "options": {
      "A": "Five",
      "B": "Six",
      "C": "Seven",
      "D": "Eight"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q95",
    "category": "General Knowledge Tie-Breaker",
    "question": "Which organ pumps blood around the human body?",
    "options": {
      "A": "Liver",
      "B": "Heart",
      "C": "Kidney",
      "D": "Lung"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q96",
    "category": "General Knowledge Tie-Breaker",
    "question": "What is 15 × 12?",
    "options": {
      "A": "160",
      "B": "170",
      "C": "180",
      "D": "190"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q97",
    "category": "General Knowledge Tie-Breaker",
    "question": "Which gas do plants primarily absorb from the atmosphere for photosynthesis?",
    "options": {
      "A": "Oxygen",
      "B": "Hydrogen",
      "C": "Carbon dioxide",
      "D": "Nitrogen"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q98",
    "category": "General Knowledge Tie-Breaker",
    "question": "Which continent contains the Sahara Desert?",
    "options": {
      "A": "Asia",
      "B": "Africa",
      "C": "South America",
      "D": "Australia"
    },
    "correctAnswer": "B",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q99",
    "category": "General Knowledge Tie-Breaker",
    "question": "At sea level, pure water boils at what temperature on the Celsius scale?",
    "options": {
      "A": "90°C",
      "B": "95°C",
      "C": "100°C",
      "D": "110°C"
    },
    "correctAnswer": "C",
    "difficulty": "Easy",
    "points": 10
  },
  {
    "id": "q100",
    "category": "General Knowledge Tie-Breaker",
    "question": "Which instrument is used to measure atmospheric pressure?",
    "options": {
      "A": "Thermometer",
      "B": "Barometer",
      "C": "Hygrometer",
      "D": "Altimeter"
    },
    "correctAnswer": "B",
    "difficulty": "Medium",
    "points": 20
  }
]
```


---

# Original Build Specification

# Quiz Competition Website — Build Specification

## 1. Project Overview

Build a polished, responsive, frontend-only quiz competition website inspired by the presentation style of **Who Wants to Be a Millionaire**, but with an original visual identity.

The website will be used during a live competition where contestants represent different schools.

The application must NOT require a backend, database server, authentication server, or external API.

All data should be handled in the browser using:
- Local component state
- `localStorage` for persistence
- Import/export JSON for backup and reuse

The website should work perfectly when deployed as a static site on platforms such as:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

---

# 2. Recommended Technology Stack

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui where useful
- Lucide React icons
- Framer Motion for smooth animations
- Browser LocalStorage
- Optional Web Audio API / local sound files for game sounds

Do NOT add:
- Node.js backend
- Express
- Firebase
- Supabase
- PostgreSQL
- MongoDB
- Authentication
- Server-side database

---

# 3. Core User Flow

The intended competition flow is:

1. Organizer opens the website.
2. Organizer enters competition setup.
3. Organizer adds contestants.
4. Each contestant has:
   - Contestant name
   - School name
5. Organizer creates/imports quiz questions.
6. Organizer selects a contestant.
7. Contestant enters the quiz stage.
8. Questions are displayed one at a time.
9. Contestant selects an answer.
10. Host can lock the answer.
11. Correct answer is revealed dramatically.
12. Score/progress updates.
13. Contestant continues until:
    - All questions are completed
    - A wrong answer ends the run
    - The host manually ends the run
14. Result screen appears.
15. Organizer can move to the next contestant.
16. Leaderboard automatically ranks contestants.

---

# 4. Application Pages / Screens

## 4.1 Landing Page

Create a visually impressive landing page.

Content:

- Competition logo/title
- Short subtitle such as:
  `Test your knowledge. Represent your school. Climb the leaderboard.`
- Primary button:
  `Start Competition`
- Secondary button:
  `Manage Questions`

Visual direction:

- Dark premium background
- Deep navy / midnight blue
- Gold highlights
- Purple/blue atmospheric glow
- Subtle animated particles or radial gradients
- Stage/game-show feeling
- Premium typography
- Smooth transitions

Do not copy the exact copyrighted visual design of Who Wants to Be a Millionaire.

Create an original game-show-inspired interface.

---

# 5. Competition Setup Screen

Create a setup dashboard for the organizer.

## Competition Details

Fields:

- Competition title
- Competition subtitle
- Optional organizer name
- Optional date
- Optional competition logo upload

Uploaded logo should remain local in the browser.

---

# 6. Contestant Management

Provide a section titled:

## Contestants

Organizer must be able to add contestants.

Each contestant record should contain:

```ts
type Contestant = {
  id: string;
  name: string;
  school: string;
  score: number;
  currentQuestion: number;
  status: "not_started" | "playing" | "completed" | "eliminated";
  startedAt?: string;
  completedAt?: string;
};
```

Input form:

- Contestant Name
- School Represented
- Add Contestant button

Display contestants in a clean table/card list.

Columns:

- No.
- Contestant
- School
- Status
- Score
- Action

Actions:

- Start Quiz
- Edit
- Delete
- Reset Attempt

Ask for confirmation before deleting/resetting a contestant.

---

# 7. Question Management

Create a dedicated Question Bank screen.

Each question should contain:

```ts
type Question = {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  points: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  category?: string;
};
```

Organizer must be able to:

- Add question
- Edit question
- Delete question
- Reorder questions
- Duplicate question
- Clear all questions

Question form:

- Question
- Option A
- Option B
- Option C
- Option D
- Correct Answer
- Points
- Difficulty
- Category

Validate that:

- Question is not empty
- All four options exist
- Correct answer is selected
- Points are greater than zero

---

# 8. Import and Export

Since there is no backend, make it easy to move competition data between computers.

Provide:

## Export Competition

Download competition state as:

`quiz-competition-backup.json`

Include:

- Competition information
- Contestants
- Questions
- Scores
- Settings

## Import Competition

Allow organizer to upload a previously exported JSON file.

Validate the structure before replacing current data.

Show confirmation before overwriting existing competition data.

---

# 9. Quiz Stage

This is the most important screen.

The quiz stage should feel like a professional live game show.

At the top show:

- Competition title
- Contestant name
- School
- Current question number
- Current score

Example:

```text
QUESTION 6 OF 15

PHILIP OGUNBUNMI
Federal University of Technology, Akure
```

---

# 10. Question Display

Display the question prominently at the center.

Example:

```text
Which planet is known as the Red Planet?
```

Below it, show four answers in a 2 × 2 grid on desktop:

```text
A   Venus
B   Mars

C   Jupiter
D   Mercury
```

On mobile, stack the options vertically.

Option states:

### Default
Dark/navy card with subtle border.

### Hover
Brighter border/glow.

### Selected
Gold/amber highlight.

### Locked
Animated highlight.

### Correct
Green glow/background.

### Incorrect
Red glow/background.

When an incorrect answer is selected, also highlight the correct answer in green.

---

# 11. Answer Flow

Use a deliberate competition flow.

### Step 1
Contestant selects an option.

### Step 2
Selected option becomes highlighted.

Display:

`Final Answer`

button.

### Step 3
Host clicks `Final Answer`.

Lock all answer options.

Show a short suspense animation.

### Step 4
Reveal the answer.

If correct:

- Green animation
- Success sound
- Add points
- Show `Correct!`

If incorrect:

- Selected answer turns red
- Correct answer turns green
- Failure sound
- Show `Incorrect`

### Step 5

Show:

- `Next Question`
- `End Contestant Run`

depending on state.

---

# 12. Quiz Timer

Add an optional timer.

Settings:

- No Timer
- 15 seconds
- 30 seconds
- 45 seconds
- 60 seconds
- Custom seconds

Show timer prominently while playing.

Timer behavior:

- Starts when question appears
- Pauses after Final Answer is locked
- Turns visually urgent below 10 seconds
- At 0 seconds:
  - Automatically lock as unanswered
  - Mark question incorrect / timed out

Allow organizer to turn timer off.

---

# 13. Lifelines

Include optional competition lifelines.

Organizer can enable/disable lifelines from settings.

Suggested lifelines:

## 50:50

Remove two incorrect answers.

## Ask the Audience

Because there is no backend or real audience voting system, implement this as a host-controlled visual feature.

Options:

- Random simulated percentages weighted toward the correct answer
OR
- Host manually enters audience percentages before revealing them

Prefer host-controlled/manual mode for real competitions.

## Skip Question

Contestant can skip one question if enabled.

## Extra Time

Adds configurable additional seconds to the timer.

Each lifeline can only be used once per contestant.

Store usage in contestant attempt state.

---

# 14. Progress Ladder

Create a vertical question/score ladder inspired by television game shows.

Example:

```text
15   100 Points
14    90 Points
13    80 Points
12    70 Points
...
2     10 Points
1      5 Points
```

Highlight:

- Current question
- Completed questions
- Safe levels

The score ladder should automatically adapt to the points configured for questions.

On smaller screens, make it collapsible.

---

# 15. Safe Levels

Allow organizer to optionally define milestone/safe questions.

Example:

- Question 5
- Question 10
- Question 15

If competition rules use guaranteed points, contestant falls back to the latest safe level after a wrong answer.

This feature should be optional.

Settings:

```ts
safeLevelsEnabled: boolean;
safeQuestionNumbers: number[];
```

---

# 16. Host Controls

Provide a hidden/collapsible Host Control Panel during the quiz.

Host controls:

- Reveal Correct Answer
- Next Question
- End Round
- Pause Timer
- Resume Timer
- Add Time
- Remove Time
- Mark Correct manually
- Mark Incorrect manually
- Undo last action
- Return to Dashboard

The control panel should be visually separate from the contestant-facing question area.

Optional keyboard shortcuts:

- `1` = Answer A
- `2` = Answer B
- `3` = Answer C
- `4` = Answer D
- `Enter` = Final Answer
- `N` = Next Question
- `Space` = Pause/resume timer

Do not trigger shortcuts while typing in form fields.

---

# 17. Presentation / Projector Mode

Add a button:

`Presentation Mode`

When enabled:

- Hide unnecessary dashboard controls
- Maximize question area
- Make contestant and school highly visible
- Use large text
- Use fullscreen browser API when supported

The interface should be readable on projectors and large TV screens.

---

# 18. Score System

Points should come from each question.

Example:

```ts
question.points
```

When contestant answers correctly:

```ts
score += question.points
```

Competition settings should support two modes:

## Mode A — Continue After Wrong Answer

Contestant answers all questions.

Final score is total correct-answer points.

## Mode B — Elimination

One wrong answer ends the contestant's run.

Allow organizer to select the mode.

---

# 19. Leaderboard

Create a professional leaderboard screen.

Display:

| Rank | Contestant | School | Score | Status |
|------|------------|--------|-------|--------|

Sort automatically by score descending.

For ties, optionally use:

1. Highest score
2. Most correct answers
3. Fastest total answer time

If answer time is not enabled, keep contestants tied.

Top three should have stronger visual emphasis:

- 1st
- 2nd
- 3rd

Do not overuse emoji.

Add:

`Open Leaderboard`

button from dashboard and result screen.

---

# 20. Contestant Result Screen

After each contestant completes their quiz, show:

- Contestant name
- School
- Final score
- Correct answers
- Incorrect answers
- Questions attempted
- Lifelines used
- Total time
- Current ranking

Buttons:

- `View Leaderboard`
- `Next Contestant`
- `Return to Dashboard`

---

# 21. Competition Dashboard

The organizer dashboard should summarize the full event.

Cards:

- Total Contestants
- Completed
- Remaining
- Total Questions

Sections:

### Contestants
Show all contestants and statuses.

### Competition Progress
Example:

`7 / 15 contestants completed`

### Current Leader
Show current highest scorer without declaring the final winner until competition is completed.

### Quick Actions

- Add Contestant
- Manage Questions
- Open Leaderboard
- Competition Settings
- Export Data
- Reset Competition

---

# 22. Competition Settings

Settings should include:

## Quiz

- Randomize question order
- Randomize answer choices
- Questions per contestant
- Continue after wrong answer / elimination mode
- Show correct answer after each question

## Timer

- Enable timer
- Seconds per question
- Extra Time lifeline value

## Lifelines

- Enable 50:50
- Enable Ask the Audience
- Enable Skip
- Enable Extra Time

## Appearance

- Competition title
- Logo
- Accent theme
- Sound on/off
- Animation on/off

## Score

- Safe level system
- Tie-breaking behavior

Persist settings to LocalStorage.

---

# 23. LocalStorage Data Model

Use a single versioned root object.

Example:

```ts
type CompetitionState = {
  version: 1;
  competition: {
    title: string;
    subtitle?: string;
    organizer?: string;
    date?: string;
    logo?: string;
  };
  contestants: Contestant[];
  questions: Question[];
  settings: QuizSettings;
  attempts: ContestantAttempt[];
};
```

Example localStorage key:

```text
quizCompetition_v1
```

Create utility functions:

```ts
loadCompetition()
saveCompetition()
exportCompetition()
importCompetition()
resetCompetition()
```

Handle malformed localStorage safely.

---

# 24. Attempt History

Store a complete result for each contestant.

```ts
type AnswerRecord = {
  questionId: string;
  selectedAnswer?: "A" | "B" | "C" | "D";
  correctAnswer: "A" | "B" | "C" | "D";
  correct: boolean;
  pointsAwarded: number;
  timeTaken?: number;
};

type ContestantAttempt = {
  contestantId: string;
  answers: AnswerRecord[];
  totalScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  startedAt: string;
  completedAt?: string;
  lifelinesUsed: string[];
};
```

This allows results to survive page refreshes.

---

# 25. Browser Refresh Protection

The application must not lose an ongoing competition after refresh.

Persist:

- Current contestant
- Current question
- Selected answer if appropriate
- Score
- Timer state where practical
- Lifeline usage
- Completed contestant results

Ask for confirmation before starting over.

---

# 26. Suggested Routes

If React Router is used:

```text
/
 /setup
 /dashboard
 /contestants
 /questions
 /quiz/:contestantId
 /leaderboard
 /results/:contestantId
 /settings
```

Alternatively, a state-based SPA is acceptable.

React Router is preferred.

---

# 27. Suggested Component Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── quiz/
│   │   ├── QuizStage.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerOption.tsx
│   │   ├── QuizTimer.tsx
│   │   ├── ScoreLadder.tsx
│   │   ├── LifelineBar.tsx
│   │   └── HostControls.tsx
│   │
│   ├── contestants/
│   │   ├── ContestantForm.tsx
│   │   ├── ContestantCard.tsx
│   │   └── ContestantTable.tsx
│   │
│   ├── questions/
│   │   ├── QuestionForm.tsx
│   │   ├── QuestionList.tsx
│   │   └── QuestionEditor.tsx
│   │
│   ├── leaderboard/
│   │   └── LeaderboardTable.tsx
│   │
│   └── ui/
│
├── pages/
│   ├── LandingPage.tsx
│   ├── SetupPage.tsx
│   ├── DashboardPage.tsx
│   ├── ContestantsPage.tsx
│   ├── QuestionsPage.tsx
│   ├── QuizPage.tsx
│   ├── LeaderboardPage.tsx
│   ├── ResultPage.tsx
│   └── SettingsPage.tsx
│
├── hooks/
│   ├── useCompetition.ts
│   ├── useQuiz.ts
│   ├── useTimer.ts
│   └── useLocalStorage.ts
│
├── lib/
│   ├── storage.ts
│   ├── scoring.ts
│   ├── quiz.ts
│   ├── importExport.ts
│   └── utils.ts
│
├── types/
│   └── competition.ts
│
├── data/
│   └── sampleQuestions.ts
│
├── App.tsx
└── main.tsx
```

---

# 28. UI Design System

## Overall Feel

The application should feel:

- Premium
- Competitive
- Modern
- Professional
- Cinematic
- Suitable for a school quiz competition
- Suitable for display on a projector

Avoid the generic "AI-generated dashboard" appearance.

Avoid excessive cards everywhere.

Use strong visual hierarchy.

---

# 29. Colors

Suggested palette:

```css
--background: #050816;
--surface: #0B1026;
--surface-light: #111936;
--primary: #6D5DFB;
--primary-light: #8B7FFF;
--gold: #F4C95D;
--success: #22C55E;
--danger: #EF4444;
--text: #F8FAFC;
--muted: #94A3B8;
```

Use gradients sparingly.

Example hero background:

```css
background:
  radial-gradient(circle at top, rgba(109,93,251,.25), transparent 35%),
  #050816;
```

---

# 30. Typography

Recommended fonts:

- Inter
- Manrope
- Sora

Use:

- Large bold display font for questions
- Medium-weight contestant names
- Small muted metadata text
- Tabular numbers for timers/scores if available

---

# 31. Animations

Use tasteful animations.

Examples:

- Question slides/fades into view
- Answer hover glow
- Locked answer pulse
- 500–1000ms suspense before reveal
- Correct answer glow
- Incorrect answer shake
- Score count-up
- Leaderboard rank transition

Do not make animations slow or distracting.

Respect:

```css
prefers-reduced-motion
```

---

# 32. Sounds

Optional sound system:

- Question appears
- Answer selected
- Final answer locked
- Correct
- Incorrect
- Timer warning
- Timer expired

Provide a global mute button.

Do not require sounds for the app to work.

---

# 33. Responsive Design

The site must support:

- Desktop
- Laptop
- Tablet
- Mobile
- Projector/large screen

Quiz stage desktop:

```text
+-------------------------------------------+
| Contestant            Score        Timer  |
|                                           |
|              QUESTION                     |
|                                           |
|   [ A ] Answer       [ B ] Answer         |
|                                           |
|   [ C ] Answer       [ D ] Answer         |
|                                           |
| Lifelines                     Score Ladder|
+-------------------------------------------+
```

Mobile:

```text
Contestant
School

Question

[A]
[B]
[C]
[D]

Timer / Score
Lifelines
```

---

# 34. Accessibility

Include:

- Keyboard navigation
- Visible focus states
- Good contrast
- Buttons with accessible labels
- Semantic HTML
- Screen-reader-friendly form labels
- Do not rely on color alone to indicate correct/incorrect states

---

# 35. Empty States

Design clean empty states.

Examples:

## No Contestants

`No contestants have been added yet.`

Button:

`Add First Contestant`

## No Questions

`Your question bank is empty.`

Buttons:

- `Add Question`
- `Import Questions`

---

# 36. Sample Questions

Include 5–10 sample questions so the application looks functional immediately.

The organizer should be able to remove all sample questions.

Do not hard-code the application around the samples.

---

# 37. Reset Functions

Provide separate reset options.

### Reset Current Contestant

Clear only one contestant's attempt.

### Reset Scores

Clear all attempts and scores but preserve contestants/questions/settings.

### Reset Entire Competition

Delete:

- Contestants
- Questions
- Results
- Settings

Require strong confirmation.

---

# 38. Validation and Error Handling

Handle:

- Empty contestant names
- Empty school names
- Duplicate contestants
- Missing answer options
- Invalid JSON import
- LocalStorage failure
- Refresh during quiz
- No questions available
- Attempt to start completed contestant
- Timer reaching zero
- Trying to proceed without locking an answer

Use toast notifications for lightweight feedback.

---

# 39. Security / Safety

Since there is no backend:

- Do not execute imported JSON as code
- Parse using `JSON.parse`
- Validate imported object shape
- Sanitize user-facing text
- Do not use `dangerouslySetInnerHTML`
- Restrict uploaded logo file types to images
- Restrict logo size

---

# 40. Question Import Template

Allow question bank import from JSON.

Example:

```json
[
  {
    "question": "Which planet is known as the Red Planet?",
    "options": {
      "A": "Venus",
      "B": "Mars",
      "C": "Jupiter",
      "D": "Mercury"
    },
    "correctAnswer": "B",
    "points": 10,
    "difficulty": "Easy",
    "category": "Science"
  }
]
```

Also provide a button:

`Download Question Template`

that generates this sample JSON locally.

---

# 41. Nice-to-Have Features

If time permits, add:

- Fullscreen mode
- Confetti for outstanding scores
- Competition logo upload
- Multiple color themes
- Question category filters
- Search questions
- Duplicate contestant prevention
- Bulk contestant import from CSV
- Bulk questions import from JSON
- Printable results
- Download leaderboard as CSV
- Competition summary screen
- Keyboard host controls
- Host/Presentation split-screen behavior
- QR code linking to a public static leaderboard is NOT needed because there is no backend

---

# 42. Do Not Build

Do NOT add:

- User registration
- Login screen
- Backend
- Database server
- API routes
- Firebase
- Supabase
- Online multiplayer
- Cloud account
- Payment
- Chatbot
- AI-generated questions
- Internet requirement for core functionality

The competition application must remain usable offline after assets are loaded.

---

# 43. Definition of Done

The project is complete when:

1. Organizer can create a competition.
2. Organizer can add contestant names and schools.
3. Organizer can create/edit/delete questions.
4. Questions support four answer choices.
5. Correct answers are stored locally.
6. Contestant can be launched into a polished quiz stage.
7. Answers can be selected and locked.
8. Correct/incorrect results are animated clearly.
9. Scores are calculated automatically.
10. Results persist after browser refresh.
11. Leaderboard ranks contestants.
12. Organizer can export all competition data.
13. Organizer can import previously exported competition data.
14. Timer works correctly.
15. Lifelines work if enabled.
16. Site works without a backend.
17. Site looks professional on desktop and mobile.
18. Presentation/fullscreen mode works.
19. Project builds successfully with no TypeScript errors.
20. Static deployment works on Vercel/Netlify.

---

# 44. AI Coding Agent Instructions

Build the project completely rather than stopping after scaffolding.

Priorities:

1. Functional quiz engine
2. Reliable LocalStorage persistence
3. Excellent competition-stage UI
4. Contestant/school management
5. Question bank
6. Leaderboard
7. Timer
8. Lifelines
9. Import/export
10. Animations and polish

Keep components modular.

Do not create unnecessary abstractions.

Do not add a backend.

Do not leave major buttons non-functional.

Do not use fake placeholders for core features.

Before completion:

- Run the production build
- Fix TypeScript errors
- Fix console errors
- Check mobile layout
- Check refresh persistence
- Test at least two contestants end-to-end
- Verify leaderboard sorting
- Verify JSON export/import

---

# 45. Suggested Product Name

Use a temporary name that can easily be replaced later:

**QuizArena**

Subtitle:

**Knowledge. Competition. Victory.**

Keep the product name stored in a configuration constant so it can easily be changed.
