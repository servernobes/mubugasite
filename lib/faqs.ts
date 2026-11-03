// Frequently asked questions, shown on /faqs (all, by topic) and on the homepage (the ones marked `home`).
// Facts here must match the rest of the site: membership fees (membership page), loan rate (lib/product-details.ts),
// MSACCO codes (app/msacco), opening hours (TopBar).

export type Faq = {
  q: string;
  a: string;
  link?: { href: string; label: string };
  home?: boolean;   // also shown on the homepage
};

export type FaqGroup = { id: string; title: string; items: Faq[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "membership",
    title: "Joining Mubuga SACCO",
    items: [
      {
        q: "How do I become a member of Mubuga SACCO?",
        a: "Visit our head office in Nyakinama (Mubuga) or our Kisoro Town branch with two recent passport-size photographs and your national ID. Fill in the membership application form and pay UGX 40,000 to open your account.",
        link: { href: "/membership", label: "Membership requirements" },
        home: true,
      },
      {
        q: "How much does it cost to join?",
        a: "UGX 40,000 in total: share capital UGX 10,000, membership fee UGX 20,000 and an initial deposit of UGX 10,000 into your savings account. Fees can change, so please confirm with our staff before you come.",
        home: true,
      },
      {
        q: "Who can join?",
        a: "Individuals, groups and associations (including VSLAs), and institutions such as schools and churches. Parents and guardians can also open a Junior account for a child.",
      },
      {
        q: "Can our group, church or school open an account?",
        a: "Yes. Bring your registration or recognition documents, minutes or a resolution naming the people who will sign for the account, and two passport-size photographs and a national ID for each signatory.",
        link: { href: "/savings/group", label: "Group accounts" },
      },
      {
        q: "What do I gain as a member?",
        a: "You become a co-owner of the SACCO through your share capital, with a voice at the general meeting. You can save safely, borrow at member rates and bank from your phone with MSACCO.",
      },
    ],
  },
  {
    id: "savings",
    title: "Savings Accounts",
    items: [
      {
        q: "What savings accounts do you offer?",
        a: "Ordinary savings, voluntary savings, fixed deposit, Junior (minor) accounts, and individual, group and institutional accounts.",
        link: { href: "/products", label: "See all savings accounts" },
        home: true,
      },
      {
        q: "How much interest does a fixed deposit earn?",
        a: "A fixed deposit earns 13% per annum. You place a lump sum with us for an agreed period. Ask our office about the minimum amount and the periods available.",
        link: { href: "/savings/fixed-deposit", label: "Fixed Deposit Account" },
      },
      {
        q: "Can I open a savings account for my child?",
        a: "Yes, with a Junior account. Bring the child's birth certificate or other proof of age, two passport-size photographs of the child, and your own national ID as parent or guardian.",
        link: { href: "/savings/junior", label: "Junior account" },
      },
      {
        q: "How do I deposit or withdraw money?",
        a: "At any of our offices during opening hours, or on your phone with MSACCO (MTN or Airtel), which you can also use at MSACCO agents.",
      },
      {
        q: "Is my money safe with Mubuga SACCO?",
        a: "Mubuga SACCO Ltd is a registered savings and credit cooperative (Reg. No. 7346), owned by its members and serving Kisoro since 2005. Our audited financial statements and annual reports are published for members to read.",
        link: { href: "/publications", label: "Reports & Publications" },
      },
    ],
  },
  {
    id: "loans",
    title: "Loans",
    items: [
      {
        q: "What loans does Mubuga SACCO offer?",
        a: "Business, agricultural, school fees, development, home improvement, boda boda, medical and emergency loans.",
        link: { href: "/products", label: "See all loans" },
        home: true,
      },
      {
        q: "What is the interest rate on loans?",
        a: "Our loans are charged 1.8% per month on a reducing balance. This means interest is worked out on the amount you still owe, so it goes down as you repay.",
        home: true,
      },
      {
        q: "What do I need to apply for a loan?",
        a: "You need to be a member with an active savings account. Bring your national ID, a completed loan application form, and the security or guarantor details asked for that loan. Requirements differ by loan, so talk to our loans staff first.",
      },
      {
        q: "Do I need a guarantor or security?",
        a: "Most loans need security, a guarantor, or both, depending on the loan and the amount. Our staff will tell you what is accepted for the loan you want.",
      },
      {
        q: "Do agricultural loans have a grace period?",
        a: "Yes. Agricultural loans come with a 3-month grace period so that repayments can follow the farming season.",
        link: { href: "/loans/agricultural", label: "Agricultural Loan" },
      },
      {
        q: "How long does it take to get a loan?",
        a: "It depends on the loan, the amount and how complete your documents are. Emergency and medical loans are handled quickly. Ask our staff for the expected time when you apply.",
      },
      {
        q: "Can I work out my repayments before I apply?",
        a: "Yes. Use the loan calculator on our homepage for an estimate. Your final repayment schedule is given by our office when your loan is approved.",
        link: { href: "/#calculator", label: "Loan calculator" },
      },
    ],
  },
  {
    id: "msacco",
    title: "MSACCO Mobile Banking",
    items: [
      {
        q: "What is MSACCO?",
        a: "MSACCO lets you use your Mubuga SACCO account from your phone on MTN or Airtel: deposit, withdraw, check your balance and repay loans, without travelling to the office.",
        link: { href: "/msacco", label: "About MSACCO" },
        home: true,
      },
      {
        q: "How do I join MSACCO?",
        a: "From the phone number registered with the SACCO, dial *165*6*3# (MTN) or *185*7*3*1# (Airtel). Choose MSACCO, then Join (option 6), and follow the steps: enter our institution ID, your SACCO account number and a recovery number, then create your 5-digit PIN.",
        link: { href: "/msacco#enroll", label: "Step-by-step guide" },
      },
      {
        q: "I forgot my MSACCO PIN. What should I do?",
        a: "Use the Reset PIN option in the MSACCO account menu; you will need your recovery number. If that does not work, visit any of our offices with your national ID.",
      },
      {
        q: "Will Mubuga SACCO staff ever ask for my PIN?",
        a: "No. Never share your MSACCO PIN with anyone, including SACCO staff or agents. If someone asks for it, do not give it and call our office.",
      },
    ],
  },
  {
    id: "visit",
    title: "Offices & Contact",
    items: [
      {
        q: "Where are your offices?",
        a: "Our head office is in Nyakinama Sub-county (Mubuga), Kisoro District, and we have a branch in Kisoro Town. Maps and directions are on our Branches page.",
        link: { href: "/branches", label: "Branches & maps" },
        home: true,
      },
      {
        q: "What are your opening hours?",
        a: "Monday to Friday 8:00 AM – 5:00 PM, and Saturdays and public holidays 8:30 AM – 2:00 PM.",
      },
      {
        q: "How can I contact you?",
        a: "Call the head office on 0394 841 360 or the Kisoro Town branch on 0394 845 526, email mubugasacco@gmail.com, or send us a message through the Contact page.",
        link: { href: "/contact", label: "Contact us" },
      },
      {
        q: "Can I read this website in Rufumbira or Rukiga/Runyankore?",
        a: "Yes. Tap the Translator button at the top of the page and choose your language.",
      },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);
export const HOME_FAQS = ALL_FAQS.filter((f) => f.home);
