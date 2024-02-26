export class WorkOffer {
  title: string;
  summary: string;
  requiredSkills: string[];
  location: string;
  price: number;
  currency: string;
  period: string;
  created_at?: number;
  match?: number;
}
