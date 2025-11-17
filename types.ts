export interface Persona {
  id: string;
  title: string;
  primary_concerns: string[];
  statement: string;
}

export interface CSRAssessmentItem {
  rating: string;
  key_points: string[];
}

export interface OptionSummary {
  option_name: string;

  description: string;
  csr_implications: {
    environmental: string;
    social: string;
    governance_economic: string;
  };
}

export interface RecommendedOption {
  option_name: string;
  csr_rationale: string;
}

export interface CouncilResponse {
  scenario_summary: string;
  assumptions: string[];
  personas: Persona[];
  csr_assessment: {
    environmental: CSRAssessmentItem;
    social: CSRAssessmentItem;
    governance_economic: CSRAssessmentItem;
  };
  options_and_recommendation: {
    option_summaries: OptionSummary[];
    recommended_option: RecommendedOption;
  };
}
