// Full details for each loan and savings product.
// Used by the product pages (/loans/<slug>, /savings/<slug>) and by the expandable cards on
// Savings & Loans, so the text only lives in one place. Keys are the product slugs.

export type FAQ = { q: string; a: string };

export type LoanDetail = {
  title: string;
  tagline: string;
  description: string;
  purpose: string[];
  eligibility: string[];
  documents: string[];
  faqs: FAQ[];
};

export type SavingsDetail = {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  suitableFor: string[];
  faqs: FAQ[];
};

export const LOAN_DETAILS: Record<string, LoanDetail> = {
  "agricultural": {
    title: "Agricultural Loan",
    tagline: "Supporting farmers and rural livelihoods in Kisoro District — 3-month grace period",
    description: "The Agricultural Loan is designed to help eligible members finance farming-related activities. It includes a 3-month grace period to align with farming cycles. Agriculture is central to many households in Kisoro, and this product aims to support members in investing in their farming operations. All loans are at 1.8% per month on a reducing balance. Contact us to confirm eligibility and current terms.",
    purpose: [
      "Purchase of farm inputs such as seeds and fertilisers",
      "Preparation and cultivation of agricultural land",
      "Other farm-related productive activities",
      "Post-harvest handling and storage expenses",
    ],
    eligibility: [
      "Active membership in good standing with Mubuga SACCO",
      "Engagement in farming or agricultural activities",
      "Ability to provide required security or guarantor",
      "Other criteria as determined by SACCO management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "Security or guarantor documentation as required",
      "Any additional documents specified by management",
    ],
    faqs: [
      { q: "Who can apply for an agricultural loan?", a: "Active SACCO members engaged in farming activities may apply. Eligibility criteria must be confirmed with our office." },
      { q: "Are interest rates fixed or variable?", a: "Interest rates must be confirmed with SACCO staff. Do not rely on unofficial sources for rate information." },
    ],
  },
  "boda-boda": {
    title: "Boda Boda Loan",
    tagline: "Finance for boda boda operators in Kisoro",
    description: "The Boda Boda Loan is designed for eligible members who operate or intend to operate motorcycle taxis. This product can assist with acquiring a motorcycle or meeting maintenance costs. Boda boda transport plays an important role in the local economy. Contact us to confirm eligibility and current terms.",
    purpose: [
      "Acquisition of a motorcycle for boda boda operations",
      "Repair and maintenance of an existing motorcycle",
      "Meeting operational costs for boda boda transport",
    ],
    eligibility: [
      "Active SACCO membership in good standing",
      "Engagement in or intention to engage in boda boda operations",
      "Ability to provide required security or guarantor",
      "Valid riding licence where applicable",
      "Other criteria as confirmed by management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "Riding licence or relevant permit where required",
      "Security or guarantor documentation",
    ],
    faqs: [
      { q: "Can I apply if I do not yet own a motorcycle?", a: "Contact our office to discuss your circumstances. Eligibility depends on criteria set by management." },
      { q: "Does the SACCO require the motorcycle as security?", a: "Security requirements must be confirmed with SACCO staff before applying." },
    ],
  },
  "business": {
    title: "Business / Commercial Loan",
    tagline: "Credit to grow your business, trade or commercial enterprise",
    description: "The Business/Commercial Loan supports eligible members who run businesses, market stalls, retail shops or other trading and commercial activities. This product helps members invest in stock, equipment or working capital to sustain and grow their enterprises. All loans are at 1.8% per month on a reducing balance. Contact us to confirm current terms and eligibility.",
    purpose: [
      "Purchasing business stock or inventory",
      "Meeting working capital needs for a small enterprise",
      "Acquiring equipment or tools for a business",
      "Supporting market traders and small shop owners",
    ],
    eligibility: [
      "Active SACCO membership in good standing",
      "Evidence of an existing or planned business activity",
      "Ability to provide required security or guarantor",
      "Other criteria as confirmed by management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "Evidence of business activity where required",
      "Security or guarantor documentation as required",
    ],
    faqs: [
      { q: "Can I apply for a business loan as a new member?", a: "Membership standing requirements must be confirmed with SACCO staff. Contact our office to discuss your situation." },
      { q: "Is there a minimum or maximum loan amount?", a: "Loan limits must be confirmed with SACCO management. We do not publish unverified figures." },
    ],
  },
  "development": {
    title: "Development Loan",
    tagline: "Finance for productive development activities in your community",
    description: "The Development Loan supports eligible members undertaking productive development projects that improve livelihoods and contribute to community progress. This may include income-generating investments and other development activities. All loans are at 1.8% per month on a reducing balance. Contact our office to confirm eligibility and terms.",
    purpose: [
      "Income-generating development projects",
      "Community development and improvement activities",
      "Productive investments that grow over time",
      "Other development activities approved by management",
    ],
    eligibility: [
      "Active SACCO membership in good standing",
      "A clearly defined productive development purpose",
      "Ability to provide required security or guarantor",
      "Other criteria as confirmed by management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "Description or plan of the development activity",
      "Security or guarantor documentation",
    ],
    faqs: [
      { q: "What qualifies as a development activity?", a: "Contact our office to discuss your specific project. Staff will advise on whether it qualifies under this product." },
      { q: "What is the interest rate?", a: "All MUSACCO loans are at 1.8% per month on a reducing balance. Contact us to get your specific repayment schedule." },
    ],
  },
  "emergency": {
    title: "Emergency Loan",
    tagline: "Fast access to funds when you need them most",
    description: "The Emergency Loan provides eligible members with rapid access to funds for urgent and immediate financial needs. This product is designed for genuine emergencies where time is critical. All loans are at 1.8% per month on a reducing balance. Contact our office to confirm eligibility and begin your application.",
    purpose: [
      "Addressing genuine urgent financial emergencies",
      "Covering unexpected essential expenses",
      "Short-term relief for critical situations",
    ],
    eligibility: [
      "Active SACCO membership in good standing",
      "A genuine and verifiable emergency need",
      "Sufficient savings balance or guarantor as required",
      "Other criteria as confirmed by management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "Evidence of the emergency where required",
      "Security or guarantor documentation",
    ],
    faqs: [
      { q: "How fast is an emergency loan processed?", a: "Contact our office immediately on 0394 841 360. Staff will prioritise genuine emergency applications." },
      { q: "What is the interest rate?", a: "All MUSACCO loans are at 1.8% per month on a reducing balance." },
    ],
  },
  "home-improvement": {
    title: "Home Improvement Loan",
    tagline: "Finance to develop and improve your family home",
    description: "The Home Improvement Loan helps eligible members invest in the construction, renovation or development of their family homes. Improving one's living conditions is a meaningful goal for many households in Kisoro. Contact our office to confirm current terms and eligibility requirements.",
    purpose: [
      "Construction of a new family home",
      "Renovation or extension of an existing structure",
      "Roofing, flooring and structural improvements",
      "Installation of basic home utilities and amenities",
    ],
    eligibility: [
      "Active SACCO membership in good standing",
      "Ownership or lawful occupation of the property",
      "Ability to provide required security or guarantor",
      "Other criteria as confirmed by management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "Land title or proof of property rights where required",
      "Security or guarantor documentation",
    ],
    faqs: [
      { q: "Do I need to own land to qualify?", a: "Property requirements must be confirmed with SACCO staff. Contact our office to discuss your situation." },
      { q: "Can I use this loan for rental property construction?", a: "The intended use is subject to management approval. Discuss your plans with SACCO staff before applying." },
    ],
  },
  "medical": {
    title: "Medical Loan",
    tagline: "Accessing funds for urgent medical and healthcare needs",
    description: "The Medical Loan is available to eligible members who need to meet urgent medical or healthcare expenses for themselves or their family members. Health emergencies create sudden financial pressure and this product aims to provide timely support. All loans are at 1.8% per month on a reducing balance. Contact us to confirm eligibility.",
    purpose: [
      "Meeting hospital bills and inpatient treatment costs",
      "Paying for prescribed medicines and medical supplies",
      "Covering outpatient consultation and diagnostic fees",
      "Other urgent healthcare-related expenses",
    ],
    eligibility: [
      "Active SACCO membership in good standing",
      "A verifiable medical or healthcare need",
      "Ability to provide required security or guarantor",
      "Other criteria as confirmed by management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "Medical documentation or hospital invoice where required",
      "Security or guarantor documentation",
    ],
    faqs: [
      { q: "How quickly can a medical loan be processed?", a: "Contact our office urgently on 0394 841 360. Staff will advise on processing times for medical emergencies." },
      { q: "What is the interest rate?", a: "All MUSACCO loans are at 1.8% per month on a reducing balance." },
    ],
  },
  "school-fees": {
    title: "School Fees Loan",
    tagline: "Helping families meet education costs for their children",
    description: "The School Fees Loan helps eligible members manage education expenses for their children at primary, secondary or tertiary level. Education is a priority investment for many families in Kisoro, and this product is designed to make it more manageable. Confirm current terms and requirements with our office.",
    purpose: [
      "Payment of school fees at primary or secondary level",
      "Tertiary institution tuition and related costs",
      "School uniforms, books and learning materials",
      "Other directly education-related expenses",
    ],
    eligibility: [
      "Active SACCO membership in good standing",
      "Responsibility for a child or student's education costs",
      "Ability to provide required security or guarantor",
      "Other criteria as confirmed by management",
    ],
    documents: [
      "Valid national identification document",
      "Proof of SACCO membership",
      "Completed loan application form",
      "School fee invoice or admission letter where required",
      "Security or guarantor documentation",
    ],
    faqs: [
      { q: "When should I apply for a school fees loan?", a: "Apply before the school term begins to allow processing time. Contact our office for guidance on timing." },
      { q: "Can the loan cover multiple children?", a: "Discuss your specific circumstances with SACCO staff. Loan terms are subject to management approval." },
    ],
  },
};

export const SAVINGS_DETAILS: Record<string, SavingsDetail> = {
  "fixed-deposit": {
    title: "Fixed Deposit Account",
    tagline: "Earn 13% per annum by locking your savings for a set period",
    description: "The Fixed Deposit Account lets members place a lump sum with Mubuga SACCO for an agreed period and earn interest of 13% per annum. It is ideal for money you will not need right away, such as savings set aside for a future project, school fees or land. Contact our office to agree the deposit period and confirm current terms.",
    features: [
      "Interest of 13% per annum",
      "Lump sum deposited for an agreed fixed period",
      "Higher return than ordinary savings",
      "Minimum deposit and period options to be confirmed with our office",
    ],
    suitableFor: [
      "Members with money they will not need for some time",
      "Saving towards a planned future expense",
      "Members, groups and institutions wanting a better return",
    ],
    faqs: [
      { q: "What interest does a Fixed Deposit earn?", a: "Fixed deposits earn 13% per annum. Confirm how and when interest is paid with our office." },
      { q: "Can I withdraw before the period ends?", a: "Early withdrawal conditions must be confirmed with SACCO staff before you deposit." },
      { q: "What is the minimum amount and period?", a: "Minimum deposit amounts and available periods must be confirmed with our office." },
    ],
  },
  "group": {
    title: "Group Account",
    tagline: "For VSLAs, associations and community groups",
    description: "The Group Account is for village savings and lending associations (VSLAs), associations and other community groups that save together. It gives your group a safe, accountable place to keep pooled savings and a formal relationship with Mubuga SACCO. Contact us to learn how we can support your group.",
    features: [
      "For VSLAs, associations and registered groups",
      "Safe, accountable place for group savings",
      "Transactions authorised by the group's signatories",
      "Account terms and requirements to be confirmed with our office",
    ],
    suitableFor: [
      "Existing VSLA groups",
      "Community groups looking to formalise their savings",
      "Associations, cooperatives and women or youth groups",
    ],
    faqs: [
      { q: "What does our group need to open an account?", a: "Usually the group's registration or recognition documents, minutes naming the signatories and the signatories' identification. Confirm the list with our staff." },
      { q: "Must every group member be a SACCO member?", a: "Group membership and account requirements must be confirmed with SACCO staff." },
      { q: "How does the group withdraw money?", a: "Withdrawals are authorised by the group's appointed signatories. Confirm the procedure with our office." },
    ],
  },
  "individual": {
    title: "Individual Account",
    tagline: "A personal account in your own name",
    description: "The Individual Account is for adult members who want to save and borrow in their own name. It gives you access to Mubuga SACCO savings products, loans and MSACCO mobile banking. Visit any of our offices with your identification to open one.",
    features: [
      "Held in your own name",
      "Access to savings, loans and MSACCO mobile banking",
      "Opened at our Head Office in Mubuga or Kisoro Town Branch",
      "Requirements and fees to be confirmed with our office",
    ],
    suitableFor: [
      "Adults joining Mubuga SACCO as individual members",
      "Farmers, traders, workers and business owners",
      "Anyone who wants to save and access affordable credit",
    ],
    faqs: [
      { q: "What do I need to open an Individual Account?", a: "Bring a valid national identification document. See our Membership page for the full list and confirm it with our staff." },
      { q: "Can I use MSACCO with my Individual Account?", a: "Yes. Once your account is open you can register for MSACCO on MTN or Airtel." },
    ],
  },
  "institutional": {
    title: "Institutional Account",
    tagline: "For schools, churches and organisations, including school fees collection",
    description: "The Institutional Account is for schools, churches, cooperatives and other organisations. It gives your institution a secure account at Mubuga SACCO, and schools can use it to collect school fees from parents, who can pay at our offices or through MSACCO. Contact us to set up an account for your institution.",
    features: [
      "For schools, churches, cooperatives and organisations",
      "School fees collection: parents pay fees straight into the school's account",
      "Parents can pay at our offices or through MSACCO",
      "Account terms and requirements to be confirmed with our office",
    ],
    suitableFor: [
      "Schools collecting fees from parents",
      "Churches and faith-based organisations",
      "Cooperatives, NGOs and community organisations",
    ],
    faqs: [
      { q: "What does an institution need to open an account?", a: "Usually the registration certificate, a resolution naming the authorised signatories and their identification. Confirm the list with our staff." },
      { q: "How does school fees collection work?", a: "Parents deposit fees into the school's account at our offices or through MSACCO, and the school receives them directly. Confirm setup details with our office." },
    ],
  },
  "junior": {
    title: "Junior / Minor Account",
    tagline: "Building a savings habit for children and young people",
    description: "The Junior or Minor Savings account is designed to help parents, guardians and families save on behalf of children. Starting a savings habit early can help young people develop financial responsibility and build a foundation for their future. Confirm account terms and age requirements with SACCO staff.",
    features: [
      "Opened and managed by a parent or guardian on behalf of a minor",
      "Encourages a savings culture from a young age",
      "Terms and minimum ages to be confirmed with management",
      "Interest rates to be confirmed with SACCO staff",
    ],
    suitableFor: [
      "Parents saving on behalf of their children",
      "Guardians managing finances for minors in their care",
      "Families planning for a child's future education expenses",
    ],
    faqs: [
      { q: "At what age can a child hold their own account?", a: "Age requirements and transition arrangements must be confirmed with SACCO staff." },
      { q: "Who controls the account while the child is a minor?", a: "Account control arrangements must be confirmed with SACCO management when opening the account." },
    ],
  },
  "ordinary": {
    title: "Ordinary Savings",
    tagline: "A regular savings account for all Mubuga SACCO members",
    description: "The Ordinary Savings account is the standard savings account available to all members of Mubuga SACCO. It allows members to deposit money regularly and build their savings over time. This account is typically a prerequisite for accessing loan products. Contact us to confirm current terms.",
    features: [
      "Available to all active SACCO members",
      "Regular deposits encouraged to build savings",
      "Savings balance may support loan eligibility",
      "Interest rate to be confirmed with SACCO management",
      "Minimum balance requirements to be confirmed",
    ],
    suitableFor: [
      "All members wishing to begin saving with the SACCO",
      "Members building savings towards a loan application",
      "Individuals who want a safe and accessible place to save",
    ],
    faqs: [
      { q: "How do I open an Ordinary Savings account?", a: "Visit our Nyakinama office to complete the account opening process. Bring your national identification document and proof of membership." },
      { q: "Can I withdraw from my savings at any time?", a: "Withdrawal terms must be confirmed with SACCO staff. Some restrictions may apply." },
    ],
  },
  "voluntary": {
    title: "Voluntary Savings",
    tagline: "Save on your own terms with flexible deposits",
    description: "The Voluntary Savings account gives members the flexibility to save amounts of their choosing according to their financial circumstances. There is no fixed deposit schedule, making this product suitable for members with irregular incomes such as farmers or casual labourers. Contact us to confirm current terms.",
    features: [
      "Flexible deposit amounts and schedule",
      "Suitable for members with variable incomes",
      "Interest rate to be confirmed with management",
      "Minimum and maximum balance terms to be confirmed",
    ],
    suitableFor: [
      "Farmers and seasonal workers with irregular income",
      "Members who prefer flexibility over fixed commitments",
      "Members saving towards a specific goal",
    ],
    faqs: [
      { q: "Is there a minimum amount I must deposit each time?", a: "Minimum deposit amounts must be confirmed with SACCO staff." },
      { q: "Can I hold both Ordinary and Voluntary savings accounts?", a: "Account holding arrangements must be confirmed with SACCO management." },
    ],
  },
};
